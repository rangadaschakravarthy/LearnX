/**
 * Day 7 Interview Output Prediction Questions
 * Predict outputs before checking answers!
 */

// Question 1
let val = 1;
switch (val) {
  case 1: console.log("One");
  case 2: console.log("Two");
  default: console.log("Default");
}

// Question 2
function checkSwitch(x) {
  switch (x) {
    case "10": return "String 10";
    case 10: return "Number 10";
  }
}
console.log(checkSwitch(10));
