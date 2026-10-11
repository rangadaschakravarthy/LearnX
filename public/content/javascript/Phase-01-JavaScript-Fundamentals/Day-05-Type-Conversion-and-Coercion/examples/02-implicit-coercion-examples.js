/**
 * Day 5 Example 2: Implicit Type Coercion Operators Showcase
 * Run with Node.js: node 02-implicit-coercion-examples.js
 */

console.log("==========================================");
console.log("2. Implicit Type Coercion Showcase");
console.log("==========================================");

// 1. Plus (+) Operator String Concatenation Coercion
console.log('"5" + 2:', "5" + 2);         // "52"
console.log('2 + "5":', 2 + "5");         // "25"
console.log('"5" + true:', "5" + true);     // "5true"
console.log('"5" + null:', "5" + null);     // "5null"

// 2. Minus (-), Multiply (*), Divide (/) Numeric Coercion
console.log('\n"5" - 2:', "5" - 2);         // 3
console.log('"5" * "2":', "5" * "2");       // 10
console.log('"10" / "2":', "10" / "2");     // 5

// 3. Boolean & Special Values Math Coercion
console.log('\ntrue + 1:', true + 1);       // 2
console.log('false + 1:', false + 1);     // 1
console.log('null + 10:', null + 10);     // 10
console.log('undefined + 10:', undefined + 10); // NaN

// 4. Execution Order Traps
console.log('\nExecution Order Traps:');
console.log('1 + 2 + "3":', 1 + 2 + "3"); // "33"
console.log('"1" + 2 + 3:', "1" + 2 + 3); // "123"
