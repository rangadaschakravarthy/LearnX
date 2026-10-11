# Day 3 Interview Questions — Data Types

### Question 1 (Conceptual): Why is `0.1 + 0.2` not strictly equal to `0.3` in JavaScript?
**Answer:** All standard JS numbers are stored as 64-bit IEEE 754 binary floating-point numbers. Fractional decimals like `0.1` and `0.2` cannot be represented with infinite precision in binary base-2, creating tiny rounding inaccuracies (`0.30000000000000004`) when converted back to base-10.

### Question 2 (Conceptual): What is the difference between Primitive and Reference types regarding memory allocation?
**Answer:** Primitive values (String, Number, BigInt, Boolean, Undefined, Null, Symbol) are stored directly on the stack memory frame and copied by value. Reference types (Objects, Arrays, Functions) store their payload in heap memory and store a memory pointer address on the stack. Copying a reference type copies the pointer, creating shared heap mutation side-effects.

### Question 3 (Tricky): Why does `typeof null` return `"object"` and why was it never fixed?
**Answer:** It is a legacy bug from 1995. In early JS engine memory tag layouts, objects had type tag `000` and `null` was stored as pointer `0x00`. Thus, `typeof null` evaluated to `"object"`. Proposal TC39 fixes were rejected because changing it would break existing web codebases.

### Question 4 (Conceptual): What is `NaN` and why does `NaN === NaN` evaluate to `false`?
**Answer:** `NaN` (Not-a-Number) represents an unrepresentable or invalid mathematical computation result. According to the IEEE 754 floating-point specification, `NaN` is non-comparable and never equal to any value, including itself. To test for `NaN`, use `Number.isNaN()`.

### Question 5 (Advanced): How does `BigInt` differ from `Number` and what are its restrictions?
**Answer:** `BigInt` can represent arbitrary precision integers beyond `Number.MAX_SAFE_INTEGER` ($2^{53}-1$). Restrictions: BigInts cannot be mixed directly in math operations with Numbers without explicit type conversion, cannot be used with `Math` object methods, and do not support fractional decimals.
