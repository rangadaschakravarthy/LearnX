# String Comparison in JavaScript

## 1. Strict (`===`) vs Loose (`==`) Equality

```js
// Strict equality (checks type AND value)
"hello" === "hello"; // true
"Hello" === "hello"; // false (case-sensitive!)
"5" === 5;          // false (string vs number)

// Loose equality (performs type coercion)
"5" == 5;           // true (coerces number 5 to string "5")
"0" == false;       // true
"" == false;        // true
```

---

## 2. Lexicographic Comparison (`<`, `>`, `<=`, `>=`)

JavaScript compares strings character by character based on their UTF-16 code unit values:

```js
"apple" < "banana"; // true ('a' code unit 97 < 'b' code unit 98)
"Apple" < "apple";   // true ('A' code unit 65 < 'a' code unit 97)
"10" < "2";          // true ('1' code unit 49 < '2' code unit 50!)
```

> ⚠️ **Warning:** Numerical string comparison using `<` and `>` evaluates alphabetical order, not numeric value! Convert strings to numbers (`Number("10") > Number("2")`) when comparing numeric amounts.

---

## 3. `localeCompare()`

Use `String.prototype.localeCompare()` for language-sensitive string comparison:

```js
"a".localeCompare("b"); // -1 (a comes before b)
"b".localeCompare("a"); // 1  (b comes after a)
"a".localeCompare("a"); // 0  (strings are identical)

// Case-insensitive comparison:
"apple".localeCompare("APPLE", undefined, { sensitivity: "base" }); // 0
```
