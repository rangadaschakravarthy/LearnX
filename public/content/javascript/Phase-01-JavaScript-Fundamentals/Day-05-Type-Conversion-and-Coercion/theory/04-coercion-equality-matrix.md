# Coercion Equality Rules & Abstract Equality Comparison

## 1. What is it?
When using Loose Equality (`==`), JavaScript executes the **Abstract Equality Comparison Algorithm** (ECMA-262 Section 7.2.14). If the operands have different data types, JS implicitly converts one or both operands until their types match before comparing values.

---

## 2. Abstract Equality Algorithm Steps

```text
1. If Type(x) is same as Type(y), return x === y.
2. If x is null and y is undefined, return true.
3. If x is undefined and y is null, return true.
4. If Type(x) is Number and Type(y) is String, return x == ToNumber(y).
5. If Type(x) is String and Type(y) is Number, return ToNumber(x) == y.
6. If Type(x) is Boolean, return ToNumber(x) == y.
7. If Type(y) is Boolean, return x == ToNumber(y).
8. If Type(x) is String/Number/BigInt/Symbol and Type(y) is Object, return x == ToPrimitive(y).
```

---

## 3. The Infamous Coercion Traps Table

| Expression | Evaluates To | Step-by-Step Coercion Trace |
| :--- | :--- | :--- |
| `0 == false` | `true` | `false` coerces to `0` $\rightarrow$ `0 == 0` |
| `"" == false` | `true` | `false` coerces to `0`, `""` coerces to `0` $\rightarrow$ `0 == 0` |
| `"" == 0` | `true` | `""` coerces to `0` $\rightarrow$ `0 == 0` |
| `0 == []` | `true` | `[]` coerces to primitive `""`, `""` coerces to `0` $\rightarrow$ `0 == 0` |
| `"0" == []` | **`false`** | `[]` coerces to primitive `""` $\rightarrow$ `"0" == ""` (String vs String equality check!) |
| `null == undefined` | `true` | Explicit spec rule |
| `null == 0` | `false` | `null` ONLY equals `null` or `undefined` under `==` |
| `NaN == NaN` | `false` | `NaN` is never equal to anything |

---

## 4. Tracing `0 == []` vs `"0" == []`

```javascript
// Tracing 0 == []
// Step 1: [] is Object; convert to primitive using [].toString() -> ""
// Step 2: 0 == ""
// Step 3: "" is String; convert to number using Number("") -> 0
// Step 4: 0 == 0 -> true!
console.log(0 == []); // true

// Tracing "0" == []
// Step 1: [] is Object; convert to primitive using [].toString() -> ""
// Step 2: "0" == ""
// Step 3: Both operands are now Strings! Perform String equality check.
// Step 4: "0" === "" -> false!
console.log("0" == []); // false
```

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: Relying on implicit coercion in conditional checks
```

```javascript
// BAD: Loose check produces unexpected behavior
if (userInputValue == false) { ... }

// GOOD: Always use strict equality
if (userInputValue === false) { ... }
```

---

## 6. Edge Cases
- `[] == ![]` evaluates to `true`!
  - Step 1: `![]` evaluates to `!true` $\rightarrow$ `false`.
  - Step 2: `[] == false`.
  - Step 3: `[]` converts to `""`, `false` converts to `0`.
  - Step 4: `""` converts to `0` $\rightarrow$ `0 == 0` $\rightarrow$ `true`!

---

## 7. Interview Perspective

### 🧠 Deep Concept Interview Questions
- **Q: Why does `[] == ![]` evaluate to `true`?**
  - *Answer*: `![]` executes first due to unary operator precedence, converting array object `[]` (truthy) to boolean `false`. Next, `[] == false` converts array `[]` to primitive `""` and boolean `false` to `0`. Finally, `""` converts to number `0`, resulting in `0 == 0` (`true`).

---

## 8. Practice Questions
1. Predict result of `"" == false`.
2. Predict result of `null == 0`.
3. Predict result of `[] == ![]`.

---

## 9. Key Takeaways
- `==` executes the multi-step Abstract Equality Comparison Algorithm.
- Booleans are coerced to numbers (`true -> 1`, `false -> 0`) under `==`.
- `null == undefined` is `true`, but `null` is not equal to `0` or `false`.
- Always use `===` to prevent Abstract Equality coercion traps.
