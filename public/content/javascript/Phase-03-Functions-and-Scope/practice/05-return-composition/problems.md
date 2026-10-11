# 05. Return Values & Composition Practice

> Practice problems covering 05. Return Values & Composition Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Early Return Guard Clauses
**Description:** Refactor nested `if/else` checks inside `processPayment(user, amount)` into clean guard clause early returns.

**Expected Behavior / Test:**
```js
processPayment(null, 100) // "Invalid user"
```

---

## Problem 2: Automatic Semicolon Insertion (ASI) Return Pitfall
**Description:** Show why placing a return value on a new line returns `undefined` due to ASI: `return \n { data: 1 }`.

**Expected Behavior / Test:**
```js
getData() // undefined
```

---

## Problem 3: Function Pipe Implementation
**Description:** Write a unary `pipe(...fns)` function that composes functions from left to right: `pipe(f, g, h)(x)`.

**Expected Behavior / Test:**
```js
pipe(add1, double, square)(2) // 36
```

---

## Problem 4: Function Compose Implementation
**Description:** Write `compose(...fns)` that composes functions right to left: `compose(f, g)(x) === f(g(x))`.

**Expected Behavior / Test:**
```js
compose(square, add1)(2) // 9
```

---

## Problem 5: Multiple Return Values via Tuple
**Description:** Return `[min, max, average]` from `getStats(numbers)` using array destructuring on the return value.

**Expected Behavior / Test:**
```js
const [min, max, avg] = getStats([1, 2, 3, 4, 5])
```

---

## Problem 6: Multiple Return Values via Object
**Description:** Return `{ count, wordCount, charCount }` from `analyzeText(text)`.

**Expected Behavior / Test:**
```js
analyzeText("hello world")
```

---

## Problem 7: Explicit vs Implicit Undefined Return
**Description:** Compare `function f1(){}` vs `function f2(){ return; }` vs `function f3(){ return undefined; }`.

**Expected Behavior / Test:**
```js
f1() === f2()
```

---

## Problem 8: Chaining Method Call Return
**Description:** Create a builder object `StringBuilder` where methods return `this` to allow fluent method chaining.

**Expected Behavior / Test:**
```js
builder.append("a").append("b").toString()
```

---

## Problem 9: Safe Navigation Return Wrapper
**Description:** Write `safeExecute(fn, defaultVal, ...args)` that executes `fn` and returns `defaultVal` if an exception occurs.

**Expected Behavior / Test:**
```js
safeExecute(JSON.parse, {}, "invalid json") // {}
```

---

## Problem 10: Higher-Order Mapper Composition
**Description:** Compose `trim`, `toLowerCase`, and `replaceSpaces` functions to sanitize user search queries.

**Expected Behavior / Test:**
```js
sanitize("  Hello World  ") // "hello-world"
```

---

## Problem 11: Conditional Return Types
**Description:** Write `findUser(id)` returning user object if found, or `null` if not found. Document why returning `null` is better than `false`.

**Expected Behavior / Test:**
```js
findUser(999) // null
```

---

## Problem 12: Return Function Execution Result
**Description:** Write `executeIfCallable(value, ...args)` that calls `value` if it is a function, otherwise returns `value`.

**Expected Behavior / Test:**
```js
executeIfCallable(() => 42) // 42
```

---

## Problem 13: Reducer Composition Pipeline
**Description:** Use `Array.prototype.reduce` to pass initial value through an array of transformation functions.

**Expected Behavior / Test:**
```js
applyTransformations(10, [double, add5, square])
```

---

## Problem 14: Async Return Promise Preview
**Description:** Write an `async` function `fetchData()` and demonstrate that returning a value automatically wraps it in a resolved Promise.

**Expected Behavior / Test:**
```js
fetchData().then(val => ...)
```

---

## Problem 15: Recursion Return Bubble-Up
**Description:** Trace how return values bubble back up through call stack frames in a recursive `sum(n)` function.

**Expected Behavior / Test:**
```js
sum(3) // 6
```

---

