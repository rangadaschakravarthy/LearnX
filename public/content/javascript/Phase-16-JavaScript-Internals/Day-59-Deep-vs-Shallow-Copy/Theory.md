# Day 59 — Deep vs. Shallow Copying & Structured Clone — Detailed Theory

Welcome to **Day 59** of the JavaScript Mastery curriculum. Copying objects and arrays in JavaScript involves understanding **Memory Reference Allocation**. Misunderstanding the difference between a **Shallow Copy** and a **Deep Copy** leads to unexpected state mutations, buggy component re-renders, and memory leaks.

This guide provides an exhaustive theoretical foundation covering Memory Pointer Copying, Shallow Copy methods, Deep Copy mechanisms, the **`structuredClone()` Native Web API**, and writing a custom Deep Clone utility with Circular Reference resolution via `WeakMap`.

---

## 1. Value Semantics vs. Reference Semantics in Memory

In JavaScript:
* **Primitive Values** (strings, numbers, booleans) are copied **by value**. Memory allocations are completely independent.
* **Objects & Arrays** are copied **by reference**. Assigning an object to a new variable copies ONLY the memory address pointer pointing to the heap object!

```javascript
// Primitive Copy by Value (Independent Memory)
let x = 10;
let y = x;
y = 20;
console.log(x); // 10 (Untouched)

// Object Copy by Reference Pointer (Shared Heap Memory)
const obj1 = { a: 1 };
const obj2 = obj1; // Copies pointer address
obj2.a = 999;
console.log(obj1.a); // 999 !! (Mutated through obj2 reference)
```

---

## 2. Shallow Copying Mechanics

A **Shallow Copy** creates a brand new top-level container object in memory, but nested properties (objects, arrays) are copied **by reference**.

```
[ originalObj ] ──► { name: "Alice", details: 0x9988 }
                                         │
[ shallowCopy ] ──► { name: "Alice", details: 0x9988 } ──► Heap Object: { age: 30 }
```

### Common Shallow Copy Techniques
1. **Spread Operator**: `{ ...obj }` or `[ ...arr ]`
2. **`Object.assign({}, obj)`**
3. **`Array.prototype.slice()`**
4. **`Array.from(arr)`**

```javascript
const original = {
  title: "JavaScript Mastery",
  tags: ["JS", "Web"], // Nested Array Reference!
  metadata: { author: "Alice" } // Nested Object Reference!
};

const shallow = { ...original };

// 1. Modifying top-level primitive property:
shallow.title = "Advanced JS";
console.log(original.title); // "JavaScript Mastery" (Top-level independent!)

// 2. Modifying nested array or object property:
shallow.tags.push("Async");
shallow.metadata.author = "BOB";

console.log(original.tags);           // ["JS", "Web", "Async"] !! (MUTATED!)
console.log(original.metadata.author); // "BOB" !! (MUTATED!)
```

---

## 3. Deep Copying Mechanics

A **Deep Copy** recursively duplicates every level of nested objects and arrays, creating 100% independent memory copies at all depths.

```
[ originalObj ] ──► { name: "Alice", details: 0x9988 } ──► Heap Object: { age: 30 }

[ deepCopy ]     ──► { name: "Alice", details: 0x7711 } ──► Heap Object: { age: 30 }
```

---

### Strategy 1: `JSON.parse(JSON.stringify(obj))` (Legacy / Flawed)

```javascript
const complexObj = {
  date: new Date(),
  pattern: /abc/g,
  func: () => 42,
  map: new Map([["a", 1]]),
  undef: undefined
};

const jsonCloned = JSON.parse(JSON.stringify(complexObj));

console.log(typeof jsonCloned.date); // "string" !! (Date lost!)
console.log(jsonCloned.pattern);     // {} !! (RegExp lost!)
console.log(jsonCloned.func);        // undefined !! (Function stripped!)
console.log(jsonCloned.map);         // {} !! (Map lost!)
console.log(jsonCloned.undef);       // undefined (Property key removed entirely!)
```

#### Why JSON Cloning is Flawed:
1. Converts `Date` objects into ISO strings.
2. Strips out `undefined`, `Function` objects, and `Symbol` keys.
3. Converts `NaN` and `Infinity` to `null`.
4. Loses `Map`, `Set`, `RegExp`, `TypedArray`, and `ArrayBuffer` instances.
5. Throws a `TypeError: Converting circular structure to JSON` if circular references exist!

---

### Strategy 2: `structuredClone(obj)` (Modern Native Web API - ES2022)

The **`structuredClone()`** global function is the modern native HTML specification for deep cloning objects.

```javascript
const originalData = {
  date: new Date(),
  set: new Set([1, 2, 3]),
  map: new Map([["key", "val"]]),
  regex: /test/gi,
  buffer: new Int32Array([10, 20])
};

// Native Deep Copy
const deepCloned = structuredClone(originalData);

console.log(deepCloned.date instanceof Date);       // true (Date preserved!)
console.log(deepCloned.set instanceof Set);         // true (Set preserved!)
console.log(deepCloned.buffer instanceof Int32Array); // true (TypedArray preserved!)

// Verifying Complete Memory Independence
deepCloned.set.add(99);
console.log(originalData.set.has(99)); // false (Completely independent!)
```

#### Features Supported by `structuredClone()`:
* Preserves `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer`, `TypedArray`, `Blob`, `File`.
* Correctly handles **Circular References**!
* Supports **Transferable Objects** (`structuredClone(obj, { transfer: [buffer] })`) for zero-copy memory transfers between Web Workers.

> [!WARNING]
> `structuredClone()` will throw a `DOMException: DataCloneError` if the object contains **Function objects**, **DOM Nodes**, or **Symbol keys**.

---

## 4. Custom Deep Clone Implementation (Handling Circular References)

To support custom cloning logic or fallback environments, write a recursive deep clone algorithm using **`WeakMap`** to track circular reference cycles:

```javascript
function deepClone(target, hash = new WeakMap()) {
  // 1. Handle Primitives and null
  if (target === null || typeof target !== "object") {
    return target;
  }

  // 2. Handle Date and RegExp
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target.source, target.flags);

  // 3. Handle Circular References via WeakMap
  if (hash.has(target)) {
    return hash.get(target); // Return already-cloned object instance
  }

  // 4. Handle Map
  if (target instanceof Map) {
    const mapCopy = new Map();
    hash.set(target, mapCopy);
    target.forEach((val, key) => mapCopy.set(deepClone(key, hash), deepClone(val, hash)));
    return mapCopy;
  }

  // 5. Handle Set
  if (target instanceof Set) {
    const setCopy = new Set();
    hash.set(target, setCopy);
    target.forEach(val => setCopy.add(deepClone(val, hash)));
    return setCopy;
  }

  // 6. Handle Array and Object
  const clone = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  hash.set(target, clone);

  // Recursively copy own properties
  Reflect.ownKeys(target).forEach(key => {
    clone[key] = deepClone(target[key], hash);
  });

  return clone;
}

// Circular Reference Test
const circular = { name: "Cycle" };
circular.self = circular;

const clonedCycle = deepClone(circular);
console.log(clonedCycle.self === clonedCycle); // true (Handled safely without stack overflow!)
```

---

## 5. Minor Points, Quirks & Traps

### 1. Transferable Objects Zero-Copy Transfer
When transferring large `ArrayBuffer` data to a Web Worker using `structuredClone(data, { transfer: [buffer] })`, the memory buffer is **transferred** (detached from the main thread) rather than copied, achieving $O(1)$ zero-copy execution speed!

---

## 6. Senior Interview Questions & Answers

### Q1: What is the difference between shallow copying and deep copying at the memory heap level?
* **Answer**: A shallow copy duplicates only the top-level container object in memory; any nested objects or arrays inside are copied by reference memory address pointer, meaning mutations to nested properties affect both the original and copied instances. A deep copy recursively duplicates all nested objects and arrays at all nesting depths, allocating brand new independent heap memory at every level so no references are shared between the original and copied structures.

### Q2: Why should `structuredClone()` be preferred over `JSON.parse(JSON.stringify())` for deep copying in modern JavaScript?
* **Answer**: `JSON.parse(JSON.stringify())` has severe limitations: it converts `Date` objects into ISO strings, strips out `undefined`, `Function` objects, and `Symbol` keys, converts `NaN` to `null`, loses complex types (`Map`, `Set`, `RegExp`, `ArrayBuffer`), and throws a un-catchable TypeError on circular references. `structuredClone()` is the native browser/Node API designed specifically for deep copying; it preserves `Date`, `Map`, `Set`, `RegExp`, `ArrayBuffer`, and handles circular references safely without throwing.

---

## 7. Summary & Key Takeaways

1. **Shallow Copy**: `{ ...obj }` and `Object.assign()` copy top-level properties but share nested object pointers.
2. **Deep Copy**: Duplicates all nested memory structures recursively.
3. **`structuredClone()`**: Use native `structuredClone()` for deep copying complex data types and circular references.
4. **`structuredClone` Limits**: Throws errors on functions, DOM nodes, or Symbols.
5. **Circular Resolution**: Custom deep clone utilities must use a `WeakMap` to store visited objects and prevent infinite recursion loops.
