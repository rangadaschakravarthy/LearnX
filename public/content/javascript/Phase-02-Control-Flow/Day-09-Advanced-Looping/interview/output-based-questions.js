/**
 * Day 09 — Interview Output-Based Questions
 */

// Question 1: String concatenation with for...in array indices
const nums = [10, 20];
let sumStr = '';
for (const idx in nums) {
  sumStr += idx + 1; // '0' + 1 = '01', '1' + 1 = '11'
}
console.log('Q1 Output:', sumStr); // Output: '0111'

// Question 2: Object.entries destructuring with sparse values
const obj = { a: 1, b: undefined, c: null };
const result = [];
for (const [k, v = 100] of Object.entries(obj)) {
  result.push(`${k}:${v}`);
}
console.log('Q2 Output:', result.join('; ')); // Output: 'a:1; b:100; c:null'

// Question 3: Labeled continue behavior
let iterations = 0;
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outerLoop;
    iterations++;
  }
}
console.log('Q3 Output:', iterations); // Output: 3 (1 per outer iteration)
