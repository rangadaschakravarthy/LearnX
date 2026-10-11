/**
 * Day 3 Example 3: Pass-By-Value vs Pass-By-Reference Memory Mechanics
 * Run with Node.js: node 03-primitive-vs-reference.js
 */

console.log("==========================================");
console.log("3. Primitive vs Reference Memory Behavior");
console.log("==========================================");

// 1. Primitive Pass-by-Value
let originalNumber = 50;
let copiedNumber = originalNumber; // Independent copy created on stack
copiedNumber = 100;

console.log("Original Number:", originalNumber); // 50 (Unchanged!)
console.log("Copied Number:", copiedNumber);     // 100

// 2. Reference Pass-by-Reference
let originalUser = { name: "Sophia", role: "Developer" };
let copiedUser = originalUser; // Copies heap pointer address!

copiedUser.role = "Lead Architect";

console.log("\nOriginal User Role:", originalUser.role); // "Lead Architect"! (Mutated!)
console.log("Copied User Role:", copiedUser.role);     // "Lead Architect"!

// 3. Object Reference Equality Comparison
const objA = { id: 1 };
const objB = { id: 1 };

console.log("\nEqual Contents Objects Equality ({id:1} === {id:1}):", objA === objB); // false!
console.log("Identical Reference Pointer Equality (objA === copiedUser):", objA === objA); // true
