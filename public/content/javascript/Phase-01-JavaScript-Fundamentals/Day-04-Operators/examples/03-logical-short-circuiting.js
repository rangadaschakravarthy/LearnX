/**
 * Day 4 Example 3: Logical Operators & Short-Circuit Evaluation
 * Run with Node.js: node 03-logical-short-circuiting.js
 */

console.log("==========================================");
console.log("3. Logical Operators & Short-Circuiting");
console.log("==========================================");

// 1. Logical AND (&&) Short-Circuiting
console.log('"Cat" && "Dog":', "Cat" && "Dog"); // "Dog" (Both truthy -> returns last)
console.log('"" && "Dog":', "" && "Dog");       // "" (Short-circuits on first falsy)

// Guard Clause Pattern
const userAccount = { isActive: true, username: "alex_dev" };
userAccount.isActive && console.log("Guard Clause Passed! User is active:", userAccount.username);

// 2. Logical OR (||) Short-Circuiting
console.log('\n"Default" || "Fallback":', "Default" || "Fallback"); // "Default" (Short-circuits on first truthy)
console.log('"" || "Fallback":', "" || "Fallback");               // "Fallback"

// 3. Double NOT (!!) Conversion
console.log("\nDouble NOT (!!) Conversions:");
console.log('!!"Hello":', !!"Hello"); // true
console.log("!!0:", !!0);             // false
console.log("!!null:", !!null);       // false
