# 03. Arrow Functions Practice

> Practice problems covering 03. Arrow Functions Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Implicit Return Object Literal
**Description:** Write an arrow function `createPoint = (x, y) => ({ x, y })` demonstrating correct parenthesized object implicit return.

**Expected Behavior / Test:**
```js
createPoint(10, 20) // { x: 10, y: 20 }
```

---

## Problem 2: Array Transformation Pipeline
**Description:** Transform array `[1, 2, 3, 4, 5]` by filtering even numbers and squaring them using arrow functions.

**Expected Behavior / Test:**
```js
[2, 4] -> [4, 16]
```

---

## Problem 3: Lexical `arguments` Trapping
**Description:** Write a traditional function wrapping an arrow function to show how arrow functions inherit `arguments` lexically.

**Expected Behavior / Test:**
```js
outer(1, 2, 3)
```

---

## Problem 4: Arrow Function as Constructor Error
**Description:** Demonstrate that calling `new` on an arrow function throws a `TypeError`. Explain why.

**Expected Behavior / Test:**
```js
new (() => {})() // TypeError
```

---

## Problem 5: Single Parameter Parentheses Omission
**Description:** Write arrow functions showcasing parameter syntax with 0, 1 (no parens), and multiple parameters.

**Expected Behavior / Test:**
```js
x => x * 2
```

---

## Problem 6: Curried Arrow Functions
**Description:** Write a 3-level curried arrow function `multiplyThree = a => b => c => a * b * c`.

**Expected Behavior / Test:**
```js
multiplyThree(2)(3)(4) // 24
```

---

## Problem 7: Lexical `this` Binding Preview
**Description:** Create a timer object using `setInterval` inside a method to demonstrate arrow function lexical `this`.

**Expected Behavior / Test:**
```js
timer.start()
```

---

## Problem 8: Arrow Function Prototype Property
**Description:** Demonstrate that arrow functions lack a `.prototype` property (`undefined`).

**Expected Behavior / Test:**
```js
(()=>{}).prototype === undefined // true
```

---

## Problem 9: Ternary Arrow Function
**Description:** Write a concise arrow function `getAbs = n => n < 0 ? -n : n`.

**Expected Behavior / Test:**
```js
getAbs(-5) // 5
```

---

## Problem 10: Arrow Function Multiline Body
**Description:** Write an arrow function with explicit `{ return ... }` body block and multiline validation logic.

**Expected Behavior / Test:**
```js
processScore(85)
```

---

## Problem 11: Filtering Arrays of Objects
**Description:** Filter an array of user objects to get active users over age 18 using arrow functions.

**Expected Behavior / Test:**
```js
users.filter(u => u.active && u.age > 18)
```

---

## Problem 12: Arrow Function with Rest Parameter
**Description:** Write an arrow function `sumAll = (...nums) => nums.reduce((a, b) => a + b, 0)`.

**Expected Behavior / Test:**
```js
sumAll(1, 2, 3, 4) // 10
```

---

## Problem 13: Object Method Pitfall
**Description:** Demonstrate why defining object methods with arrow functions breaks `this.propertyName` access.

**Expected Behavior / Test:**
```js
person.sayName() // undefined
```

---

## Problem 14: Arrow Function Sorting
**Description:** Sort string array by string length descending using arrow function comparator `(a, b) => b.length - a.length`.

**Expected Behavior / Test:**
```js
["a", "bbb", "cc"].sort(...)
```

---

## Problem 15: Arrow Function Destructuring
**Description:** Write an arrow function `printUser = ({ name, age }) => `${name} is ${age}``.

**Expected Behavior / Test:**
```js
printUser({ name: "Bob", age: 30 })
```

---

