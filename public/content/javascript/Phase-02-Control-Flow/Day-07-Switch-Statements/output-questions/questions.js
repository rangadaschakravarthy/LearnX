/**
 * Day 7 Output Prediction Questions
 * Predict outputs before checking solutions.md!
 */

// Question 1
let code = 2;
switch (code) {
  case 1: console.log("A");
  case 2: console.log("B");
  case 3: console.log("C");
    break;
  default: console.log("D");
}

// Question 2
let role = "admin";
switch (role) {
  case "Admin":
    console.log("Admin Matched");
    break;
  default:
    console.log("Default Matched");
}

// Question 3
let num = "5";
switch (num) {
  case 5:
    console.log("Number 5");
    break;
  case "5":
    console.log("String 5");
    break;
}

// Question 4
switch (true) {
  case (10 > 20):
    console.log("First");
    break;
  case (5 === 5):
    console.log("Second");
    break;
}
