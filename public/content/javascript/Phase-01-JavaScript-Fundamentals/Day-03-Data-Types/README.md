# Day 03: Data Types

## Day Objective
Master JavaScript's type system, understand the 7 Primitive types (String, Number, BigInt, Boolean, Undefined, Null, Symbol) and Non-Primitive (Object/Reference) types, dive deep into numeric boundaries (`NaN`, `Infinity`, `MAX_SAFE_INTEGER`, IEEE 754 precision), explore the `typeof` matrix and quirks (`typeof null`), understand Primitive Immutability vs Object Mutability, and learn precise type checking techniques.

---

## 🎯 Topics Covered
1. **The 7 Primitive Data Types**: String, Number, BigInt, Boolean, Undefined, Null, Symbol.
2. **Number & BigInt Deep Dive**: Floating point, `0.1 + 0.2`, `NaN`, `Infinity`, `Number.MAX_SAFE_INTEGER`, `BigInt` literals (`100n`).
3. **Non-Primitive Reference Types**: Object, Array, Function, Date, memory references (Stack vs Heap).
4. **`typeof` Operator & Historical Quirks**: `typeof null === "object"`, `typeof [] === "object"`, `typeof function(){} === "function"`.
5. **Mutability & Type Checking**: Primitive immutability vs reference mutation, `Array.isArray()`, `instanceof`.

---

## ⏱️ Estimated Study Time
- Theory Reading: 65 minutes
- Code Examples: 35 minutes
- Exercises: 50 minutes
- Interview Practice: 35 minutes
- Mini-Project: 45 minutes
- **Total:** ~3.8 hours

---

## 📁 Directory Structure
```text
Day-03-Data-Types/
├── README.md
├── theory/
│   ├── 01-primitive-data-types.md
│   ├── 02-numbers-bigint-nan-infinity.md
│   ├── 03-non-primitives-and-references.md
│   ├── 04-typeof-operator-and-quirks.md
│   └── 05-mutability-immutability-type-checking.md
├── examples/
│   ├── 01-primitive-types.js
│   ├── 02-number-and-bigint.js
│   ├── 03-primitive-vs-reference.js
│   └── 04-typeof-matrix.js
├── exercises/
│   ├── easy/01-data-type-identification.js
│   ├── medium/02-primitive-vs-reference-exercises.js
│   └── challenge/03-typeof-and-edge-cases.js
├── interview/
│   ├── questions.md
│   └── output-based-questions.js
├── mini-project/
│   ├── README.md
│   ├── index.html
│   ├── script.js
│   └── expected-output.md
└── solutions/
    ├── exercises-solutions.md
    ├── output-solutions.md
    └── interview-solutions.md
```

---

## ✅ Completion Checklist
- [ ] Read all 5 theory files in `theory/`
- [ ] Run and analyze all 4 example scripts in `examples/` using Node.js
- [ ] Complete Easy, Medium, and Challenge exercises
- [ ] Predict outputs in `interview/output-based-questions.js`
- [ ] Build the Day 3 Mini Project (**Data Type Explorer**)
- [ ] Verify your solutions with `solutions/`
