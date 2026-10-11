# The `for...of` Loop & Iterable Values

## 1. What is it?
The **`for...of` loop** (introduced in ES6) iterates over the **values** of an **iterable data structure** (such as Arrays, Strings, Maps, Sets, or NodeLists).

---

## 2. Syntax & Basic Usage

```javascript
for (const value of iterable) {
  // Loop Body: 'value' receives element value directly per iteration
}
```

---

## 3. Iterating Arrays & Strings with `for...of`

```javascript
// 1. Array Iteration
const colors = ["Red", "Green", "Blue"];

for (const color of colors) {
  console.log(`Color: ${color}`);
}
// Output: Red, Green, Blue

// 2. String Character Iteration
const language = "JS";

for (const char of language) {
  console.log(`Char: ${char}`);
}
// Output: J, S
```

---

## 4. Why `for...of` is Preferred over Traditional Index `for` Loops

```javascript
const fruits = ["Apple", "Banana", "Cherry"];

// Traditional for loop (Verbose index tracking):
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Clean ES6 for...of loop (No manual index tracking):
for (const fruit of fruits) {
  console.log(fruit);
}
```

---

## 5. Obtaining Array Indices with `for...of` (`entries()`)

If you need both the **index** and the **value** inside a `for...of` loop, use `.entries()` with array destructuring:

```javascript
const items = ["A", "B", "C"];

for (const [index, item] of items.entries()) {
  console.log(`Index ${index}: ${item}`);
}
```

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Attempting to use for...of on Plain Objects
```

```javascript
const user = { name: "Alice", age: 25 };

// ❌ TypeError: user is not iterable!
// for (const val of user) {}

// ✅ FIX: Use Object.values(user) or Object.entries(user)
for (const val of Object.values(user)) {
  console.log(val);
}
```

---

## 7. Edge Cases
- Modifying element variables inside `for (let val of arr)` does NOT mutate the original array because `val` holds a primitive copy or reference pointer:
```javascript
const numbers = [1, 2, 3];
for (let num of numbers) {
  num *= 2; // Local num variable mutated, NOT numbers array!
}
console.log(numbers); // [1, 2, 3]
```

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: What data structures can be iterated using `for...of`?**
  - *Answer*: Any object implementing the ES6 Iterable protocol (`Symbol.iterator`), including Arrays, Strings, TypedArrays, Maps, Sets, `arguments` objects, and DOM NodeLists. Plain Objects do NOT implement `Symbol.iterator` by default.

---

## 9. Practice Questions
1. Predict output of `for (const char of "Code") console.log(char);`.
2. Why does `for...of` throw a `TypeError` when passed a plain object `{}`?
3. How can you retrieve both index and value using `for...of` on an array?

---

## 10. Key Takeaways
- `for...of` iterates directly over **values** of iterable objects.
- Works on Arrays, Strings, Maps, Sets, and NodeLists.
- Plain objects are not iterable by default; use `Object.values()` or `Object.entries()`.
- Use `arr.entries()` with `[index, value]` destructuring when index tracking is needed.
