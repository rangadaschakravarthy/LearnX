# Day 18 — Array Iteration & Functional Methods — Detailed Theory

Welcome to **Day 18** of the JavaScript Mastery curriculum. Iterating over arrays to transform, filter, aggregate, and inspect elements is at the heart of modern JavaScript application development.

This guide provides an exhaustive theoretical foundation covering Higher-Order Array Iterators (`forEach`, `map`, `filter`, `reduce`, `some`, `every`), iteration loop comparison, iterator objects (`entries`, `keys`, `values`), and performance/async traps.

---

## 1. Imperative vs. Declarative Iteration Paradigms

JavaScript supports two primary array iteration paradigms:

```javascript
const numbers = [1, 2, 3, 4, 5];

// 1. Imperative (for / for...of) - Focuses on HOW to iterate
const doubledImperative = [];
for (let i = 0; i < numbers.length; i++) {
  doubledImperative.push(numbers[i] * 2);
}

// 2. Declarative (map) - Focuses on WHAT outcome to produce
const doubledDeclarative = numbers.map(n => n * 2);
```

### Iteration Control Matrix

| Method | Returns | Can `break` / `continue`? | Handles `async`/`await` sequentially? | Skips Sparse Holes? |
| :--- | :--- | :--- | :--- | :--- |
| `for(let i=0..)` | N/A | **Yes** | **Yes** | No |
| `for...of` | N/A | **Yes** | **Yes** | No (yields `undefined`) |
| `forEach()` | `undefined` | **No** (Throws Exception required) | **No** (Fires concurrently) | **Yes** |
| `map()` | New Array | **No** | **No** | **Yes** |
| `filter()` | New Array | **No** | **No** | **Yes** |
| `reduce()` | Accumulated Value| **No** | **No** | **Yes** |

---

## 2. Core Functional Iteration Methods

### 2.1 `forEach()`: Side-Effects Only

`forEach(callback(element, index, array), thisArg)` executes a provided function once for each array element.

* **Primary Purpose**: Performing side-effects (e.g. logging, DOM mutations, triggering network requests).
* **Return Value**: Always returns `undefined`.

```javascript
const logs = [];
["a", "b", "c"].forEach((item, index) => {
  logs.push(`${index}: ${item}`);
});
console.log(logs); // ["0: a", "1: b", "2: c"]
```

> [!WARNING]
> You **CANNOT break or continue out of a `forEach()` loop**. If you need to stop early, use a `for...of` loop or standard `for` loop instead.

---

### 2.2 `map()`: 1-to-1 Array Transformation

`map(callback(element, index, array))` creates a **new array** populated with the results of calling a provided function on every element in the calling array.

```javascript
const users = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Smith" }
];

const fullNames = users.map(u => `${u.firstName} ${u.lastName}`);
console.log(fullNames); // ["John Doe", "Jane Smith"]
```

#### Key Rules of `map()`:
1. Always returns a new array of the **exact same length** as the original array.
2. Callback must return a value; omitting `return` results in an array of `undefined` values.

---

### 2.3 `filter()`: Predicate Filtering

`filter(callback(element, index, array))` creates a shallow copy of a portion of a given array, filtered down to just the elements that pass the test implemented by the provided function (returns `true`).

```javascript
const scores = [45, 82, 91, 60, 33, 78];

const passingScores = scores.filter(score => score >= 70);
console.log(passingScores); // [82, 91, 78]
```

---

### 2.4 `reduce()` & `reduceRight()`: The Aggregation Workhorse

`reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)` executes a user-supplied "reducer" callback function on each element of the array, passing in the return value from the calculation on the preceding element.

```
Array: [10, 20, 30]  (initialValue = 0)

Step 1: acc = 0,  curr = 10 -> returns 10
Step 2: acc = 10, curr = 20 -> returns 30
Step 3: acc = 30, curr = 30 -> returns 60 (Final Result)
```

```javascript
// 1. Summing Array Values
const sum = [10, 20, 30].reduce((acc, curr) => acc + curr, 0); // 60

// 2. Grouping Objects by Property
const people = [
  { name: "Alice", group: "A" },
  { name: "Bob", group: "B" },
  { name: "Charlie", group: "A" }
];

const grouped = people.reduce((acc, person) => {
  const key = person.group;
  if (!acc[key]) acc[key] = [];
  acc[key].push(person);
  return acc;
}, {});

console.log(grouped);
// { A: [{name: "Alice"...}, {name: "Charlie"...}], B: [{name: "Bob"...}] }
```

> [!IMPORTANT]
> **Always provide an `initialValue` to `reduce()`**. Omitting `initialValue` causes `reduce()` to use index 0 as the initial accumulator and start iteration at index 1. On an empty array, omitting `initialValue` throws a `TypeError: Reduce of empty array with no initial value`.

---

### 2.5 Predicate Quantifiers: `some()` and `every()`

These methods evaluate boolean predicates across elements and **short-circuit** for performance:

```javascript
const inventory = [
  { item: "Laptop", stock: 5 },
  { item: "Phone", stock: 0 },
  { item: "Monitor", stock: 12 }
];

// some(): Returns true if AT LEAST ONE element matches (short-circuits on first true)
const hasOutOfStock = inventory.some(item => item.stock === 0);
console.log(hasOutOfStock); // true

// every(): Returns true if ALL elements match (short-circuits on first false)
const allInStock = inventory.every(item => item.stock > 0);
console.log(allInStock); // false
```

---

## 3. Array Key, Value, and Entry Iterators

Arrays provide three iterator generator methods that return `Array Iterator` objects for use in `for...of` loops:

```javascript
const colors = ["Red", "Green", "Blue"];

// 1. keys() -> Iterates over array index keys
for (const index of colors.keys()) {
  console.log(index); // 0, 1, 2
}

// 2. values() -> Iterates over array values
for (const val of colors.values()) {
  console.log(val); // "Red", "Green", "Blue"
}

// 3. entries() -> Iterates over [index, value] tuples
for (const [index, val] of colors.entries()) {
  console.log(index, val); // 0 "Red", 1 "Green", 2 "Blue"
}
```

---

## 4. Minor Points, Quirks & Traps

### 1. The `async`/`await` inside `forEach()` Trap
`forEach()` is synchronous and does NOT wait for promises inside its callback to resolve!

```javascript
// BROKEN: Executes concurrently, does NOT wait for promises!
async function processArrayBroken(urls) {
  urls.forEach(async (url) => {
    const res = await fetch(url); // Fires all fetches concurrently, loop completes instantly!
  });
  console.log("Done!"); // Logs IMMEDIATELY before fetches complete!
}

// CORRECT: Use for...of for sequential async execution
async function processArrayCorrect(urls) {
  for (const url of urls) {
    const res = await fetch(url);
    console.log(`Fetched ${url}`);
  }
  console.log("Done!");
}
```

### 2. The `parseInt` in `map()` Trap
```javascript
// BROKEN: Passing parseInt directly to map!
console.log(["1", "2", "10"].map(parseInt));
// Output: [1, NaN, 2] !!

// Why? map passes (element, index) to callback.
// parseInt("1", 0)  -> 1
// parseInt("2", 1)  -> NaN (1 is an invalid radix for '2')
// parseInt("10", 2) -> 2 (Binary 10 = 2)

// FIX: Wrap in explicit callback function
console.log(["1", "2", "10"].map(str => parseInt(str, 10))); // [1, 2, 10]
```

---

## 5. Senior Interview Questions & Answers

### Q1: Implement a custom `myMap(callback)` method on `Array.prototype` using `reduce()`.
* **Answer**:
  ```javascript
  Array.prototype.myMap = function(callback, thisArg) {
    return this.reduce((acc, curr, index, array) => {
      acc.push(callback.call(thisArg, curr, index, array));
      return acc;
    }, []);
  };
  ```

### Q2: What happens when calling `reduce()` on an empty array without providing an initial value vs with an initial value?
* **Answer**: Calling `.reduce()` on an empty array `[]` without an initial value throws an un-catchable runtime `TypeError: Reduce of empty array with no initial value`. Supplying an initial value (e.g. `[].reduce((a, b) => a + b, 0)`) safely returns the initial value (`0`) without invoking the reducer callback.

---

## 6. Summary & Key Takeaways

1. **`forEach` vs `map`**: Use `forEach` strictly for side-effects; use `map` to transform data into a new array.
2. **`reduce` Initial Value**: Always pass an initial value to `reduce` to prevent runtime errors on empty arrays.
3. **Async Loops**: Never use `await` inside `forEach`. Use `for...of` for sequential async tasks, or `Promise.all(arr.map(async ...))` for parallel processing.
4. **Short-Circuiting**: Use `some()` and `every()` when checking boolean conditions across large arrays.
