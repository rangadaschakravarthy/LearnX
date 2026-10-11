# Logical Operators & Short-Circuit Evaluation

## 1. What is it?
Logical operators in JavaScript (`&&` AND, `||` OR, `!` NOT) evaluate boolean or non-boolean operands.

Unlike languages that strictly return `true` or `false` booleans, JavaScript's binary logical operators (`&&` and `||`) **return the actual value of one of their operands** using **Short-Circuit Evaluation**.

---

## 2. Operator Logic Rules

### 1. Logical AND (`&&`)
- Evaluates left operand. If left operand is **falsy**, short-circuits and **returns left operand immediately** (without evaluating right operand).
- If left operand is **truthy**, evaluates and **returns right operand**.

### 2. Logical OR (`||`)
- Evaluates left operand. If left operand is **truthy**, short-circuits and **returns left operand immediately**.
- If left operand is **falsy**, evaluates and **returns right operand**.

### 3. Logical NOT (`!`)
- Converts operand to boolean and **inverts** it (`!true -> false`, `!false -> true`).
- Double NOT (`!!val`) converts any value to its strict boolean equivalent (`Boolean(val)`).

---

## 3. Short-Circuit Code Examples

```javascript
// 1. Logical AND (&&)
console.log("Hello" && "World"); // "World" (Both truthy -> returns last)
console.log("" && "World");      // "" (Left is falsy -> returns "")
console.log(false && true);      // false

// Practical Usage: Guard Clauses (Run code only if condition is true)
const user = { isLoggedIn: true, name: "Alice" };
user.isLoggedIn && console.log("Welcome,", user.name); // Logs "Welcome, Alice"

// 2. Logical OR (||)
console.log("Default" || "Fallback"); // "Default" (Left is truthy -> returns "Default")
console.log("" || "Fallback");        // "Fallback" (Left is falsy -> returns "Fallback")
console.log(0 || 100);                // 100

// 3. Double NOT (!!)
console.log(!!"hello"); // true
console.log(!!0);       // false
```

---

## 4. Step-by-Step Short-Circuit Execution Trace

```javascript
function heavyFunction() {
  console.log("Heavy Function Executed!");
  return "Data";
}

// Case A: Short-circuiting prevents heavyFunction execution
const resultA = false && heavyFunction(); // heavyFunction NEVER runs!
console.log("Result A:", resultA); // false

// Case B: Right operand evaluated
const resultB = true && heavyFunction(); // Logs "Heavy Function Executed!"
console.log("Result B:", resultB); // "Data"
```

---

## 5. Common Mistakes

```text
⚠️ JavaScript Gotcha: Using || for numeric or boolean default fallbacks
```

```javascript
let userScore = 0; // 0 is a valid score!

// BAD: 0 is falsy, so || overrides 0 with fallback 10!
let scoreA = userScore || 10;
console.log(scoreA); // 10 (BUG!)

// FIX: Use Nullish Coalescing (??) which checks ONLY null/undefined
let scoreB = userScore ?? 10;
console.log(scoreB); // 0 (CORRECT!)
```

---

## 6. Edge Cases
- Order of execution: `&&` has higher operator precedence than `||`:
```javascript
console.log(true || false && false); // true! (Evaluates false && false -> false, then true || false -> true)
```

---

## 7. Interview Perspective

### 🎯 Interview Focus
- **Q: Do logical operators `&&` and `||` in JavaScript always return booleans?**
  - *Answer*: No! In JavaScript, `&&` and `||` evaluate operands and return the actual value of the operand that determined the short-circuit evaluation result.

---

## 8. Practice Questions
1. What does `"Cat" && "Dog"` evaluate to?
2. What does `"" || "Default"` evaluate to?
3. Predict output of `!!""`.

---

## 9. Key Takeaways
- `&&` returns the first falsy operand, or the last operand if all are truthy.
- `||` returns the first truthy operand, or the last operand if all are falsy.
- `&&` has higher operator precedence than `||`.
- Use `!!` to explicitly convert any value to a strict boolean.
