# Day 05: Type Conversion and Coercion

## Day Objective
Master explicit type conversion (`String()`, `Number()`, `Boolean()`, `parseInt()`, `parseFloat()`), implicit type coercion (String concatenation vs numeric subtraction), the 8 Falsy values, truthy coercion rules, Abstract Equality Comparison coercion traps (`==`), Object-to-primitive conversion (`valueOf`, `toString`, `Symbol.toPrimitive`), and coercion best practices.

---

## 🎯 Topics Covered
1. **Explicit Type Conversion**: Intentional type casting via `String()`, `Number()`, `Boolean()`, `parseInt()`, `parseFloat()`. Differences between `Number("10px")` vs `parseInt("10px")`.
2. **Implicit Type Coercion**: Automatic conversion by JS engine during math or string operations (`"5" + 2` vs `"5" - 2`, `true + 1`).
3. **Truthy & Falsy Values**: The 8 exact falsy values (`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`). Truthy evaluation rules.
4. **Coercion & Equality Matrix**: Abstract Equality algorithm (`==`), loose coercion traps (`0 == false`, `"" == false`, `null == undefined`).
5. **Object-to-Primitive & Best Practices**: `valueOf()`, `toString()`, `Symbol.toPrimitive`, writing clean intentional type code.

---

## ⏱️ Estimated Study Time
- Theory Reading: 70 minutes
- Code Examples: 35 minutes
- Exercises: 55 minutes
- Interview Practice: 35 minutes
- Mini-Project: 45 minutes
- **Total:** ~4.0 hours

---

## 📁 Directory Structure
```text
Day-05-Type-Conversion-and-Coercion/
├── README.md
├── theory/
│   ├── 01-explicit-type-conversion.md
│   ├── 02-implicit-type-coercion.md
│   ├── 03-truthy-and-falsy-values.md
│   ├── 04-coercion-equality-matrix.md
│   └── 05-object-to-primitive-and-best-practices.md
├── examples/
│   ├── 01-explicit-conversion-examples.js
│   ├── 02-implicit-coercion-examples.js
│   ├── 03-truthy-falsy-examples.js
│   └── 04-equality-coercion-examples.js
├── exercises/
│   ├── easy/01-explicit-conversion-practice.js
│   ├── medium/02-implicit-coercion-prediction.js
│   └── challenge/03-equality-and-coercion-traps.js
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
- [ ] Build the Day 5 Mini Project (**Type Conversion Playground**)
- [ ] Verify your solutions with `solutions/`
