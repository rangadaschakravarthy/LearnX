// Question 1: Implicit return object literal without parens
const makeObjBad = () => { key: "value" };
const makeObjGood = () => ({ key: "value" });
console.log("Q1 Bad:", makeObjBad());
console.log("Q1 Good:", makeObjGood());

// Question 2: Arrow function lack of arguments object
function outerFunc() {
  const arrowInner = () => arguments[0];
  return arrowInner();
}
console.log("Q2:", outerFunc("Outer Arg"));

// Question 3: Arrow function constructor call
const ArrowConstructor = () => { this.name = "Test"; };
try {
  new ArrowConstructor();
} catch(e) {
  console.log("Q3 Error:", e.name, "-", e.message);
}

// Question 4: Object method arrow function this
const obj = {
  name: "Gadget",
  regularMethod: function() { return this.name; },
  arrowMethod: () => this?.name || "undefined-global"
};
console.log("Q4 Regular:", obj.regularMethod());
console.log("Q4 Arrow:", obj.arrowMethod());

// Question 5: Arrow function in setTimeout inside method
const timerObj = {
  count: 10,
  start: function() {
    return (() => this.count)();
  }
};
console.log("Q5 Arrow in method:", timerObj.start());
