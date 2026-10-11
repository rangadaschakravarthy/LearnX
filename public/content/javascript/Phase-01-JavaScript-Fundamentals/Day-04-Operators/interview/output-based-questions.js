/**
 * Day 4 Output Prediction Questions
 * Predict outputs before viewing solutions in solutions/output-solutions.md!
 */

// Question 1
let x = 5;
console.log(x++ + ++x);

// Question 2
console.log("Hello" && 0 && "World");

// Question 3
console.log(0 || "Fallback");

// Question 4
console.log(0 ?? "Fallback");

// Question 5
const user = { settings: null };
console.log(user.settings?.theme ?? "dark");
