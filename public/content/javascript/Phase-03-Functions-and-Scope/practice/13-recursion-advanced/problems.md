# 13. Advanced Recursion Practice

> Practice problems covering 13. Advanced Recursion Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Deep Object Clone
**Description:** Write `deepClone(obj)` recursively copying nested objects, arrays, and primitive values without shared references.

**Expected Behavior / Test:**
```js
const copy = deepClone(obj); copy !== obj
```

---

## Problem 2: Deep Array Flatten (`deepFlatten`)
**Description:** Write `deepFlatten(arr)` recursively flattening arbitrarily deeply nested arrays `[1, [2, [3, [4]]]]`.

**Expected Behavior / Test:**
```js
deepFlatten([1, [2, [3]]]) // [1, 2, 3]
```

---

## Problem 3: Deep Object Freeze
**Description:** Write `deepFreeze(obj)` recursively freezing an object and all nested properties using `Object.freeze`.

**Expected Behavior / Test:**
```js
deepFreeze(config); config.nested.prop = 5; // no change
```

---

## Problem 4: Nested Object Key Search
**Description:** Write `findNestedValue(obj, keyPath)` resolving dot-notation string paths like `"user.profile.address.city"`.

**Expected Behavior / Test:**
```js
findNestedValue(data, "user.name")
```

---

## Problem 5: Directory Structure Traversal Simulation
**Description:** Traverse a nested file system tree structure counting total file sizes recursively.

**Expected Behavior / Test:**
```js
calcDirectorySize(dirTree)
```

---

## Problem 6: Recursive Memoization (Fibonacci Optimization)
**Description:** Optimize recursive `fibonacci(n)` using memoization hash map reducing time complexity from O(2^n) to O(n).

**Expected Behavior / Test:**
```js
memoFib(50) // 12586269025
```

---

## Problem 7: Binary Tree In-Order Traversal
**Description:** Given binary tree node `{ val, left, right }`, write recursive `inOrderTraversal(node)` returning array of values.

**Expected Behavior / Test:**
```js
inOrderTraversal(root)
```

---

## Problem 8: Nested HTML/DOM Nodes Hierarchy Counter
**Description:** Write `countDOMNodes(element)` counting total nested elements in a tree recursively.

**Expected Behavior / Test:**
```js
countDOMNodes(node)
```

---

## Problem 9: Generate All String Permutations
**Description:** Write `getPermutations(str)` returning array of all unique string permutations recursively.

**Expected Behavior / Test:**
```js
getPermutations("abc") // ["abc", "acb", ...]
```

---

## Problem 10: Object Key Transformer (CamelCase Converter)
**Description:** Write `deepCamelCaseKeys(obj)` converting all keys in a nested object structure to camelCase recursively.

**Expected Behavior / Test:**
```js
deepCamelCaseKeys({ "first_name": "a" })
```

---

## Problem 11: Deep Equality Check (`deepEqual`)
**Description:** Write `deepEqual(a, b)` recursively comparing values, arrays, and objects for deep structural equality.

**Expected Behavior / Test:**
```js
deepEqual({a:[1]}, {a:[1]}) // true
```

---

## Problem 12: Parse Nested JSON Tokens
**Description:** Simulate a recursive descent parser function checking balanced brackets in nested expressions.

**Expected Behavior / Test:**
```js
isBalanced("([{}])") // true
```

---

## Problem 13: Tail Call Optimization (TCO) Refactoring
**Description:** Refactor `factorial` into tail-recursive form `factorial(n, acc = 1)` and explain engine TCO requirements.

**Expected Behavior / Test:**
```js
factorial(5, 1)
```

---

## Problem 14: Recursive Object Sanitizer
**Description:** Write `sanitizeObject(obj, forbiddenKeys)` removing forbidden keys recursively from an API payload.

**Expected Behavior / Test:**
```js
sanitizeObject(payload, ["password", "token"])
```

---

## Problem 15: Evaluate Nested Math Expression Tree
**Description:** Given an expression tree node `{ op: "+", left: 5, right: { op: "*", left: 2, right: 3 } }`, evaluate result recursively.

**Expected Behavior / Test:**
```js
evalTree(expr) // 11
```

---

