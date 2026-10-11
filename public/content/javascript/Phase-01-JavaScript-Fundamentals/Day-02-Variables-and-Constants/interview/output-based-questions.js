/**
 * Day 2 Output Prediction Questions
 * Predict outputs before viewing solutions in solutions/output-solutions.md!
 */

// Question 1
console.log(myVar);
var myVar = 10;

// Question 2
try {
  // @ts-ignore
  console.log(myLet);
  let myLet = 20;
} catch (e) {
  console.log("Caught Error 2");
}

// Question 3
for (var i = 0; i < 3; i++) {
  // Loop
}
console.log(i);

// Question 4
const user = { name: "Alice" };
user.name = "Bob";
console.log(user.name);

// Question 5
let x = 1;
{
  let x = 2;
  console.log(x);
}
console.log(x);
