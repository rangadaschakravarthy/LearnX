# 12-Step Problem-Solving Framework & Pseudocode Guide

A structured, repeatable methodology for translating real-world programming problems into clean, robust JavaScript code.

---

## 🧭 The 12-Step Problem-Solving Process

```text
1. Understand the Goal  ➔  2. Identify Inputs & Types  ➔  3. Identify Expected Outputs  ➔
4. Clarify Constraints ➔  5. Define Boundary Cases     ➔  6. Determine Repetition & Flow ➔
7. Draft Pseudocode    ➔  8. Translate to JavaScript   ➔  9. Test Standard Cases        ➔
10. Test Edge Cases    ➔  11. Trace Execution Step-by-Step ➔ 12. Refactor for Clarity & Performance
```

---

## 📝 Step-by-Step Breakdown

### 1. Understand the Goal
Read the problem statement twice. Restate what the program must accomplish in your own words.

### 2. Identify Inputs & Types
What data enters the program? Are inputs numbers, strings, booleans, arrays, or objects?

### 3. Identify Expected Outputs
What data format should be returned or logged? (e.g., boolean `true`, formatted string, calculation number).

### 4. Clarify Constraints
What are the performance limits or rule restrictions? (e.g., $1 \le N \le 10000$, do not use built-in methods).

### 5. Define Boundary Cases
What values test the edges of logical conditions? (e.g. $0$, $-1$, $18$ for adult age check, empty string `""`, empty array `[]`).

### 6. Determine Repetition & Control Flow
Does the problem require decision-making (`if`/`else`/`switch`) or repetition (`for`/`while`/`for...of`)?

### 7. Draft Pseudocode
Write language-agnostic logic steps in plain English before writing JavaScript code.

### 8. Translate to JavaScript
Map each pseudocode step directly to clean JavaScript statements.

### 9. Test Standard Cases
Run the program with standard, ordinary input values to verify basic correctness.

### 10. Test Edge Cases
Run the program with boundary, zero, negative, or empty inputs.

### 11. Trace Execution Step-by-Step
Create a manual trace table to track variable state changes across iterations.

### 12. Refactor for Clarity & Performance
Remove redundant variables, simplify nested logic, use early returns where appropriate, and optimize execution.

---

## 📖 Mapping Pseudocode to JavaScript Example

### Problem: Determine if a number is positive, negative, or zero.

#### Pseudocode:
```text
START
  READ number
  IF number > 0 THEN
    PRINT "Positive"
  ELSE IF number < 0 THEN
    PRINT "Negative"
  ELSE
    PRINT "Zero"
  ENDIF
END
```

#### JavaScript Translation:
```javascript
"use strict";

function checkNumberSign(num) {
  if (num > 0) {
    return "Positive";
  } else if (num < 0) {
    return "Negative";
  } else {
    return "Zero";
  }
}

console.log(checkNumberSign(10));  // "Positive"
console.log(checkNumberSign(-5));  // "Negative"
console.log(checkNumberSign(0));   // "Zero"
```
