# Day 5 Interview Questions — Type Conversion and Coercion

### Question 1 (Conceptual): What is the difference between Type Conversion and Type Coercion?
**Answer:** Type Conversion (or Type Casting) is explicit, intentional transformation of a data value from one type to another using methods like `String()`, `Number()`, or `parseInt()`. Type Coercion is implicit, automatic conversion performed by the JavaScript engine behind the scenes during operations like `"5" + 2` or `if (val)`.

### Question 2 (Conceptual): List all 8 falsy values in JavaScript.
**Answer:** `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. All other values (including `[]`, `{}`, `"0"`, and `"false"`) are truthy.

### Question 3 (Tricky): Why does `Number("10px")` return `NaN` while `parseInt("10px", 10)` returns `10`?
**Answer:** `Number()` performs strict total-string conversion, returning `NaN` if any non-numeric character is present. `parseInt(str, 10)` parses from left to right, extracting leading integer digits until encountering a non-digit character (`'p'`).

### Question 4 (Conceptual): Explain the step-by-step trace of `"0" == []`.
**Answer:**
1. Object `[]` is coerced to a primitive using `[].toString()`, returning `""`.
2. Expression becomes `"0" == ""`.
3. Since both operands are now Strings, Abstract Equality compares them directly as strings without converting to numbers.
4. `"0" === ""` evaluates to `false`.

### Question 5 (Best Practice): How does JavaScript perform Object-to-Primitive conversion?
**Answer:** The engine checks for `Symbol.toPrimitive(hint)`. If absent, it follows hint rules: for string hints, it invokes `.toString()` then `.valueOf()`; for number or default hints, it invokes `.valueOf()` then `.toString()`. The first method returning a primitive value is used.
