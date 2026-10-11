# `while` & `do...while` Loops & Sentinel Control

## 1. What is it?
- **`while` Loop**: A condition-first loop structure that evaluates its boolean condition **before** executing the body.
- **`do...while` Loop**: A body-first loop structure that executes its body **at least once** before evaluating its boolean condition.
- **Sentinel Loop**: A loop controlled by an external input value (a "sentinel") rather than a fixed integer counter.

---

## 2. Syntax & Comparison

```javascript
// 1. while Loop (Condition Checked FIRST)
while (condition) {
  // Executes 0 or more times
}

// 2. do...while Loop (Body Executed FIRST)
do {
  // Executes 1 or more times
} while (condition);
```

---

## 3. `while` vs `do...while` Execution Difference Example

```javascript
// Case A: while loop with initial FALSE condition
let x = 10;
while (x < 5) {
  console.log("while loop executed"); // Never runs!
  x++;
}

// Case B: do...while loop with initial FALSE condition
let y = 10;
do {
  console.log("do...while executed at least once!"); // Runs 1 time!
  y++;
} while (y < 5);
```

---

## 4. Sentinel-Controlled Loops

Sentinel loops run until a specific signal value (a "sentinel") is encountered:

```javascript
// Simulating user input processing until sentinel -1 is received
const userInputs = [10, 45, 80, 25, -1, 99];
let index = 0;
let currentInput = userInputs[index];

while (currentInput !== -1) { // -1 is the sentinel value
  console.log(`Processing data input: ${currentInput}`);
  index++;
  currentInput = userInputs[index];
}
console.log("Sentinel -1 encountered. Data processing stopped.");
```

---

## 5. When to Use `while` vs `for` vs `do...while`

| Loop Type | Best Usage Scenario | Example |
| :--- | :--- | :--- |
| **`for`** | Known number of iterations (counting, array length) | `for (let i=0; i<arr.length; i++)` |
| **`while`** | Unknown iterations, event-driven, or condition-based | `while (gameIsActive)` |
| **`do...while`** | Must display/run prompt/menu at least once before checking condition | User prompt input retry loops |

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Forgetting to update state inside a while loop body
```

```javascript
let count = 0;
while (count < 5) {
  console.log(count);
  // ❌ BUG: Forgot count++! Infinite Loop!
}
```

---

## 7. Edge Cases
- In `do...while` loops, semicolons at the end of the `while (condition);` line are mandatory.

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: What is the main operational difference between a `while` loop and a `do...while` loop?**
  - *Answer*: A `while` loop checks its condition before executing the loop body (meaning it can execute 0 times). A `do...while` loop executes its body first before evaluating the condition (guaranteeing it executes at least 1 time).

---

## 9. Practice Questions
1. How many times will a `do...while` loop execute if its condition is `false` from the start?
2. What is a sentinel value in loop control?
3. Convert a `for (let i = 0; i < 3; i++)` loop into an equivalent `while` loop.

---

## 10. Key Takeaways
- `while` checks condition first (0 or more executions).
- `do...while` executes body first (1 or more executions).
- Use `for` when iteration count is known; use `while` when iterations depend on dynamic conditions.
- Always ensure loop state changes inside the body to prevent infinite execution.
