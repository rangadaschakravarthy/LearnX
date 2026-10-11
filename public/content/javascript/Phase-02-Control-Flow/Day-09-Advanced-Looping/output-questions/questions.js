/**
 * Day 09 — Output Prediction Questions
 * Predict the output of each code snippet before checking solutions.md!
 */

// Q1: for...in on array with string properties
const arr = [10, 20, 30];
arr.extra = 40;
let q1Result = '';
for (const k in arr) {
  q1Result += k + ' ';
}
console.log('Q1 Output:', q1Result.trim());

// Q2: for...of on string with modified iterator
const word = 'JS';
let q2Result = '';
for (const char of word) {
  q2Result += char.repeat(2);
}
console.log('Q2 Output:', q2Result);

// Q3: Labeled break in nested loop
let count = 0;
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer;
    count++;
  }
}
console.log('Q3 Output:', count);

// Q4: Object.entries with destructured defaults
const user = { name: 'Alex' };
let q4Result = [];
for (const [key, value = 'N/A'] of Object.entries(user)) {
  q4Result.push(`${key}:${value}`);
}
console.log('Q4 Output:', q4Result.join(', '));
