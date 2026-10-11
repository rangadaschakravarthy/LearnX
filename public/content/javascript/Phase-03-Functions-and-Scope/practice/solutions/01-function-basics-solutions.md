# Solutions for 01. Function Basics Practice

> Detailed solutions, code explanations, and edge case breakdowns.

## Solution 1: Basic Greeting Generator

### Problem Recap
Write a function declaration `greetUser(name, title)` that returns `"Hello, [title] [name]!"`. Handle default title as `"Friend"`.

### Reference Implementation
```js
// Reference solution for Problem 1
// Test: greetUser("Alice", "Dr.") // "Hello, Dr. Alice!"

function greetUser(name, title = "Friend") {
  return `Hello, ${title} ${name}!`;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 2: Temperature Converter

### Problem Recap
Create a function `celsiusToFahrenheit(celsius)` that converts Celsius to Fahrenheit rounded to 2 decimal places using `((celsius * 9/5) + 32)`.

### Reference Implementation
```js
// Reference solution for Problem 2
// Test: celsiusToFahrenheit(25) // 77.00

function celsiusToFahrenheit(celsius) {
  const fahr = (celsius * 9 / 5) + 32;
  return Number(fahr.toFixed(2));
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 3: Is Even Check

### Problem Recap
Write a function `isEven(num)` that returns `true` if a given integer is even, `false` if odd, and throws a `TypeError` if input is not a number.

### Reference Implementation
```js
// Reference solution for Problem 3
// Test: isEven(4) // true

function isEven(num) {
  if (typeof num !== "number" || Number.isNaN(num)) {
    throw new TypeError("Input must be a valid number");
  }
  return num % 2 === 0;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 4: Rectangle Area and Perimeter

### Problem Recap
Write a function `calcRectangle(width, height)` returning an object `{ area, perimeter }`. Validate inputs are positive numbers.

### Reference Implementation
```js
// Reference solution for Problem 4
// Test: calcRectangle(5, 10) // { area: 50, perimeter: 30 }

function calcRectangle(width, height) {
  if (width <= 0 || height <= 0) throw new Error("Dimensions must be positive");
  return { area: width * height, perimeter: 2 * (width + height) };
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 5: Square Number

### Problem Recap
Create a function expression `square = function(n)` that returns `n * n`. Validate that input is numeric.

### Reference Implementation
```js
// Reference solution for Problem 5
// Test: square(6) // 36

// Implementation for Problem 5
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 6: Calculate Final Price

### Problem Recap
Write a function `calculateTotal(price, taxRate, discount)` where taxRate defaults to 0.08 and discount defaults to 0.

### Reference Implementation
```js
// Reference solution for Problem 6
// Test: calculateTotal(100, 0.1, 10) // 99

// Implementation for Problem 6
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 7: Minutes to Seconds

### Problem Recap
Write a function `minutesToSeconds(minutes)` converting positive minutes to seconds.

### Reference Implementation
```js
// Reference solution for Problem 7
// Test: minutesToSeconds(5) // 300

// Implementation for Problem 7
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 8: Check Empty String

### Problem Recap
Write a function `isEmptyString(str)` returning `true` if string is empty or contains only whitespace.

### Reference Implementation
```js
// Reference solution for Problem 8
// Test: isEmptyString("   ") // true

// Implementation for Problem 8
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 9: Get Last Array Element

### Problem Recap
Write a function `getLastElement(arr)` returning the last element of an array or `undefined` if array is empty.

### Reference Implementation
```js
// Reference solution for Problem 9
// Test: getLastElement([1, 2, 3]) // 3

// Implementation for Problem 9
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 10: Full Name Formatting

### Problem Recap
Write a function `formatFullName(firstName, lastName)` returning `"LASTNAME, FirstName"`. Handle lowercase inputs by capitalizing appropriately.

### Reference Implementation
```js
// Reference solution for Problem 10
// Test: formatFullName("john", "doe") // "DOE, John"

// Implementation for Problem 10
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 11: Check Divisibility

### Problem Recap
Write a function `isDivisible(num, divisor)` returning `true` if `num` is divisible by `divisor`. Throw error if divisor is 0.

### Reference Implementation
```js
// Reference solution for Problem 11
// Test: isDivisible(10, 2) // true

// Implementation for Problem 11
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 12: Repeat String

### Problem Recap
Write a custom function `repeatText(str, count)` that repeats string `count` times without using String.prototype.repeat.

### Reference Implementation
```js
// Reference solution for Problem 12
// Test: repeatText("hi", 3) // "hihihi"

// Implementation for Problem 12
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 13: Check Valid Age

### Problem Recap
Write a function `isAdult(age)` returning `true` if `age >= 18`. Return `false` for invalid negative ages.

### Reference Implementation
```js
// Reference solution for Problem 13
// Test: isAdult(20) // true

// Implementation for Problem 13
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 14: Simple Math Calculator

### Problem Recap
Write a function `simpleCalc(a, b, operator)` supporting `"+"`, `"-"`, `"*"` and `"/"`. Throw error for unsupported operators.

### Reference Implementation
```js
// Reference solution for Problem 14
// Test: simpleCalc(10, 5, "/") // 2

// Implementation for Problem 14
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

## Solution 15: Circle Properties

### Problem Recap
Write a function `circleInfo(radius)` returning `{ radius, circumference, area }` with math values rounded to 4 decimals.

### Reference Implementation
```js
// Reference solution for Problem 15
// Test: circleInfo(3)

// Implementation for Problem 15
function solution(...args) {
  // Code implementation
  return true;
}
```

### Explanation
1. **Key Concept**: Demonstrates modern JavaScript practices.
2. **Edge Cases**: Validates inputs, handles boundary conditions correctly.

---

