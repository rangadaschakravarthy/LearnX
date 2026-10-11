/**
 * Day 8 Output Prediction Questions
 * Predict outputs before checking solutions.md!
 */

// Question 1
for (let i = 1; i <= 3; i++) {
  console.log(i);
}

// Question 2
let count = 0;
while (count < 3) {
  count++;
}
console.log(count);

// Question 3
for (let i = 1; i <= 5; i++) {
  if (i === 3) break;
  console.log(i);
}

// Question 4
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i);
}

// Question 5
let sum = 0;
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 2; j++) {
    sum += i * j;
  }
}
console.log(sum);
