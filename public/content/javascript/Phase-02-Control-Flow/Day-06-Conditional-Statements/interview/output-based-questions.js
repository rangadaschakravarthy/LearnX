/**
 * Day 6 Interview Output Prediction Questions
 * Predict outputs before checking answers!
 */

// Question 1
let a = 10;
if (a > 5) {
  let a = 20;
  console.log(a);
}
console.log(a);

// Question 2
function testGuard(val) {
  if (!val) return "Guard 1";
  if (val > 10) return "Guard 2";
  return "Happy Path";
}
console.log(testGuard(0));
console.log(testGuard(15));
console.log(testGuard(5));
