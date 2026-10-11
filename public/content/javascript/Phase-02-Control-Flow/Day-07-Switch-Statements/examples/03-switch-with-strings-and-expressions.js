/**
 * Day 7 Example 3: String Routing & switch (true) Range Expressions
 * Run with Node.js: node 03-switch-with-strings-and-expressions.js
 */

"use strict";

console.log("==========================================");
console.log("3. String Commands & Range Expressions");
console.log("==========================================");

// 1. String Command Dispatcher
function dispatchUserAction(action) {
  switch (action) {
    case "LOGIN":
      return "Initiating Login Sequence...";
    case "LOGOUT":
      return "Clearing Session & Logging Out...";
    case "UPDATE_PROFILE":
      return "Opening Profile Settings...";
    default:
      return `Error: Unknown Action '${action}'`;
  }
}

console.log(dispatchUserAction("LOGIN"));
console.log(dispatchUserAction("INVALID"));

// 2. Advanced Range Expression: switch (true)
function getScoreTier(score) {
  switch (true) {
    case (score >= 90):
      return "Platinum Tier (Score >= 90)";
    case (score >= 75):
      return "Gold Tier (Score >= 75)";
    case (score >= 50):
      return "Silver Tier (Score >= 50)";
    default:
      return "Bronze Tier (Score < 50)";
  }
}

console.log("\nScore 88:", getScoreTier(88));
console.log("Score 42:", getScoreTier(42));
