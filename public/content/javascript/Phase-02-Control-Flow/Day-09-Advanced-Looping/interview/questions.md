# Day 09 Interview Questions — Advanced Looping

## 1. What is the fundamental difference between `for...in` and `for...of`?
- **`for...in`**: Iterates over property *keys* (strings) of any enumerable object, including prototype chain properties.
- **`for...of`**: Iterates over property *values* of iterable objects (Array, String, Map, Set, TypedArray) using their `[Symbol.iterator]`.

## 2. Why shouldn't you use `for...in` to iterate over an Array?
- Key ordering in `for...in` is not guaranteed to follow numeric index order.
- `for...in` includes non-numeric property keys (e.g. `arr.customProp = 'test'`).
- Array indices are yielded as strings (e.g., `'0'`, `'1'`), leading to accidental string concatenation when doing numeric math (`index + 1` produces `'01'`).

## 3. How do `Object.keys()`, `Object.values()`, and `Object.entries()` compare to `for...in`?
- `Object.keys/values/entries` return arrays of only the object's **own enumerable properties**, ignoring prototype inheritance.
- They pair cleanly with `for...of` and standard array methods (`.map()`, `.filter()`, `.reduce()`).

## 4. Are labeled loops clean coding practice in modern JavaScript?
- Labeled loops (`outer: for (...)`) are syntactically valid and useful for multi-dimensional searches.
- However, in production code, refactoring nested loops into helper functions with early `return` statements is generally preferred for readability and maintainability.
