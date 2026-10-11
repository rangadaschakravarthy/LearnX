# Day 08: Loops & Iteration

## Day Objective
Master fundamental loop structures (`for`, `while`, `do...while`), trace loop execution step-by-step using execution tables, understand loop counters, accumulators, flags, and sentinels, master `break` and `continue`, prevent infinite loops, construct nested loops for 2D patterns, and eliminate off-by-one boundary errors.

---

## 🎯 Topics Covered
1. **Why Loops Exist**: Eliminating code repetition, loop bodies, iteration semantics, stopping conditions.
2. **`for` Loop Execution Order**: Initialization $\rightarrow$ Condition $\rightarrow$ Body $\rightarrow$ Update step sequence, manual trace tables.
3. **`while` & `do...while` Loops**: Condition-first loops vs body-first loops, `do...while` at-least-once execution rule, sentinel loops.
4. **Loop Control & Safety**: `break` vs `continue`, detecting and preventing infinite loops, step sizes (`i += 2`).
5. **Nested Loops & Pattern Printing**: 2D grid iteration, triangular & pyramid pattern logic, off-by-one boundary bugs (`i < n` vs `i <= n`).

---

## ⏱️ Estimated Study Time
- Theory Reading: 75 minutes
- Code Examples: 45 minutes
- Exercises: 60 minutes
- Interview & Debugging: 45 minutes
- Mini-Project: 45 minutes
- **Total:** ~4.5 hours

---

## 📁 Directory Structure
```text
Day-08-Loops/
├── README.md
├── theory/
│   ├── 01-why-loops-exist-and-repetition.md
│   ├── 02-for-loop-execution-order-and-trace-tables.md
│   ├── 03-while-and-do-while-loops.md
│   ├── 04-break-continue-and-infinite-loops.md
│   └── 05-nested-loops-pattern-printing-and-off-by-one.md
├── examples/
│   ├── 01-for-and-while-loops.js
│   ├── 02-do-while-and-sentinels.js
│   ├── 03-break-continue-examples.js
│   └── 04-nested-loops-and-patterns.js
├── exercises/
│   ├── easy/01-loop-basics.js
│   ├── medium/02-accumulators-and-number-problems.js
│   └── challenge/03-pattern-printing-and-primes.js
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
- [ ] Build the Day 8 Mini Project (**Number Analysis Toolkit**)
- [ ] Verify your solutions with `solutions/`
