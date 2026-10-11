/**
 * Day 3 Example 1: The 7 Primitive Types Showcase
 * Run with Node.js: node 01-primitive-types.js
 */

console.log("==========================================");
console.log("1. Primitive Data Types Showcase");
console.log("==========================================");

// 1. String
const str = "JavaScript Mastery";
console.log("String:", str, "| Length:", str.length);

// 2. Number
const num = 3.14159;
console.log("Number:", num);

// 3. BigInt
const bigIntVal = 9007199254740993n;
console.log("BigInt:", bigIntVal);

// 4. Boolean
const isValid = true;
console.log("Boolean:", isValid);

// 5. Undefined
let unassignedVar;
console.log("Undefined:", unassignedVar);

// 6. Null
const emptyRef = null;
console.log("Null:", emptyRef);

// 7. Symbol
const sym1 = Symbol("user_id");
const sym2 = Symbol("user_id");
console.log("Symbol 1:", sym1.toString());
console.log("Symbol equality check (sym1 === sym2):", sym1 === sym2); // false!
