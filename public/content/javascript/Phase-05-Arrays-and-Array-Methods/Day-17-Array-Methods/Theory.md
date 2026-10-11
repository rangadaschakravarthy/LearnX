# Day 17 — Array Methods (Mutating vs. Non-Mutating) — Detailed Theory

Welcome to **Day 17** of the JavaScript Mastery curriculum. The JavaScript `Array.prototype` library provides dozens of powerful built-in methods for searching, modifying, slicing, and transforming arrays.

Understanding whether a method **mutates the original array in place** or **returns a new immutable array** is critical for modern application state management (e.g. React state updates, Redux, functional programming).

---

## 1. Mutating vs. Non-Mutating Methods: Core Architectural Classification

```
                          ┌─────────────────────────────┐
                          │   Array Prototype Methods   │
                          └──────────────┬──────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
     MUTATING (In-Place Modifications)               NON-MUTATING (Returns New Array/Value)
     - Alters existing memory array                   - Original array remains untouched
     - Danger: Unintended side-effects                - Preferred in Functional & React Code
```

### Complete Classification Table

| Category | Mutating (In-Place) | Non-Mutating (Pure / Returns Copy) | Immutable ES2023 Equivalents |
| :--- | :--- | :--- | :--- |
| **Adding / Removing** | `push()`, `pop()`, `shift()`, `unshift()`, `splice()` | `concat()`, `slice()` | `toSpliced()` |
| **Reordering** | `sort()`, `reverse()` | N/A | `toSorted()`, `toReversed()` |
| **Updating Element** | `arr[i] = val`, `fill()`, `copyWithin()` | `map()` | `with(index, value)` |
| **Searching** | N/A | `indexOf()`, `includes()`, `find()`, `findIndex()` | N/A |
| **Transforming** | N/A | `join()`, `flat()`, `flatMap()` | N/A |

---

## 2. Splicing vs. Slicing: `splice()` vs. `slice()`

Confusing `splice()` and `slice()` is one of the most common beginner traps.

```javascript
// 1. slice(start, end): NON-MUTATING (Copies a subset of elements)
const fruits = ["Apple", "Banana", "Cherry", "Date"];
const sliced = fruits.slice(1, 3); // Extracts index 1 and 2

console.log(sliced); // ["Banana", "Cherry"]
console.log(fruits); // ["Apple", "Banana", "Cherry", "Date"] (Original intact!)

// 2. splice(start, deleteCount, ...itemsToInsert): MUTATING (Deletes & Inserts in place)
const removed = fruits.splice(1, 2, "Mango", "Kiwi"); // Deletes 2 items at index 1, inserts "Mango", "Kiwi"

console.log(removed); // ["Banana", "Cherry"] (Returned array of deleted elements)
console.log(fruits);  // ["Apple", "Mango", "Kiwi", "Date"] (Original MUTATED!)
```

### Detailed Method Comparison

| Parameter / Feature | `slice(start, end)` | `splice(start, deleteCount, ...items)` |
| :--- | :--- | :--- |
| **Return Value** | Array of extracted elements | Array of removed elements |
| **Original Array** | **Unchanged** | **Mutated in place** |
| **Negative Indices** | Supported (counts from end) | Supported (counts from end) |
| **Primary Purpose** | Read-only copy of sub-range | Delete, insert, or replace elements |

---

## 3. Searching Methods

JavaScript provides five searching methods with distinct matching algorithms:

```javascript
const items = [10, 20, 30, NaN, 20];
```

### 3.1 Primitive Value Searching: `indexOf()` vs `includes()`

* `indexOf(searchElement, fromIndex)`: Returns index of first match, or `-1`. Uses **Strict Equality (`===`)**.
* `includes(searchElement, fromIndex)`: Returns boolean `true`/`false`. Uses **SameValueZero** equality algorithm.

```javascript
// The NaN Equality Traps:
console.log(items.indexOf(NaN));  // -1! (Because NaN === NaN evaluates to false!)
console.log(items.includes(NaN)); // true! (SameValueZero algorithm correctly matches NaN)

console.log(items.indexOf(20));     // 1
console.log(items.lastIndexOf(20)); // 4 (Searches backward)
```

---

### 3.2 Complex Object & Predicate Searching: `find()`, `findIndex()`, `findLast()` (ES2023)

When searching arrays of objects, primitive matching fails. Use predicate callback searching methods:

```javascript
const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true }
];

// find(): Returns the FIRST element satisfying predicate (or undefined)
const activeUser = users.find(u => u.active);
console.log(activeUser); // { id: 1, name: "Alice", active: true }

// findIndex(): Returns index of FIRST element satisfying predicate (or -1)
const inactiveIndex = users.findIndex(u => !u.active);
console.log(inactiveIndex); // 1

// findLast() & findLastIndex() (ES2023 - Searches from right to left)
const lastActive = users.findLast(u => u.active);
console.log(lastActive); // { id: 3, name: "Charlie", active: true }
```

---

## 4. Sorting Mechanics & The `sort()` Gotcha

By default, calling `arr.sort()` converts elements to strings and compares their UTF-16 code units lexicographically:

```javascript
// BROKEN DEFAULT NUMERIC SORT:
const nums = [10, 5, 40, 25, 100];
nums.sort();
console.log(nums); // [10, 100, 25, 40, 5] !! ('100' comes before '25' lexicographically!)

// CORRECT NUMERIC SORT (Supply Comparator Function):
nums.sort((a, b) => a - b); // Ascending numeric order
console.log(nums); // [5, 10, 25, 40, 100]

nums.sort((a, b) => b - a); // Descending numeric order
console.log(nums); // [100, 40, 25, 10, 5]
```

### How the Comparator Function Works
* If `compareFn(a, b) < 0`: Sort `a` before `b`.
* If `compareFn(a, b) > 0`: Sort `b` before `a`.
* If `compareFn(a, b) === 0`: Keep original relative positions (Timsort stability guaranteed in modern JS engines).

---

## 5. Modern ES2023 Immutable Array Methods

ES2023 introduced non-mutating copy alternatives to classic mutating methods:

```javascript
const original = [3, 1, 4, 2];

// 1. toSorted() -> Returns sorted copy without mutating original
const sortedCopy = original.toSorted((a, b) => a - b);
console.log(original);   // [3, 1, 4, 2] (Original untouched!)
console.log(sortedCopy); // [1, 2, 3, 4]

// 2. toReversed() -> Returns reversed copy
const reversedCopy = original.toReversed();
console.log(reversedCopy); // [2, 4, 1, 3]

// 3. toSpliced() -> Returns spliced copy
const splicedCopy = original.toSpliced(1, 2); // Remove 2 items at index 1
console.log(splicedCopy); // [3, 2]

// 4. with(index, value) -> Returns copy with single index value updated
const updatedCopy = original.with(0, 99);
console.log(updatedCopy); // [99, 1, 4, 2]
```

---

## 6. Flattening & Combining Arrays

```javascript
// 1. concat(...items): Combines arrays into a new array
const arr1 = [1, 2];
const arr2 = [3, 4];
console.log(arr1.concat(arr2, [5, 6])); // [1, 2, 3, 4, 5, 6]

// 2. flat(depth): Flattens nested array structures
const nested = [1, [2, [3, [4]]]];
console.log(nested.flat(1)); // [1, 2, [3, [4]]]
console.log(nested.flat(Infinity)); // [1, 2, 3, 4]

// 3. flatMap(fn): Maps each element and flattens result by 1 level
const sentences = ["Hello World", "JavaScript Mastery"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words); // ["Hello", "World", "JavaScript", "Mastery"]
```

---

## 7. Minor Points, Quirks & Edge Cases

### 1. `sort()` Mutates the Original Array Instance!
In React state management, calling `state.sort()` directly mutates state without creating a new object reference, causing React components to fail to re-render! Always use `[...state].sort()` or `state.toSorted()`.

### 2. `copyWithin()` and `fill()`
* `fill(value, start, end)` fills array indices with a static value. CAUTION: `fill({})` fills the array with references to the **same single object**!
* `copyWithin(target, start, end)` copies a sequence of array elements to another position within the same array in place.

---

## 8. Senior Interview Questions & Answers

### Q1: Why does `[1, 2, 3].indexOf(NaN)` return `-1` while `[1, 2, 3, NaN].includes(NaN)` returns `true`?
* **Answer**: `indexOf` uses Strict Equality (`===`). Under JavaScript rules, `NaN === NaN` evaluates to `false`, so `indexOf` can never find `NaN`. `includes` uses the **SameValueZero** algorithm, which treats `NaN` as equal to `NaN`, allowing it to correctly identify `NaN` in arrays.

### Q2: Write a custom non-mutating `shuffle(arr)` function without mutating the input array.
* **Answer**:
  ```javascript
  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  ```

---

## 9. Summary & Key Takeaways

1. **Mutating vs Non-Mutating**: Always know whether a method alters memory in place (`splice`, `sort`, `push`) or returns a copy (`slice`, `concat`, `map`).
2. **`splice` vs `slice`**: `splice(start, count)` mutates; `slice(start, end)` copies a sub-range.
3. **Numeric Sort Callback**: Always supply `(a, b) => a - b` to `sort()`; default sort compares string code units.
4. **ES2023 Copy Methods**: Use `toSorted()`, `toReversed()`, `toSpliced()`, and `.with()` for clean immutable array operations.
