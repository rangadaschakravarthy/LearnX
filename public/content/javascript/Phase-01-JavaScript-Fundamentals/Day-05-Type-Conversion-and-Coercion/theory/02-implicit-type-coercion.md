# Implicit Type Coercion Mechanisms

## 1. What is it?
**Implicit Type Coercion** is the automatic, behind-the-scenes conversion of values from one data type to another performed by the JavaScript engine during mathematical operations, string concatenations, or boolean conditional evaluations.

---

## 2. String Concatenation vs Arithmetic Coercion

```text
🔥 Master Coercion Rule:
1. Addition (+) Operator: If EITHER operand is a String, JS coerces BOTH operands to Strings and concatenates!
2. Other Math Operators (-, *, /, %, **): JS coerces BOTH operands to Numbers!
```

```javascript
// Addition (+) -> String Concatenation prioritized!
console.log("5" + 2);     // "52" (Number 2 coerced to String "2")
console.log(2 + "5");     // "25"
console.log("5" + true);  // "5true"
console.log("5" + null);  // "5null"

// Subtraction / Multiplication / Division -> Numeric Coercion prioritized!
console.log("5" - 2);     // 3 (String "5" coerced to Number 5)
console.log("5" * "2");   // 10 (Both coerced to Numbers)
console.log("10" / "2");  // 5
console.log("5" - true);  // 4 (true coerced to 1)
```

---

## 3. Coercion of Booleans & Special Values in Math

```javascript
true + 1          // 2 (true -> 1)
false + 1         // 1 (false -> 0)
null + 10         // 10 (null -> 0)
undefined + 10    // NaN (undefined -> NaN)
```

---

## 4. Left-to-Right Execution Order Traps

```javascript
console.log(1 + 2 + "3"); // "33" (1 + 2 = 3; 3 + "3" = "33")
console.log("1" + 2 + 3); // "123" ("1" + 2 = "12"; "12" + 3 = "123")
```

### Trace:
1. `1 + 2 + "3"`: `1 + 2` evaluates to numeric `3`. Next, `3 + "3"` encounters a string, coercing `3` to `"3"` resulting in `"33"`.
2. `"1" + 2 + 3`: `"1" + 2` encounters a string, coercing `2` to `"2"` resulting in `"12"`. Next, `"12" + 3` encounters a string, resulting in `"123"`.

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: Unexpected NaN from subtraction with undefined
```

```javascript
console.log("5" - null);      // 5 (5 - 0 = 5)
console.log("5" - undefined); // NaN (5 - NaN = NaN)
```

---

## 6. Edge Cases
- Combining empty arrays with math operators triggers string coercion:
```javascript
console.log([] + []); // "" ([].toString() -> "")
console.log([] + {}); // "[object Object]"
```

---

## 7. Interview Perspective

### 🎯 Interview Focus
- **Q: Predict the output of `"5" + 2` vs `"5" - 2` and explain why.**
  - *Answer*: `"5" + 2` outputs `"52"` because the `+` operator prioritizes string concatenation when a string is present. `"5" - 2` outputs `3` because mathematical subtraction `-` coerces string `"5"` to numeric `5`.

---

## 8. Practice Questions
1. Predict output of `1 + "2" + 3`.
2. Predict output of `true + false`.
3. Predict output of `"10" * null`.

---

## 9. Key Takeaways
- `+` with a string prioritizes string concatenation.
- `-`, `*`, `/`, `%` force numeric coercion.
- `true` coerces to `1`, `false` coerces to `0`, `null` coerces to `0`, `undefined` coerces to `NaN`.
