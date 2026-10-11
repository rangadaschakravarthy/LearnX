import { describe, it, expect } from 'vitest';
import { ExecutionEngine } from '../src/services/runtime/executionEngine';

describe('LearnX JavaScript Compiler and Execution Engine', () => {

  // Test A: Synchronous order
  it('Test A: Synchronous execution order', async () => {
    const code = `
      console.log(1);
      console.log(2);
      console.log(3);
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.status).toBe('completed');
    const outputs = result.logs.map(l => l.content);
    expect(outputs).toEqual(['1', '2', '3']);
  });

  // Test B: Timer order (the critical bug that motivated this prompt!)
  it('Test B: Timer execution captures async output after synchronous code', async () => {
    const code = `
      console.log(1);
      setTimeout(() => console.log(2), 50);
      console.log(3);
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.status).toBe('completed');
    const outputs = result.logs.map(l => l.content);
    expect(outputs).toEqual(['1', '3', '2']);
  });

  // Test C: Nested timers
  it('Test C: Nested timers execute in correct chronological sequence', async () => {
    const code = `
      console.log("A");
      setTimeout(() => {
        console.log("B");
        setTimeout(() => {
          console.log("C");
        }, 20);
      }, 10);
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.status).toBe('completed');
    const outputs = result.logs.map(l => l.content);
    expect(outputs).toEqual(['A', 'B', 'C']);
  });

  // Test D: Promise ordering
  it('Test D: Microtasks (Promise.then) execute before task completion', async () => {
    const code = `
      console.log("A");
      Promise.resolve().then(() => console.log("B"));
      console.log("C");
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.status).toBe('completed');
    const outputs = result.logs.map(l => l.content);
    expect(outputs).toEqual(['A', 'C', 'B']);
  });

  // Test E: Promise versus timer
  it('Test E: Microtask vs macrotask event loop ordering', async () => {
    const code = `
      console.log("A");
      setTimeout(() => console.log("C"), 0);
      Promise.resolve().then(() => console.log("B"));
      console.log("D");
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.status).toBe('completed');
    const outputs = result.logs.map(l => l.content);
    expect(outputs).toEqual(['A', 'D', 'B', 'C']);
  });

  // Test F: Async/await
  it('Test F: Async/await workflow completes properly', async () => {
    const code = `
      async function run() {
        console.log(1);
        await new Promise(resolve => setTimeout(resolve, 30));
        console.log(2);
      }
      run();
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.status).toBe('completed');
    const outputs = result.logs.map(l => l.content);
    expect(outputs).toEqual(['1', '2']);
  });

  // Test G: Rejected Promise
  it('Test G: Unhandled Promise rejection diagnostic captured', async () => {
    const code = `
      Promise.reject(new Error("Test rejection"));
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    const errorLogs = result.logs.filter(l => l.type === 'error');
    expect(errorLogs.length).toBeGreaterThan(0);
    expect(errorLogs[0].content).toContain('Test rejection');
  });

  // Test H: Timer callback error
  it('Test H: Asynchronous exception inside timer callback captured', async () => {
    const code = `
      setTimeout(() => {
        throw new Error("Timer failed");
      }, 10);
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    const errorLogs = result.logs.filter(l => l.type === 'error');
    expect(errorLogs.length).toBeGreaterThan(0);
    expect(errorLogs[0].content).toContain('Timer failed');
  });

  // Test I: Circular object serialization
  it('Test I: Circular references do not crash serializer', async () => {
    const code = `
      const item = {};
      item.self = item;
      console.log(item);
      console.log("Still running");
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.status).toBe('completed');
    const outputs = result.logs.map(l => l.content);
    expect(outputs[0]).toContain('[Circular]');
    expect(outputs[1]).toBe('Still running');
  });

  // Test J: BigInt serialization
  it('Test J: BigInt values format without throwing TypeError', async () => {
    const code = `
      console.log(12345678901234567890n);
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.status).toBe('completed');
    expect(result.logs[0].content).toBe('12345678901234567890n');
  });

  // Test K: Multiple arguments
  it('Test K: Multiple console arguments preserved in order', async () => {
    const code = `
      console.log("Value:", 10, true, null, undefined);
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.status).toBe('completed');
    expect(result.logs[0].content).toBe('Value: 10 true null undefined');
  });

  // Test L: Infinite loop timeout
  it('Test L: Synchronous infinite loop is halted by supervisor watchdog', async () => {
    const code = `
      console.log("Before");
      while (true) {}
      console.log("After");
    `;
    // Set 600ms watchdog for test
    const { promise } = ExecutionEngine.execute(code, { timeoutMs: 600 });
    const result = await promise;
    expect(result.timedOut).toBe(true);
    expect(result.status).toBe('timeout');
    const contents = result.logs.map(l => l.content);
    expect(contents).toContain('Before');
    expect(contents).not.toContain('After');
  });

  // Test M: Run isolation
  it('Test M: Stale session logs never leak into newer execution', async () => {
    const code1 = `
      setTimeout(() => console.log("OLD"), 100);
      console.log("FIRST");
    `;
    const code2 = `
      console.log("SECOND");
    `;

    // Start run 1
    ExecutionEngine.execute(code1);

    // Immediately start run 2
    const { promise: promise2 } = ExecutionEngine.execute(code2);
    const result2 = await promise2;

    const outputs2 = result2.logs.map(l => l.content);
    expect(outputs2).toEqual(['SECOND']);
    expect(outputs2).not.toContain('OLD');
    expect(outputs2).not.toContain('FIRST');
  });

  // Test N: Interval cancellation
  it('Test N: Interval execution and self-cancellation', async () => {
    const code = `
      let count = 0;
      const id = setInterval(() => {
        console.log(++count);
        if (count === 3) {
          clearInterval(id);
          console.log("Stopped");
        }
      }, 15);
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.status).toBe('completed');
    const outputs = result.logs.map(l => l.content);
    expect(outputs).toEqual(['1', '2', '3', 'Stopped']);
  });

  // Test O: Strict mode semantics
  it('Test O1: Classic script preserves non-strict mode when directive is not top-level', async () => {
    const code = `
      console.log("Starting app");
      "use strict";
      x = 100;
      console.log(x);
    `;
    const { promise } = ExecutionEngine.execute(code, { mode: 'script' });
    const result = await promise;
    expect(result.status).toBe('completed');
    const outputs = result.logs.map(l => l.content);
    expect(outputs).toEqual(['Starting app', '100']);
  });

  it('Test O2: Script with top-level "use strict" throws ReferenceError on undeclared assignment', async () => {
    const code = `
      "use strict";
      undeclaredVar = 42;
    `;
    const { promise } = ExecutionEngine.execute(code, { mode: 'script' });
    const result = await promise;
    expect(result.logs.some(l => l.content.includes('ReferenceError'))).toBe(true);
  });

  it('Test O3: Module mode is automatically strict', async () => {
    const code = `
      moduleUndeclared = 99;
    `;
    const { promise } = ExecutionEngine.execute(code, { mode: 'module' });
    const result = await promise;
    expect(result.logs.some(l => l.content.includes('ReferenceError'))).toBe(true);
  });

  // Test P: Output volume limit
  it('Test P: Output limit protects against runaway log loops', async () => {
    const code = `
      for (let i = 0; i < 200; i++) {
        console.log("Item " + i);
      }
    `;
    const { promise } = ExecutionEngine.execute(code, { maxLogs: 50 });
    const result = await promise;
    expect(result.status).toBe('completed');
    // Logs should be capped at maxLogs + 1 warning entry
    expect(result.logs.length).toBeLessThanOrEqual(52);
    expect(result.logs.some(l => l.content.includes('Console output limit'))).toBe(true);
  });

  // Additional Tests
  it('Additional: queueMicrotask ordering conforms to HTML event loop', async () => {
    const code = `
      console.log(1);
      queueMicrotask(() => console.log(3));
      console.log(2);
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.logs.map(l => l.content)).toEqual(['1', '2', '3']);
  });

  it('Additional: console.assert logs error only on failed condition', async () => {
    const code = `
      console.assert(true, "Should not log");
      console.assert(false, "Expected assertion failure");
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    expect(result.logs.length).toBe(1);
    expect(result.logs[0].content).toContain('Assertion failed: Expected assertion failure');
  });

  it('Additional: console.count and console.countReset', async () => {
    const code = `
      console.count("counter");
      console.count("counter");
      console.countReset("counter");
      console.count("counter");
    `;
    const { promise } = ExecutionEngine.execute(code);
    const result = await promise;
    const outputs = result.logs.map(l => l.content);
    expect(outputs).toEqual(['counter: 1', 'counter: 2', 'counter: 1']);
  });

  it('Additional: Stop button / cancellation terminates execution immediately', async () => {
    const code = `
      console.log("Start");
      setInterval(() => {
        console.log("Tick");
      }, 50);
    `;
    const { promise, controller } = ExecutionEngine.execute(code);
    
    // Allow initial log to occur, then stop
    setTimeout(() => {
      controller.stop("User clicked stop");
    }, 80);

    const result = await promise;
    expect(result.status).toBe('cancelled');
    expect(result.logs.map(l => l.content)).toContain('Start');
    expect(result.logs.some(l => l.content.includes('Execution stopped'))).toBe(true);
  });
});
