/**
 * Day 4 Example 2: Comparison & Loose vs Strict Equality
 * Run with Node.js: node 02-comparison-equality.js
 */

console.log("==========================================");
console.log("2. Strict vs Loose Equality Comparison");
console.log("==========================================");

// 1. Strict Equality (===) vs Loose Equality (==)
console.log('5 === "5":', 5 === "5"); // false
console.log('5 == "5":', 5 == "5");   // true

console.log("1 === true:", 1 === true); // false
console.log("1 == true:", 1 == true);   // true

console.log('0 == "":', 0 == "");       // true
console.log('0 == false:', 0 == false); // true

// 2. null and undefined equality checks
console.log("\nnull and undefined Comparisons:");
console.log("null == undefined:", null == undefined);   // true (Spec exception)
console.log("null === undefined:", null === undefined); // false

console.log("null == 0:", null == 0);         // false
console.log("null == false:", null == false); // false

// 3. Object Reference Equality Comparison
const obj1 = { name: "Alice" };
const obj2 = { name: "Alice" };
console.log("\nObject Reference Comparison ({name:'Alice'} === {name:'Alice'}):", obj1 === obj2); // false!
