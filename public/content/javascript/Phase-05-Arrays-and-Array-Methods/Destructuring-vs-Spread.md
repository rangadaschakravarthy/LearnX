# Array Destructuring vs Spread Syntax

Although both features use the `...` syntax, array destructuring and spread syntax serve opposite functions in JavaScript:

---

## 1. Array Destructuring (Extracting Values)

Array destructuring unpacks values from an array into distinct local variables:

```js
const colors = ["red", "green", "blue"];

// Unpacking variables:
const [first, second] = colors;
console.log(first, second); // "red", "green"

// Rest syntax in destructuring (collects remaining items into an array):
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]
```

---

## 2. Spread Syntax (Expanding Elements)

Spread syntax expands an array's elements into individual arguments or elements:

```js
const arr1 = [1, 2];
const arr2 = [3, 4];

// Combining arrays:
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

// Passing array elements as function arguments:
const nums = [10, 50, 20];
const max = Math.max(...nums); // 50
```
