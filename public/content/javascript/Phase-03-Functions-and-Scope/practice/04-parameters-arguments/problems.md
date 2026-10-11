# 04. Parameters and Arguments Practice

> Practice problems covering 04. Parameters and Arguments Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Default Parameter Evaluation Timing
**Description:** Demonstrate that default parameters evaluate at call time by calling a default factory function.

**Expected Behavior / Test:**
```js
fn(), fn()
```

---

## Problem 2: Rest Parameters vs `arguments`
**Description:** Write `collectArgs(...args)` and compare it with the legacy `arguments` object (Array instance vs array-like).

**Expected Behavior / Test:**
```js
Array.isArray(args) // true
```

---

## Problem 3: Nested Destructuring Defaults
**Description:** Create `configure(options = {})` with nested parameter destructuring `{ host = "localhost", port = 8080 } = {}`.

**Expected Behavior / Test:**
```js
configure() // host: localhost, port: 8080
```

---

## Problem 4: Pass-by-Value Primitive Mutation
**Description:** Write a function showing that mutating a primitive parameter does not affect the outer variable.

**Expected Behavior / Test:**
```js
let x = 10; mutate(x); x === 10
```

---

## Problem 5: Pass-by-Reference Object Mutation
**Description:** Write a function showing that mutating an object property mutates original, but reassigning the parameter does not.

**Expected Behavior / Test:**
```js
updateObj(obj)
```

---

## Problem 6: Default Parameter Shadowing Previous Parameter
**Description:** Create a function `calcDiscount(price, discount = price * 0.1)` where a default param uses an earlier param.

**Expected Behavior / Test:**
```js
calcDiscount(100) // 90
```

---

## Problem 7: Arguments Object Synchronization (Non-Strict)
**Description:** Demonstrate how parameter assignment synchronizes with `arguments[0]` in non-strict mode vs strict mode.

**Expected Behavior / Test:**
```js
syncTest(5)
```

---

## Problem 8: Enforce Required Parameters
**Description:** Write a helper function `required(paramName)` set as a default parameter value that throws an Error if missing.

**Expected Behavior / Test:**
```js
fn() // throws "Missing paramName"
```

---

## Problem 9: Rest Parameter Location Rule
**Description:** Show that rest parameter `...rest` must be the last parameter in the signature or it raises a `SyntaxError`.

**Expected Behavior / Test:**
```js
fn(a, ...b)
```

---

## Problem 10: Array Destructuring Parameters
**Description:** Write a function `getCoordinates([x = 0, y = 0, z = 0] = [])` that extracts 3D coordinates.

**Expected Behavior / Test:**
```js
getCoordinates([10, 20]) // [10, 20, 0]
```

---

## Problem 11: Function `length` Property
**Description:** Check `fn.length` on functions with default params and rest params to show parameter arity count rule.

**Expected Behavior / Test:**
```js
fn.length
```

---

## Problem 12: Variadic Sum with Rest Parameter
**Description:** Write a function `sumNumbers(...nums)` returning 0 when called with 0 args, or the sum of all arguments.

**Expected Behavior / Test:**
```js
sumNumbers(1, 2, 3) // 6
```

---

## Problem 13: Parameter Scope Isolation
**Description:** Show that default parameters live in their own scope between parent scope and function body scope.

**Expected Behavior / Test:**
```js
paramScopeTest()
```

---

## Problem 14: Merging Options Object
**Description:** Write `fetchData(url, customConfig)` that merges default config `{ method: "GET", headers: {} }` with `customConfig`.

**Expected Behavior / Test:**
```js
fetchData("/api", { headers: { Auth: "Bearer token" } })
```

---

## Problem 15: Ignoring Extra Arguments
**Description:** Demonstrate what happens when passing 5 arguments to a function accepting only 2 parameters.

**Expected Behavior / Test:**
```js
add(1, 2, 3, 4, 5) // 3
```

---

