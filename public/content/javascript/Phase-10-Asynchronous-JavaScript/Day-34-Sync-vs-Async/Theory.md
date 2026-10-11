# Day 34 — Synchronous vs. Asynchronous JavaScript & Event Loop — Detailed Theory

Welcome to **Day 34** of the JavaScript Mastery curriculum. JavaScript is a **single-threaded, non-blocking, asynchronous concurrent programming language**. Understanding how JavaScript manages non-blocking I/O operations using a single thread requires mastering the **Event Loop**, **Call Stack**, **Microtask Queue**, and **Macrotask Queue**.

This guide provides an exhaustive theoretical foundation covering synchronous vs asynchronous execution, Event Loop architecture, Microtask vs Macrotask priority rules, and Microtask queue starvation.

---

## 1. Single-Threaded Non-Blocking Model

JavaScript executes code inside a **single main thread** (a single Call Stack). It can execute only one piece of instructions at a time.

```
Synchronous Execution (Blocking)
[ Task A (5s) ] ──► [ Task B (2s) ] ──► [ Task C (1s) ]  Total: 8 seconds (User UI freezes for 5s!)

Asynchronous Non-Blocking Execution
[ Start Task A ] ──► [ Start Task B ] ──► [ Task C (1s) ]
       │                    │
       ▼ (Runs in Web API)  ▼ (Runs in Web API)
  [ Task A Done ]      [ Task B Done ]                   Total: Non-blocking UI!
```

* **Synchronous (Sync)**: Instructions execute sequentially line-by-line. Each line must complete before the next line starts. Heavy calculations block the thread ("freeze the browser").
* **Asynchronous (Async)**: Long-running tasks (network requests, timers, file I/O) are delegated to the browser's background **Web APIs** or Node.js **libuv worker pool**. When finished, their callbacks are queued for execution without blocking the main Call Stack.

---

## 2. The Event Loop Architecture & Queue Hierarchy

The Event Loop is a continuous monitoring process in the JavaScript runtime engine.

```
                    ┌────────────────────────┐
                    │       Call Stack       │
                    └───────────┬────────────┘
                                │ (Empty?)
                                ▼
                    ┌────────────────────────┐
                    │    Check Microtasks    │ ◄─── Promises, queueMicrotask, MutationObserver
                    └───────────┬────────────┘
                                │ (Flush ALL Microtasks until empty)
                                ▼
                    ┌────────────────────────┐
                    │  Render / Repaint Pass │ (If frame deadline due)
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │    Check Macrotasks    │ ◄─── setTimeout, setInterval, I/O, events
                    └────────────────────────┘
```

### Component Definitions

1. **Call Stack**: LIFO (Last-In, First-Out) stack frame container executing current JavaScript code.
2. **Web APIs**: Multi-threaded C++ environment provided by the browser managing timers, HTTP fetch requests, DOM events, and IndexedDB.
3. **Microtask Queue (High Priority)**: Queue for `Promise.then/catch/finally`, `async/await` resumptions, `queueMicrotask()`, and `MutationObserver`.
4. **Macrotask Queue (Standard Priority)**: Queue for `setTimeout`, `setInterval`, `setImmediate` (Node), I/O events, and DOM events.

---

## 3. Microtask vs. Macrotask Queue Priority Algorithm

The Event Loop applies strict priority rules during every iteration cycle:

> **The Golden Event Loop Rule**:
> 1. Execute ONE Macrotask from the Macrotask Queue (or run initial top-level script).
> 2. Once Call Stack is empty, **FLUSH ALL Microtasks** in the Microtask Queue until the Microtask Queue is completely empty!
> 3. Perform DOM repaint / rendering pass (if needed).
> 4. Pick the NEXT Macrotask from the Macrotask Queue and repeat.

```javascript
console.log("1. Sync Main Start");

setTimeout(() => {
  console.log("4. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

console.log("2. Sync Main End");

// Output Order:
// 1. Sync Main Start
// 2. Sync Main End
// 3. Microtask (Promise)        <-- Microtasks execute BEFORE any macrotask!
// 4. Macrotask (setTimeout)
```

---

## 4. Microtask Queue Starvation

Because the Event Loop **flushes the ENTIRE Microtask Queue** before moving to rendering or Macrotasks, recursively enqueuing microtasks creates **Microtask Starvation**—freezing the UI and preventing timers and clicks from processing!

```javascript
// DANGEROUS MICROTASK STARVATION LOOP:
function infiniteMicrotask() {
  Promise.resolve().then(() => {
    // Re-enqueues another microtask continuously!
    infiniteMicrotask(); 
  });
}

// Calling infiniteMicrotask() will permanently starve the Macrotask Queue!
// Timers (setTimeout) and User Clicks will NEVER execute, freezing the browser window!
```

---

## 5. Explicit Microtask Scheduling: `queueMicrotask()`

ES2020 introduced `queueMicrotask(fn)` as a standard, explicit API to schedule a microtask without creating dummy Promise objects:

```javascript
console.log("A");

queueMicrotask(() => {
  console.log("B (Scheduled Microtask)");
});

console.log("C");

// Output: A -> C -> B
```

---

## 6. Complete Execution Output Prediction Trace

```javascript
console.log("1");

setTimeout(() => console.log("2 (Macrotask 1)"), 0);

Promise.resolve().then(() => {
  console.log("3 (Microtask 1)");
  setTimeout(() => console.log("4 (Macrotask 2 inside Microtask 1)"), 0);
});

Promise.resolve().then(() => {
  console.log("5 (Microtask 2)");
});

console.log("6");

/*
Execution Trace:
1. Sync Log "1"
2. setTimeout(2) -> Enqueues Macrotask 1
3. Promise.then(3) -> Enqueues Microtask 1
4. Promise.then(5) -> Enqueues Microtask 2
5. Sync Log "6"
--- Sync Stack Empty: Flush Microtask Queue ---
6. Execute Microtask 1 -> Logs "3", Enqueues Macrotask 2
7. Execute Microtask 2 -> Logs "5"
--- Microtask Queue Empty: Move to Macrotask Queue ---
8. Execute Macrotask 1 -> Logs "2"
9. Execute Macrotask 2 -> Logs "4"

Final Output: 1, 6, 3, 5, 2, 4
*/
```

---

## 7. Minor Points, Quirks & Traps

### 1. `Promise` Executor Function runs SYNCHRONOUSLY!
The function callback passed directly inside `new Promise((resolve, reject) => { ... })` is called the **Executor Function**. It executes **synchronously and immediately** when the Promise is created! Only `.then()`, `.catch()`, and `.finally()` callbacks are queued as microtasks.

```javascript
console.log("Before Promise");

new Promise((resolve) => {
  console.log("Inside Promise Executor (SYNCHRONOUS!)");
  resolve();
}).then(() => console.log("Inside Promise .then (MICROTASK)"));

console.log("After Promise");

// Output:
// "Before Promise"
// "Inside Promise Executor (SYNCHRONOUS!)"
// "After Promise"
// "Inside Promise .then (MICROTASK)"
```

---

## 8. Senior Interview Questions & Answers

### Q1: What is the exact difference between the Microtask Queue and the Macrotask Queue?
* **Answer**: The Microtask Queue handles high-priority asynchronous callbacks such as `Promise.then/catch/finally`, `queueMicrotask()`, and `MutationObserver`. The Macrotask Queue handles standard asynchronous tasks like `setTimeout`, `setInterval`, I/O, and user event callbacks. The Event Loop flushes the *entire* Microtask Queue until empty after every Call Stack turn before picking a single new Macrotask from the Macrotask Queue.

### Q2: Why does `Promise.resolve().then(...)` execute before `setTimeout(..., 0)`?
* **Answer**: `Promise.then(...)` places its callback into the Microtask Queue, while `setTimeout(..., 0)` places its callback into the Macrotask Queue. Under the Event Loop specification, once the main Call Stack becomes empty, the Event Loop must process all microtasks in the Microtask Queue before executing any macrotask from the Macrotask Queue.

---

## 9. Summary & Key Takeaways

1. **Single Thread**: JavaScript runs on a single main thread using non-blocking I/O delegation.
2. **Event Loop**: Monitors Call Stack and moves callbacks from queues when stack is empty.
3. **Queue Priorities**: Microtasks (`Promise`, `queueMicrotask`) have higher priority than Macrotasks (`setTimeout`).
4. **Microtask Flush**: The entire Microtask Queue is cleared before any new Macrotask or DOM repaint pass occurs.
5. **Executor Function**: Remember that code inside `new Promise((resolve) => { ... })` runs synchronously!
