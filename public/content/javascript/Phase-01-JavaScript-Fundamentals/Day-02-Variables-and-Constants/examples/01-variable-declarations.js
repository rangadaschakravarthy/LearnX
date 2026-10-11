/**
 * Day 2 Example 1: Variable Declarations, Initialization & Reassignment
 * Run with Node.js: node 01-variable-declarations.js
 */

console.log("==========================================");
console.log("1. Variable Lifecycle Showcase");
console.log("==========================================");

// 1. Declaration without initialization (defaults to undefined)
let unassignedLet;
console.log("Unassigned let value:", unassignedLet); // undefined

// 2. Declaration with initial value
let currentScore = 100;
console.log("Initial Score:", currentScore); // 100

// 3. Reassignment
currentScore = 150;
console.log("Reassigned Score:", currentScore); // 150

// 4. Constant Declaration
const SITE_URL = "https://javascriptmastery.org";
console.log("Constant URL:", SITE_URL);

// Attempting reassignment on const throws TypeError:
try {
  // @ts-ignore
  SITE_URL = "https://other.org";
} catch (error) {
  console.log("✅ Caught const reassignment error:", error.name, "-", error.message);
}
