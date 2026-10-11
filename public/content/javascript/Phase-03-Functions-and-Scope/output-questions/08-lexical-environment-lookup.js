// Question 1: Static scoping vs dynamic call site
var value = "GLOBAL_VALUE";
function printValue() {
  console.log("Q1:", value);
}
function caller() {
  var value = "CALLER_VALUE";
  printValue();
}
caller();

// Question 2: Closure retaining Lexical Environment
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}
const add5 = makeAdder(5);
const add10 = makeAdder(10);
console.log("Q2:", add5(2), add10(2));

// Question 3: Shared parent environment mutation
function createCounters() {
  let count = 0;
  return {
    inc: () => ++count,
    dec: () => --count,
    get: () => count
  };
}
const counter = createCounters();
counter.inc();
counter.inc();
counter.dec();
console.log("Q3:", counter.get());

// Question 4: Double nested lexical lookup
function level1(a) {
  return function level2(b) {
    return function level3(c) {
      return a + b + c;
    };
  };
}
console.log("Q4:", level1(1)(2)(3));

// Question 5: Outer scope resolution when local parameter shadows
function outerScope(x) {
  return function innerScope(x) {
    return x * 2;
  };
}
console.log("Q5 Inner parameter shadow:", outerScope(10)(5));
