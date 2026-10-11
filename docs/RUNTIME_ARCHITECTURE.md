# LearnX JavaScript Execution Engine & Compiler Architecture

## 1. Overview & Execution Architecture

LearnX incorporates an isolated, event-driven JavaScript compiler and execution runtime. Designed specifically for interactive learning platforms, it guarantees:
- Full asynchronous event-loop output capture (settling timers and promises).
- Zero main-thread UI freezing during infinite loops via an independent supervisor watchdog.
- Fault-tolerant structured serialization (handling circular structures, BigInt, Symbols, Error objects).
- Strict-mode and classic-script ECMAScript fidelity.
- Safe execution cancellation and cross-session isolation.

```text
┌────────────────────────────────────────────────────────┐
│                   Main Browser UI / IDE                │
│  - CodeEditor (Monaco)                                 │
│  - Run / Stop Buttons (Active session controller)      │
│  - Streaming Output Console (Real-time updates)        │
└───────────┬────────────────────────────────────────────┘
            │ 1. execute({ code, timeoutMs, maxLogs })
            ▼
┌────────────────────────────────────────────────────────┐
│             ExecutionSupervisor (Main Thread)          │
│  - Generates Execution ID (e.g. exec_1791727...)       │
│  - Independent Watchdog Timer (Worker.terminate)       │
│  - Streaming Event Dispatcher                          │
│  - Stale Session Filter                                │
└───────────┬────────────────────────────────────────────┘
            │ 2. Worker message: { type: 'run', code, ... }
            ▼
┌────────────────────────────────────────────────────────┐
│          Sandboxed Execution Worker (Web Worker)       │
│  - Scoped Console Interceptor (log, warn, error, etc.) │
│  - Timer Registry (Active macro-task tracking)         │
│  - Microtask Drainer (queueMicrotask + Promises)       │
│  - Safe Object Serializer (Circular, BigInt, etc.)     │
│  - Indirect Eval Runner (ECMAScript global semantics)  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Runtime Environment & Supported JavaScript Version

- **Target Standard:** ECMAScript 2024 (ES2024 / ES.Next).
- **Runtime Engines:**
  - **Browser Mode:** Native Web Worker (`window.Worker`) running on modern V8 (Chrome/Edge), SpiderMonkey (Firefox), or JavaScriptCore (Safari).
  - **Node.js / CI Test Mode:** `node:worker_threads` adapter via Vitest for headless automated regression testing.
- **Syntactic Features Supported:**
  - Modern syntax: `let`, `const`, `var`, destructuring, rest/spread, arrow functions, classes, private properties (`#field`), template literals, optional chaining (`?.`), nullish coalescing (`??`).
  - Asynchronous patterns: `async/await`, Promises, `queueMicrotask`, `setTimeout`, `setInterval`.
  - Collections and Data Types: `Map`, `Set`, `WeakMap`, `WeakSet`, `BigInt`, `Symbol`, `ArrayBuffer`, typed arrays.

---

## 3. Classic Script vs. Module Mode Semantics

### Classic Script Semantics (Default)
In standard browser classic scripts, `"use strict"` is only activated if it appears as the **first statement or directive prologue**.
For example:
```javascript
console.log("Starting app");
"use strict";
x = 100; // Evaluates in non-strict mode because console.log preceded the directive!
```
The LearnX engine executes code using an indirect global evaluation `(0, eval)(code)` rather than wrapping user code in a function with forced `"use strict";`. This ensures authentic classic script execution where undeclared assignments in non-strict mode follow ECMAScript specifications.

### Strict Script
When `"use strict";` is placed at the top of the user script:
```javascript
"use strict";
x = 100; // Correctly throws ReferenceError: x is not defined
```

---

## 4. Asynchronous Execution Policy & Completion Semantics

### The Asynchronous Output Capture Bug (Root Cause)
In legacy online compilers, the runner wraps execution in a synchronous function and immediately terminates the worker or finalizes logs upon return. As a result, code such as:
```javascript
console.log(1);
setTimeout(() => console.log(2), 100);
console.log(3);
```
printed `1` and `3`, but lost `2` because the worker was destroyed before the timer fired.

### Event-Loop Tracking Solution
LearnX tracks the asynchronous lifecycle via an active macro-task registry:
1. **Timer Interception:** `setTimeout`, `clearTimeout`, `setInterval`, and `clearInterval` are wrapped.
2. **Active Callback Counter:** Every scheduled `setTimeout` increments the pending task counter. When the callback fires or is cleared, the counter decrements.
3. **Session Liveness:** When synchronous execution finishes, the worker drains all microtasks (`queueMicrotask`, `Promise.resolve().then(...)`).
4. **Completion Detection:** If pending timers remain, the worker remains alive, streaming console events immediately to the UI as callbacks fire.
5. **Settlement:** Once all pending timers settle and no active intervals or microtasks remain, an `execution_completed` event is emitted.

---

## 5. Console Capture Design & Structured Serialization

LearnX implements a comprehensive console bridge intercepting:
- `console.log`, `console.info`, `console.debug`, `console.warn`, `console.error`
- `console.table`: Formats arrays of objects and tabular structures
- `console.dir`: Inspectable tree representation
- `console.time`, `console.timeLog`, `console.timeEnd`: High-resolution microsecond profiling
- `console.count`, `console.countReset`: Label tracking
- `console.assert`: Assertion verification with stack trace on failure
- `console.group`, `console.groupCollapsed`, `console.groupEnd`
- `console.clear`

### Fault-Tolerant Serializer (`serializer.ts`)
Standard `JSON.stringify` throws on circular references and `BigInt` values (`TypeError: Do not know how to serialize a BigInt`). LearnX's serializer handles:
- **Circular References:** Detects cycles via a `WeakSet` visited tracker and serializes cyclical keys as `[Circular]`.
- **BigInt Support:** Serializes BigInt values as readable strings (e.g., `12345678901234567890n`).
- **Special Values:** Explicitly maps `undefined`, `NaN`, `Infinity`, `-Infinity`, and `-0`.
- **Complex Objects:** Serializes `Error` objects with `.name`, `.message`, and `.stack`; `Map` entries; `Set` values; and function signatures.
- **Depth & Size Limits:** Limits inspection depth (default: 5 levels) to prevent memory exhaustion on giant data structures.

---

## 6. Supervisor Watchdog & Resource Protection

### Infinite Loop Protection (`while (true) {}`)
User code executing an infinite synchronous loop will starve the worker's JavaScript thread, preventing internal `setTimeout` handlers from running.

LearnX deploys an **Independent Main-Thread Watchdog Supervisor**:
- Runs in the host browser thread completely decoupled from the Web Worker.
- Configurable timeout (default: 10,000ms for playground, 2,000ms for short challenges, 500ms for unit tests).
- If the worker does not report completion within the timeout window, the supervisor invokes `worker.terminate()`.
- Dispatches an `execution_timeout` event with actionable diagnostic feedback:
  ```text
  Execution timed out (10.0s limit reached). Terminated to prevent application freeze (infinite loop detected).
  ```

### Manual Stop / Cancellation
- Users can click **Stop** at any moment while code is running.
- Instantly terminates the worker, cancels active timers, cleans up resources, and dispatches `execution_cancelled`.

### Output Flooding Throttling
- Maximum log limit (default: 1,000 log events per execution session).
- Prevents intervals like `setInterval(() => console.log('flood'), 1)` from crashing the browser DOM or filling memory.
- Emits `execution_resource_limit` when breached.

---

## 7. Security Model & Sandboxing

### Multi-Layer Security Architecture
1. **Isolated Worker Execution:** User code runs inside a dedicated Web Worker, without direct access to:
   - `window.document` or DOM tree (prevents cross-site scripting and DOM defacement)
   - `window.localStorage` / `sessionStorage`
   - `window.parent` / `top` frame navigation
   - Authentication tokens or LearnX state
2. **Session Isolation:**
   - Every execution receives a cryptographic/monotonic execution ID (`exec_${Date.now()}_${counter}`).
   - Outdated messages from cancelled or previous runs are dropped by the supervisor.
   - Workers are terminated cleanly between non-REPL runs.
3. **Network Restrictions:**
   - Worker execution operates without privileged internal fetch endpoints.
   - Standard browser CORS policies restrict unauthenticated cross-origin requests.

### Remaining Boundaries & Security Advice
- Web Workers run on the same origin as the application unless hosted on a dedicated sandbox domain (e.g. `sandbox.learnx.dev`).
- In environments where untrusted user code must be run across multi-tenant servers, server-side sandboxing (such as gVisor, Firecracker microVMs, or isolated Docker containers) is recommended.

---

## 8. Test Commands & Quality Gates

Run the test suite:
```bash
npm test
```

Run test suite in watch mode:
```bash
npx vitest
```

Run production build and type-checking:
```bash
npm run build
```

### Adding a New Regression Test
Add test cases to `tests/runtime.test.ts`:
```typescript
it('Test X: should verify custom asynchronous pattern', async () => {
  const result = await runCode(`
    console.log("Start");
    queueMicrotask(() => console.log("Microtask"));
    console.log("End");
  `);
  expect(result.logs.map(l => l.text)).toEqual(["Start", "End", "Microtask"]);
  expect(result.status).toBe('completed');
});
```
