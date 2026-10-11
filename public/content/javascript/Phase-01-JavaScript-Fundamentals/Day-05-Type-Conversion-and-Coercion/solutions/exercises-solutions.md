# Day 05 Exercises Solutions

## Exercise 1 (🟢 Easy): Explicit Conversion Solutions
```javascript
// TODO 1: String(null)        -> "null"
// TODO 2: Number("100")       -> 100
// TODO 3: Number("100px")     -> NaN
// TODO 4: parseInt("100px",10)-> 100
// TODO 5: Boolean("false")    -> true (Non-empty string is truthy!)
```

---

## Exercise 2 (🟡 Medium): Implicit Coercion Solutions
```javascript
console.log("10" + 20); // "1020" (String concatenation)
console.log("10" - 20); // -10 (Numeric subtraction)

console.log(true + true + false); // 2 (1 + 1 + 0)

console.log(10 + 20 + "30"); // "3030" (10 + 20 = 30; 30 + "30" = "3030")
console.log("10" + 20 + 30); // "102030" ("10" + 20 = "1020"; "1020" + 30 = "102030")

console.log(10 * null); // 0 (10 * 0 = 0)
console.log(10 * undefined); // NaN (10 * NaN = NaN)
```

---

## Exercise 3 (🔴 Challenge): Abstract Equality Trace Solution
```javascript
"use strict";

// Step-by-step trace of [] == ![]
// 1. ![] evaluates to !true -> false. Expression: [] == false
// 2. Boolean false converts to number 0 via ToNumber. Expression: [] == 0
// 3. Object [] converts to primitive "" via [].toString(). Expression: "" == 0
// 4. String "" converts to number 0 via ToNumber. Expression: 0 == 0
// 5. 0 === 0 evaluates to true.

console.log("Result of [] == ![]:", [] == ![]); // true
```
