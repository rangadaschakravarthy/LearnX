// Question 1: Complex closure + scope + default params
let count = 0;
function outer(count = 10) {
  return function inner() {
    return ++count;
  };
}
const fn1 = outer();
const fn2 = outer(50);
console.log("Q1 fn1:", fn1(), fn1());
console.log("Q1 fn2:", fn2());
console.log("Q1 Global count:", count);

// Question 2: Arrow function vs traditional function arguments & this
const testObj = {
  id: "OBJ_1",
  trad: function() {
    return () => this.id;
  }
};
const unbound = testObj.trad();
console.log("Q2 Unbound method arrow return:", unbound());

// Question 3: Currying with parameter mutation
function curryAdd(a) {
  return function(b) {
    if (b !== undefined) {
      return curryAdd(a + b);
    }
    return a;
  };
}
console.log("Q3 Curried sum:", curryAdd(1)(2)(3)(4)());

// Question 4: Array map with custom callback modifying array length
const items = [1, 2, 3, 4];
const mapped = items.map((val, idx, arr) => {
  if (idx === 0) arr.pop();
  return val * 2;
});
console.log("Q4 Mapped after pop:", mapped);

// Question 5: Hoisting + Shadowing + TDZ grand finale
var master = "GLOBAL_MASTER";
function masterTest(param = master) {
  console.log("Q5 Param value:", param);
  if (true) {
    let master = "BLOCK_MASTER";
    console.log("Q5 Block value:", master);
  }
  return typeof master;
}
console.log("Q5 Master test return:", masterTest());
