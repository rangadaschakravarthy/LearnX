/**
 * Day 2 Example 3: Hoisting Mechanisms & Temporal Dead Zone (TDZ)
 * Run with Node.js: node 03-hoisting-and-tdz.js
 */

console.log("==========================================");
console.log("3. Hoisting & TDZ Demonstration");
console.log("==========================================");

// 1. var Hoisting
console.log("var value before line declaration:", hoistedVar); // undefined
var hoistedVar = "Now assigned!";
console.log("var value after line declaration:", hoistedVar); // "Now assigned!"

// 2. Function Declaration Hoisting
console.log("Invoking function before its declaration:");
console.log(hoistedFunction()); // "Function executed!"

function hoistedFunction() {
  return "Function executed!";
}

// 3. Temporal Dead Zone with let & const
try {
  // @ts-ignore
  console.log(tdzLet);
} catch (err) {
  console.log("✅ Caught TDZ ReferenceError for let:", err.name, "-", err.message);
}

let tdzLet = "Initialized let value!";
console.log("let value after TDZ line:", tdzLet);
