# Array Edge Cases and Boundary Conditions

## Boundary Values & Edge Case Matrix

| Edge Case | Description | Behavior / Trap | Best Practice Guard |
|---|---|---|---|
| `[]` | Empty array | `.length === 0`, `reduce()` without initial value throws `TypeError` | Always pass initial value to `reduce()`: `arr.reduce(fn, 0)` |
| `[undefined]` | Single undefined element | `.length === 1`, value is `undefined` | Check `typeof arr[0] !== "undefined"` |
| `[0]` / `["0"]` | Zero element array | Truthy in booleans (`Boolean([0]) === true`) | Check `arr.length > 0` instead of `Boolean(arr)` |
| Sparse Arrays | `let a = []; a[5] = 10;` | `.length === 6`, indexes 0..4 are empty slots | Avoid sparse arrays; use `push()` or `map()` |
| Sparse `sort()` | Sorting sparse arrays | Empty slots are moved to end of array | Compact array before sorting |
| Out of Bounds | `arr[99]` | Returns `undefined` without throwing error | Check `idx >= 0 && idx < arr.length` |
| Shallow Copy Trap | `[...nestedArr]` | Inner objects/arrays remain shared references | Deep copy nested objects if mutating inner properties |

---

## ⚠️ Sparse Array Demonstration

```js
const sparse = [1, , 3]; // Index 1 is an empty slot (hole)
console.log("length:", sparse.length); // 3
console.log("sparse[1]:", sparse[1]); // undefined

// forEach skips empty slots!
sparse.forEach((val, idx) => console.log(idx, val));
// Output: 0 1, 2 3 (Index 1 is skipped!)
```
