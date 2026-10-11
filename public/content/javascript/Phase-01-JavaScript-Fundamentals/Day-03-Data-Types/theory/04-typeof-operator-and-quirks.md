# The `typeof` Operator & Historical Quirks

## 1. What is it?
The `typeof` operator is a unary operator that evaluates a JavaScript expression and returns a **string** indicating the data type of the operand.

---

## 2. Master `typeof` Evaluation Matrix

| Expression | `typeof` Result | Notes / Explanation |
| :--- | :--- | :--- |
| `typeof "Hello"` | `"string"` | Primitive String |
| `typeof 42` | `"number"` | Primitive Number |
| `typeof 100n` | `"bigint"` | Primitive BigInt |
| `typeof true` | `"boolean"` | Primitive Boolean |
| `typeof undefined` | `"undefined"` | Primitive Undefined |
| `typeof Symbol("id")` | `"symbol"` | Primitive Symbol |
| `typeof null` | `"object"` | ⚠️ **Historical JS Bug (Legacy Tag 0x00)** |
| `typeof {}` | `"object"` | Plain Object |
| `typeof []` | `"object"` | Array (Object Subtype) |
| `typeof function(){}`| `"function"` | Callable Function (Object Subtype) |
| `typeof NaN` | `"number"` | IEEE 754 Floating-Point Error State |
| `typeof Date` | `"function"` | Built-in Constructor Function |
| `typeof new Date()` | `"object"` | Object Instance |

---

## 3. Code Example

```javascript
console.log(typeof "JavaScript"); // "string"
console.log(typeof 3.14159);      // "number"
console.log(typeof (10 > 5));     // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof Symbol());     // "symbol"
console.log(typeof null);         // "object" ⚠️
console.log(typeof [1, 2, 3]);    // "object"
console.log(typeof (() => {}));   // "function"
```

---

## 4. Why `typeof null === "object"` Exists

In the original 1995 JavaScript implementation by Brendan Eich, JavaScript values were stored in 32-bit units composed of a type tag (1-3 bits) and the actual value.

- Object type tag: `000`
- `null` pointer representation: `0x00` (All zeros)

Because `null`'s type tag was bitwise `000`, the engine parsed it as an Object! A proposal to fix this in ECMAScript was rejected because fixing it would break thousands of existing websites built on legacy code.

---

## 5. Precise Array Checking: `Array.isArray()`

Because `typeof []` returns `"object"`, you cannot use `typeof` to distinguish arrays from objects. Use `Array.isArray()` instead:

```javascript
const items = [10, 20, 30];

console.log(typeof items);        // "object" (Vague!)
console.log(Array.isArray(items));// true (Precise!)
```

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Checking for null with typeof
```

### Incorrect Code:
```javascript
function processData(data) {
  if (typeof data === "object") {
    // ❌ DANGER! If data is null, typeof data === "object" is TRUE!
    console.log(data.name); // TypeError: Cannot read properties of null (reading 'name')
  }
}
```

### Correct Code:
```javascript
function processData(data) {
  if (data !== null && typeof data === "object") {
    console.log(data.name); // Safe!
  }
}
```

---

## 7. Edge Cases
- `typeof` is the ONLY operator that does not throw a `ReferenceError` when passed an undeclared variable:
```javascript
console.log(typeof undeclaredVariable); // "undefined" (Safe!)
```

---

## 8. Interview Perspective

### 🧠 Deep Concept Interview Questions
- **Q: Why does `typeof null` return `"object"`?**
  - *Answer*: This is a legacy bug from the original 1995 JS engine implementation where object values were flagged with a type tag of `000`. `null` was represented as the null pointer (`0x00`), matching the `000` bitwise tag. It is preserved for backward web compatibility.

---

## 9. Practice Questions
1. Predict the output of `typeof typeof 42`.
2. How do you accurately test if a variable is an array in JavaScript?
3. Predict the output of `typeof null`.

---

## 10. Key Takeaways
- `typeof` returns a string representing an expression's type.
- `typeof null === "object"` is a famous legacy bug.
- Use `Array.isArray(val)` to distinguish arrays from objects.
- `typeof undeclaredVar` returns `"undefined"` without throwing an error.
