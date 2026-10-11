/**
 * Day 5 Example 3: The 8 Falsy Values vs Misidentified Truthy Values
 * Run with Node.js: node 03-truthy-falsy-examples.js
 */

console.log("==========================================");
console.log("3. Exactly 8 Falsy Values Evaluation");
console.log("==========================================");

const exactFalsyList = [
  false,
  0,
  -0,
  0n,
  "",
  null,
  undefined,
  NaN
];

console.log("Evaluating the 8 Falsy values:");
exactFalsyList.forEach((val, idx) => {
  console.log(`Falsy ${idx + 1}:`, String(val), "-> Boolean:", Boolean(val));
});

console.log("\nEvaluating Misidentified TRUTHY Values:");
console.log('Boolean([]):', Boolean([]));             // true!
console.log('Boolean({}):', Boolean({}));             // true!
console.log('Boolean("0"):', Boolean("0"));           // true!
console.log('Boolean("false"):', Boolean("false"));   // true!
console.log('Boolean(-42):', Boolean(-42));           // true!
