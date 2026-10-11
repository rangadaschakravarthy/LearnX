# Top 16 Array Manipulation Common Mistakes

## 1. The Numeric Sort Trap
❌ **Wrong:**
```js
const numbers = [10, 2, 30, 4];
numbers.sort(); // Default sort converts elements to STRINGS!
console.log(numbers); // [10, 2, 30, 4] --> Strings: "10" < "2" < "30" < "4"!
```
✅ **Correct:**
```js
const numbers = [10, 2, 30, 4];
numbers.sort((a, b) => a - b); // Pass numeric compare function
console.log(numbers); // [2, 4, 10, 30]
```

---

## 2. Expecting `map()` to Mutate the Original Array
❌ **Wrong:**
```js
const nums = [1, 2, 3];
nums.map(x => x * 2); // Return value ignored!
console.log(nums); // [1, 2, 3] (Unchanged!)
```
✅ **Correct:**
```js
const nums = [1, 2, 3];
const doubled = nums.map(x => x * 2);
console.log(doubled); // [2, 4, 6]
```

---

## 3. Confusing `slice()` with `splice()`
- `slice(start, end)` is **non-mutating** and extracts a portion into a new array.
- `splice(start, deleteCount, ...items)` is **mutating** and deletes/inserts elements in-place.
