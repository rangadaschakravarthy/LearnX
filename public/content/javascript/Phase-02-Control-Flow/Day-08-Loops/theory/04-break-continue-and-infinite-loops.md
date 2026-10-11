# `break`, `continue` & Infinite Loop Hazards

## 1. What is it?
- **`break` Statement**: Immediately terminates the enclosing loop, jumping to the statement right after the loop block.
- **`continue` Statement**: Immediately skips the remainder of the current iteration body and jumps directly to the update step / condition check for the next iteration.
- **Infinite Loop**: A loop whose termination condition is never reached (`true` forever), freezing execution threads.

---

## 2. `break` vs `continue` Mechanics

```javascript
// 1. break Example: Stop search when value is found
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    console.log("Target 5 found! Exiting loop early.");
    break; // Loop terminates completely at i = 5!
  }
  console.log(`Checking i = ${i}`);
}
// Output: Checking 1, 2, 3, 4, Target 5 found! Exiting...

// 2. continue Example: Skip even numbers (print odd numbers only)
for (let i = 1; i <= 5; i++) {
  if (i % 2 === 0) {
    continue; // Skips remaining code for even numbers!
  }
  console.log(`Odd number: ${i}`);
}
// Output: Odd 1, Odd 3, Odd 5
```

---

## 3. `continue` Trap inside `while` Loops

```text
⚠️ Critical Gotcha: Using continue in a while loop before updating counter!
```

```javascript
let i = 0;
while (i < 5) {
  if (i === 3) {
    // ❌ BUG: continue jumps back to while (i < 5) WITHOUT calling i++!
    // i remains 3 forever -> Infinite Loop!
    continue; 
  }
  console.log(i);
  i++;
}

// ✅ FIX: Increment counter BEFORE calling continue:
let j = 0;
while (j < 5) {
  if (j === 3) {
    j++; // Advance counter before continue!
    continue;
  }
  console.log(j);
  j++;
}
```

---

## 4. Identifying & Fixing Accidental Infinite Loops

```javascript
// Cause 1: Wrong comparison operator
// for (let i = 10; i > 0; i++) {} // i increases forever!

// Cause 2: Condition impossible to reach
// let i = 1; while (i !== 10) { i += 2; } // i goes 1, 3, 5, 7, 9, 11... misses 10!
```

---

## 5. Step-by-Step Execution Comparison

```text
break    ──► Terminate loop completely  ──► Jump to code outside loop
continue ──► Skip rest of current body  ──► Jump to update step / next iteration
```

---

## 6. Common Mistakes

```text
⚠️ JavaScript Gotcha: Overusing break/continue to create spaghettified control flow
```

Use `break` for early exit search conditions and `continue` for filtering, but keep logic readable without excessive nested jumps.

---

## 7. Edge Cases
- `break` and `continue` only affect the **innermost** enclosing loop in nested loop configurations unless paired with Loop Labels.

---

## 8. Interview Perspective

### 🎯 Interview Focus
- **Q: What is the difference between `break` and `continue` inside a loop?**
  - *Answer*: `break` exits the loop entirely. `continue` terminates only the current iteration body, skipping remaining statements in that iteration and advancing directly to the next iteration update step.

---

## 9. Practice Questions
1. Predict the output of `for (let i=1; i<=3; i++) { if (i===2) break; console.log(i); }`.
2. Why can using `continue` inside a `while` loop accidentally trigger an infinite loop?
3. What happens when `break` executes inside the inner loop of a nested loop structure?

---

## 10. Key Takeaways
- Use `break` to exit loops early when target data is found.
- Use `continue` to skip unwanted iterations (filtering).
- Always increment counter variables before calling `continue` in `while` loops.
- Prevent infinite loops by verifying counter mutation direction toward termination conditions.
