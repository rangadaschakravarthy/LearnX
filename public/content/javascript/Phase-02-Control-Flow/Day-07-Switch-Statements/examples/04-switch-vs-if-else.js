/**
 * Day 7 Example 4: Decision Matrix Comparison (switch vs if/else)
 * Run with Node.js: node 04-switch-vs-if-else.js
 */

"use strict";

console.log("==========================================");
console.log("4. switch vs if / else Showcase");
console.log("==========================================");

// Scenario A: Menu Choice (Prefer switch)
function executeMenuOptionSwitch(choice) {
  switch (choice) {
    case 1: return "Option 1: View Balance";
    case 2: return "Option 2: Deposit Funds";
    case 3: return "Option 3: Withdraw Funds";
    default: return "Option 4: Exit System";
  }
}

// Scenario B: Temperature Range Check (Prefer if/else)
function getWeatherAdvice(tempCelsius) {
  if (tempCelsius >= 35) {
    return "Extreme Heat: Stay indoors!";
  } else if (tempCelsius >= 20) {
    return "Pleasant Weather: Great for a walk!";
  } else if (tempCelsius >= 5) {
    return "Chilly: Wear a jacket.";
  } else {
    return "Freezing: Wear heavy winter gear!";
  }
}

console.log("Menu Choice 2:", executeMenuOptionSwitch(2));
console.log("Weather Advice (28°C):", getWeatherAdvice(28));
