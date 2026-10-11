# Truthy and Falsy Values

## 1. What is it?
In JavaScript, when any non-boolean value is evaluated in a boolean context (such as an `if` statement condition, logical `&&`/`||` check, or `Boolean()` conversion), the engine coerces it to either `true` or `false`.

- A **Falsy** value is a value that coerces to `false`.
- A **Truthy** value is ANY value that is not falsy (coerces to `true`).

---

## 2. The Exactly 8 Falsy Values in JavaScript

```text
🔥 Must Memorize: Exactly 8 Falsy Values Exist in JavaScript

1. false     (Boolean false)
2. 0         (Numeric zero)
3. -0        (Negative zero)
4. 0n        (BigInt zero)
5. ""        (Empty string)
6. null      (Null)
7. undefined (Undefined)
8. NaN       (Not-a-Number)
```

**EVERY OTHER VALUE IN JAVASCRIPT IS TRUTHY!**

---

## 3. Commonly Misidentified Truthy Values

Beginners frequently assume the following values are falsy, but they are strictly **TRUTHY**:

```javascript
Boolean([])        // true (Empty Array is TRUTHY!)
Boolean({})        // true (Empty Object is TRUTHY!)
Boolean("0")       // true (Non-empty String containing '0' is TRUTHY!)
Boolean("false")   // true (Non-empty String containing 'false' is TRUTHY!)
Boolean(function(){})// true (Functions are TRUTHY!)
Boolean(-42)       // true (Negative numbers are TRUTHY!)
```

---

## 4. Code Example

```javascript
// Testing truthiness in if conditions
const items = [];

if (items) {
  console.log("Empty array [] is TRUTHY!"); // This line executes!
}

if ("") {
  console.log("Empty string executes");
} else {
  console.log("Empty string '' is FALSY!"); // This line executes!
}
```

---

## 5. Checking for Empty Objects & Arrays Safely

```javascript
const userList = [];

// ❌ Incorrect check (Empty array is truthy!):
if (userList) {
  // Always runs even when empty!
}

// ✅ Correct check:
if (userList.length > 0) {
  console.log("User list contains items");
}

const configObj = {};
// ✅ Correct check for empty object:
if (Object.keys(configObj).length > 0) {
  console.log("Config object contains keys");
}
```

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Treating "0" or "false" as falsy
```

```javascript
if ("0") {
  console.log('"0" is Truthy because it is a non-empty string!');
}
```

---

## 7. Edge Cases
- `document.all` in browsers is an intentional historical falsy object quirk maintained for legacy IE detection specs, but in standard JS code, all objects are truthy.

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: List all falsy values in JavaScript.**
  - *Answer*: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.
- **Q: Is an empty array `[]` truthy or falsy in an `if` condition?**
  - *Answer*: `[]` is an object instance, so it is strictly **truthy**.

---

## 9. Practice Questions
1. Predict result of `Boolean([])`.
2. Predict result of `Boolean("0")`.
3. Predict result of `Boolean(NaN)`.

---

## 10. Key Takeaways
- There are exactly 8 falsy values: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.
- All objects and arrays (including `[]` and `{}`) are truthy.
- Non-empty strings like `"0"` and `"false"` are truthy.
