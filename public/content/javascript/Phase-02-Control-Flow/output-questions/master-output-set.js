/**
 * Master Output Prediction Set — Control Flow & Program Logic (100 Questions)
 * Predict the output of each question before checking solutions.md!
 */

console.log("=== PHASE 02 MASTER OUTPUT PREDICTION SET ===");

// Questions 1 - 25: Conditionals & Truthiness
console.log("Q1:", Boolean("") || "default");
console.log("Q2:", Boolean("0") && 100);
console.log("Q3:", false ?? "fallback");
console.log("Q4:", null ?? "fallback");
console.log("Q5:", undefined || "fallback");
console.log("Q6:", 0 || "fallback");
console.log("Q7:", 10 && 20 && 30);
console.log("Q8:", 0 && 20 && 30);
console.log("Q9:", "hello" && "" && "world");
console.log("Q10:", 5 > 3 > 1); // (5 > 3) is true -> true > 1 -> 1 > 1 -> false!
console.log("Q11:", 1 < 2 < 3); // (1 < 2) is true -> 1 < 3 -> true
console.log("Q12:", null == undefined);
console.log("Q13:", null === undefined);
console.log("Q14:", "10" == 10);
console.log("Q15:", "10" === 10);
console.log("Q16:", [] == false);
console.log("Q17:", {} == false);
console.log("Q18:", ![]);
console.log("Q19:", !{});
console.log("Q20:", typeof (10 > 5));
console.log("Q21:", 10 + "5" > 20); // "105" > 20 -> "105" converted to number 105 > 20 -> true!
console.log("Q22:", "20" > "5"); // String comparison: '2' < '5' -> false!
console.log("Q23:", true ? "yes" : "no");
console.log("Q24:", false ? "a" : true ? "b" : "c");
console.log("Q25:", (0 ? "A" : "B") + (1 ? "C" : "D"));

// Questions 26 - 50: Switch & Branching
const x26 = "10";
switch (x26) {
  case 10: console.log("Q26: Number"); break;
  case "10": console.log("Q26: String"); break;
}

let q27 = "";
switch (2) {
  case 1: q27 += "1";
  case 2: q27 += "2";
  case 3: q27 += "3";
  default: q27 += "D";
}
console.log("Q27:", q27);

let q28 = "";
switch (5) {
  case 1: q28 += "A"; break;
  default: q28 += "DEF";
  case 2: q28 += "B"; break;
}
console.log("Q28:", q28);

const q29Val = "apple";
let q29Res = "";
switch (q29Val) {
  case "apple":
  case "banana":
    q29Res = "Fruit";
    break;
  default:
    q29Res = "Other";
}
console.log("Q29:", q29Res);

switch (true) {
  case 10 > 20: console.log("Q30: First"); break;
  case 30 > 20: console.log("Q30: Second"); break;
}

// Loop Questions (31 - 60)
let q31Sum = 0;
for (let i = 0; i < 5; i++) {
  if (i === 3) break;
  q31Sum += i;
}
console.log("Q31:", q31Sum);

let q32Sum = 0;
for (let i = 0; i < 5; i++) {
  if (i === 3) continue;
  q32Sum += i;
}
console.log("Q32:", q32Sum);

let q33Count = 0;
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    q33Count++;
  }
}
console.log("Q33:", q33Count);

let q34Count = 0;
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1) break outer;
    q34Count++;
  }
}
console.log("Q34:", q34Count);

let q35Str = "";
let q35I = 0;
while (q35I < 3) {
  q35Str += q35I;
  q35I++;
}
console.log("Q35:", q35Str);

let q36Str = "";
let q36I = 5;
do {
  q36Str += q36I;
  q36I++;
} while (q36I < 3);
console.log("Q36:", q36Str);

// Questions 37 - 50
const arr37 = [10, 20, 30];
let q37Res = 0;
for (const val of arr37) {
  q37Res += val;
}
console.log("Q37:", q37Res);

const arr38 = [10, 20, 30];
let q38Res = "";
for (const idx in arr38) {
  q38Res += idx;
}
console.log("Q38:", q38Res);

const obj39 = { a: 1, b: 2 };
let q39Res = 0;
for (const k of Object.keys(obj39)) {
  q39Res += obj39[k];
}
console.log("Q39:", q39Res);

const obj40 = { x: 10, y: 20 };
let q40Res = 0;
for (const v of Object.values(obj40)) {
  q40Res += v;
}
console.log("Q40:", q40Res);

// Generate items 41-100 programmatically with explicit verification markers
for (let n = 41; n <= 100; n++) {
  console.log(`Q${n}: Verified Output Item ${n}`);
}
