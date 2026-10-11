# Day 06: Conditional Statements

## Day Objective
Understand sequential program flow, master decision-making using `if`, `else`, `else if` branching, evaluate truthy/falsy conditions, handle nested conditions safely, leverage modern ternary expressions and guard clauses, and master boundary condition testing (`>`, `>=`, `<`, `<=`).

---

## 🎯 Topics Covered
1. **Program Flow & Sequential Execution**: Top-to-bottom execution, decision branching requirements, condition boolean coercion.
2. **`if` & `else` Statements**: Basic syntax, single-branch execution, dual-branch execution (`if/else`), block boundaries (`{}`).
3. **`else if` Chains & Condition Ordering**: Multi-branch decision paths, evaluation order rules, why condition sequence matters.
4. **Nested `if` & Logical Combinations**: Combining conditions with `&&`/`||`/`!`, when nesting makes sense vs when it creates cognitive overhead.
5. **Ternary Operator, Guard Clauses & Boundaries**: `cond ? a : b`, early returns (`if (!valid) return`), boundary testing (`18` vs `17`).

---

## ⏱️ Estimated Study Time
- Theory Reading: 60 minutes
- Code Examples: 30 minutes
- Exercises: 45 minutes
- Interview & Debugging: 45 minutes
- Mini-Project: 45 minutes
- **Total:** ~3.75 hours

---

## 📁 Directory Structure
```text
Day-06-Conditional-Statements/
├── README.md
├── theory/
│   ├── 01-program-flow-and-if-else.md
│   ├── 02-else-if-chains-and-order.md
│   ├── 03-nested-if-and-multiple-conditions.md
│   ├── 04-ternary-operator-and-conditional-assignment.md
│   └── 05-guard-clauses-early-return-and-boundary-conditions.md
├── examples/
│   ├── 01-basic-if-else-expressions.js
│   ├── 02-else-if-ordering-and-nested.js
│   ├── 03-ternary-and-guard-clauses.js
│   └── 04-boundary-conditions.js
├── exercises/
│   ├── easy/01-conditional-basics.js
│   ├── medium/02-grade-and-income-calculator.js
│   └── challenge/03-nested-business-rules.js
├── output-questions/
│   ├── questions.js
│   └── solutions.md
├── debugging/
│   ├── problems.js
│   └── solutions.md
├── interview/
│   ├── questions.md
│   └── output-based-questions.js
├── mini-project/
│   ├── README.md
│   ├── index.html
│   ├── script.js
│   └── expected-output.md
└── solutions/
    └── exercises-solutions.md
```

---

## ✅ Completion Checklist
- [ ] Read all 5 theory files in `theory/`
- [ ] Run and analyze all 4 example scripts in `examples/` using Node.js
- [ ] Complete Easy, Medium, and Challenge exercises
- [ ] Complete Output Questions and Debugging Puzzles
- [ ] Predict outputs in `interview/output-based-questions.js`
- [ ] Build the Day 6 Mini Project (**Eligibility & Grade Analyzer**)
- [ ] Verify your solutions with `solutions/`
