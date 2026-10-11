/**
 * Day 6 Example 2: else if Chains & Condition Ordering
 * Run with Node.js: node 02-else-if-ordering-and-nested.js
 */

"use strict";

console.log("==========================================");
console.log("2. else if Chains & Nested Logic Showcase");
console.log("==========================================");

// 1. Correct Condition Ordering (Highest threshold first)
function calculateGrade(marks) {
  if (marks >= 90) {
    return "Grade A";
  } else if (marks >= 80) {
    return "Grade B";
  } else if (marks >= 70) {
    return "Grade C";
  } else if (marks >= 60) {
    return "Grade D";
  } else {
    return "Grade F";
  }
}

console.log("Score 95:", calculateGrade(95)); // Grade A
console.log("Score 82:", calculateGrade(82)); // Grade B
console.log("Score 55:", calculateGrade(55)); // Grade F

// 2. Nested Conditions
function processLoanApplication(income, creditScore) {
  if (income >= 50000) {
    if (creditScore >= 700) {
      return "Loan Approved: Low Interest Rate";
    } else {
      return "Loan Approved: High Interest Rate";
    }
  } else {
    return "Loan Rejected: Insufficient Income";
  }
}

console.log("\nLoan Application Test:", processLoanApplication(60000, 750));
