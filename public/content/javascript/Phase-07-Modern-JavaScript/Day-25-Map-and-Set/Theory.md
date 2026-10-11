# Day 25 — Map, Set, WeakMap & WeakSet — Detailed Theory

Welcome to **Day 25** of the JavaScript Mastery curriculum. Introduced in ES6, **`Map`**, **`Set`**, **`WeakMap`**, and **`WeakSet`** are specialized keyed collection data structures that solve fundamental memory, performance, and API limitations inherent in plain JavaScript objects and arrays.

This guide provides an exhaustive theoretical foundation covering key collection mechanics, performance comparison tables, garbage collection heuristics, ES2024 Set composition methods, and Weak Reference memory management.

---

## 1. `Map` vs. Plain Object (`{}`)

A `Map` is an ordered collection of key-value pairs where **keys can be of ANY data type** (objects, functions, primitives, or symbols).

```javascript
const map = new Map();

const objKey = { id: 1 };
const funcKey = function() {};

// 1. Any type key assignment
map.set(objKey, "Metadata for Object Key");
map.set(funcKey, "Metadata for Function Key");
map.set(42, "Number Key");

// 2. Retrieval
console.log(map.get(objKey)); // "Metadata for Object Key"
console.log(map.has(42));     // true
console.log(map.size);       // 3 (Direct property size inspection!)
```

### Complete Architectural Comparison: `Map` vs. Object

| Feature | Plain Object (`{}`) | `Map` Keyed Collection |
| :--- | :--- | :--- |
| **Allowed Key Types** | **Strings** and **Symbols** ONLY | **ANY Type** (Objects, Functions, Primitives, NaN) |
| **Key Ordering** | Complex rules (Integer keys sorted ascending, then strings by insertion) | **Guaranteed Strict Insertion Order** |
| **Size Inspection** | Manual (`Object.keys(obj).length` - $O(N)$) | `map.size` property (Direct $O(1)$ constant time) |
| **Prototype Pollution**| Inherits from `Object.prototype` (e.g. `constructor`, `toString`) | **Clean Dictionary** (No inherited prototype keys) |
| **Iteration Support** | Requires `Object.keys()` or `for...in` | **Directly Iterable** (`for (const [k, v] of map)`) |
| **Performance** | Optimized for fixed shape objects | Optimized for frequent addition/removal of key-value pairs |

---

## 2. `Set` Data Structure & ES2024 Set Operations

A `Set` is an ordered collection of **unique values**. Duplicate values are automatically discarded using the **SameValueZero** equality algorithm.

```javascript
const set = new Set([1, 2, 2, 3, "hello", "hello"]);
console.log(set);      // Set(4) { 1, 2, 3, "hello" }
console.log(set.size); // 4

set.add(4);
set.delete("hello");
console.log(set.has(3)); // true (Fast O(1) membership test)
```

---

### 2.1 Native ES2024 Set Composition Methods

ES2024 introduced native set algebra operations directly to `Set.prototype`:

```javascript
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// 1. Intersection (Elements in BOTH sets)
console.log(setA.intersection(setB)); // Set(2) { 3, 4 }

// 2. Union (Elements in EITHER set)
console.log(setA.union(setB)); // Set(6) { 1, 2, 3, 4, 5, 6 }

// 3. Difference (Elements in A but NOT in B)
console.log(setA.difference(setB)); // Set(2) { 1, 2 }

// 4. Symmetric Difference (Elements in ONLY ONE set)
console.log(setA.symmetricDifference(setB)); // Set(4) { 1, 2, 5, 6 }

// 5. Subset & Superset Checks
console.log(new Set([1, 2]).isSubsetOf(setA)); // true
```

---

## 3. Weak Collections: `WeakMap` & `WeakSet`

Standard `Map` and `Set` hold **Strong References** to their keys and values. As long as a key object exists inside a strong `Map`, JavaScript's Garbage Collector (GC) cannot free that object from memory—even if no other variable in the entire program points to it!

`WeakMap` and `WeakSet` hold **Weak References** to object keys, allowing the Garbage Collector to automatically free object keys when they become unreachable elsewhere in the application.

```
                          ┌─────────────────────────────┐
                          │   Map vs WeakMap Garbage    │
                          │   Collection Mechanics      │
                          └──────────────┬──────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
       Strong Map (Standard)                           WeakMap
   - Holds Strong Reference to key object           - Holds Weak Reference to key object
   - Key object stays in heap memory forever         - Key object automatically GC collected
     unless manually removed via map.delete(key)       when external references are cleared!
```

### Architectural Differences Matrix

| Feature | `Map` / `Set` | `WeakMap` / `WeakSet` |
| :--- | :--- | :--- |
| **Allowed Keys** | Any data type | **Objects ONLY** (`WeakMap` keys & `WeakSet` values must be objects) |
| **Reference Strength**| **Strong** (Prevents Garbage Collection) | **Weak** (Allows Garbage Collection of unreferenced keys) |
| **Iterable?** | **Yes** (`for...of`, `.forEach()`) | **NO** (Not iterable; no `.keys()`, `.values()`, or `.entries()`) |
| **`.size` Property?** | **Yes** (`map.size`) | **NO** (Size cannot be determined because GC is non-deterministic!) |
| **`.clear()` Method?**| **Yes** | **NO** |

---

## 4. Practical WeakMap Use Case: Private Object Metadata & DOM Tracking

```javascript
// WeakMap for attaching private metadata to DOM nodes or instances:
const privateMetadata = new WeakMap();

function registerElement(domElement, secretData) {
  // Store secret data keyed by the actual DOM node reference
  privateMetadata.set(domElement, secretData);
}

function getElementSecret(domElement) {
  return privateMetadata.get(domElement);
}

// When 'domElement' is removed from the DOM tree and un-referenced in code:
// The WeakMap entry is AUTOMATICALLY garbage collected without memory leaks!
```

---

## 5. Minor Points, Quirks & Traps

### 1. Object Keys in `Map` compare by Reference Identity
Object keys in a `Map` are matched by **Memory Reference Identity**, not structural equality!

```javascript
const map = new Map();

map.set({ id: 1 }, "Data");

// Querying with a new object literal with identical structure:
console.log(map.get({ id: 1 })); // undefined !! (Different object reference in Heap!)

// FIX: Store reference to the exact object key instance:
const keyObj = { id: 1 };
map.set(keyObj, "Data");
console.log(map.get(keyObj)); // "Data"
```

---

## 6. Senior Interview Questions & Answers

### Q1: Why are `WeakMap` and `WeakSet` not iterable?
* **Answer**: In JavaScript engines, Garbage Collection (GC) is non-deterministic and runs asynchronously in background threads. If `WeakMap` were iterable or had a `.size` property, the contents of the collection would randomly change depending on whether GC had executed at that exact instant, causing non-deterministic application bugs.

### Q2: Compare `Set` membership lookup complexity vs Array `indexOf` complexity.
* **Answer**: Checking membership using `array.includes(val)` or `array.indexOf(val)` performs a linear search over array elements in **$O(N)$ time**. Checking membership using `set.has(val)` performs a hash lookup in **$O(1)$ constant time**, making `Set` vastly superior for high-frequency membership checking across large datasets.

---

## 7. Summary & Key Takeaways

1. **`Map` vs Object**: Use `Map` when keys are non-strings, when insertion order must be preserved, or when frequent additions/deletions occur.
2. **`Set`**: Use `Set` for collections of unique values and fast $O(1)$ membership checks via `.has()`.
3. **ES2024 Set Methods**: Native `intersection()`, `union()`, `difference()`, and `symmetricDifference()`.
4. **Weak Collections**: Use `WeakMap` and `WeakSet` to attach data to objects (like DOM nodes or private instances) without causing memory leaks.
