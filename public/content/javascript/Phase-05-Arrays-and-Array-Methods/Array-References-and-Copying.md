# Array References and Shallow Copying

## 1. Reference Assignment vs Independent Copies

Arrays in JavaScript are reference types stored on the heap. Assigning an array variable to another variable copies the **memory address reference**, NOT the elements:

```js
const a = [1, 2, 3];
const b = a; // Reference assignment! Both 'a' and 'b' point to the SAME array in memory!

b.push(99);
console.log(a); // [1, 2, 3, 99]  <-- 'a' is modified because 'b' shares the reference!
```

---

## 2. Shallow Copying Techniques

To create an independent top-level array copy, use shallow copy mechanisms:

```js
const original = [10, 20, 30];

// Technique 1: Spread Syntax (Recommended)
const copy1 = [...original];

// Technique 2: slice()
const copy2 = original.slice();

// Technique 3: Array.from()
const copy3 = Array.from(original);

// Verification:
copy1.push(999);
console.log(original); // [10, 20, 30] (Unmodified!)
```

---

## 3. Shallow Copy Limitation with Nested Arrays

Shallow copies duplicate primitive values, but for nested objects/arrays, they copy the **references**:

```js
const nested = [[1, 2], [3, 4]];
const shallowCopy = [...nested];

shallowCopy[0].push(99);
console.log(nested[0]); // [1, 2, 99] <-- Nested inner array is STILL shared!
```
