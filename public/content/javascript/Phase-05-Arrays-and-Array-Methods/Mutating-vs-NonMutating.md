# Mutating vs Non-Mutating Array Methods in JavaScript

Understanding which array methods mutate (modify in-place) the original array and which return a new array is critical for clean, bug-free JavaScript code.

---

## 🔄 Summary Matrix

| Category | Method | Mutates Original Array? | Return Value | Modern ES2023 Non-Mutating Alternative |
|---|---|---|---|---|
| **Adding/Removing** | `push(...items)` | **YES** | New array length | Spread `[...arr, item]` |
| | `pop()` | **YES** | Removed element | `arr.slice(0, -1)` |
| | `shift()` | **YES** | Removed element | `arr.slice(1)` |
| | `unshift(...items)` | **YES** | New array length | Spread `[item, ...arr]` |
| **Modification** | `splice(start, delCount, ...items)` | **YES** | Array of deleted items | `toSpliced()` |
| **Reordering** | `sort(compareFn)` | **YES** | Reference to original array | `toSorted(compareFn)` |
| | `reverse()` | **YES** | Reference to original array | `toReversed()` |
| | `fill(val, start, end)` | **YES** | Reference to original array | Map transformation |
| **Extraction/Copy**| `slice(start, end)` | **NO** | New shallow copy array | N/A |
| | `concat(...items)` | **NO** | New concatenated array | Spread `[...a, ...b]` |
| **Transformation**| `map(callback)` | **NO** | New transformed array | N/A |
| | `filter(predicate)` | **NO** | New filtered array | N/A |
| | `reduce(reducer, init)` | **NO** | Accumulated value | N/A |
| | `flat(depth)` | **NO** | New flattened array | N/A |
| | `flatMap(callback)` | **NO** | New mapped & flattened array | N/A |

---

## 💡 Important Rules

### 1. `const` Binding vs Element Mutation
Declaring an array with `const` prevents **variable reassignment**, but does NOT prevent **element mutation**:

```js
const numbers = [1, 2, 3];

// VALID: Mutating elements inside the array
numbers.push(4); // numbers is now [1, 2, 3, 4]
numbers[0] = 100; // numbers is now [100, 2, 3, 4]

// INVALID: Reassigning the variable identifier throws TypeError
// numbers = [5, 6, 7]; // TypeError: Assignment to constant variable.
```
