# Conceptual Interview Questions — Control Flow & Program Logic

## 1. How does JavaScript handle conditional evaluation order?
JavaScript evaluates logical expressions from left to right and uses **short-circuit evaluation**. In an `&&` expression, evaluation stops at the first falsy operand and returns it. In an `||` expression, evaluation stops at the first truthy operand and returns it.

## 2. What is the difference between `==` and `===` in control flow conditions?
- `==` (Abstract Equality): Performs type coercion if operands are of different types before comparing.
- `===` (Strict Equality): Compares both type and value without coercion. Always prefer `===` to prevent subtle bugs.

## 3. Explain the Nullish Coalescing Operator (`??`) vs Logical OR (`||`).
- `||` returns the right-hand operand if the left-hand operand is **falsy** (`false`, `0`, `""`, `null`, `undefined`, `NaN`).
- `??` returns the right-hand operand ONLY if the left-hand operand is **nullish** (`null` or `undefined`).

## 4. What are Guard Clauses, and how do they improve code quality?
A guard clause is an early return statement at the beginning of a function that handles special cases or invalid inputs. Guard clauses flatten deeply nested `if/else` structures, improving readability and reducing visual complexity.

## 5. How does `switch` matching work under the hood?
The `switch` statement evaluates an expression and compares its value against `case` clauses using **strict equality** (`===`). If no match is found, control jumps to the `default` clause if present.

## 6. What is switch fallthrough, and when is it useful?
Fallthrough occurs when a `case` block does not end with `break`, `return`, or `throw`. Execution continues directly into subsequent `case` blocks regardless of whether their condition matches. It is useful for grouping multiple cases that share identical handler logic.

## 7. Compare `for`, `while`, and `do...while` loops.
- `for`: Best when the number of iterations is known in advance.
- `while`: Best when looping continues until an arbitrary condition becomes false (0 or more iterations).
- `do...while`: Guarantees that the loop body executes at least once before evaluating the condition.

## 8. What is the difference between `break` and `continue`?
- `break`: Terminates the current loop or switch statement immediately.
- `continue`: Skips the rest of the current loop iteration and proceeds to the next iteration.

## 9. How do labeled loops work in JavaScript?
A labeled statement attaches an identifier to a loop (`labelName: for (...)`). Inside nested loops, `break labelName` or `continue labelName` allows direct control flow manipulation of an outer target loop.

## 10. Compare `for...in` and `for...of`.
- `for...in`: Iterates over enumerable **property names/keys** of an object (including prototype chain).
- `for...of`: Iterates over **values** yielded by iterable objects (`Array`, `String`, `Map`, `Set`, `NodeList`).

## 11. What makes an object iterable in JavaScript?
An object is iterable if it implements the `[Symbol.iterator]` method, which returns an iterator object conforming to the iterator protocol (`next()` returning `{ value, done }`).

## 12. Why shouldn't you use `for...in` on arrays?
1. Property order is not guaranteed.
2. Iterates over non-numeric properties attached to the array object.
3. Yields index keys as strings (`"0"`, `"1"`), causing string concatenation bugs.

## 13. How does `Object.entries()` simplify looping over objects?
`Object.entries(obj)` returns an array of `[key, value]` pairs for an object's own enumerable properties. It allows using `for...of` with array destructuring (`for (const [key, val] of Object.entries(obj))`).

## 14. What are the performance implications of `for` vs `for...of` vs `forEach`?
Standard `for` loops are fastest because V8 optimizes raw index access without creating iterator context objects. `for...of` is slightly slower due to iterator overhead. `forEach` is a function call per element, incurring scope creation overhead.

## 15. How do closures interact with `var` vs `let` inside loops?
- `var` has function scope; a single variable instance is shared across all loop iterations, causing async callbacks to read the final mutated value.
- `let` has block scope; JS creates a new binding for `let` on every loop iteration, preserving state per step.

## 16-30. Key Concepts Summary
- **Dead Code Elimination**: How engines remove unreachable branches.
- **Branch Prediction**: Impact of ordered conditions on CPU pipeline efficiency.
- **Ternary Readability Threshold**: Avoid nesting ternaries beyond 2 levels.
