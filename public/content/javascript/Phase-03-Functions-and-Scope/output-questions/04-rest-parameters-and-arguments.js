// Question 1: Array instance vs Array-like object
function checkTypes(...rest) {
  console.log("Q1 Rest is Array:", Array.isArray(rest));
  console.log("Q1 Arguments is Array:", Array.isArray(arguments));
}
checkTypes(1, 2, 3);

// Question 2: Function arity (length) with rest and defaults
function arity1(a, b, c) {}
function arity2(a, b = 2, c) {}
function arity3(a, ...rest) {}
console.log("Q2 Arity:", arity1.length, arity2.length, arity3.length);

// Question 3: Arguments array slice conversion
function legacySlice() {
  const argsArray = Array.prototype.slice.call(arguments);
  return argsArray.reduce((acc, curr) => acc + curr, 0);
}
console.log("Q3:", legacySlice(10, 20, 30));

// Question 4: Modifying parameter sync with arguments (non-strict)
function syncArgs(a) {
  a = 99;
  return arguments[0];
}
console.log("Q4 Sync:", syncArgs(10));

// Question 5: Destructured rest parameters
function destructRest([first, second, ...remaining]) {
  return { first, second, remaining };
}
console.log("Q5:", destructRest([1, 2, 3, 4, 5]));
