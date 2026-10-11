# 02. Function Expressions Practice

> Practice problems covering 02. Function Expressions Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Named Function Expression Stack Trace
**Description:** Create a named function expression `const factorial = function fact(n)` and demonstrate that `fact` is accessible inside but not outside.

**Expected Behavior / Test:**
```js
factorial(5) // 120
```

---

## Problem 2: Conditional Function Definition
**Description:** Define `const getFormatter = function(mode)` returning different formatting functions based on mode (`"upper"` vs `"lower"`).

**Expected Behavior / Test:**
```js
getFormatter("upper")("hello") // "HELLO"
```

---

## Problem 3: Anonymous Callback Processor
**Description:** Assign an anonymous function expression to a variable `processNumbers` that takes an array and a transformer function.

**Expected Behavior / Test:**
```js
processNumbers([1, 2], function(x) { return x * 2; }) // [2, 4]
```

---

## Problem 4: IIFE Configuration Object
**Description:** Use an Immediately Invoked Function Expression (IIFE) to create a self-contained configuration object with private state.

**Expected Behavior / Test:**
```js
AppConfig.getApiUrl() // "https://api.example.com"
```

---

## Problem 5: Function Expression Array
**Description:** Store 3 math operation function expressions in an array `ops` and execute them sequentially on input `10`.

**Expected Behavior / Test:**
```js
ops[0](10) + ops[1](10)
```

---

## Problem 6: Dynamic Method Assignment
**Description:** Create an object `calculator` and dynamically assign method function expressions to it.

**Expected Behavior / Test:**
```js
calculator.add(5, 3) // 8
```

---

## Problem 7: First-Class Function Passing
**Description:** Write a function `executeTwice(fn, val)` that applies function expression `fn` twice to `val`.

**Expected Behavior / Test:**
```js
executeTwice(function(x){ return x + 3; }, 5) // 11
```

---

## Problem 8: Guard Clause Validator
**Description:** Write a function expression `const validateUser` that uses early return guard clauses to check user profile objects.

**Expected Behavior / Test:**
```js
validateUser({ name: "Alice", age: 25 })
```

---

## Problem 9: Conditional Function Reassignment
**Description:** Demonstrate reassigning a `let` function expression dynamically at runtime based on environment configuration.

**Expected Behavior / Test:**
```js
logger("test log")
```

---

## Problem 10: Function Expression Hoisting Demonstration
**Description:** Write code illustrating the exact TypeError raised when calling a `var` function expression before its assignment line.

**Expected Behavior / Test:**
```js
var fn; fn(); // TypeError: fn is not a function
```

---

## Problem 11: Recursive Named Function Expression
**Description:** Write a named function expression `const countdown = function cd(n)` that logs numbers from `n` down to 0.

**Expected Behavior / Test:**
```js
countdown(3)
```

---

## Problem 12: Function Expression as Event Listener Pattern
**Description:** Simulate an event emitter pattern using function expressions stored in an array handler table.

**Expected Behavior / Test:**
```js
emitter.emit("click", data)
```

---

## Problem 13: Object Property Shorthand with Function Expressions
**Description:** Create a math module object using object shorthand syntax with method function expressions.

**Expected Behavior / Test:**
```js
math.square(4) // 16
```

---

## Problem 14: Function Returning Function Expression
**Description:** Write `createMultiplier(factor)` that returns a function expression multiplying its parameter by `factor`.

**Expected Behavior / Test:**
```js
const double = createMultiplier(2); double(5) // 10
```

---

## Problem 15: Comparator Function Expression
**Description:** Write a function expression `byAge` to sort an array of person objects by age ascending.

**Expected Behavior / Test:**
```js
people.sort(byAge)
```

---

