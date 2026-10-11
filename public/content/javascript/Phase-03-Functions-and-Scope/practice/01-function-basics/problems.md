# 01. Function Basics Practice

> Practice problems covering 01. Function Basics Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Basic Greeting Generator
**Description:** Write a function declaration `greetUser(name, title)` that returns `"Hello, [title] [name]!"`. Handle default title as `"Friend"`.

**Expected Behavior / Test:**
```js
greetUser("Alice", "Dr.") // "Hello, Dr. Alice!"
```

---

## Problem 2: Temperature Converter
**Description:** Create a function `celsiusToFahrenheit(celsius)` that converts Celsius to Fahrenheit rounded to 2 decimal places using `((celsius * 9/5) + 32)`.

**Expected Behavior / Test:**
```js
celsiusToFahrenheit(25) // 77.00
```

---

## Problem 3: Is Even Check
**Description:** Write a function `isEven(num)` that returns `true` if a given integer is even, `false` if odd, and throws a `TypeError` if input is not a number.

**Expected Behavior / Test:**
```js
isEven(4) // true
```

---

## Problem 4: Rectangle Area and Perimeter
**Description:** Write a function `calcRectangle(width, height)` returning an object `{ area, perimeter }`. Validate inputs are positive numbers.

**Expected Behavior / Test:**
```js
calcRectangle(5, 10) // { area: 50, perimeter: 30 }
```

---

## Problem 5: Square Number
**Description:** Create a function expression `square = function(n)` that returns `n * n`. Validate that input is numeric.

**Expected Behavior / Test:**
```js
square(6) // 36
```

---

## Problem 6: Calculate Final Price
**Description:** Write a function `calculateTotal(price, taxRate, discount)` where taxRate defaults to 0.08 and discount defaults to 0.

**Expected Behavior / Test:**
```js
calculateTotal(100, 0.1, 10) // 99
```

---

## Problem 7: Minutes to Seconds
**Description:** Write a function `minutesToSeconds(minutes)` converting positive minutes to seconds.

**Expected Behavior / Test:**
```js
minutesToSeconds(5) // 300
```

---

## Problem 8: Check Empty String
**Description:** Write a function `isEmptyString(str)` returning `true` if string is empty or contains only whitespace.

**Expected Behavior / Test:**
```js
isEmptyString("   ") // true
```

---

## Problem 9: Get Last Array Element
**Description:** Write a function `getLastElement(arr)` returning the last element of an array or `undefined` if array is empty.

**Expected Behavior / Test:**
```js
getLastElement([1, 2, 3]) // 3
```

---

## Problem 10: Full Name Formatting
**Description:** Write a function `formatFullName(firstName, lastName)` returning `"LASTNAME, FirstName"`. Handle lowercase inputs by capitalizing appropriately.

**Expected Behavior / Test:**
```js
formatFullName("john", "doe") // "DOE, John"
```

---

## Problem 11: Check Divisibility
**Description:** Write a function `isDivisible(num, divisor)` returning `true` if `num` is divisible by `divisor`. Throw error if divisor is 0.

**Expected Behavior / Test:**
```js
isDivisible(10, 2) // true
```

---

## Problem 12: Repeat String
**Description:** Write a custom function `repeatText(str, count)` that repeats string `count` times without using String.prototype.repeat.

**Expected Behavior / Test:**
```js
repeatText("hi", 3) // "hihihi"
```

---

## Problem 13: Check Valid Age
**Description:** Write a function `isAdult(age)` returning `true` if `age >= 18`. Return `false` for invalid negative ages.

**Expected Behavior / Test:**
```js
isAdult(20) // true
```

---

## Problem 14: Simple Math Calculator
**Description:** Write a function `simpleCalc(a, b, operator)` supporting `"+"`, `"-"`, `"*"` and `"/"`. Throw error for unsupported operators.

**Expected Behavior / Test:**
```js
simpleCalc(10, 5, "/") // 2
```

---

## Problem 15: Circle Properties
**Description:** Write a function `circleInfo(radius)` returning `{ radius, circumference, area }` with math values rounded to 4 decimals.

**Expected Behavior / Test:**
```js
circleInfo(3)
```

---

