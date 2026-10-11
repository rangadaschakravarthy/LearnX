// Question 1: Calling before declaration
console.log("Q1:", typeof declareMe);
function declareMe() { return "I am declared"; }

// Question 2: Calling var expression before line
try {
  console.log("Q2:", typeof expressMe);
  expressMe();
} catch(e) {
  console.log("Q2 Error:", e.name, "-", e.message);
}
var expressMe = function() { return "I am expressed"; };

// Question 3: Named function expression scope
const fnExpr = function namedFn(n) {
  if (n <= 1) return 1;
  return n * namedFn(n - 1);
};
console.log("Q3:", fnExpr(3));
try {
  console.log("Q3 Outer:", typeof namedFn);
} catch(e) {
  console.log("Q3 Outer Error:", e.name);
}

// Question 4: Reassigning function declaration variable
function testReassign() { return 100; }
console.log("Q4 Before:", testReassign());
var testReassign = 200;
console.log("Q4 After:", typeof testReassign);

// Question 5: Conditional function declaration in strict mode
"use strict";
if (true) {
  function blockFunc() { return "inside block"; }
  console.log("Q5 Inside:", blockFunc());
}
try {
  console.log("Q5 Outside:", typeof blockFunc);
} catch(e) {
  console.log("Q5 Outside Error:", e.name);
}
