# Ternary Operator, Unary Operators & Logical Assignment

## 1. What is it?
- **Ternary Operator (`condition ? exprIfTrue : exprIfFalse`)**: The only JavaScript operator that takes three operands. Operates as a concise single-line `if/else` expression.
- **Unary Operators**: Operators that act on a single operand (e.g. unary `+`, `-`, `!`, `typeof`, `delete`, `void`).
- **Logical Assignment Operators (ES2021)**: Combine logical operations with assignment (`&&=`, `||=`, `??=`).

---

## 2. Ternary Operator Syntax & Usage

```javascript
const age = 20;
const statusMessage = age >= 18 ? "Adult" : "Minor";
console.log(statusMessage); // "Adult"
```

### Chained / Nested Ternary Best Practices

```javascript
// ❌ Avoid deep nested ternary (hard to read)
const grade = score > 90 ? "A" : score > 80 ? "B" : score > 70 ? "C" : "F";

// ✅ Prefer explicit if/else blocks for complex multi-branching
```

---

## 3. Practical Unary Operators

| Unary Operator | Purpose | Example | Result |
| :--- | :--- | :--- | :--- |
| **Unary Plus (`+`)** | Coerces operand to Number | `+"100"` | `100` |
| **Unary Negation (`-`)** | Coerces operand to Number & negates | `-"50"` | `-50` |
| **Unary NOT (`!`)** | Converts operand to Boolean & negates | `!"hello"` | `false` |
| **`typeof`** | Returns string type tag | `typeof 42` | `"number"` |
| **`delete`** | Deletes property from an Object | `delete obj.prop` | `true` |
| **`void`** | Evaluates expression & returns `undefined` | `void 0` | `undefined` |

---

## 4. Logical Assignment Operators (ES2021)

Logical assignment operators combine logical evaluation (`&&`, `||`, `??`) with assignment (`=`):

```javascript
// 1. Logical OR Assignment (||=)
// Assigns right side ONLY IF left side is falsy
let title = "";
title ||= "Default Title";
console.log(title); // "Default Title"

// 2. Logical AND Assignment (&&=)
// Assigns right side ONLY IF left side is truthy
let userPermissions = { role: "admin" };
userPermissions.role &&= "SUPER_ADMIN";
console.log(userPermissions.role); // "SUPER_ADMIN"

// 3. Nullish Coalescing Assignment (??=)
// Assigns right side ONLY IF left side is null or undefined
let config = { timeout: 0 };
config.timeout ??= 5000;
console.log(config.timeout); // 0 (0 is defined!)
```

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: Misusing unary plus (+) on arrays
```

```javascript
console.log(+[]);    // 0 (Empty array converts to 0)
console.log(+[10]);  // 10 (Single element array converts to 10)
console.log(+[1,2]); // NaN (Multi-element array cannot convert to number)
```

---

## 6. Edge Cases
- `delete` operator deletes properties on objects, but CANNOT delete local `let`, `const`, or `var` variables in strict mode!

---

## 7. Interview Perspective

### 🎯 Interview Focus
- **Q: What is the difference between `x ||= y` and `x ??= y`?**
  - *Answer*: `x ||= y` assigns `y` to `x` if `x` is any **falsy** value (`false`, `0`, `""`, `null`, `undefined`, `NaN`). `x ??= y` assigns `y` to `x` strictly if `x` is **nullish** (`null` or `undefined`).

---

## 8. Practice Questions
1. Predict output of `+"42" + 8`.
2. Write a ternary expression that checks if `isMember` is `true`, returning `"Discount Applied"` or `"Standard Price"`.
3. Predict output of `let x = null; x ??= "Fallback";`.

---

## 9. Key Takeaways
- Use ternary `condition ? trueVal : falseVal` for inline conditional assignment expressions.
- Unary `+val` is a fast explicit syntax to convert strings to numbers.
- `??=` assigns only if the target is `null` or `undefined`.
