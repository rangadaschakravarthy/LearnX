# Program Flow & The `if / else` Statement

## 1. What is it?
**Program Flow** refers to the sequence in which individual instructions or statements are executed in a script.

By default, JavaScript executes code **sequentially** from top to bottom. **Conditional Statements** (`if` and `else`) allow a program to branch its execution path based on whether a condition evaluates to `true` or `false`.

---

## 2. Why does it exist?
Without control flow decisions, programs would run identically every time regardless of user input, state changes, or API responses. `if/else` enables dynamic decision-making.

---

## 3. Syntax

```javascript
// 1. Single Branch (if only)
if (condition) {
  // Code executes ONLY IF condition is truthy
}

// 2. Dual Branch (if ... else)
if (condition) {
  // Executes if condition is TRUTHY
} else {
  // Executes if condition is FALSY
}
```

---

## 4. Basic Example

```javascript
const age = 20;

console.log("Program started");

if (age >= 18) {
  console.log("Status: Adult / Eligible to vote");
} else {
  console.log("Status: Minor / Not eligible");
}

console.log("Program ended");
```

---

## 5. Step-by-Step Execution Trace

```text
1. Memory allocated: age = 20
2. Line printed: "Program started"
3. Expression evaluated: age >= 18 -> 20 >= 18 -> true
4. Engine enters true branch: prints "Status: Adult / Eligible to vote"
5. Engine skips else branch completely
6. Line printed: "Program ended"
```

---

## 6. Boolean Coercion in `if` Conditions

The expression inside `if (condition)` is implicitly converted to a Boolean using `Boolean(condition)`:

```javascript
if ("hello") {
  console.log("Non-empty string is TRUTHY"); // Executes!
}

if (0) {
  console.log("Zero executes"); // Skipped (0 is FALSY)
}
```

---

## 7. Common Mistakes

```text
⚠️ JavaScript Gotcha: Accidental Assignment = inside if condition
```

### Incorrect Code:
```javascript
let score = 50;

if (score = 100) { // ❌ BUG: Assigns 100 to score! 100 is truthy!
  console.log("You got a perfect score!"); // Always executes!
}
```

### Correct Code:
```javascript
if (score === 100) { // ✅ Strict comparison
  console.log("You got a perfect score!");
}
```

---

## 8. Edge Cases
- Omitting curly braces `{}` allows a single statement after `if`, but is strongly discouraged because adding a second line breaks logic:
```javascript
// ❌ Dangerous (Omitted braces):
if (age >= 18)
  console.log("Line 1");
  console.log("Line 2"); // Always runs regardless of condition!
```

---

## 9. Interview Perspective

### 🎯 Interview Focus
- **Q: What happens if a non-boolean expression is passed into an `if` condition?**
  - *Answer*: The JavaScript engine performs implicit boolean coercion on the expression. If it resolves to any of the 8 falsy values (`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`), the `if` block is skipped; otherwise, it executes.

---

## 10. Practice Questions
1. Predict the output of `if (10) console.log("A"); else console.log("B");`.
2. Why is using `=` inside an `if` condition dangerous?
3. What is the execution path when `if` condition evaluates to `false` and an `else` block exists?

---

## 11. Key Takeaways
- Code executes sequentially top-to-bottom by default.
- `if (condition)` executes its block `{}` when the condition evaluates to a truthy value.
- `else` provides a fallback branch executed when the `if` condition is falsy.
- Always use `===` for comparisons inside `if` statements.
