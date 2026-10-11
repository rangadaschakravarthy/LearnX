/**
 * Day 5 Exercise 3 (🔴 Challenge): Abstract Equality Trace
 * Instruction: Explain the step-by-step Abstract Equality trace for [] == ![] in comments.
 */

"use strict";

// Challenge Expression: [] == ![]

// Step 1: Evaluate unary NOT (![]) -> ![] evaluates to false because [] is truthy.
// Expression becomes: [] == false

// Step 2: In Abstract Equality (==), boolean false coerces to number 0 via ToNumber(false).
// Expression becomes: [] == 0

// Step 3: In Abstract Equality, object [] coerces to primitive via [].toString() -> "".
// Expression becomes: "" == 0

// Step 4: String "" coerces to number 0 via ToNumber("").
// Expression becomes: 0 == 0

// Step 5: 0 === 0 evaluates to true.

console.log("Result of [] == ![]:", [] == ![]); // true
