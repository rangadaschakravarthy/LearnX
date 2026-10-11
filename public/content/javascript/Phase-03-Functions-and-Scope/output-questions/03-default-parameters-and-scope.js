// Question 1: Default parameter evaluation when passing undefined vs null
function testDefaults(a = 10, b = 20) {
  console.log("Q1:", a, b);
}
testDefaults(undefined, null);

// Question 2: Earlier parameter used in later default parameter
function calc(x = 5, y = x * 2, z = x + y) {
  return x + y + z;
}
console.log("Q2:", calc(3));

// Question 3: Parameter TDZ trap
try {
  function tdzParam(a = b, b = 10) { return a + b; }
  tdzParam();
} catch(e) {
  console.log("Q3 Error:", e.name);
}

// Question 4: Default parameter side-effect function
let callCount = 0;
function getDefault() {
  callCount++;
  return 100;
}
function sideEffectFn(val = getDefault()) {
  return val;
}
sideEffectFn(50);
console.log("Q4 Call Count after explicit val:", callCount);
sideEffectFn();
console.log("Q4 Call Count after default trigger:", callCount);

// Question 5: Parameter scope isolation from body let
let outerVar = "GLOBAL";
function parameterScope(outerVar = "PARAM") {
  // let outerVar = "BODY"; // SyntaxError if uncommented
  return outerVar;
}
console.log("Q5:", parameterScope());
