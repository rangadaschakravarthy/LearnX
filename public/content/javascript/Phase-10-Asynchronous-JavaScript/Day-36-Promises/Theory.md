# Day 36 — Promises & State Machine Mechanics — Detailed Theory

Welcome to **Day 36** of the JavaScript Mastery curriculum. Introduced in ES6 (ES2015), **Promises** revolutionized asynchronous JavaScript by replacing raw callbacks with a trusted, standardized **State Machine Object** representing the eventual completion (or failure) of an asynchronous operation.

This guide provides an exhaustive theoretical foundation covering Promise state transitions, Executor functions, Promise Chaining (`.then`, `.catch`, `.finally`), Value Resolution Rules, and Unhandled Rejection monitoring.

---

## 1. What is a Promise? (First Principles)

A **Promise** is a proxy placeholder object for a value that is not necessarily known when the promise is created.

Instead of passing a callback function into a 3rd-party library function (Inversion of Control), an asynchronous operation immediately **returns a Promise object to YOU**. You then attach callbacks to that Promise object using `.then()` and `.catch()`.

```
                    ┌─────────────────────────┐
                    │     Pending State       │
                    └────────────┬────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       ┌───────────────────┐           ┌───────────────────┐
       │  Fulfilled State  │           │  Rejected State   │
       │  (Result Value)   │           │ (Rejection Reason)│
       └───────────────────┘           └───────────────────┘
```

---

## 2. The 3 Immutable States of a Promise

A Promise exists in one of three mutually exclusive states:

| State | Meaning | Transition Allowed? |
| :--- | :--- | :--- |
| **`pending`** | Initial state. Asynchronous operation is still executing in Web API. | Can transition to **`fulfilled`** or **`rejected`**. |
| **`fulfilled`** | Asynchronous operation succeeded. Result value is established. | **Settled (Immutable)**. State can NEVER change again. |
| **`rejected`** | Asynchronous operation failed. Rejection reason/error is established. | **Settled (Immutable)**. State can NEVER change again. |

> [!IMPORTANT]
> **State Transition Immutability**: Once a Promise transitions from `pending` to either `fulfilled` or `rejected`, it is **settled**. Calling `resolve()` or `reject()` multiple times or calling `reject()` after `resolve()` has zero effect—the state and payload are permanently locked!

```javascript
const promise = new Promise((resolve, reject) => {
  resolve("First Success"); // Transitions to 'fulfilled'
  resolve("Second Success"); // IGNORED!
  reject(new Error("Failed")); // IGNORED!
});

promise.then(res => console.log(res)); // Logs "First Success"
```

---

## 3. Creating Promises: Executor Function Mechanics

A Promise is instantiated using the `new Promise()` constructor, which accepts an **Executor Function** with two function parameters: `(resolve, reject)`.

```javascript
function fetchProductData(productId) {
  return new Promise((resolve, reject) => {
    // 1. The Executor Function runs SYNCHRONOUSLY!
    if (!productId) {
      // Transition to 'rejected'
      return reject(new TypeError("Product ID is required"));
    }

    // 2. Delegate async operation to Web API
    setTimeout(() => {
      const db = { 101: { name: "Laptop", price: 999 } };
      const product = db[productId];

      if (product) {
        resolve(product); // Transition to 'fulfilled'
      } else {
        reject(new Error(`Product ${productId} not found`)); // Transition to 'rejected'
      }
    }, 1000);
  });
}
```

---

## 4. Promise Chaining: `.then()`, `.catch()`, and `.finally()`

### 4.1 `.then(onFulfilled, onRejected)`
Attaches fulfillment and rejection handlers to the promise. 

> **Crucial Rule**: Calling `.then()` **ALWAYS returns a BRAND NEW Promise instance**. This is what enables Promise Chaining!

```javascript
fetchProductData(101)
  .then(product => {
    console.log("Product:", product.name);
    return product.price * 0.9; // Returning a value passes it to the NEXT .then()!
  })
  .then(discountedPrice => {
    console.log("Discounted Price:", discountedPrice); // 899.1
  })
  .catch(err => {
    console.error("Error encountered in chain:", err.message);
  })
  .finally(() => {
    console.log("Cleanup pass complete (Always runs regardless of success/error)");
  });
```

---

### 4.2 Return Value Resolution Rules inside `.then()`

Whatever you `return` inside a `.then()` callback dictates how the new returned Promise resolves:

```javascript
Promise.resolve(10)
  // Case 1: Returning a Primitive Value -> Wraps in fulfilled Promise
  .then(val => val * 2) // Returns 20 -> resolves next .then(20)

  // Case 2: Returning a NEW Promise -> Adopts state of the returned Promise!
  .then(val => {
    return new Promise(resolve => setTimeout(() => resolve(val + 5), 1000));
  }) // Waits 1s -> resolves next .then(25)

  // Case 3: Throwing an Error -> Immediately rejects next .catch()!
  .then(val => {
    if (val > 20) throw new Error("Value too high!");
    return val;
  })
  
  .catch(err => console.error("Caught:", err.message)); // "Caught: Value too high!"
```

---

### 4.3 `.catch()` and Recovery Mechanics

An error thrown anywhere in a Promise chain bubbles down the chain until it hits the first `.catch()` block:

```javascript
fetchProductData(999) // Invalid ID -> Rejects
  .then(data => data.name) // SKIPPED!
  .then(name => name.toUpperCase()) // SKIPPED!
  .catch(err => {
    console.error("Caught:", err.message);
    return "Fallback Default Product"; // RECOVERS from error by returning fallback value!
  })
  .then(fallbackName => {
    console.log("Resumed Chain:", fallbackName); // Executed! Logs "Resumed Chain: Fallback Default Product"
  });
```

---

## 5. Unhandled Promise Rejections

If a Promise is rejected and no `.catch()` handler is attached anywhere in the chain, the browser or Node.js environment emits an **Unhandled Rejection Event**:

```javascript
// Browser Unhandled Rejection Monitoring
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled Rejection Detected!");
  console.error("Reason:", event.reason);
  event.preventDefault(); // Prevents default browser console error printing
});

// Node.js Unhandled Rejection Monitoring
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
```

---

## 6. Minor Points, Quirks & Traps

### 1. The Broken Chain Trap (Forgetting `return`)
Inside a `.then()` chain, if you invoke an asynchronous function returning a Promise but **forget to `return` it**, the chain does not wait for it!

```javascript
// BROKEN: Forgotten 'return' breaks async sequential execution!
fetchUser(101)
  .then(user => {
    fetchUserOrders(user.id); // Missing 'return'! Chain moves to next .then() instantly!
  })
  .then(orders => {
    console.log(orders); // undefined! (Did not wait for fetchUserOrders!)
  });

// CORRECT:
fetchUser(101)
  .then(user => {
    return fetchUserOrders(user.id); // Returned! Chain waits for promise to settle!
  })
  .then(orders => console.log(orders)); // Array of orders
```

---

## 7. Senior Interview Questions & Answers

### Q1: Why does calling `.then()` always return a new Promise rather than modifying the original Promise?
* **Answer**: Promises are designed as immutable state machines. Once a Promise is settled (`fulfilled` or `rejected`), its internal state and value can never be modified. Returning a brand new Promise instance from `.then()` preserves the immutability of the original Promise and enables flexible, branching Promise chains where multiple consumers can attach separate `.then()` handlers to the same parent Promise without side effects.

### Q2: What happens if a `.then()` callback returns a rejected Promise?
* **Answer**: If a `.then()` callback returns a rejected Promise (e.g. `return Promise.reject(new Error("Failed"))`), the outer Promise returned by `.then()` adopts that rejected state and value. Execution skips any subsequent `.then()` fulfillment callbacks and bubbles directly down to the nearest `.catch()` rejection handler.

---

## 8. Summary & Key Takeaways

1. **State Machine**: 3 states (`pending`, `fulfilled`, `rejected`). State transitions are permanent and immutable once settled.
2. **Synchronous Executor**: Code inside `new Promise((resolve, reject) => ...)` executes synchronously upon instantiation.
3. **Promise Chaining**: Calling `.then()` returns a NEW Promise instance. Always `return` promises or values inside `.then()`.
4. **Error Propagation**: Errors bubble down chains to the nearest `.catch()`. Returning a fallback value inside `.catch()` recovers the chain.
5. **Microtask Queue**: Promise resolution callbacks (`.then`/`.catch`/`.finally`) execute as high-priority Microtasks.
