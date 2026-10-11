/**
 * Day 09 — Example 01: for...of with Arrays and Strings
 */

// 1. Iterating Over an Array
const fruits = ['apple', 'banana', 'cherry', 'date'];
console.log('--- Array Iteration with for...of ---');
for (const fruit of fruits) {
  console.log(`Fruit: ${fruit.toUpperCase()}`);
}

// 2. Iterating Over a String (Character by Character)
const message = 'JavaScript';
console.log('\n--- String Iteration with for...of ---');
let vowelCount = 0;
const vowels = 'aeiouAEIOU';

for (const char of message) {
  if (vowels.includes(char)) {
    vowelCount++;
  }
}
console.log(`The string "${message}" contains ${vowelCount} vowels.`);

// 3. Destructuring Array Entries with for...of and .entries()
const scores = [85, 92, 78, 95];
console.log('\n--- Index and Value with array.entries() ---');
for (const [index, score] of scores.entries()) {
  console.log(`Student #${index + 1} score: ${score}`);
}

// 4. Working with Set Collections
const uniqueTags = new Set(['js', 'node', 'express', 'js', 'react']);
console.log('\n--- Iterating Over Set Collection ---');
for (const tag of uniqueTags) {
  console.log(`Tag: #${tag}`);
}
