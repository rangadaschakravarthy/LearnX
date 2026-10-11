// Question 1: Recursive countdown output trace
function recursiveCount(n) {
  if (n <= 0) {
    console.log("Q1 Base case reached");
    return;
  }
  console.log("Q1 Pre-call:", n);
  recursiveCount(n - 1);
  console.log("Q1 Post-call:", n);
}
recursiveCount(2);

// Question 2: Recursive factorial call stack trace
function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
console.log("Q2 Fact(4):", fact(4));

// Question 3: Tail recursive vs non-tail recursive call stack
function tailFact(n, acc = 1) {
  if (n <= 1) return acc;
  return tailFact(n - 1, n * acc);
}
console.log("Q3 TailFact(4):", tailFact(4));

// Question 4: Recursive array sum head and tail
function sumArr([head, ...tail]) {
  if (head === undefined) return 0;
  return head + sumArr(tail);
}
console.log("Q4 Recursive Sum:", sumArr([5, 10, 15]));

// Question 5: Infinite recursion stack overflow
function overflowTest(n) {
  if (n === 0) return 0;
  return overflowTest(n - 1);
}
try {
  overflowTest(-1);
} catch(e) {
  console.log("Q5 Stack Overflow Error:", e.name);
}
