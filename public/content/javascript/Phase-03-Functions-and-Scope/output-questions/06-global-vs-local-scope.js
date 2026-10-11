// Question 1: Implicit global creation
function createGlobal() {
  leakedVar = "I leaked";
}
createGlobal();
console.log("Q1 Leaked:", globalThis.leakedVar);

// Question 2: Scope variable masking
var scopeVar = "GLOBAL";
function shadowScope() {
  var scopeVar = "LOCAL";
  return scopeVar;
}
console.log("Q2:", shadowScope());
console.log("Q2 Global Unchanged:", scopeVar);

// Question 3: Nested function variable search
var x = 1;
function outer() {
  var x = 2;
  function inner() {
    return x;
  }
  return inner();
}
console.log("Q3 Outer Scope Lookup:", outer());

// Question 4: Function declaration vs variable scope
var item = "global item";
function processItem() {
  console.log("Q4 inside before declaration:", typeof item);
  var item = "local item";
  console.log("Q4 inside after declaration:", item);
}
processItem();

// Question 5: Window/Global property check
var globalVar = "var-global";
let globalLet = "let-global";
console.log("Q5 var on globalThis:", globalThis.globalVar);
console.log("Q5 let on globalThis:", globalThis.globalLet);
