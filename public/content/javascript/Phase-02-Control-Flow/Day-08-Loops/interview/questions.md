# Day 8 Interview Questions — Loops & Iteration

### Question 1 (Conceptual): What are the execution steps of a `for` loop?
**Answer:** 1. Initialization (executes once before loop starts). 2. Condition check (evaluated before each iteration; if false, loop exits). 3. Loop body (executes if condition was true). 4. Update step (executes after body finishes). 5. Repeat from step 2.

### Question 2 (Conceptual): What is the difference between a `while` loop and a `do...while` loop?
**Answer:** A `while` loop checks its condition before executing the loop body (0 or more executions). A `do...while` loop executes its body first before evaluating the condition, guaranteeing at least 1 execution.

### Question 3 (Conceptual): What is an off-by-one error in loop boundary checks?
**Answer:** An off-by-one error occurs when choosing between strict comparison (`<`) and inclusive comparison (`<=`) on 0-indexed structures. Using `i <= arr.length` attempts to read `arr[arr.length]`, which evaluates to `undefined` and causes bugs.

### Question 4 (Tricky): What happens when `continue` is invoked inside a `while` loop if the counter is incremented at the bottom of the loop body?
**Answer:** `continue` skips the remainder of the body, skipping the counter increment statement. The loop returns to the condition check with an unchanged counter value, triggering an infinite loop.
