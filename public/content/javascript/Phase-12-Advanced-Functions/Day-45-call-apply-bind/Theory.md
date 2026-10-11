# Day 45 — Explicit Binding (`call`, `apply`, `bind`) — Detailed Theory

Welcome to **Day 45** of the JavaScript Mastery curriculum. While implicit `this` binding depends on method call syntax (`obj.method()`), JavaScript provides three explicit reflection methods on `Function.prototype`: **`call()`**, **`apply()`**, and **`bind()`**.

This guide provides an exhaustive theoretical foundation covering explicit context binding, Function Borrowing, Partial Application, Polyfilling `bind()`, and `thisArg` coercions.

---

## 1. Overview of Explicit Binding APIs

All functions in JavaScript inherit from `Function.prototype`, giving them access to `.call()`, `.apply()`, and `.bind()`:

```
                          ┌─────────────────────────────┐
                          │   Explicit Binding APIs     │
                          └──────────────┬──────────────┘
                                         │
     ┌───────────────────────────────────┼───────────────────────────────────┐
     ▼                                   ▼                                   ▼
call(thisArg, arg1, arg2...)        apply(thisArg, [argsArray])          bind(thisArg, arg1...)
- Executes IMMEDIATELY              - Executes IMMEDIATELY              - Returns NEW Bound Function
- Comma-separated arguments         - Array of arguments                - Deferred Execution
```

### Complete API Comparison Matrix

| Method | Execution Timing | Argument Format | Return Value | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **`call()`** | **Immediate** | Comma-separated positional list (`a, b, c`) | Result of target function | Method borrowing, explicit invocation |
| **`apply()`** | **Immediate** | **Array / Array-like** (`[a, b, c]`) | Result of target function | Spreading arrays into parameters |
| **`bind()`** | **Deferred** | Comma-separated positional list (`a, b, c`) | **New Bound Function** | Locking `this` context, Partial Application |

---

## 2. `call()`: Immediate Invocation with Individual Arguments

`func.call(thisArg, arg1, arg2, ...)` invokes `func` immediately, setting its internal `this` context to `thisArg`.

```javascript
function updateProfile(email, role) {
  this.email = email;
  this.role = role;
  console.log(`Updated ${this.username}: ${this.email} (${this.role})`);
}

const user = { username: "Alice" };

// Explicitly invoke updateProfile with 'user' as 'this'
updateProfile.call(user, "alice@example.com", "Admin");
// Logs: "Updated Alice: alice@example.com (Admin)"

console.log(user.email); // "alice@example.com"
```

---

## 3. `apply()`: Immediate Invocation with Argument Arrays

`func.apply(thisArg, [argsArray])` behaves identically to `.call()`, except arguments are supplied as a single Array or Array-like object:

```javascript
const numbers = [45, 12, 89, 3, 67];

// Spreading array elements as positional arguments to Math.max via apply()
const maxVal = Math.max.apply(null, numbers); // Equivalent to Math.max(45, 12, 89, 3, 67)
console.log(maxVal); // 89

// Note: Modern ES6 Spread syntax (Math.max(...numbers)) is now preferred!
```

---

## 4. `bind()`: Deferred Execution & Hard Binding

Unlike `call()` and `apply()`, `func.bind(thisArg, ...boundArgs)` does **NOT execute the function immediately**. It creates and returns a new **Bound Function** instance whose `this` context is permanently locked to `thisArg`.

```javascript
const module = {
  x: 42,
  getX() {
    return this.x;
  }
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // undefined (Lost 'this' context!)

// Hard-bind module.getX to 'module'
const boundGetX = module.getX.bind(module);
console.log(boundGetX()); // 42 (Guaranteed 'this' context!)
```

---

### 4.1 Partial Application via `bind()`

`bind()` can also pre-bind initial positional arguments (Partial Application):

```javascript
function multiply(a, b) {
  return a * b;
}

// Pre-bind 'a = 2' using bind()
const double = multiply.bind(null, 2);

console.log(double(5));  // 10 (2 * 5)
console.log(double(10)); // 20 (2 * 10)
```

---

## 5. Function Borrowing Pattern

**Function Borrowing** is an architectural pattern where an object borrows a method from another object or prototype without inheriting it:

```javascript
// Borrowing Array.prototype methods for Array-like objects
function processArguments() {
  // 'arguments' is array-like, but lacks .map()
  // Borrow Array.prototype.map via call():
  const upperArgs = Array.prototype.map.call(arguments, arg => String(arg).toUpperCase());
  return upperArgs;
}

console.log(processArguments("hello", "world")); // ["HELLO", "WORLD"]
```

---

## 6. Polyfilling `Function.prototype.bind`

Writing a custom polyfill for `bind()` is a classic senior interview challenge:

```javascript
Function.prototype.myBind = function(thisArg, ...boundArgs) {
  const targetFunction = this;

  if (typeof targetFunction !== "function") {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }

  return function(...invokedArgs) {
    // Combine bound args with new args passed at invocation time
    return targetFunction.apply(thisArg, boundArgs.concat(invokedArgs));
  };
};

// Test Polyfill
const car = { brand: "Tesla" };
function getBrand(model, color) {
  return `${this.brand} ${model} (${color})`;
}

const getTesla = getBrand.myBind(car, "Model 3");
console.log(getTesla("Red")); // "Tesla Model 3 (Red)"
```

---

## 7. Minor Points, Quirks & Traps

### 1. Passing `null` or `undefined` as `thisArg`
* **Non-Strict Mode**: Passing `null` or `undefined` as `thisArg` to `call()`, `apply()`, or `bind()` coerces `this` to the **Global Object** (`window`/`global`).
* **Strict Mode (`"use strict"`)**: `this` remains exactly `null` or `undefined` without coercion!

```javascript
function checkThis() {
  console.log(this);
}

checkThis.call(null); // Logs 'window' (Non-strict mode)

function checkThisStrict() {
  "use strict";
  console.log(this);
}

checkThisStrict.call(null); // Logs 'null'! (Strict mode)
```

---

## 8. Senior Interview Questions & Answers

### Q1: Compare `call()`, `apply()`, and `bind()`.
* **Answer**: `call()` and `apply()` both execute the target function immediately with a specified `thisArg`. The difference is that `call()` accepts arguments as a comma-separated list (`fn.call(ctx, a, b)`), while `apply()` accepts arguments as an array (`fn.apply(ctx, [a, b])`). `bind()` does not execute the function immediately; instead, it returns a new bound function with `thisArg` (and optional pre-bound arguments) permanently locked for future invocations.

### Q2: Write a polyfill for `Function.prototype.bind`.
* **Answer**:
  ```javascript
  Function.prototype.myBind = function(context, ...boundArgs) {
    const fn = this;
    return function(...args) {
      return fn.apply(context, [...boundArgs, ...args]);
    };
  };
  ```

---

## 9. Summary & Key Takeaways

1. **`call` vs `apply`**: Both invoke immediately; `call` takes comma-separated args, `apply` takes an args array.
2. **`bind`**: Returns a new hard-bound function for deferred execution.
3. **Function Borrowing**: Borrow methods (`Array.prototype.slice.call(arrayLike)`) to run methods on incompatible types.
4. **Partial Application**: Use `bind()` to pre-fill initial parameters for reusable function specialization.
5. **Strict Mode Coercion**: Strict mode preserves `null`/`undefined` as `thisArg` without global object coercion.
