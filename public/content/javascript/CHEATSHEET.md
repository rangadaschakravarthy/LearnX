# Phase 1 JavaScript Master Cheatsheet

Quick reference for JavaScript syntax, variables, data types, operators, coercion, and equality rules.

---

## 1. Syntax & Strict Mode
```javascript
"use strict"; // Opt-in to strict mode (prevents undeclared variables, silent errors)

console.log("Output text");
console.error("Error message");
console.table([{ name: "Alice", age: 25 }]);
```

---

## 2. Variables & Declarations
| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function / Global | Block (`{}`) | Block (`{}`) |
| **Hoisting** | Yes (initialized to `undefined`) | Yes (Temporal Dead Zone) | Yes (Temporal Dead Zone) |
| **Redeclarable** | Yes | No | No |
| **Reassignable** | Yes | Yes | No |
| **Initialization** | Optional | Optional | **Mandatory** |

```javascript
var a = 10;     // Legacy, function scoped
let b = 20;     // Modern, reassignable, block scoped
const c = 30;   // Modern, constant binding, block scoped

const obj = { key: "value" };
obj.key = "new value"; // ✅ Allowed (mutation of reference target)
// obj = {};           // ❌ TypeError: Assignment to constant variable
```

---

## 3. Data Types & `typeof`
JavaScript has **7 Primitives** and **1 Non-Primitive (Object)** type:

```javascript
typeof "Hello"         // "string"
typeof 42              // "number"
typeof 9007199254740991n// "bigint"
typeof true            // "boolean"
typeof undefined       // "undefined"
typeof Symbol("id")    // "symbol"
typeof null            // "object" ⚠️ Historical JS Gotcha!
typeof {}              // "object"
typeof []              // "object" (Use Array.isArray([]) -> true)
typeof function(){}    // "function" (Callable object subtype)
```

### Number Edge Cases
```javascript
0.1 + 0.2              // 0.30000000000000004 (IEEE 754 precision limit)
1 / 0                  // Infinity
-1 / 0                 // -Infinity
"abc" * 2              // NaN (Not-a-Number)
NaN === NaN            // false! Use Number.isNaN(val)
Number.MAX_SAFE_INTEGER// 9007199254740991 (2^53 - 1)
```

---

## 4. Operators & Precedence
```javascript
// Short-Circuit Logical Operators
"Hello" && "World"     // "World" (Returns last truthy operand if all truthy)
"" && "World"          // "" (Returns first falsy operand)
"Default" || "Fallback"// "Default" (Returns first truthy operand)
"" || "Fallback"       // "Fallback"

// Nullish Coalescing (?? checks ONLY null and undefined)
0 || "Fallback"        // "Fallback" (0 is falsy)
0 ?? "Fallback"        // 0 (0 is defined!)
null ?? "Fallback"     // "Fallback"

// Optional Chaining (?.)
const user = { profile: { name: "Alice" } };
console.log(user?.profile?.name);  // "Alice"
console.log(user?.address?.city);  // undefined (Does not throw error!)
```

---

## 5. Type Conversion & Coercion

### Falsy Values in JavaScript (Exactly 8)
1. `false`
2. `0`
3. `-0`
4. `0n` (BigInt zero)
5. `""` (Empty string)
6. `null`
7. `undefined`
8. `NaN`

*Everything else is truthy (including `[]`, `{}`, `"0"`, `"false"`).*

### Explicit Conversion vs Parsing
```javascript
String(123)            // "123"
Number("123")          // 123
Number("123px")        // NaN

parseInt("123px", 10)  // 123
parseFloat("12.34px")  // 12.34
Boolean(1)             // true
```

### Coercion Rules & Equality (`==` vs `===`)
```javascript
"5" + 2                // "52" (String concatenation prioritized with +)
"5" - 2                // 3 (Numeric subtraction)
"5" * "2"              // 10
true + 1               // 2 (true -> 1)
false + 1              // 1 (false -> 0)

// Equality Comparison
5 == "5"               // true (Coerces string to number)
5 === "5"              // false (Strict equality check type + value)
null == undefined      // true (Spec exception)
null === undefined     // false
```
