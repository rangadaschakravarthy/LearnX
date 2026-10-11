# Identifier Naming Rules & Conventions

## 1. What is it?
An **identifier** is a developer-chosen name given to variables, functions, parameters, classes, or properties in JavaScript source code.

Identifier rules dictate what characters are syntactically legal, while naming conventions dictate industry best practices for code readability and maintainability.

---

## 2. Syntactic Rules for Identifiers

```text
✅ Valid Identifier Character Rules:
1. Must start with a letter (a-z, A-Z), dollar sign ($), or underscore (_).
2. Subsequent characters can include digits (0-9).
3. JavaScript identifiers are strictly CASE-SENSITIVE.
4. Identifiers CANNOT be reserved keywords.

❌ Invalid Identifier Rules:
1. Cannot start with a digit (e.g. `let 1stPlace;` -> SyntaxError).
2. Cannot contain spaces or punctuation (e.g. `let user-name;` -> SyntaxError).
3. Cannot use reserved words (e.g. `let function;` -> SyntaxError).
```

---

## 3. Examples of Valid vs Invalid Identifiers

```javascript
// ✅ Valid Identifiers
let firstName = "John";
let _privateId = 9821;
let $price = 19.99;
let user2 = "Bob";
let Tax_Rate = 0.05;

// ❌ Invalid Identifiers (Will cause parse errors!)
// let 2ndUser = "Alice";    // ❌ Starts with a number!
// let user-name = "John";   // ❌ Hyphens treated as subtraction operator!
// let class = "CS101";      // ❌ Reserved keyword!
// let my name = "Alex";     // ❌ Contains space!
```

---

## 4. Industry Naming Conventions in JavaScript

| Convention Case | Format Pattern | Usage in JavaScript | Example |
| :--- | :--- | :--- | :--- |
| **camelCase** | `firstSecondThird` | Variables, functions, methods, parameters, properties | `let isUserLoggedIn = true;` |
| **PascalCase** | `FirstSecondThird` | Classes, Constructor Functions, React Components | `class UserAccount {}` |
| **UPPER_SNAKE_CASE** | `FIRST_SECOND_THIRD` | Global immutable compile-time constants | `const MAX_RETRY_COUNT = 5;` |
| **snake_case** | `first_second_third` | Uncommon in JS (used in Python/SQL or database APIs) | `let user_id = 10;` |

---

## 5. Descriptive Naming Best Practices

```javascript
// ❌ Poor Variable Naming (Cryptic / Vague)
let d = 10;
let fn = "Alex";
let flag = true;

// ✅ Descriptive Professional Naming (Self-documenting code)
let daysUntilExpiration = 10;
let userFirstName = "Alex";
let isEmailVerified = true;
```

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Hyphens in Identifiers
```

```javascript
// BUG: Using hyphens in variable names
// let total-amount = 100; // ❌ SyntaxError: Unexpected token '-'

// FIX: Use camelCase instead
let totalAmount = 100; // ✅
```

---

## 7. Edge Cases
- Non-ASCII Unicode characters (like accented letters or emoji characters) are syntactically valid in JS variable names, but strongly discouraged in practice:
```javascript
let π = 3.14159; // ✅ Valid JS, but poor practice
let café = "Coffee"; // ✅ Valid JS
```

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: What is the difference between `camelCase` and `PascalCase` in JavaScript conventions?**
  - *Answer*: `camelCase` starts with a lowercase letter and capitalizes the first letter of each subsequent word (used for variables, functions, and properties). `PascalCase` capitalizes the first letter of every word, including the first (used for Classes and React components).

---

## 9. Practice Questions
1. Why is `let 3rdRank = "Gold";` invalid in JavaScript?
2. Which case convention is recommended for global immutable configuration constants?
3. Are variable names in JavaScript case-sensitive?

---

## 10. Key Takeaways
- Identifiers must start with a letter, `$`, or `_`. Numbers cannot be the first character.
- JavaScript is case-sensitive (`age` != `Age`).
- Use `camelCase` for variables/functions, `PascalCase` for classes, and `UPPER_SNAKE_CASE` for global constants.
- Write self-documenting, descriptive variable names.
