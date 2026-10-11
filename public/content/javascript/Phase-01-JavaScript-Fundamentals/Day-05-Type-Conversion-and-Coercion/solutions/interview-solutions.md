# Day 05 Interview Question Solutions

### Question 1: What is the difference between Type Conversion and Type Coercion?
**Answer Summary:** Type Conversion is explicit, intentional casting using constructors (`String()`, `Number()`, `Boolean()`). Type Coercion is implicit, automatic conversion performed by the JS engine during operations like `"5" + 2`.

---

### Question 2: List all 8 falsy values in JavaScript.
**Answer Summary:** `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. All other values are truthy.

---

### Question 3: Why does `Number("10px")` return `NaN` while `parseInt("10px", 10)` returns `10`?
**Answer Summary:** `Number()` attempts strict total-string conversion, returning `NaN` if any non-numeric character is present. `parseInt(str, 10)` parses from left to right, extracting leading integer digits until encountering a non-digit character (`'p'`).

---

### Question 4: Explain the step-by-step trace of `"0" == []`.
**Answer Summary:** `[]` is coerced to primitive `""`. Expression becomes `"0" == ""`. Since both operands are now strings, Abstract Equality compares them as strings without converting to numbers, evaluating `"0" === ""` to `false`.

---

### Question 5: How does JavaScript perform Object-to-Primitive conversion?
**Answer Summary:** Checks for `Symbol.toPrimitive(hint)`. If absent, checks hint rules: for string hints, tries `.toString()` then `.valueOf()`; for number or default hints, tries `.valueOf()` then `.toString()`. First method returning a primitive is used.
