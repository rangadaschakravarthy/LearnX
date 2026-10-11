/**
 * Day 1 Output Prediction Questions
 * Predict the output of each question before checking solutions/output-solutions.md!
 */

// Question 1
console.log(typeof console.log);

// Question 2
function testStrict() {
  "use strict";
  try {
    // @ts-ignore
    eval("a = 10;");
    console.log(a);
  } catch (e) {
    console.log("Error Caught");
  }
}
testStrict();

// Question 3
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);

// Question 4
function getVal() {
  return
  100;
}
console.log(getVal());

// Question 5
console.log(typeof ("use strict"));
