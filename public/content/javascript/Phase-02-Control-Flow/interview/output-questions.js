/**
 * Interview Output-Based Questions (Control Flow)
 */

console.log("--- Interview Output Questions ---");

// Q1: Short-circuiting and side-effects
let x = 0;
if (false && ++x) {}
console.log("Q1 Output:", x); // 0 (short-circuited!)

// Q2: Logical OR assignment side-effects
let y = 0;
if (true || ++y) {}
console.log("Q2 Output:", y); // 0 (short-circuited!)

// Q3: Fallthrough switch with missing break
let val = 1;
switch (val) {
  case 1: val += 10;
  case 2: val += 20; break;
  case 3: val += 30;
}
console.log("Q3 Output:", val); // 31

// Q4: Floating point loop termination
let count = 0;
for (let i = 0; i !== 1; i += 0.5) {
  count++;
}
console.log("Q4 Output:", count); // 2 (0, 0.5, 1.0)

// Q5: Modifying loop index inside body
let steps = 0;
for (let i = 0; i < 5; i++) {
  i++;
  steps++;
}
console.log("Q5 Output:", steps); // 3 (i=0 -> i=1 -> inc i=2; i=2 -> i=3 -> inc i=4; i=4 -> i=5 -> loop ends)
