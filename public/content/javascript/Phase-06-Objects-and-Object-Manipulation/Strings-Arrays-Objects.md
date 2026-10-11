# Data Transformation Pipeline: Strings ➔ Arrays ➔ Objects

Modern applications often parse formatted strings into arrays and transform them into structured objects:

```js
// 1. Raw string input:
const csvLine = "Alex,22,Developer";

// 2. String to Array via split():
const fields = csvLine.split(","); // ["Alex", "22", "Developer"]

// 3. Array to Object structure:
const userObject = {
  name: fields[0],
  age: Number(fields[1]),
  role: fields[2]
};

console.log("Transformed Object:", userObject);
// Output: { name: "Alex", age: 22, role: "Developer" }
```
