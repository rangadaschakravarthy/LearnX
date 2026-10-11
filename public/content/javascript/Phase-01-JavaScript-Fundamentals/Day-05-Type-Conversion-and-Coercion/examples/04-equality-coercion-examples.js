/**
 * Day 5 Example 4: Abstract Equality Comparison (==) Coercion Matrix
 * Run with Node.js: node 04-equality-coercion-examples.js
 */

console.log("==========================================");
console.log("4. Abstract Equality (==) Coercion Matrix");
console.log("==========================================");

const equalityTests = [
  { expr: '0 == false', result: 0 == false },
  { expr: '"" == false', result: "" == false },
  { expr: '"" == 0', result: "" == 0 },
  { expr: '0 == []', result: 0 == [] },
  { expr: '"0" == []', result: "0" == [] },
  { expr: 'null == undefined', result: null == undefined },
  { expr: 'null == 0', result: null == 0 },
  { expr: 'NaN == NaN', result: NaN == NaN },
  { expr: '[] == ![]', result: [] == ![] }
];

console.table(equalityTests);
