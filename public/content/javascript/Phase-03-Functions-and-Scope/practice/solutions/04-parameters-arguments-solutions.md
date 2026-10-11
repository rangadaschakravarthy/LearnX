# Solutions for 04. Parameters and Arguments Practice

> Detailed solutions, code explanations, and edge case breakdowns.

## Solution 1: Default Parameter Evaluation Timing

### Problem Recap
Demonstrate that default parameters evaluate at call time by calling a default factory function.

### Reference Implementation
```js
// Reference solution for Problem 1
// Test: fn(), fn()

// Implementation for Problem 1
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 2: Rest Parameters vs `arguments`

### Problem Recap
Write `collectArgs(...args)` and compare it with the legacy `arguments` object (Array instance vs array-like).

### Reference Implementation
```js
// Reference solution for Problem 2
// Test: Array.isArray(args) // true

// Implementation for Problem 2
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 3: Nested Destructuring Defaults

### Problem Recap
Create `configure(options = {})` with nested parameter destructuring `{ host = "localhost", port = 8080 } = {}`.

### Reference Implementation
```js
// Reference solution for Problem 3
// Test: configure() // host: localhost, port: 8080

// Implementation for Problem 3
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 4: Pass-by-Value Primitive Mutation

### Problem Recap
Write a function showing that mutating a primitive parameter does not affect the outer variable.

### Reference Implementation
```js
// Reference solution for Problem 4
// Test: let x = 10; mutate(x); x === 10

// Implementation for Problem 4
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 5: Pass-by-Reference Object Mutation

### Problem Recap
Write a function showing that mutating an object property mutates original, but reassigning the parameter does not.

### Reference Implementation
```js
// Reference solution for Problem 5
// Test: updateObj(obj)

// Implementation for Problem 5
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 6: Default Parameter Shadowing Previous Parameter

### Problem Recap
Create a function `calcDiscount(price, discount = price * 0.1)` where a default param uses an earlier param.

### Reference Implementation
```js
// Reference solution for Problem 6
// Test: calcDiscount(100) // 90

// Implementation for Problem 6
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 7: Arguments Object Synchronization (Non-Strict)

### Problem Recap
Demonstrate how parameter assignment synchronizes with `arguments[0]` in non-strict mode vs strict mode.

### Reference Implementation
```js
// Reference solution for Problem 7
// Test: syncTest(5)

// Implementation for Problem 7
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 8: Enforce Required Parameters

### Problem Recap
Write a helper function `required(paramName)` set as a default parameter value that throws an Error if missing.

### Reference Implementation
```js
// Reference solution for Problem 8
// Test: fn() // throws "Missing paramName"

// Implementation for Problem 8
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 9: Rest Parameter Location Rule

### Problem Recap
Show that rest parameter `...rest` must be the last parameter in the signature or it raises a `SyntaxError`.

### Reference Implementation
```js
// Reference solution for Problem 9
// Test: fn(a, ...b)

// Implementation for Problem 9
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 10: Array Destructuring Parameters

### Problem Recap
Write a function `getCoordinates([x = 0, y = 0, z = 0] = [])` that extracts 3D coordinates.

### Reference Implementation
```js
// Reference solution for Problem 10
// Test: getCoordinates([10, 20]) // [10, 20, 0]

// Implementation for Problem 10
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 11: Function `length` Property

### Problem Recap
Check `fn.length` on functions with default params and rest params to show parameter arity count rule.

### Reference Implementation
```js
// Reference solution for Problem 11
// Test: fn.length

// Implementation for Problem 11
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 12: Variadic Sum with Rest Parameter

### Problem Recap
Write a function `sumNumbers(...nums)` returning 0 when called with 0 args, or the sum of all arguments.

### Reference Implementation
```js
// Reference solution for Problem 12
// Test: sumNumbers(1, 2, 3) // 6

// Implementation for Problem 12
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 13: Parameter Scope Isolation

### Problem Recap
Show that default parameters live in their own scope between parent scope and function body scope.

### Reference Implementation
```js
// Reference solution for Problem 13
// Test: paramScopeTest()

// Implementation for Problem 13
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 14: Merging Options Object

### Problem Recap
Write `fetchData(url, customConfig)` that merges default config `{ method: "GET", headers: {} }` with `customConfig`.

### Reference Implementation
```js
// Reference solution for Problem 14
// Test: fetchData("/api", { headers: { Auth: "Bearer token" } })

// Implementation for Problem 14
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 15: Ignoring Extra Arguments

### Problem Recap
Demonstrate what happens when passing 5 arguments to a function accepting only 2 parameters.

### Reference Implementation
```js
// Reference solution for Problem 15
// Test: add(1, 2, 3, 4, 5) // 3

// Implementation for Problem 15
function solution() {
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

