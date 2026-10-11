/**
 * LearnX JavaScript Runtime - Execution Engine
 * Manages sandboxed Web Worker execution sessions, incremental event streaming,
 * watchdog timeout supervisors, cancellation, and complete asynchronous lifecycles.
 */

import { buildWorkerScript } from './workerSource';
import {
  ConsoleLogEntry,
  ExecutionEvent,
  ExecutionOptions,
  ExecutionResult,
  ExecutionStatus,
  IExecutionController
} from './types';

export interface IWorkerAdapter {
  postMessage(message: any): void;
  terminate(): void;
  onmessage: ((event: { data: any }) => void) | null;
  onerror: ((error: any) => void) | null;
  cleanup?: () => void;
}

const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_MAX_LOGS = 1000;

export class ExecutionEngine {
  private static activeWorker: IWorkerAdapter | null = null;
  private static activeSessionId: string | null = null;
  private static activeWatchdog: any = null;

  /**
   * Spawns an isolated worker in the appropriate environment (Browser or Node/Vitest).
   */
  private static async createWorker(maxLogs: number): Promise<IWorkerAdapter> {
    const isBrowser = typeof window !== 'undefined' && typeof window.Worker !== 'undefined';

    if (isBrowser) {
      const script = buildWorkerScript(maxLogs);
      const blob = new Blob([script], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      const worker = new window.Worker(blobUrl);

      const adapter: IWorkerAdapter = {
        postMessage: (msg: any) => worker.postMessage(msg),
        terminate: () => worker.terminate(),
        onmessage: null,
        onerror: null,
        cleanup: () => {
          try {
            URL.revokeObjectURL(blobUrl);
          } catch {}
        }
      };

      worker.onmessage = (e: MessageEvent) => {
        if (adapter.onmessage) adapter.onmessage(e);
      };

      worker.onerror = (err: ErrorEvent) => {
        if (adapter.onerror) adapter.onerror(err);
      };

      return adapter;
    }

    // Node.js environment (for Vitest automated testing)
    const nodeWorkerModule = 'node:worker_threads';
    const { Worker: NodeWorker } = await import(/* @vite-ignore */ nodeWorkerModule);
    const baseScript = buildWorkerScript(maxLogs);
    const nodeShimScript = `
      const { parentPort } = require('node:worker_threads');
      const self = globalThis;
      self.postMessage = (msg) => parentPort.postMessage(msg);
      self.addEventListener = (evt, handler) => {
        if (evt === 'error') process.on('uncaughtException', handler);
        if (evt === 'unhandledrejection') process.on('unhandledRejection', handler);
      };
      parentPort.on('message', (data) => {
        if (self.onmessage) self.onmessage({ data });
      });
      ${baseScript}
    `;

    const nodeWorker = new NodeWorker(nodeShimScript, { eval: true });

    const adapter: IWorkerAdapter = {
      postMessage: (msg: any) => nodeWorker.postMessage(msg),
      terminate: () => {
        nodeWorker.terminate();
      },
      onmessage: null,
      onerror: null
    };

    nodeWorker.on('message', (data: any) => {
      if (adapter.onmessage) adapter.onmessage({ data });
    });

    nodeWorker.on('error', (err: any) => {
      if (adapter.onerror) adapter.onerror(err);
    });

    return adapter;
  }

  /**
   * Immediately cancel any running session and terminate its worker.
   */
  public static cancelCurrentExecution(reason = 'Execution cancelled'): void {
    if (this.activeWatchdog) {
      clearTimeout(this.activeWatchdog);
      this.activeWatchdog = null;
    }

    if (this.activeWorker) {
      try {
        this.activeWorker.postMessage({ type: 'cancel' });
        this.activeWorker.terminate();
        if (this.activeWorker.cleanup) this.activeWorker.cleanup();
      } catch {}
      this.activeWorker = null;
    }

    this.activeSessionId = null;
  }

  /**
   * Execute JavaScript source code with full asynchronous output capture,
   * supervisor timeout, real-time event streaming, and session isolation.
   */
  public static execute(
    code: string,
    options: ExecutionOptions = {}
  ): { promise: Promise<ExecutionResult>; controller: IExecutionController } {
    const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const maxLogs = options.maxLogs ?? DEFAULT_MAX_LOGS;
    const mode = options.mode ?? 'script';

    // Generate unique session ID
    const sessionId = `exec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Cancel any previous execution to ensure strict session isolation
    this.cancelCurrentExecution('New execution started');
    this.activeSessionId = sessionId;

    let currentStatus: ExecutionStatus = 'running';
    let isSettled = false;

    const notifyStatus = (status: ExecutionStatus) => {
      currentStatus = status;
      if (options.onStatusChange) options.onStatusChange(status);
    };

    notifyStatus('running');

    let controllerStopFn: (reason?: string) => void = () => {};

    const promise = new Promise<ExecutionResult>(async (resolve) => {
      const logs: ConsoleLogEntry[] = [];
      const startTime = performance.now();

      let worker: IWorkerAdapter;
      try {
        worker = await this.createWorker(maxLogs);
      } catch (err: any) {
        notifyStatus('error');
        const durationMs = Math.round(performance.now() - startTime);
        const errLog: ConsoleLogEntry = {
          id: `init-err-${Date.now()}`,
          type: 'error',
          content: `Failed to initialize execution runtime: ${err.message || String(err)}`,
          timestamp: Date.now()
        };
        logs.push(errLog);
        resolve({
          sessionId,
          logs,
          error: err.message || 'Worker initialization failed',
          durationMs,
          status: 'error'
        });
        return;
      }

      this.activeWorker = worker;

      const finishExecution = (
        status: ExecutionStatus,
        errorMessage?: string,
        timedOut = false
      ) => {
        if (isSettled) return;
        isSettled = true;

        if (ExecutionEngine.activeWatchdog) {
          clearTimeout(ExecutionEngine.activeWatchdog);
          ExecutionEngine.activeWatchdog = null;
        }

        try {
          worker.terminate();
          if (worker.cleanup) worker.cleanup();
        } catch {}

        if (ExecutionEngine.activeWorker === worker) {
          ExecutionEngine.activeWorker = null;
          ExecutionEngine.activeSessionId = null;
        }

        notifyStatus(status);
        const durationMs = Math.round(performance.now() - startTime);

        resolve({
          sessionId,
          logs,
          error: errorMessage,
          durationMs,
          status,
          timedOut
        });
      };

      // Watchdog Supervisor Timer (Independent of Worker thread)
      ExecutionEngine.activeWatchdog = setTimeout(() => {
        if (!isSettled && ExecutionEngine.activeSessionId === sessionId) {
          const timeoutSec = (timeoutMs / 1000).toFixed(1);
          const timeoutEntry: ConsoleLogEntry = {
            id: `timeout-${sessionId}-${Date.now()}`,
            type: 'error',
            content: `⏳ Execution timed out (${timeoutSec}s limit reached). Terminated to prevent application freeze (infinite loop detected).`,
            timestamp: Date.now()
          };
          logs.push(timeoutEntry);
          if (options.onLog) options.onLog(timeoutEntry);
          if (options.onEvent) {
            options.onEvent({
              type: 'execution_timeout',
              sessionId,
              seq: 999999,
              timestamp: performance.now(),
              entry: timeoutEntry,
              durationMs: timeoutMs
            });
          }

          finishExecution('timeout', 'Execution timed out', true);
        }
      }, timeoutMs);

      // Stop controller hook
      controllerStopFn = (reason = 'Stopped by user') => {
        if (!isSettled && ExecutionEngine.activeSessionId === sessionId) {
          const stopEntry: ConsoleLogEntry = {
            id: `stop-${sessionId}-${Date.now()}`,
            type: 'warn',
            content: `⏹ Execution stopped by user.`,
            timestamp: Date.now()
          };
          logs.push(stopEntry);
          if (options.onLog) options.onLog(stopEntry);
          if (options.onEvent) {
            options.onEvent({
              type: 'execution_cancelled',
              sessionId,
              seq: 999999,
              timestamp: performance.now(),
              reason
            });
          }

          finishExecution('cancelled', reason);
        }
      };

      // Handle Worker events
      worker.onmessage = (e: { data: any }) => {
        const event = e.data as ExecutionEvent & { action?: string };
        if (!event || event.sessionId !== sessionId) {
          // Discard stale messages belonging to older sessions
          return;
        }

        if (options.onEvent) {
          options.onEvent(event);
        }

        switch (event.type) {
          case 'console_output': {
            if (event.action === 'clear') {
              logs.length = 0;
            } else if (event.entry) {
              logs.push(event.entry);
              if (options.onLog) options.onLog(event.entry);
            }
            break;
          }

          case 'runtime_error': {
            if (event.entry) {
              logs.push(event.entry);
              if (options.onLog) options.onLog(event.entry);
            }
            break;
          }

          case 'unhandled_rejection': {
            if (event.entry) {
              logs.push(event.entry);
              if (options.onLog) options.onLog(event.entry);
            }
            break;
          }

          case 'execution_completed': {
            finishExecution(logs.some(l => l.type === 'error') ? 'error' : 'completed');
            break;
          }
        }
      };

      worker.onerror = (err: any) => {
        if (!isSettled && ExecutionEngine.activeSessionId === sessionId) {
          const message = err.message || 'Worker runtime error';
          const errEntry: ConsoleLogEntry = {
            id: `worker-err-${Date.now()}`,
            type: 'error',
            content: `Runtime Error: ${message}`,
            timestamp: Date.now()
          };
          logs.push(errEntry);
          if (options.onLog) options.onLog(errEntry);

          finishExecution('error', message);
        }
      };

      // Start execution inside worker
      worker.postMessage({
        type: 'start',
        sessionId,
        code,
        mode
      });
    });

    const controller: IExecutionController = {
      sessionId,
      get status() {
        return currentStatus;
      },
      stop: (reason?: string) => controllerStopFn(reason)
    };

    return { promise, controller };
  }
}
