# Day 57 — Event Loop Deep Dive & libuv Architecture — Detailed Theory

Welcome to **Day 57** of the JavaScript Mastery curriculum. While browsers implement the HTML5 Event Loop specification, **Node.js** implements its event loop via **libuv**—a multi-platform C library providing asynchronous I/O primitives.

This guide provides an exhaustive theoretical foundation covering the 6 Phases of the Node.js Event Loop, `process.nextTick()` queue priority, `setImmediate()` vs `setTimeout(0)`, and the **libuv C++ Worker Thread Pool**.

---

## 1. Node.js Event Loop vs. Browser Event Loop

```
Browser Event Loop                             Node.js Event Loop (libuv)
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│ Single Macrotask Queue          │           │ 6 Phase Queues (Timers, Poll,   │
│ Single Microtask Queue          │           │ Check, Close, Pending...)       │
│ Render / Repaint Pass           │           │ process.nextTick() Priority     │
└─────────────────────────────────┘           └─────────────────────────────────┘
```

---

## 2. The 6 Phases of the Node.js libuv Event Loop

The libuv Event Loop cycles through six distinct phases in sequence. Each phase maintains its own FIFO queue of callbacks:

```
   ┌───────────────────────────┐
┌─►│          Timers           │ ◄─── setTimeout(), setInterval()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     Pending Callbacks     │ ◄─── Deferred I/O callbacks (TCP errors)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       Idle, Prepare       │ ◄─── Internal Node system usage
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           Poll            │ ◄─── Fetch new I/O events (fs, net, http)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           Check           │ ◄─── setImmediate()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──│      Close Callbacks      │ ◄─── socket.on('close', ...)
   └───────────────────────────┘
```

### Phase Details

1. **Timers Phase**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
2. **Pending Callbacks Phase**: Executes I/O callbacks deferred from the previous loop iteration (e.g. TCP errors).
3. **Idle, Prepare Phase**: Used internally by Node.js for engine state synchronization.
4. **Poll Phase**: Retrieves new I/O events (Reading files, network requests, incoming HTTP connections). **Node will pause/block here** waiting for I/O if no timers are due!
5. **Check Phase**: Executes callbacks scheduled specifically by **`setImmediate()`**.
6. **Close Callbacks Phase**: Executes close event handlers (e.g. `socket.on('close', ...)`).

---

## 3. Node.js Priority Queue Hierarchy

Node.js manages two special microtask queues that execute **BETWEEN every phase transition** of the libuv Event Loop:

```
[ Call Stack Empty ]
        │
        ▼
┌───────────────────────────────┐
│    process.nextTick() Queue   │ ◄─── HIGHEST PRIORITY (Executes FIRST!)
└───────────────┬───────────────┘
                │ (Flush ALL nextTick jobs)
                ▼
┌───────────────────────────────┐
│  Standard Microtask Queue     │ ◄─── Promises, queueMicrotask()
└───────────────┬───────────────┘
                │ (Flush ALL Microtasks)
                ▼
┌───────────────────────────────┐
│     Next Event Loop Phase     │ ◄─── Timers, Poll, Check, etc.
└───────────────────────────────┘
```

> [!IMPORTANT]
> **`process.nextTick()` Priority**: `process.nextTick()` is NOT part of the libuv Event Loop phases. It belongs to Node's internal microtask queue and executes **BEFORE any Promise microtasks** and **BEFORE the Event Loop proceeds to the next phase**!

```javascript
setTimeout(() => console.log("1. setTimeout (Timers Phase)"), 0);
setImmediate(() => console.log("2. setImmediate (Check Phase)"));

Promise.resolve().then(() => console.log("3. Promise Microtask"));

process.nextTick(() => console.log("4. process.nextTick()"));

// Output Order in Node.js:
// 4. process.nextTick()       <-- HIGHEST PRIORITY!
// 3. Promise Microtask        <-- Standard Microtask
// 1. setTimeout               <-- Timers Phase
// 2. setImmediate             <-- Check Phase
```

---

## 4. `setImmediate()` vs. `setTimeout(fn, 0)`

* **`setImmediate(fn)`**: Designed to execute a script once the current **Poll Phase** completes (during the **Check Phase**).
* **`setTimeout(fn, 0)`**: Designed to execute after a minimum 1ms timer threshold during the **Timers Phase**.

### The I/O Context Guarantee
When called inside an **I/O callback** (like `fs.readFile`), **`setImmediate()` is GUARANTEED to execute BEFORE `setTimeout(fn, 0)`**:

```javascript
const fs = require("fs");

fs.readFile(__filename, () => {
  // Inside Poll Phase:
  setTimeout(() => console.log("setTimeout"), 0);
  setImmediate(() => console.log("setImmediate"));

  // Output:
  // "setImmediate" ALWAYS FIRST! (Because Check Phase follows Poll Phase immediately!)
  // "setTimeout" SECOND! (Timers Phase must wait for next loop iteration!)
});
```

---

## 5. The libuv C++ Worker Thread Pool

JavaScript is single-threaded, but Node.js uses **libuv's C++ Thread Pool** to execute expensive asynchronous tasks concurrently in background OS threads!

```
[ JS Main Thread ] ──► Async fs.readFile() ──► [ libuv C++ Thread Pool (4 Workers) ]
        │                                                     │ (Thread 1 processes disk read)
        ▼ (Main thread stays free!)                           ▼
 (Handles incoming web requests)                       [ Emits Poll Event back to Main Thread ]
```

### Tasks Offloaded to libuv Thread Pool:
1. **File System Operations** (`fs.readFile`, `fs.writeFile`).
2. **Cryptography Functions** (`crypto.pbkdf2`, `crypto.randomBytes`).
3. **Compression Libraries** (`zlib`).
4. **DNS Resolution Lookups** (`dns.lookup`).

> [!NOTE]
> Network I/O (like HTTP requests or TCP sockets) does **NOT use the thread pool**. Network sockets use native OS non-blocking primitives (`epoll` on Linux, `kqueue` on macOS, `IOCP` on Windows).

#### Controlling Thread Pool Size
Change the thread pool size via environment variable (default is 4 threads, max 1024):
```bash
UV_THREADPOOL_SIZE=8 node app.js
```

---

## 6. Minor Points, Quirks & Traps

### 1. `process.nextTick()` Starvation
Recursively calling `process.nextTick()` causes **Infinite NextTick Starvation**, completely blocking the libuv Event Loop from ever reaching the Poll phase or handling I/O!

---

## 7. Senior Interview Questions & Answers

### Q1: Compare the execution order of `process.nextTick()`, `Promise.then()`, `setTimeout(fn, 0)`, and `setImmediate()` in Node.js.
* **Answer**: In Node.js, `process.nextTick()` has the highest priority and executes immediately when the current synchronous operation finishes, preceding all other microtasks. `Promise.then()` callbacks are standard microtasks executing directly after all `nextTick` callbacks are flushed. `setTimeout(fn, 0)` executes during the Timers phase of the libuv event loop. `setImmediate()` executes during the Check phase of the libuv event loop. Inside an active I/O callback (Poll phase), `setImmediate()` is guaranteed to execute before `setTimeout(fn, 0)`.

### Q2: Which operations in Node.js use the libuv thread pool, and which operations use native OS non-blocking primitives?
* **Answer**: Heavy asynchronous tasks such as File System operations (`fs`), Crypto computations (`crypto`), Zlib compression (`zlib`), and `dns.lookup` are offloaded to the **libuv C++ Thread Pool** (default 4 threads). Network socket operations (HTTP requests, TCP/UDP sockets, `dns.resolve`) do NOT use the thread pool; they leverage native OS non-blocking I/O multiplexing primitives (`epoll` on Linux, `kqueue` on macOS, `IOCP` on Windows).

---

## 8. Summary & Key Takeaways

1. **6 Phases**: Timers -> Pending Callbacks -> Idle/Prepare -> Poll -> Check -> Close Callbacks.
2. **`process.nextTick`**: Executes before all other microtasks and phase transitions.
3. **`setImmediate`**: Executes in the Check phase (guaranteed before `setTimeout(0)` inside I/O callbacks).
4. **libuv Thread Pool**: 4 C++ worker threads handle disk file I/O, crypto, and zlib tasks.
5. **Network I/O**: Network sockets use native OS non-blocking kernel primitives (`epoll`/`kqueue`).
