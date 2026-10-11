# Explicit Type Conversion

## 1. What is it?
**Explicit Type Conversion** (or Type Casting) occurs when a developer intentionally transforms a value from one data type to another using built-in constructors (`String()`, `Number()`, `Boolean()`) or parsing methods (`parseInt()`, `parseFloat()`).

---

## 2. Constructor Conversion Methods

```javascript
// 1. String Conversion
String(123)        // "123"
String(true)       // "true"
String(null)       // "null"
String(undefined)  // "undefined"
String([1, 2, 3])  // "1,2,3"

// 2. Number Conversion
Number("123")      // 123
Number("12.34")    // 12.34
Number("")         // 0
Number(true)       // 1
Number(false)      // 0
Number(null)       // 0
Number(undefined)  // NaN
Number("123px")    // NaN (Fails on non-digit characters!)

// 3. Boolean Conversion
Boolean(1)         // true
Boolean(0)         // false
Boolean("hello")   // true
Boolean("")        // false
```

---

## 3. `Number("10px")` vs `parseInt("10px")`

```text
🔥 Must Know Distinction: Number() vs parseInt()

Number(val): Converts the ENTIRE string. If ANY non-numeric character (except decimal) exists, returns NaN.
parseInt(val, radix): Parses from left to right. Extracts leading digits until hitting a non-digit character.
```

```javascript
console.log(Number("10px"));     // NaN
console.log(parseInt("10px", 10));// 10

console.log(Number("12.34px"));       // NaN
console.log(parseFloat("12.34px"));   // 12.34
```

---

## 4. Radix Parameter in `parseInt()`

```javascript
// ALWAYS pass the second argument (radix = 10 for base-10 decimal math)
console.log(parseInt("10", 10)); // 10 (Decimal base-10)
console.log(parseInt("10", 2));  // 2  (Binary base-2)
console.log(parseInt("10", 16)); // 16 (Hexadecimal base-16)
```

---

## 5. Step-by-Step Explanation
1. `parseInt("10px", 10)` reads character `'1'`, parses digit `1`.
2. Reads character `'0'`, appends digit to make `10`.
3. Reads character `'p'`, encounters non-digit character, stops parsing immediately and returns `10`.
4. `Number("10px")` attempts to convert the entire string payload `"10px"`. Since `'p'` is not a digit, the conversion fails and returns `NaN`.

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Forgetting radix in parseInt()
```

### Problem:
Omitting the radix parameter in legacy environments could cause strings starting with `"0"` to parse as octal (base-8) numbers! Always specify radix `10`: `parseInt(str, 10)`.

---

## 7. Edge Cases
- `Number(null)` evaluates to `0`, but `Number(undefined)` evaluates to `NaN`!

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: What is the difference between `Number("25px")` and `parseInt("25px", 10)`?**
  - *Answer*: `Number()` attempts strict total-string conversion, returning `NaN` if any non-numeric character is present. `parseInt()` parses from left to right, stripping non-digit characters once it encounters them and returning the extracted leading integer.

---

## 9. Practice Questions
1. What does `Number("")` return?
2. What does `Number(undefined)` return?
3. What does `parseInt("100.50USD", 10)` return?

---

## 10. Key Takeaways
- Use `String()`, `Number()`, and `Boolean()` for intentional type conversion.
- `Number()` fails with `NaN` if non-digit characters exist in a string.
- `parseInt(str, 10)` extracts leading digits; always pass radix `10`.
- `Number(null)` is `0`; `Number(undefined)` is `NaN`.
