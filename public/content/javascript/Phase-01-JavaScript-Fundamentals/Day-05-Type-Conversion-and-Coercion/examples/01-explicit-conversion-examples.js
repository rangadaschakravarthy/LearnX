/**
 * Day 5 Example 1: Explicit Type Conversion & Parsing Showcase
 * Run with Node.js: node 01-explicit-conversion-examples.js
 */

console.log("==========================================");
console.log("1. Explicit Type Conversion Showcase");
console.log("==========================================");

// 1. Explicit String Conversion
console.log('String(100):', String(100));            // "100"
console.log('String(true):', String(true));          // "true"
console.log('String(null):', String(null));          // "null"
console.log('String([1,2,3]):', String([1, 2, 3]));  // "1,2,3"

// 2. Explicit Number Conversion
console.log('\nNumber("42"):', Number("42"));        // 42
console.log('Number(""):', Number(""));              // 0
console.log('Number(true):', Number(true));          // 1
console.log('Number(false):', Number(false));        // 0
console.log('Number(null):', Number(null));          // 0
console.log('Number(undefined):', Number(undefined));// NaN

// 3. Number() vs parseInt() / parseFloat()
console.log('\nNumber() vs parseInt() Differences:');
console.log('Number("100px"):', Number("100px"));          // NaN
console.log('parseInt("100px", 10):', parseInt("100px", 10)); // 10

console.log('Number("12.34em"):', Number("12.34em"));         // NaN
console.log('parseFloat("12.34em"):', parseFloat("12.34em")); // 12.34

// 4. Explicit Boolean Conversion
console.log('\nExplicit Boolean Conversion:');
console.log('Boolean(1):', Boolean(1));          // true
console.log('Boolean(0):', Boolean(0));          // false
console.log('Boolean("hello"):', Boolean("hello"));// true
console.log('Boolean(""):', Boolean(""));        // false
