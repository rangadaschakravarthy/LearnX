# Numbers, BigInt, `NaN` & Floating-Point Precision

## 1. What is it?
In JavaScript, all standard numbers are stored as **64-bit double-precision IEEE 754 floating-point numbers**.

Unlike languages with `int`, `float`, and `double` distinctions, JavaScript's `Number` type handles both integers and decimals under a single numeric structure.

---

## 2. Safe Integer Boundaries

Because numbers follow 64-bit IEEE 754 floats, integers are only exact up to $2^{53} - 1$.

```javascript
console.log(Number.MAX_SAFE_INTEGER); //  9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// Beyond safe limit, math precision breaks!
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992 (Precision loss!)
```

---

## 3. BigInt: Arbitrary Precision Integers

To safely calculate integers beyond $2^{53} - 1$ (e.g. database 64-bit IDs, cryptography, financial values), ES2020 introduced **BigInt**:

```javascript
const bigIntLiteral = 9007199254740991n + 2n;
console.log(bigIntLiteral); // 9007199254740993n
```

---

## 4. Floating Point Precision (`0.1 + 0.2`)

```text
🔥 Must Know Classic JS Trap: 0.1 + 0.2 !== 0.3
```

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false!
```

### Why?
Computers represent numbers in binary (base-2). Decimals like `0.1` and `0.2` cannot be represented infinitely exact in binary floating point math, causing tiny rounding errors when converted back to base-10 string outputs.

---

## 5. Special Numeric Values: `NaN`, `Infinity`, `-Infinity`

```javascript
// 1. Infinity & -Infinity
console.log(1 / 0);  // Infinity
console.log(-1 / 0); // -Infinity

// 2. NaN (Not-a-Number)
const invalidMath = "abc" * 5;
console.log(invalidMath); // NaN

// NaN Trap: NaN is NEVER equal to anything, including itself!
console.log(NaN === NaN); // false!

// Solution: Use Number.isNaN()
console.log(Number.isNaN(invalidMath)); // true
```

---

## 6. Helpful Number Checking Methods

```javascript
Number.isNaN(val)        // Checks if val is strictly NaN
Number.isFinite(val)     // Checks if val is a finite number (not Infinity or NaN)
Number.isInteger(val)    // Checks if val is an integer
Number.isSafeInteger(val)// Checks if val is within safe integer boundaries
```

---

## 7. Common Mistakes

```text
⚠️ JavaScript Gotcha: isNaN() vs Number.isNaN()
```

```javascript
// Global isNaN() coerces non-numbers first!
console.log(isNaN("hello")); // true (Because String "hello" converts to NaN)

// Number.isNaN() does NOT coerce (Strict type check)
console.log(Number.isNaN("hello")); // false ("hello" is a String, not NaN!)
```

---

## 8. Edge Cases
- `typeof NaN` returns `"number"`! (Because `NaN` is technically defined as a numeric standard value under IEEE 754).

---

## 9. Interview Perspective

### 🧠 Deep Concept Interview Questions
- **Q: Why does `typeof NaN` return `"number"`?**
  - *Answer*: Under the IEEE 754 floating-point specification, `NaN` (Not-a-Number) is an official numeric error-state value. Therefore, its language type is `Number`.
- **Q: How do you safely compare floating-point calculations like `0.1 + 0.2 === 0.3`?**
  - *Answer*: Check if the absolute difference is less than `Number.EPSILON`:  
    `Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON`

---

## 10. Practice Questions
1. What is the value of `Number.MAX_SAFE_INTEGER`?
2. Predict the result of `NaN === NaN`.
3. Why does `0.1 + 0.2` evaluate to `0.30000000000000004`?

---

## 11. Key Takeaways
- All standard JS numbers are 64-bit IEEE 754 floating-point values.
- Use `BigInt` for integers beyond `Number.MAX_SAFE_INTEGER` ($2^{53} - 1$).
- `NaN` is not equal to itself; use `Number.isNaN()` for accurate checks.
- Floating-point calculations can produce tiny binary precision rounding inaccuracies.
