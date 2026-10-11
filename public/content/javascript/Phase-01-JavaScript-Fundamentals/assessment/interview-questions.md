# Phase 1 Assessment: Interview Questions (10 Questions)

1. **JavaScript Engine & JIT Compilation**: How does the V8 engine process JavaScript code from text input to native machine code execution?
2. **Execution Context & Scope**: What is the difference between Function Scope and Block Scope? How does `var` differ from `let`/`const`?
3. **Temporal Dead Zone**: Define the Temporal Dead Zone (TDZ) and explain why accessing `let` before its line of declaration throws a `ReferenceError`.
4. **Pass-by-Value vs Pass-by-Reference**: How does memory allocation differ between Primitives stored on the Stack and Objects stored in the Heap?
5. **The `typeof` Operator Quirks**: Why does `typeof null` return `"object"` and why does `typeof NaN` return `"number"`?
6. **Floating Point Precision**: Explain why `0.1 + 0.2` does not equal `0.3` in binary 64-bit IEEE 754 floating point arithmetic.
7. **Short-Circuit Evaluation**: Explain how binary logical operators `&&` and `||` evaluate operands and why they do not always return booleans.
8. **Nullish Coalescing vs Logical OR**: Compare `||` and `??`. When should an engineer use `??` over `||`?
9. **Abstract Equality Comparison Algorithm**: Trace what happens when evaluating `[] == ![]`.
10. **Object-to-Primitive Conversion**: How does JavaScript convert an object instance to a primitive value when performing math or string operations?
