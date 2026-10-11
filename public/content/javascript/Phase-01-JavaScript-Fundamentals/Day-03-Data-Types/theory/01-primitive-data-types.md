# Primitive Data Types Overview

## 1. What is it?
JavaScript is a dynamically typed language. Data types are attached to **values**, not variable bindings.

JavaScript features **7 Primitive Data Types**:
1. **String**: Textual sequence of 16-bit UTF-16 code units (e.g. `"hello"`, `'world'`, `` `template` ``).
2. **Number**: IEEE 754 double-precision 64-bit binary floating-point numbers (e.g. `42`, `-3.14`).
3. **BigInt**: Arbitrary precision integers for numbers beyond safe integer limits (e.g. `9007199254740991n`).
4. **Boolean**: Logical entity representing `true` or `false`.
5. **Undefined**: Primitive automatically assigned to uninitialized variables.
6. **Null**: Intentional absence of any object value.
7. **Symbol**: Unique and immutable primitive identifier (introduced in ES6).

---

## 2. Why does it exist?
Primitive types represent atomic, raw data values that cannot be broken down into simpler properties. They are stored directly on the stack frame in execution memory.

---

## 3. Syntax & Examples

```javascript
// 1. String
const greeting = "Hello, World!";
const multiline = `Template
Literals`;

// 2. Number
const count = 42;
const price = 99.99;

// 3. BigInt
const hugeNumber = 9007199254740995n;

// 4. Boolean
const isActive = true;

// 5. Undefined
let unassigned;

// 6. Null
const emptyPayload = null;

// 7. Symbol
const uniqueId = Symbol("id");
```

---

## 4. `null` vs `undefined`

```text
🔥 Must Know Distinction: null vs undefined

undefined: "The variable exists, but no value has been assigned yet." (System default)
null: "The developer explicitly set this variable to indicate NO object value." (Intentional assignment)
```

```javascript
let response;
console.log(response); // undefined (System default)

let userSelectedAvatar = null; // Developer explicitly states "no avatar selected"
```

---

## 5. Step-by-Step Explanation
1. Primitives are passed **by value**. When you assign a primitive variable to another variable (`let b = a`), JS creates a distinct, independent copy of the value in stack memory.

---

## 6. More Examples

```javascript
let x = 10;
let y = x; // Independent copy of primitive 10

y = 20; // Modifying y does NOT affect x!
console.log("x:", x); // 10
console.log("y:", y); // 20
```

---

## 7. Common Mistakes

```text
⚠️ JavaScript Gotcha: Mixing BigInt and Number in math operations
```

```javascript
// ❌ TypeError: Cannot mix BigInt and other types
// const result = 10n + 5; // TypeError!

// ✅ Solution: Convert explicitly
const result = 10n + BigInt(5); // 15n
```

---

## 8. Edge Cases
- Symbols are guaranteed to be unique:
```javascript
console.log(Symbol("id") === Symbol("id")); // false!
```

---

## 9. Interview Perspective

### 🎯 Interview Focus
- **Q: Name all 7 primitive data types in JavaScript.**
  - *Answer*: String, Number, BigInt, Boolean, Undefined, Null, Symbol.

---

## 10. Practice Questions
1. How many primitive data types exist in modern JavaScript?
2. What is the difference between `null` and `undefined`?
3. Can you perform arithmetic directly between `10n` and `5`?

---

## 11. Key Takeaways
- JavaScript has 7 primitive types: String, Number, BigInt, Boolean, Undefined, Null, Symbol.
- Primitives are stored by value in stack memory and are immutable.
- `undefined` means uninitialized by JS; `null` means intentionally set empty by developer.
