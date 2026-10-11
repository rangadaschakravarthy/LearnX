# Top String Manipulation Common Mistakes

## 1. Assuming Strings Can Be Mutated Character-by-Character
❌ **Wrong:**
```js
let str = "hello";
str[0] = "H"; // Fails silently in non-strict mode!
console.log(str); // "hello" (Unchanged)
```
✅ **Correct:**
```js
let str = "hello";
str = "H" + str.slice(1);
console.log(str); // "Hello"
```

---

## 2. Confusing `replace()` with `replaceAll()`
❌ **Wrong:**
```js
const text = "cat and cat";
const result = text.replace("cat", "dog");
console.log(result); // "dog and cat" (Only replaces FIRST occurrence!)
```
✅ **Correct:**
```js
const text = "cat and cat";
const result = text.replaceAll("cat", "dog");
console.log(result); // "dog and dog"
```

---

## 3. Misunderstanding `slice()` vs `substring()`
- `slice(start, end)` supports negative indexes relative to string end.
- `substring(start, end)` swaps arguments if `start > end` and treats negative numbers as `0`.
