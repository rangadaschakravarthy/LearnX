# Day 15 — Strings and String Manipulation — Detailed Theory

Welcome to **Day 15** of the JavaScript Mastery curriculum. This document provides an exhaustive, first-principles theoretical guide to JavaScript strings, UTF-16 character encoding, memory behavior, string methods, edge cases, and engine-level mechanics.

---

## 1. Why Strings in Phase 04? (Core Conceptual Context)

In JavaScript, **Strings** are fundamental primitive values representing textual data. Having mastered JavaScript Fundamentals (Phase 01), Control Flow (Phase 02), and Functions & Scope (Phase 03), Phase 04 focuses on data processing—where strings are the primary medium for user input, network payloads, API responses, DOM content, and file formats (JSON, HTML, CSV).

Key learning objectives for Phase 04:
1. Understanding **primitive immutability** and how string operations affect memory allocation.
2. Understanding **UTF-16 encoding**, code units, and surrogate pairs (Unicode handling).
3. Mastering the standard string API for searching, extraction, transformation, and formatting.
4. Learning minor points, traps, and performance implications that separate junior developers from senior engineers.

---

## 2. String Creation & Internal Representation

### 2.1 String Literals vs. Object Wrappers

There are three ways to create strings in JavaScript:

```javascript
// 1. Single or Double Quote Literals (Primitive)
const str1 = 'Hello World';
const str2 = "Hello World";

// 2. Template Literals (Primitive)
const str3 = `Hello World`;

// 3. String Function (Primitive Coercion)
const str4 = String(123); // "123" (Primitive string)

// 4. String Constructor with `new` (Object Wrapper - AVOID)
const strObj = new String("Hello World"); // String Object
```

#### The Primitive vs. Object Distinction
- Primitive strings are stored as raw values. `typeof "hello"` is `"string"`.
- `new String("hello")` creates an instance of the `String` wrapper object. `typeof new String("hello")` is `"object"`.

```javascript
const prim = "test";
const obj = new String("test");

console.log(prim === obj);        // false (Primitive vs Object)
console.log(prim == obj);         // true (Implicit coercion via ValueOf)
console.log(typeof prim);         // "string"
console.log(typeof obj);          // "object"

// Object wrappers evaluate to truthy in boolean contexts!
const emptyObj = new String("");
if (emptyObj) {
  console.log("This executes because emptyObj is an object!"); // Runs!
}
```

> [!WARNING]
> Never use `new String()`. Always use string primitives or the `String()` function for type conversion.

---

### 2.2 UTF-16 Encoding, Code Units, and Surrogate Pairs

Under the ECMAScript specification, JavaScript strings are sequences of **16-bit unsigned integer values (UTF-16 code units)**.

#### Basic Multilingual Plane (BMP) vs. Astral Planes
* **BMP (U+0000 to U+FFFF)**: Fits in a single 16-bit code unit. Contains standard English letters, digits, and common international alphabets.
* **Astral Planes / Supplementary Characters (U+10000 to U+10FFFF)**: Requires **two 16-bit code units** (a **Surrogate Pair**) to represent a single Unicode character (such as Emojis `😀`, mathematical symbols, and rare ancient scripts).

#### The Length Quirk
The `.length` property of a string returns the **number of 16-bit UTF-16 code units**, NOT the number of visible Unicode graphemes!

```javascript
const ascii = "hello";
console.log(ascii.length); // 5 (5 code units = 5 characters)

const emoji = "😀";
console.log(emoji.length); // 2! (Requires a surrogate pair: \uD83D\uDE00)

const familyEmoji = "👨‍👩‍👧‍👦";
console.log(familyEmoji.length); // 11 code units! (4 emojis + Zero Width Joiners)
```

#### Inspecting Characters: Code Units vs Code Points

| Method | Description | Example |
| :--- | :--- | :--- |
| `charCodeAt(index)` | Returns 16-bit UTF-16 code unit at index (0–65535) | `"😀".charCodeAt(0)` -> `55357` (High surrogate) |
| `codePointAt(index)` | Returns full 32-bit Unicode code point | `"😀".codePointAt(0)` -> `128512` (`0x1F600`) |
| `String.fromCharCode(code)` | Creates string from 16-bit UTF-16 code units | `String.fromCharCode(72, 101)` -> `"He"` |
| `String.fromCodePoint(code)`| Creates string from 32-bit Unicode code points | `String.fromCodePoint(0x1F600)` -> `"😀"` |

---

## 3. String Immutability & Memory Mechanics

### 3.1 Primitive Immutability

In JavaScript, **strings are immutable**. Once a string value is created, its internal character sequence can never be altered.

```javascript
let greeting = "Hello";
greeting[0] = "J"; // Silently fails (or throws TypeError in strict mode)
console.log(greeting); // "Hello"

// Methods return NEW strings; they do NOT mutate the original!
let upper = greeting.toUpperCase();
console.log(greeting); // "Hello" (Original unchanged)
console.log(upper);    // "HELLO" (New string in memory)
```

### 3.2 V8 Memory Optimization (String Interning & Representation)

Because strings are immutable, engine implementations (like V8 in Node.js and Chrome) optimize string storage in memory:
1. **String Interning / Hashconsing**: Identical string literals share the same memory location.
2. **Cons Strings**: When concatenating strings (`strA + strB`), V8 does not immediately copy characters into a new contiguous block of memory; it creates a tree-like structure (`ConsString`) referencing `strA` and `strB`.
3. **Sliced Strings**: When calling `.slice()`, V8 can create a lightweight pointer to a sub-range of an existing string buffer without re-allocating character data.

---

## 4. Escape Sequences & Template Literals

### 4.1 Special & Escape Characters

Escape sequences start with a backslash `\` to represent non-printable or special characters:

```javascript
const lineBreak = "Line 1\nLine 2";   // Newline
const tabbed = "Col 1\tCol 2";         // Tab
const escapedQuote = "He said \"Hi\"";  // Escaped double quote
const backslash = "C:\\path\\file";     // Escaped backslash

// Unicode Escapes
const hexUnicode = "\u0041";           // "A" (4 hex digits for BMP)
const pointUnicode = "\u{1F600}";      // "😀" (ES6 Unicode Code Point escape)
```

### 4.2 Template Literals & Tagged Templates

Introduced in ES6 (ES2015), template literals use backticks (`` ` ``) and offer three major features:
1. **Multi-line Strings**: No `\n` or `+` required across multiple lines.
2. **String Interpolation**: Evaluate arbitrary JS expressions inside `${...}`.
3. **Tagged Template Literals**: Pass template strings to custom parser functions.

```javascript
// Tagged Template Example
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const val = values[i - 1];
    return acc + `<strong>${val}</strong>` + str;
  });
}

const name = "Alice";
const role = "Admin";
const result = highlight`User ${name} has role ${role}.`;
console.log(result); 
// Output: "User <strong>Alice</strong> has role <strong>Admin</strong>."
```

#### `String.raw`
`String.raw` accesses raw, unescaped string input (ignoring escape sequences like `\n`):
```javascript
const path = String.raw`C:\Development\new_project`;
console.log(path); // "C:\Development\new_project" (does not insert \n or \t)
```

---

## 5. String Searching Methods

JavaScript provides five core methods for searching within strings:

```javascript
const text = "JavaScript is the programming language of the Web.";
```

### 5.1 `indexOf()` & `lastIndexOf()`
* `indexOf(searchStr, fromIndex)`: Returns the index of the first occurrence of `searchStr`, or `-1` if not found.
* `lastIndexOf(searchStr, fromIndex)`: Searches backward from `fromIndex`.

```javascript
console.log(text.indexOf("the"));       // 14
console.log(text.indexOf("Python"));    // -1
console.log(text.indexOf("the", 15));   // 38 (Starts search from index 15)
console.log(text.lastIndexOf("the"));   // 38
```

> [!NOTE]
> `indexOf("", position)` returns `position` if `position <= text.length`, otherwise returns `text.length`.

### 5.2 `includes()`, `startsWith()`, `endsWith()` (ES6+)
These methods return booleans (`true` or `false`):

```javascript
console.log(text.includes("programming"));       // true
console.log(text.includes("programming", 30));   // false (starts checking from index 30)

console.log(text.startsWith("JavaScript"));      // true
console.log(text.startsWith("script", 4));        // true (checks if index 4 starts with "script")

console.log(text.endsWith("Web."));              // true
console.log(text.endsWith("JavaScript", 10));    // true (considers only first 10 characters)
```

> [!IMPORTANT]
> `endsWith(searchStr, length)` accepts a **length** argument, NOT a start position!

---

## 6. Substring Extraction: `slice()` vs `substring()` vs `substr()`

Understanding the differences between substring methods is a frequent interview topic.

```javascript
const str = "JavaScript";
// Indices:  0123456789
// Negatives:-10 -9 -8 -7 -6 -5 -4 -3 -2 -1
```

### Method Comparison Matrix

| Feature | `slice(start, end)` | `substring(start, end)` | `substr(start, length)` |
| :--- | :--- | :--- | :--- |
| **Status** | Standard (Recommended) | Standard | **Legacy / Deprecated** |
| **Second Parameter** | End index (exclusive) | End index (exclusive) | Length of substring |
| **Negative Indices** | Counts from end (`len + index`) | Treated as `0` | `start` counts from end |
| **`start > end` Handling** | Returns `""` (empty string) | **Swaps `start` and `end`** | N/A |

### Detailed Execution Examples

```javascript
const text = "Mozilla";

// 1. Standard Extraction
console.log(text.slice(0, 3));      // "Moz" (Indices 0, 1, 2)
console.log(text.substring(0, 3));  // "Moz"

// 2. Negative Indices
console.log(text.slice(-3));        // "lla" (From len - 3 to end)
console.log(text.substring(-3));    // "Mozilla" (-3 becomes 0 -> indices 0 to end)

console.log(text.slice(1, -2));     // "ozil" (From index 1 to len - 2)
console.log(text.substring(1, -2)); // "M" (Treated as substring(1, 0) -> swapped to (0, 1))

// 3. Swapped Arguments (start > end)
console.log(text.slice(5, 2));      // "" (Empty string)
console.log(text.substring(5, 2));  // "zil" (Swaps 5 and 2 to become substring(2, 5))
```

---

## 7. String Transformation & Formatting

### 7.1 `replace()` and `replaceAll()`

* `replace(pattern, replacement)`: Replaces the **first occurrence** when passed a string pattern, or matching instances when passed a RegExp.
* `replaceAll(pattern, replacement)` (ES2021): Replaces **all occurrences** of a string pattern without needing a global RegExp.

```javascript
const quote = "Cats are cool. Cats are clean.";

// String pattern with replace (Replaces ONLY FIRST occurrence!)
console.log(quote.replace("Cats", "Dogs"));
// Output: "Dogs are cool. Cats are clean."

// Global RegExp with replace
console.log(quote.replace(/Cats/g, "Dogs"));
// Output: "Dogs are cool. Dogs are clean."

// replaceAll (ES2021)
console.log(quote.replaceAll("Cats", "Dogs"));
// Output: "Dogs are cool. Dogs are clean."
```

#### Functional Replacers & Special Replacement Patterns
You can supply a callback function as the replacement parameter:

```javascript
const prices = "Item A costs $10, Item B costs $25";
const discounted = prices.replace(/\$(\d+)/g, (match, price) => {
  const newPrice = Number(price) * 0.8;
  return `$${newPrice}`;
});
console.log(discounted); // "Item A costs $8, Item B costs $20"
```

---

### 7.2 `split()`

Splits a string into an array of substrings based on a delimiter:

```javascript
const csv = "Apple,Banana,Cherry,Date";

// Basic Split
const fruits = csv.split(",");
console.log(fruits); // ["Apple", "Banana", "Cherry", "Date"]

// Split with Limit
console.log(csv.split(",", 2)); // ["Apple", "Banana"]

// Split into characters (Caution with Emojis!)
console.log("hello".split("")); // ["h", "e", "l", "l", "o"]
console.log("😀😁".split(""));   // ["\uD83D", "\uDE00", "\uD83D", "\uDE01"] (Breaks surrogate pairs!)

// Correct Unicode character splitting via Array.from or spread operator:
console.log([... "😀😁"]);     // ["😀", "😁"]
```

---

### 7.3 `trim()`, `trimStart()`, and `trimEnd()`

Removes whitespace (spaces, tabs, newlines, non-breaking spaces) from string boundaries:

```javascript
const padded = "   Hello World!   \n";

console.log(padded.trim());      // "Hello World!"
console.log(padded.trimStart()); // "Hello World!   \n"
console.log(padded.trimEnd());   // "   Hello World!"
```

---

### 7.4 `padStart()` and `padEnd()` (ES2017)

Pads the current string with another string until the resulting string reaches the given target length.

```javascript
const sec = "5";
console.log(sec.padStart(2, "0")); // "05" (Formatted digital clock)

const card = "4532";
console.log(card.padStart(16, "*")); // "************4532" (Masked card number)

const title = "Menu";
console.log(title.padEnd(10, ".")); // "Menu......"
```

---

### 7.5 `localeCompare()` (Internationalization)

Compares two strings in the current or specified locale (useful for correct alphabetical sorting across different languages).

```javascript
// In German, "ä" sorts before "z"
console.log("ä".localeCompare("z", "de")); // -1 (Negative: "ä" comes before "z")

// In Swedish, "ä" sorts after "z"
console.log("ä".localeCompare("z", "sv")); // 1 (Positive: "ä" comes after "z")
```

---

## 8. Minor Points, Quirks & Traps (Must-Know Gotchas)

### 1. Auto-Boxing of Primitives
Primitives don't have methods. When you call `"hello".toUpperCase()`, JavaScript temporarily creates an internal object wrapper (`new String("hello")`), executes the method, and immediately disposes of the object wrapper.

### 2. Bracket Index Access vs `charAt()`
```javascript
const s = "Hello";
console.log(s[100]);        // undefined
console.log(s.charAt(100)); // "" (Empty string)
```

### 3. String Comparison is Based on Code Units
String comparison (`<`, `>`) compares UTF-16 code unit numeric values character by character:
```javascript
console.log("2" > "10"); // true! ('2' code unit 50 > '1' code unit 49)
console.log("B" > "a");  // false ('B' code unit 66 < 'a' code unit 97)
```

### 4. String Normalization (`normalize()`)
Visually identical strings may be composed of different code points:
```javascript
const str1 = "é"; // Single code point: U+00E9 (LATIN SMALL LETTER E WITH ACUTE)
const str2 = "e\u0301"; // Two code points: "e" + Combining Acute Accent

console.log(str1 === str2); // false!

// Fix via Unicode Normalization Form C (NFC)
console.log(str1.normalize() === str2.normalize()); // true!
```

---

## 9. Senior-Level Interview Questions & Answers

### Q1: Why does `"cat".replace("a", "o")` only change one letter, but `"cat".split("a").join("o")` changes all of them?
* **Answer**: The `.replace()` method with a string first-argument replaces ONLY the first match encountered. `.split("a")` partitions the string on every instance of `"a"`, and `.join("o")` recombines every piece with `"o"`, effectively achieving a global replacement across the entire string.

### Q2: Explain the memory implication of repeated string concatenation (`str += "x"`) inside a loop vs using an array.
* **Answer**: Because strings are immutable, `str += "x"` inside a loop can lead to $O(N^2)$ time complexity and excessive memory allocations in engines without optimized cons-string trees, as new string instances must be allocated. Pushing substrings to an array `arr.push("x")` and performing a single `arr.join("")` at the end runs in $O(N)$ linear time.

### Q3: What is the output of `typeof ("hello"["constructor"])`?
* **Answer**: `"function"`. Due to auto-boxing, `"hello"` accesses `String.prototype.constructor`, which is the global `String` constructor function.

---

## 10. Summary & Key Takeaways

1. **Strings are Immutable Primitives**: You cannot mutate characters in place. All transformation methods return brand new string instances.
2. **UTF-16 & Surrogate Pairs**: `.length` counts 16-bit code units, not characters. Use `codePointAt()`, `String.fromCodePoint()`, or `[...str]` for full Unicode support.
3. **`slice()` is Preferred**: Use `slice(start, end)` for substring extraction. It cleanly handles negative indices. Avoid deprecated `substr()`.
4. **`replace()` vs `replaceAll()`**: Remember that `.replace("str", "new")` only replaces the FIRST match! Use a global regex `g` or `.replaceAll()`.
5. **Proper Comparison**: Use `localeCompare()` when sorting user-facing strings alphabetically.
