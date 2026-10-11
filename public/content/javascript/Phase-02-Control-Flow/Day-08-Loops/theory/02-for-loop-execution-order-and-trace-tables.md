# `for` Loop Execution Order & Execution Trace Tables

## 1. What is it?
The **`for` loop** is a compact count-controlled loop structure that groups initialization, condition, and update steps into a single declaration header.

---

## 2. Syntax & Execution Order

```javascript
for (initialization; condition; update) {
  // Loop Body
}
```

```text
🔥 Master Execution Order Sequence:
1. Initialization: Executes ONCE before the loop starts.
2. Condition Check: Evaluates before EVERY iteration. If false, loop terminates immediately.
3. Body Execution: Executes statements inside {} if condition was true.
4. Update Step: Executes after the body finishes.
5. Repeat: Moves back to Step 2 (Condition Check).
```

---

## 3. Detailed Execution Trace Table Example

```javascript
for (let i = 1; i <= 3; i++) {
  console.log(`Value: ${i}`);
}
```

### Manual Execution Trace Table:

| Step | `i` Value | Condition (`i <= 3`) | Action / Output | Update Step (`i++`) | Next `i` Value |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Init** | `1` | `1 <= 3` $\rightarrow$ **`true`** | Prints `"Value: 1"` | `1 + 1` | `2` |
| **Iter 2**| `2` | `2 <= 3` $\rightarrow$ **`true`** | Prints `"Value: 2"` | `2 + 1` | `3` |
| **Iter 3**| `3` | `3 <= 3` $\rightarrow$ **`true`** | Prints `"Value: 3"` | `3 + 1` | `4` |
| **Exit** | `4` | `4 <= 3` $\rightarrow$ **`false`** | **LOOP TERMINATES** | N/A | `4` (Scope Exited) |

---

## 4. Decrementing & Custom Step Sizes

```javascript
// 1. Decrementing Loop (Counting down 5 to 1)
for (let i = 5; i >= 1; i--) {
  console.log(`Countdown: ${i}`);
}

// 2. Custom Step Size (Even numbers up to 10)
for (let i = 2; i <= 10; i += 2) {
  console.log(`Even number: ${i}`);
}
```

---

## 5. Step-by-Step Trace Table for Accumulator Loop

```javascript
let sum = 0;
for (let i = 1; i <= 4; i++) {
  sum += i;
}
```

| Iteration | `i` Value | Condition (`i <= 4`) | `sum` Before | `sum += i` Calculation | `sum` After |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Iter 1** | `1` | `1 <= 4` (true) | `0` | `0 + 1` | `1` |
| **Iter 2** | `2` | `2 <= 4` (true) | `1` | `1 + 2` | `3` |
| **Iter 3** | `3` | `3 <= 4` (true) | `3` | `3 + 3` | `6` |
| **Iter 4** | `4` | `4 <= 4` (true) | `6` | `6 + 4` | `10` |
| **Exit** | `5` | `5 <= 4` (false) | `10` | Loop Ended | **Final `sum` = 10** |

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Forgetting that the update step runs AFTER the body
```

```javascript
for (let i = 0; i < 5; i++) {
  // Note: Inside the body on iteration 1, i is 0, NOT 1!
}
```

---

## 7. Edge Cases
- All three parts of a `for` loop header are optional!
```javascript
let i = 0;
for (; i < 3; ) {
  console.log(i);
  i++;
}
```

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: In what exact sequence does a `for` loop execute its header expressions?**
  - *Answer*: 1. Initialization (once). 2. Condition check. 3. Loop body. 4. Update step. 5. Repeat from condition check.

---

## 9. Practice Questions
1. Create a trace table for `for (let i = 5; i > 2; i--)`.
2. How many times does `for (let i = 0; i < 10; i += 3)` execute?
3. What is the value of `i` when `for (let i = 0; i < 5; i++)` terminates?

---

## 10. Key Takeaways
- Initialization runs once before loop entry.
- Condition checks before every iteration; update step runs after every body execution.
- Trace tables track variable state across iterations to debug logic errors.
- Loop termination occurs when the condition evaluates to `false`.
