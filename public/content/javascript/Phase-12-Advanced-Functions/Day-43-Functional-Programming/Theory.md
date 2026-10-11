# Day 43 — Functional Programming Principles & Currying — Detailed Theory

Welcome to **Day 43** of the JavaScript Mastery curriculum. **Functional Programming (FP)** is a programming paradigm where software is constructed by composing **Pure Functions**, avoiding shared state, mutable data, and side effects.

This guide provides an exhaustive theoretical foundation covering Pure Functions, Referential Transparency, Side-Effect Elimination, **Currying**, **Partial Application**, and Immutability.

---

## 1. The Core Pillars of Functional Programming

Functional Programming treats computation as the evaluation of mathematical functions:

```
                          ┌─────────────────────────────┐
                          │   Functional Programming    │
                          └──────────────┬──────────────┘
                                         │
     ┌──────────────────┬────────────────┴────────────────┬──────────────────┐
     ▼                  ▼                                 ▼                  ▼
 Pure Functions    Referential Transparency        Immutability        First-Class HOFs
 (Zero Side-Effects)(Replaceable with Result)    (No In-Place Mutation)(Functions as Values)
```

---

## 2. Pure Functions & Referential Transparency

### 2.1 What is a Pure Function?

A function is **Pure** if and only if it satisfies two strict mathematical criteria:
1. **Deterministic Output**: For a given set of input arguments, it ALWAYS returns the exact same output value.
2. **Zero Side Effects**: It does NOT modify any external state, variables, DOM nodes, files, or network streams.

```javascript
// 🔴 IMPURE FUNCTION (Depends on external mutable state & produces side-effect)
let taxRate = 0.08;

function calculateTotalImpure(subtotal) {
  taxRate = 0.10; // SIDE EFFECT: Mutates global variable!
  console.log("Calculated!"); // SIDE EFFECT: I/O console output!
  return subtotal * (1 + taxRate);
}

// 🟢 PURE FUNCTION (Deterministic, zero side-effects, depends ONLY on inputs)
function calculateTotalPure(subtotal, rate) {
  return subtotal * (1 + rate);
}

console.log(calculateTotalPure(100, 0.08)); // ALWAYS 108
```

---

### 2.2 Referential Transparency & The Substitution Principle

A function or expression is **Referentially Transparent** if it can be replaced with its evaluated result value without changing the program's behavior.

```javascript
// Referentially Transparent Expression:
const sum = (a, b) => a + b;

// Calling sum(5, 5) can be replaced anywhere in the program with the literal number 10:
const total1 = sum(5, 5) + 20; // 30
const total2 = 10 + 20;        // 30 (Identical behavior!)
```

---

## 3. What Constitutes a "Side Effect"?

A **Side Effect** is any change in system state or interaction with the outside world occurring outside the function's local execution scope.

### Common Side Effects in JavaScript
* Mutating global or outer scope variables.
* Mutating input object/array arguments in place (`arr.push()`, `obj.prop = val`).
* Performing I/O operations (`console.log`, `alert`).
* Making HTTP network requests (`fetch`).
* Querying non-deterministic APIs (`Math.random()`, `Date.now()`).
* Mutating the DOM or writing to `localStorage`.

---

## 4. Currying vs. Partial Application

### 4.1 Currying

**Currying** is the process of converting a function that takes multiple arguments $f(a, b, c)$ into a chain of nested functions that each take a **single argument**: $f(a)(b)(c)$.

```javascript
// Uncurried function: f(a, b, c)
function addUncurried(a, b, c) {
  return a + b + c;
}

// Curried function: f(a)(b)(c)
const addCurried = a => b => c => a + b + c;

console.log(addCurried(1)(2)(3)); // 6

// Reusable Curried Specialization:
const add10 = addCurried(10);     // Fixes 'a = 10' in closure
const add10And20 = add10(20);     // Fixes 'b = 20' in closure
console.log(add10And20(5));       // 35 (10 + 20 + 5)
```

---

### 4.2 Generic Auto-Currying Implementation

A production-grade auto-currying wrapper converts any standard multi-argument function into a curried function:

```javascript
function curry(fn) {
  return function curried(...args) {
    // If received arguments count >= target function's declared parameter length:
    if (args.length >= fn.length) {
      return fn.apply(this, args); // Execute original function
    } else {
      // Otherwise, return a new function that collects remaining arguments!
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// Usage:
function volume(length, width, height) {
  return length * width * height;
}

const curriedVolume = curry(volume);

console.log(curriedVolume(2, 3, 4));    // 24 (Executes immediately)
console.log(curriedVolume(2)(3)(4));    // 24 (Curried single argument chain)
console.log(curriedVolume(2, 3)(4));    // 24 (Partial arguments mixed)

const setLength2 = curriedVolume(2);
const setLength2Width3 = setLength2(3);
console.log(setLength2Width3(5));       // 30 (2 * 3 * 5)
```

---

### 4.3 Partial Application

**Partial Application** means binding a fixed subset of arguments to a function, producing a new function that accepts the *remaining* un-bound arguments.

```javascript
function sendEmail(from, to, subject, body) {
  return `From: ${from} | To: ${to} | Subject: ${subject} | Body: ${body}`;
}

// Partial Application: Fixing 'from' argument using bind()
const sendSystemEmail = sendEmail.bind(null, "no-reply@system.com");

// Later invocation supplying remaining arguments:
console.log(sendSystemEmail("user@app.com", "Welcome!", "Account created."));
```

---

## 5. Summary Matrix: Currying vs. Partial Application

| Feature | Currying | Partial Application |
| :--- | :--- | :--- |
| **Arity Transformation** | Transforms $N$-arity function into $N$ **1-arity (single parameter)** functions. | Pre-binds $K$ parameters, returning a function accepting remaining $(N-K)$ parameters. |
| **Invocation Style** | `f(a)(b)(c)` | `f_partial(b, c)` |
| **Primary Goal** | Function composition pipelines and complete parameter decoupling. | Fixing repetitive default arguments across call sites. |

---

## 6. Minor Points, Quirks & Traps

### 1. `fn.length` and Default Parameters in Auto-Currying
Auto-currying utilities rely on `fn.length` to detect declared parameters. Default parameters or rest parameters (`...args`) do NOT count toward `fn.length`, which can break auto-currying implementations if default arguments are used!

---

## 7. Senior Interview Questions & Answers

### Q1: What is a Pure Function, and why are Pure Functions easier to test and debug?
* **Answer**: A Pure Function is a function that is completely deterministic (given identical inputs, it always returns identical outputs) and produces zero side effects (it does not mutate external variables, objects, DOM, or perform I/O). Pure Functions are vastly easier to test and debug because they are completely isolated—they require no mock global states, database setups, or complex teardowns; unit tests simply supply input arguments and assert expected return values.

### Q2: What is the difference between Currying and Partial Application?
* **Answer**: **Currying** transforms a function expecting $N$ arguments into a strict chain of $N$ nested functions that each accept **exactly one single argument** (`f(a)(b)(c)`). **Partial Application** takes a function expecting $N$ arguments and pre-binds a subset of $K$ arguments, returning a new function that accepts all remaining $(N-K)$ arguments simultaneously (`f_partial(b, c)`).

---

## 8. Summary & Key Takeaways

1. **Pure Functions**: Must be deterministic and produce zero side-effects.
2. **Referential Transparency**: Expressions can be replaced with their evaluated values without altering program behavior.
3. **Currying**: Convert $f(a,b,c)$ into single-argument functions $f(a)(b)(c)$ using closure wrappers or `curry()`.
4. **Partial Application**: Pre-bind a subset of parameters using `.bind()` or closure helpers.
5. **Immutability**: Avoid in-place object/array mutations; always return new data structures.
