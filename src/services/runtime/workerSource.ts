/**
 * LearnX JavaScript Runtime - Web Worker Engine Source
 * Runs in a dedicated Web Worker thread with isolated global scope,
 * complete event loop tracking, real-time streaming, and robust serialization.
 */

export function buildWorkerScript(maxLogs = 1000): string {
  return `
(function() {
  const originalSetTimeout = self.setTimeout.bind(self);
  const originalClearTimeout = self.clearTimeout.bind(self);
  const originalSetInterval = self.setInterval.bind(self);
  const originalClearInterval = self.clearInterval.bind(self);

  let sessionId = '';
  let seq = 0;
  let startTime = 0;
  let isCompleted = false;
  let isCancelled = false;
  let syncExecutionFinished = false;
  let logCount = 0;
  const MAX_LOGS = ${maxLogs};

  const activeTimers = new Map();
  const activeIntervals = new Set();
  const namedTimers = new Map();
  const counts = new Map();

  function post(msg) {
    self.postMessage(msg);
  }

  // --- Safe Serializer ---
  const MAX_DEPTH = 4;
  const MAX_PROPS = 50;
  const MAX_STR_LEN = 5000;

  function safeSerialize(val, depth, seen) {
    if (val === null) return 'null';
    if (val === undefined) return 'undefined';

    const t = typeof val;

    if (t === 'string') {
      if (depth === 0) {
        return val.length > MAX_STR_LEN ? val.slice(0, MAX_STR_LEN) + '… [truncated]' : val;
      }
      const s = val.length > 300 ? val.slice(0, 300) + '…' : val;
      return JSON.stringify(s);
    }

    if (t === 'number') {
      if (Object.is(val, -0)) return '-0';
      return String(val);
    }

    if (t === 'boolean') return String(val);
    if (t === 'bigint') return val.toString() + 'n';
    if (t === 'symbol') return val.toString();

    if (t === 'function') {
      const name = val.name ? ' ' + val.name : ' (anonymous)';
      return '[Function' + name + ']';
    }

    if (val instanceof Error) {
      return val.stack || (val.name + ': ' + val.message);
    }

    if (val instanceof Date) {
      return isNaN(val.getTime()) ? 'Invalid Date' : val.toISOString();
    }

    if (val instanceof RegExp) return val.toString();

    if (t === 'object') {
      if (seen.has(val)) return '[Circular]';
      if (depth >= MAX_DEPTH) return Array.isArray(val) ? '[Array]' : '[Object]';

      try { seen.add(val); } catch (e) {}

      if (val instanceof Map) {
        const entries = [];
        let c = 0;
        for (const [k, v] of val.entries()) {
          if (c++ >= MAX_PROPS) { entries.push('... ' + (val.size - MAX_PROPS) + ' more items'); break; }
          entries.push(safeSerialize(k, depth + 1, seen) + ' => ' + safeSerialize(v, depth + 1, seen));
        }
        return 'Map(' + val.size + ') { ' + entries.join(', ') + ' }';
      }

      if (val instanceof Set) {
        const items = [];
        let c = 0;
        for (const item of val.values()) {
          if (c++ >= MAX_PROPS) { items.push('... ' + (val.size - MAX_PROPS) + ' more items'); break; }
          items.push(safeSerialize(item, depth + 1, seen));
        }
        return 'Set(' + val.size + ') { ' + items.join(', ') + ' }';
      }

      if (Array.isArray(val)) {
        const items = [];
        const limit = Math.min(val.length, MAX_PROPS);
        for (let i = 0; i < limit; i++) {
          items.push(safeSerialize(val[i], depth + 1, seen));
        }
        if (val.length > MAX_PROPS) {
          items.push('... ' + (val.length - MAX_PROPS) + ' more items');
        }
        return '[' + items.join(', ') + ']';
      }

      try {
        const keys = Object.keys(val);
        const items = [];
        const limit = Math.min(keys.length, MAX_PROPS);
        for (let i = 0; i < limit; i++) {
          const k = keys[i];
          let sVal = '';
          try { sVal = safeSerialize(val[k], depth + 1, seen); } catch (e) { sVal = '[Unserializable]'; }
          items.push(k + ': ' + sVal);
        }
        if (keys.length > MAX_PROPS) {
          items.push('... ' + (keys.length - MAX_PROPS) + ' more keys');
        }
        return items.length === 0 ? '{}' : '{ ' + items.join(', ') + ' }';
      } catch (e) {
        return '[Object]';
      }
    }

    try { return String(val); } catch (e) { return '[Unknown Value]'; }
  }

  function formatArgs(args) {
    if (!args || args.length === 0) return '';
    return args.map(a => safeSerialize(a, 0, new WeakSet())).join(' ');
  }

  function formatTable(data) {
    if (data === null || data === undefined || typeof data !== 'object') {
      return safeSerialize(data, 0, new WeakSet());
    }
    try {
      if (Array.isArray(data)) {
        if (data.length === 0) return '[]';
        if (typeof data[0] === 'object' && data[0] !== null) {
          const allKeys = Array.from(new Set(data.flatMap(item => (item && typeof item === 'object') ? Object.keys(item) : [])));
          const rows = data.map((item, idx) => {
            const rowObj = { '(index)': idx };
            allKeys.forEach(k => {
              rowObj[k] = (item && typeof item === 'object') ? item[k] : item;
            });
            return rowObj;
          });
          return JSON.stringify(rows, (_, v) => typeof v === 'bigint' ? v.toString() + 'n' : v, 2);
        }
        return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() + 'n' : v, 2);
      }
      return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() + 'n' : v, 2);
    } catch (e) {
      return safeSerialize(data, 0, new WeakSet());
    }
  }

  // --- Output Emission ---
  function emitLog(type, args) {
    if (isCompleted || isCancelled) return;

    if (logCount >= MAX_LOGS) {
      if (logCount === MAX_LOGS) {
        post({
          type: 'console_output',
          sessionId,
          seq: ++seq,
          timestamp: performance.now(),
          entry: {
            id: 'warn-limit-' + Date.now(),
            type: 'warn',
            content: '[LearnX Warning: Console output limit of ' + MAX_LOGS + ' entries reached. Further logs truncated.]',
            timestamp: Date.now(),
            seq
          }
        });
        logCount++;
      }
      return;
    }

    logCount++;
    let content = '';
    if (type === 'table') {
      content = formatTable(args[0]);
    } else {
      content = formatArgs(args);
    }

    post({
      type: 'console_output',
      sessionId,
      seq: ++seq,
      timestamp: performance.now(),
      entry: {
        id: 'log-' + sessionId + '-' + seq,
        type,
        content,
        timestamp: Date.now(),
        seq
      }
    });
  }

  function reportAsyncError(err) {
    if (isCompleted || isCancelled) return;
    const errObj = {
      name: err instanceof Error ? err.name : 'RuntimeError',
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined
    };

    post({
      type: 'runtime_error',
      sessionId,
      seq: ++seq,
      timestamp: performance.now(),
      error: errObj,
      entry: {
        id: 'err-' + sessionId + '-' + seq,
        type: 'error',
        content: (errObj.name + ': ' + errObj.message) + (errObj.stack ? '\\n' + errObj.stack : ''),
        timestamp: Date.now(),
        seq
      }
    });
  }

  function reportUnhandledRejection(reason) {
    if (isCompleted || isCancelled) return;
    const message = reason instanceof Error ? (reason.name + ': ' + reason.message) : String(reason);
    post({
      type: 'unhandled_rejection',
      sessionId,
      seq: ++seq,
      timestamp: performance.now(),
      entry: {
        id: 'rejection-' + sessionId + '-' + seq,
        type: 'error',
        content: 'Unhandled Promise Rejection: ' + message + (reason instanceof Error && reason.stack ? '\\n' + reason.stack : ''),
        timestamp: Date.now(),
        seq
      }
    });
  }

  // --- Completion Check ---
  function checkCompletion() {
    if (isCompleted || isCancelled) return;
    if (!syncExecutionFinished) return;
    if (activeTimers.size > 0 || activeIntervals.size > 0) return;

    // Drain any remaining microtasks
    Promise.resolve().then(() => {
      if (isCompleted || isCancelled) return;
      if (activeTimers.size === 0 && activeIntervals.size === 0) {
        isCompleted = true;
        post({
          type: 'execution_completed',
          sessionId,
          seq: ++seq,
          timestamp: performance.now(),
          durationMs: Math.round(performance.now() - startTime)
        });
      }
    });
  }

  // --- Timer Hooks ---
  self.setTimeout = function(callback, delay, ...args) {
    const numericDelay = typeof delay === 'number' && !isNaN(delay) ? Math.max(0, delay) : 0;
    let timerId;
    timerId = originalSetTimeout(() => {
      activeTimers.delete(timerId);
      try {
        if (typeof callback === 'function') {
          callback(...args);
        } else if (typeof callback === 'string') {
          (0, eval)(callback);
        }
      } catch (err) {
        reportAsyncError(err);
      } finally {
        checkCompletion();
      }
    }, numericDelay);

    activeTimers.set(timerId, Date.now());
    return timerId;
  };

  self.clearTimeout = function(timerId) {
    activeTimers.delete(timerId);
    originalClearTimeout(timerId);
    checkCompletion();
  };

  self.setInterval = function(callback, delay, ...args) {
    const numericDelay = typeof delay === 'number' && !isNaN(delay) ? Math.max(0, delay) : 0;
    const intervalId = originalSetInterval(() => {
      try {
        if (typeof callback === 'function') {
          callback(...args);
        } else if (typeof callback === 'string') {
          (0, eval)(callback);
        }
      } catch (err) {
        reportAsyncError(err);
      }
    }, numericDelay);

    activeIntervals.add(intervalId);
    return intervalId;
  };

  self.clearInterval = function(intervalId) {
    activeIntervals.delete(intervalId);
    originalClearInterval(intervalId);
    checkCompletion();
  };

  // --- Console Hooks ---
  const fakeConsole = {
    log: (...args) => emitLog('log', args),
    info: (...args) => emitLog('info', args),
    debug: (...args) => emitLog('log', args),
    warn: (...args) => emitLog('warn', args),
    error: (...args) => emitLog('error', args),
    table: (...args) => emitLog('table', args),
    dir: (...args) => emitLog('log', args),
    assert: (condition, ...args) => {
      if (!condition) {
        emitLog('error', ['Assertion failed:', ...args]);
      }
    },
    count: (label = 'default') => {
      const c = (counts.get(label) || 0) + 1;
      counts.set(label, c);
      emitLog('info', [label + ': ' + c]);
    },
    countReset: (label = 'default') => {
      counts.delete(label);
    },
    time: (label = 'default') => {
      namedTimers.set(label, performance.now());
    },
    timeLog: (label = 'default', ...args) => {
      const start = namedTimers.get(label);
      if (start !== undefined) {
        const elapsed = (performance.now() - start).toFixed(3);
        emitLog('info', [label + ': ' + elapsed + 'ms', ...args]);
      } else {
        emitLog('warn', ['Timer "' + label + '" does not exist']);
      }
    },
    timeEnd: (label = 'default') => {
      const start = namedTimers.get(label);
      if (start !== undefined) {
        const elapsed = (performance.now() - start).toFixed(3);
        namedTimers.delete(label);
        emitLog('info', [label + ': ' + elapsed + 'ms']);
      } else {
        emitLog('warn', ['Timer "' + label + '" does not exist']);
      }
    },
    group: (...args) => { if (args.length) emitLog('log', args); },
    groupCollapsed: (...args) => { if (args.length) emitLog('log', args); },
    groupEnd: () => {},
    clear: () => {
      post({
        type: 'console_output',
        sessionId,
        seq: ++seq,
        timestamp: performance.now(),
        entry: {
          id: 'clear-' + Date.now(),
          type: 'log',
          content: '',
          timestamp: Date.now(),
          seq
        },
        action: 'clear'
      });
    },
    trace: (...args) => {
      const stack = (new Error('Trace')).stack || '';
      emitLog('log', [...args, stack]);
    }
  };

  self.console = fakeConsole;

  // Listen for global unhandled errors
  self.addEventListener('error', (event) => {
    reportAsyncError(event.error || event.message);
  });

  self.addEventListener('unhandledrejection', (event) => {
    reportUnhandledRejection(event.reason);
  });

  // --- Message Protocol Handler ---
  self.onmessage = async (e) => {
    const data = e.data || {};

    if (data.type === 'cancel') {
      isCancelled = true;
      activeTimers.forEach((_, id) => originalClearTimeout(id));
      activeIntervals.forEach(id => originalClearInterval(id));
      activeTimers.clear();
      activeIntervals.clear();
      return;
    }

    if (data.type === 'start') {
      sessionId = data.sessionId || 'session_' + Date.now();
      startTime = performance.now();
      isCompleted = false;
      isCancelled = false;
      syncExecutionFinished = false;
      logCount = 0;
      seq = 0;

      post({
        type: 'execution_started',
        sessionId,
        seq: ++seq,
        timestamp: startTime
      });

      try {
        const code = data.code || '';
        const mode = data.mode || 'script';

        let result;
        if (mode === 'module') {
          // Module mode: automatically strict, wrapped in async IIFE
          const asyncFn = (0, eval)('(async () => { "use strict";\\n' + code + '\\n})');
          result = asyncFn();
        } else {
          // Classic script mode: executes in global scope via indirect eval
          // Preserves natural strict vs non-strict semantics
          result = (0, eval)(code);
        }

        // Handle returned Promise from top-level async or returned promise
        if (result && typeof result.then === 'function') {
          await result;
        }

        syncExecutionFinished = true;
        checkCompletion();
      } catch (err) {
        syncExecutionFinished = true;
        const errObj = {
          name: err instanceof Error ? err.name : 'RuntimeError',
          message: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : undefined
        };

        post({
          type: 'runtime_error',
          sessionId,
          seq: ++seq,
          timestamp: performance.now(),
          error: errObj,
          entry: {
            id: 'sync-err-' + sessionId + '-' + seq,
            type: 'error',
            content: (errObj.name + ': ' + errObj.message) + (errObj.stack ? '\\n' + errObj.stack : ''),
            timestamp: Date.now(),
            seq
          }
        });

        checkCompletion();
      }
    }
  };
})();
`;
}
