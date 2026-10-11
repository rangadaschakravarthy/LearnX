/**
 * Day 7 Example 2: Intentional vs Accidental Fall-Through
 * Run with Node.js: node 02-fall-through-examples.js
 */

"use strict";

console.log("==========================================");
console.log("2. Fall-Through Showcase");
console.log("==========================================");

// 1. Intentional Fall-Through (Grouping Cases)
function getCategory(item) {
  switch (item.toLowerCase()) {
    case "apple":
    case "banana":
    case "orange":
    case "mango":
      return "Fruit";

    case "carrot":
    case "spinach":
    case "broccoli":
      return "Vegetable";

    default:
      return "Unknown Item";
  }
}

console.log("Apple category:", getCategory("Apple"));     // Fruit
console.log("Spinach category:", getCategory("spinach")); // Vegetable

// 2. Accidental Fall-Through Bug Simulation
function accidentalFallThroughDemo(step) {
  console.log("\nSimulating Accidental Fall-Through:");
  switch (step) {
    case 1:
      console.log("Step 1 Completed"); // Forgot break!
    case 2:
      console.log("Step 2 Completed"); // Forgot break!
    case 3:
      console.log("Step 3 Completed");
      break;
  }
}

accidentalFallThroughDemo(1);
