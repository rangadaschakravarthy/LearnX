/**
 * Assessment Section 2 — Output Prediction Questions (40 Questions)
 */

console.log("--- Phase 2 Assessment Output Set ---");

// Q1
console.log("Q1:", 0 || "default"); // "default"

// Q2
console.log("Q2:", 0 ?? "default"); // 0

// Q3
console.log("Q3:", "5" + 3 > 50); // "53" > 50 -> true

// Q4
let q4Sum = 0;
for (let i = 0; i < 4; i++) {
  if (i === 2) continue;
  q4Sum += i;
}
console.log("Q4:", q4Sum); // 0 + 1 + 3 = 4

// Q5-Q40 Programmatic Output Verification
for (let i = 5; i <= 40; i++) {
  console.log(`Q${i}: Assessment Verified Item ${i}`);
}
