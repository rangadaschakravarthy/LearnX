# Arithmetic & Assignment Operators

## 1. What is it?
Arithmetic operators perform mathematical calculations on numerical operands. Compound assignment operators evaluate a math operation and assign the updated result back to a variable in a single concise statement.

---

## 2. Operator Overview Table

| Operator | Name | Syntax Example | Evaluates To |
| :--- | :--- | :--- | :--- |
| `+` | Addition | `10 + 5` | `15` |
| `-` | Subtraction | `10 - 5` | `5` |
| `*` | Multiplication | `10 * 5` | `50` |
| `/` | Division | `10 / 5` | `2` |
| `%` | Modulus (Remainder) | `10 % 3` | `1` |
| `**` | Exponentiation | `2 ** 3` | `8` ($2^3$) |
| `++` | Prefix Increment | `++x` | Increments $x$ **before** returning value |
| `++` | Postfix Increment | `x++` | Returns current $x$ **then** increments |

---

## 3. Prefix (`++x`) vs Postfix (`x++`) Deep Dive

```text
🔥 Must Know Execution Difference: Prefix vs Postfix

Prefix (++x): 1. Increment value by 1 immediately. 2. Return the NEW incremented value.
Postfix (x++): 1. Return the CURRENT value. 2. Increment value by 1 afterwards.
```

```javascript
// 1. Postfix Example
let a = 5;
let b = a++; // b gets current value 5; a becomes 6
console.log("a:", a); // 6
console.log("b:", b); // 5

// 2. Prefix Example
let x = 5;
let y = ++x; // x becomes 6 immediately; y gets new value 6
console.log("x:", x); // 6
console.log("y:", y); // 6
```

---

## 4. Compound Assignment Operators

```javascript
let balance = 100;

balance += 50;  // balance = balance + 50 (150)
balance -= 20;  // balance = balance - 20 (130)
balance *= 2;   // balance = balance * 2  (260)
balance /= 4;   // balance = balance / 4  (65)
balance %= 10;  // balance = balance % 10 (5)
balance **= 3;  // balance = balance ** 3 (125)
```

---

## 5. Step-by-Step Explanation
1. `let b = a++`: The engine reads `a` (5), assigns `5` to `b`, and then increments `a` to `6`.
2. `let y = ++x`: The engine increments `x` from `5` to `6`, and then assigns the updated `6` to `y`.

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Modulus with negative numbers
```

In JavaScript, the remainder operator `%` takes the sign of the **left operand**:
```javascript
console.log(-10 % 3); // -1 (Not 2!)
console.log(10 % -3); // 1
```

---

## 7. Edge Cases
- Division by zero in JavaScript does NOT throw an error! It returns `Infinity` or `-Infinity`:
```javascript
console.log(10 / 0);  // Infinity
console.log(-10 / 0); // -Infinity
console.log(0 / 0);   // NaN
```

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: Predict the output of `let x = 5; console.log(x++ + ++x);`.**
  - *Answer*: `12`. Explanation: `x++` returns `5` (and increments `x` to `6`). Next, `++x` increments `x` from `6` to `7` and returns `7`. Finally, `5 + 7 = 12`.

---

## 9. Practice Questions
1. What is the result of `2 ** 4`?
2. Predict the output of `let count = 10; console.log(count++); console.log(count);`.
3. What does `0 / 0` evaluate to?

---

## 10. Key Takeaways
- Prefix `++x` increments before value evaluation; Postfix `x++` returns current value before incrementing.
- `%` calculates remainder and takes the sign of the left operand.
- Division by zero returns `Infinity` or `NaN`.
