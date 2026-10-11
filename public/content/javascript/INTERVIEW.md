# Phase 1 JavaScript Interview Guide

A curated collection of essential conceptual, output prediction, and trap questions asked by top-tech interviewers covering JavaScript Fundamentals.

---

## 1. Core Language & History Questions

### Q1: What is the relationship between JavaScript and ECMAScript?
**Answer:**  
ECMAScript (ECMA-262) is the standard specification maintained by TC39 that defines the formal syntax, semantics, and language specifications. JavaScript is the implementation of that standard (along with host environment APIs provided by browsers or Node.js).

### Q2: How does a JavaScript engine execute code (Parsing, JIT, Machine Code)?
**Answer:**  
1. **Parsing**: Source code is parsed into tokens and transformed into an Abstract Syntax Tree (AST).
2. **Bytecode Generation**: An interpreter (like V8's Ignition) compiles the AST into bytecode for fast startup.
3. **JIT Compilation**: An optimizing compiler (like V8's TurboFan) monitors hot code (frequently executed functions) and compiles bytecode into optimized native machine code.

---

## 2. Variable Scope & Hoisting Questions

### Q3: What is the Temporal Dead Zone (TDZ)?
**Answer:**  
The Temporal Dead Zone is the period between entering a block scope and executing the actual `let` or `const` declaration line. During this period, the variable is hoisted but uninitialized. Accessing it throws a `ReferenceError`.

### Q4: Explain the differences between `var`, `let`, and `const`.
**Answer:**  
- **Scope**: `var` is function/globally scoped; `let` and `const` are block scoped (`{}`).
- **Hoisting**: `var` hoists and initializes to `undefined`. `let` and `const` hoist into the TDZ.
- **Redeclaration**: `var` allows redeclaration in the same scope; `let` and `const` throw a `SyntaxError`.
- **Reassignment**: `var` and `let` allow reassignment; `const` prohibits binding reassignment.

---

## 3. Data Types & Typesystem Questions

### Q5: Why does `typeof null` return `"object"`?
**Answer:**  
This is a legacy bug from the original 1995 implementation of JavaScript. In early JS, values were represented with type tags in memory. The tag for objects was `000`. `null` was represented as the null pointer (`0x00`), which had a tag of `000`. Thus, `typeof null` evaluated to `"object"`. It is preserved for backwards compatibility.

### Q6: What is the difference between Primitive and Reference types in memory?
**Answer:**  
- **Primitives** (Number, String, Boolean, BigInt, Symbol, Undefined, Null) are stored directly on the execution stack or call stack frame. Copying a primitive copies its actual value.
- **Reference Types** (Objects, Arrays, Functions) store their actual property payload in Heap Memory. The variable on the stack merely holds a memory pointer address. Copying a reference variable copies the pointer address, not the underlying object.

---

## 4. Coercion & Equality Questions

### Q7: Explain short-circuit evaluation in `&&` and `||`.
**Answer:**  
Logical operators in JS do not return booleans; they return the actual operand value.
- `A && B`: Evaluates `A`. If `A` is falsy, returns `A` immediately (short-circuits). If `A` is truthy, evaluates and returns `B`.
- `A || B`: Evaluates `A`. If `A` is truthy, returns `A` immediately (short-circuits). If `A` is falsy, evaluates and returns `B`.

### Q8: What is the difference between `||` and `??` (Nullish Coalescing)?
**Answer:**  
`||` checks for any **falsy** left-hand operand (`false`, `0`, `""`, `null`, `undefined`, `NaN`).  
`??` checks **strictly** for **nullish** left-hand operands (`null` or `undefined`).

Example:
```javascript
0 || 100 // Returns 100 (0 is falsy)
0 ?? 100 // Returns 0 (0 is not null or undefined)
```

---

## 5. Output Prediction Interview Traps

### Trap 1: Hoisting & Reassignment
```javascript
var a = 1;
function test() {
  console.log(a); // Output?
  var a = 2;
}
test();
```
**Output:** `undefined`  
**Explanation:** Inside `test()`, `var a` is hoisted to the top of the function scope, masking the outer `a = 1`. However, it is uninitialized, so `console.log(a)` outputs `undefined`.

### Trap 2: Coercion Quirks
```javascript
console.log([] + []);
console.log([] + {});
console.log({} + []);
```
**Output:**
- `""` (Empty string: `[].toString()` -> `""`)
- `"[object Object]"` (`"" + "[object Object]"`)
- `"[object Object]"` (or `0` in legacy unparenthesized block evaluation context)

### Trap 3: `NaN` Comparisons
```javascript
console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));
```
**Output:**
- `false`
- `false`
- `true`  
**Explanation:** According to IEEE 754 standards, `NaN` is never equal to any value, including itself. `Object.is()` performs SameValue zero comparison, returning `true`.
