/**
 * Day 1 Example 3: Strict Mode Behavior & Error Traps
 * Run with Node.js: node 03-strict-mode-examples.js
 */

"use strict";

console.log("==========================================");
console.log("Strict Mode Demonstration");
console.log("==========================================");

// 1. Correct Declaration inside Strict Mode
let appVersion = "1.0.0";
const maxUsers = 500;

console.log(`App Version: ${appVersion}, Max Users: ${maxUsers}`);

// 2. Catching Undeclared Variable Assignment
try {
  // Intentional strict mode failure demonstration
  // @ts-ignore
  eval("unassignedVariable = 42;");
} catch (error) {
  console.log("✅ Strict Mode caught error:", error.name, "-", error.message);
}

// 3. Catching Duplicate Parameters in Function
try {
  eval("function duplicateParams(a, a, b) { return a + b; }");
} catch (error) {
  console.log("✅ Strict Mode caught duplicate parameter error:", error.name, "-", error.message);
}

console.log("Strict Mode verification finished successfully.");
