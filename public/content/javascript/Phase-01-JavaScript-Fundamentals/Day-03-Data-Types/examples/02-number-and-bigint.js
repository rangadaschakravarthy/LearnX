/**
 * Day 3 Example 2: Number Precision, BigInt, NaN & Infinity
 * Run with Node.js: node 02-number-and-bigint.js
 */

console.log("==========================================");
console.log("2. Numbers, BigInt & Floating Point Precision");
console.log("==========================================");

// 1. Floating point precision
console.log("0.1 + 0.2 =", 0.1 + 0.2);
console.log("0.1 + 0.2 === 0.3 ->", 0.1 + 0.2 === 0.3);
console.log("Safe float comparison using Number.EPSILON:", Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON);

// 2. Safe Integer Boundaries
console.log("\nMax Safe Integer:", Number.MAX_SAFE_INTEGER);
console.log("Beyond Safe Integer Math (Precision Loss):");
console.log("9007199254740991 + 1 =", 9007199254740991 + 1);
console.log("9007199254740991 + 2 =", 9007199254740991 + 2); // Loss of precision!

// 3. BigInt Math
console.log("\nBigInt Exact Math:");
console.log("9007199254740991n + 1n =", 9007199254740991n + 1n);
console.log("9007199254740991n + 2n =", 9007199254740991n + 2n);

// 4. NaN Traps
const invalid = "abc" / 2;
console.log("\nInvalid math result:", invalid);
console.log("NaN === NaN check:", invalid === invalid); // false!
console.log("Number.isNaN(invalid):", Number.isNaN(invalid)); // true
