// Question 1: Function declaration vs var hoisting
console.log("Q1:", typeof foo);
var foo = "Variable";
function foo() { return "Function"; }
console.log("Q1 after assignment:", typeof foo);

// Question 2: TDZ ReferenceError
try {
  console.log("Q2 TDZ:", tdzVar);
  let tdzVar = 10;
} catch(e) {
  console.log("Q2 TDZ Error:", e.name);
}

// Question 3: Self referential let declaration TDZ
try {
  let a = a + 1;
} catch(e) {
  console.log("Q3 Self reference error:", e.name);
}

// Question 4: Function expression var hoisting
try {
  bar();
  var bar = function() { console.log("bar executed"); };
} catch(e) {
  console.log("Q4 bar error:", e.name, "-", e.message);
}

// Question 5: Block scope function declaration hoisting in non-strict mode
var fnTest;
console.log("Q5 Before block:", typeof blockFn);
if (true) {
  function blockFn() { return "block fn"; }
}
console.log("Q5 After block:", typeof blockFn);
