// Question 1: let block scope
{
  let blockScoped = 100;
  var functionScoped = 200;
}
console.log("Q1 var leaking block:", functionScoped);
try {
  console.log("Q1 let block access:", blockScoped);
} catch(e) {
  console.log("Q1 let error:", e.name);
}

// Question 2: Loop counter var vs let closure
var funcsVar = [];
for (var i = 0; i < 3; i++) {
  funcsVar.push(function() { return i; });
}
console.log("Q2 var loop results:", funcsVar.map(f => f()));

var funcsLet = [];
for (let j = 0; j < 3; j++) {
  funcsLet.push(function() { return j; });
}
console.log("Q2 let loop results:", funcsLet.map(f => f()));

// Question 3: Variable shadowing in nested block
let val = "OUTER";
{
  let val = "INNER";
  console.log("Q3 inside block:", val);
}
console.log("Q3 outside block:", val);

// Question 4: Switch case block scope sharing
switch(1) {
  case 1:
    let scopeCheck = "case 1";
    console.log("Q4 case 1:", scopeCheck);
    break;
  case 2:
    // let scopeCheck = "case 2"; // SyntaxError if unblocked
    break;
}

// Question 5: Catch block error identifier shadowing
let err = "GLOBAL_ERROR";
try {
  throw new Error("CAUGHT_ERROR");
} catch(err) {
  console.log("Q5 inside catch:", err.message);
}
console.log("Q5 outside catch:", err);
