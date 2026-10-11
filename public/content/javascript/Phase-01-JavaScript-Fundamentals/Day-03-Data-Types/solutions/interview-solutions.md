# Day 03 Interview Question Solutions

### Question 1: Why is `0.1 + 0.2` not strictly equal to `0.3` in JavaScript?
**Answer Summary:** All numbers are IEEE 754 64-bit binary floating point numbers. Decimals like `0.1` and `0.2` have repeating binary decimal representations, producing small floating point rounding inaccuracies (`0.30000000000000004`).

---

### Question 2: What is the difference between Primitive and Reference types regarding memory allocation?
**Answer Summary:** Primitives are stored directly on the execution call stack by value. Reference types store their payload in heap memory and hold a memory pointer address on the stack. Copying a reference type copies the pointer, creating shared heap mutation side-effects.

---

### Question 3: Why does `typeof null` return `"object"` and why was it never fixed?
**Answer Summary:** Legacy bug from 1995 JS engine memory tag allocation (object type tag `000` matched `null` pointer `0x00`). TC39 proposals to fix it were rejected to preserve backwards compatibility across existing web codebases.

---

### Question 4: What is `NaN` and why does `NaN === NaN` evaluate to `false`?
**Answer Summary:** `NaN` represents an invalid numerical operation result. IEEE 754 specifies that `NaN` is non-comparable and never equal to any value, including itself. Use `Number.isNaN()` for checks.

---

### Question 5: How does `BigInt` differ from `Number` and what are its restrictions?
**Answer Summary:** `BigInt` handles arbitrary precision integers beyond `Number.MAX_SAFE_INTEGER`. Restrictions: Cannot be mixed directly in math operations with Numbers without explicit conversion, lacks decimal fraction support, and cannot be passed to standard `Math` methods.
