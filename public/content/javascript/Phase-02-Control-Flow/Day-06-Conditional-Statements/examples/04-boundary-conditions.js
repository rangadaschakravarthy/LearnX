/**
 * Day 6 Example 4: Boundary Condition Evaluation
 * Run with Node.js: node 04-boundary-conditions.js
 */

"use strict";

console.log("==========================================");
console.log("4. Boundary Condition Testing Showcase");
console.log("==========================================");

function verifyVotingEligibility(age) {
  const MIN_VOTING_AGE = 18;

  // Exact Boundary Check: >= 18
  if (age >= MIN_VOTING_AGE) {
    return `Age ${age}: Eligible to Vote`;
  } else {
    return `Age ${age}: Ineligible to Vote`;
  }
}

// Testing 5 Standard Test Cases:
console.log("Normal Middle Case (25):", verifyVotingEligibility(25));
console.log("Exact Boundary Case (18):", verifyVotingEligibility(18));
console.log("Just Below Boundary (17):", verifyVotingEligibility(17));
console.log("Just Above Boundary (19):", verifyVotingEligibility(19));
console.log("Extreme Case (0):", verifyVotingEligibility(0));
