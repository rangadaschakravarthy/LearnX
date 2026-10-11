/**
 * Day 3 Example 4: The Complete typeof Operator Evaluation Matrix
 * Run with Node.js: node 04-typeof-matrix.js
 */

console.log("==========================================");
console.log("4. Complete typeof Evaluation Matrix");
console.log("==========================================");

const testValues = [
  { val: "Hello", desc: "String Literal" },
  { val: 42, desc: "Integer Number" },
  { val: 100n, desc: "BigInt" },
  { val: true, desc: "Boolean" },
  { val: undefined, desc: "Undefined" },
  { val: null, desc: "Null (Historical Bug!)" },
  { val: Symbol("test"), desc: "Symbol" },
  { val: {}, desc: "Plain Object" },
  { val: [1, 2, 3], desc: "Array" },
  { val: function(){}, desc: "Function" },
  { val: NaN, desc: "NaN" },
  { val: new Date(), desc: "Date Object" }
];

console.table(
  testValues.map(item => ({
    Description: item.desc,
    TypeOfResult: typeof item.val,
    IsArrayCheck: Array.isArray(item.val),
    ObjectToStringTag: Object.prototype.toString.call(item.val)
  }))
);
