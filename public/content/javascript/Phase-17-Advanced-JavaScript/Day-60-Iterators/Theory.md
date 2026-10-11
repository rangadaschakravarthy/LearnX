# Day 60 — Iterators & The Iterable Protocol — Detailed Theory

Welcome to **Day 60** of the JavaScript Mastery curriculum. Introduced in ES6 (ES2015), the **Iterable Protocol** and **Iterator Protocol** unified iteration mechanics across JavaScript data structures.

This guide provides an exhaustive theoretical foundation covering `Symbol.iterator`, the Iterator Result Object (`{ value, done }`), Custom Iterables, Infinite Iterators, and the `for...of` consumer loop.

---

## 1. The Two Iteration Protocols

Before ES6, arrays used indexed `for` loops, objects used `for...in`, and strings used manual index pointers. ES6 standardized data traversal using two protocols:

```
[ Iterable Object ] ──► Has [Symbol.iterator]() method ──► Returns [ Iterator Object ]
                                                                      │
                                                            Calls .next() repeatedly
                                                                      │
                                                                      ▼
                                                            Returns { value, done }
```

### 1.1 The Iterable Protocol
An object is **Iterable** if it implements a method with the key **`Symbol.iterator`** that returns an Iterator object.

### 1.2 The Iterator Protocol
An object is an **Iterator** if it implements a **`.next()`** method returning an **IteratorResult** object containing:
* `value`: The current iteration value (any type).
* `done`: A boolean (`false` while iterating, `true` when finished).

---

## 2. Built-In Iterables vs Non-Iterables

```javascript
// Built-in Iterables (Implement Symbol.iterator by default):
// Array, String, Map, Set, TypedArray, NodeList, arguments

const str = "Hi";
const iterator = str[Symbol.iterator]();

console.log(iterator.next()); // { value: "H", done: false }
console.log(iterator.next()); // { value: "i", done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// Plain Objects are NOT Iterable by default!
const obj = { a: 1, b: 2 };
// for (const val of obj) {} // TypeError: obj is not iterable!
```

---

## 3. Creating Custom Iterable Objects

To make a custom object or class iterable, implement the `[Symbol.iterator]` method:

```javascript
// Custom Range Iterable Object: 1 to 5
const range = {
  from: 1,
  to: 5,

  // 1. Implement Symbol.iterator method
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;

    // 2. Return Iterator Object with .next() method
    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

// Consuming custom iterable with for...of loop:
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Spread operator works on ANY custom iterable!
console.log([...range]); // [1, 2, 3, 4, 5]
```

---

## 4. Infinite Sequence Iterators

Iterators do not require fixed size limits. They can yield infinite values lazily:

```javascript
function createFibonacciIterator() {
  let prev = 0;
  let curr = 1;

  return {
    [Symbol.iterator]() { return this; },
    next() {
      const value = prev;
      [prev, curr] = [curr, prev + curr];
      return { value, done: false }; // Never returns done: true!
    }
  };
}

const fib = createFibonacciIterator();

for (const n of fib) {
  console.log(n); // 0, 1, 1, 2, 3, 5, 8...
  if (n > 20) break; // Must break manually!
}
```

---

## 5. Minor Points, Quirks & Traps

### 1. `for...of` vs `for...in`
* `for...in`: Iterates over **enumerable string keys** of an object (including inherited prototype keys).
* `for...of`: Iterates over **values** produced by an iterable's `[Symbol.iterator]()`.

---

## 6. Senior Interview Questions & Answers

### Q1: What is the exact specification requirement for an object to be consumed by `for...of` or the spread operator `[...obj]`?
* **Answer**: The object must implement the **Iterable Protocol**. This means it must have a property key matching the well-known symbol `Symbol.iterator`, whose value is a zero-argument function returning a valid **Iterator Object**. The Iterator Object must feature a `.next()` method that returns an **IteratorResult** object containing `{ value: any, done: boolean }`.

---

## 7. Summary & Key Takeaways

1. **Iterable Protocol**: Objects implementing `[Symbol.iterator]()` returning an iterator.
2. **Iterator Protocol**: Objects implementing `.next()` returning `{ value, done }`.
3. **Consumers**: `for...of`, spread operator `[...]`, `Array.from()`, `yield*`, and destructuring consume iterables.
4. **Custom Iterables**: Attach `[Symbol.iterator]()` to make any custom class or object iterable.
