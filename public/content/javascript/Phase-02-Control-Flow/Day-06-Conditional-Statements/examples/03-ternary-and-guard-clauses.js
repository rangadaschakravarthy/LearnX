/**
 * Day 6 Example 3: Ternary Operator & Guard Clauses
 * Run with Node.js: node 03-ternary-and-guard-clauses.js
 */

"use strict";

console.log("==========================================");
console.log("3. Ternary & Guard Clause Showcase");
console.log("==========================================");

// 1. Ternary Operator Expression
const isMember = true;
const shippingCost = isMember ? 0.00 : 9.99;
console.log(`Shipping Fee: $${shippingCost.toFixed(2)}`);

// 2. Guard Clause Pattern (Early Return)
function withdrawCash(account, amount) {
  // Guard 1: Check valid account
  if (!account) return "Error: Invalid Account";

  // Guard 2: Check positive amount
  if (amount <= 0) return "Error: Invalid withdrawal amount";

  // Guard 3: Check sufficient balance
  if (account.balance < amount) return "Error: Insufficient funds";

  // Happy Path Logic (Zero Indentation Nesting!)
  account.balance -= amount;
  return `Success: Withdrew $${amount}. New balance: $${account.balance}`;
}

const myAccount = { id: 101, balance: 500 };

console.log("\nWithdrawal Tests:");
console.log(withdrawCash(myAccount, -50)); // Guard 2
console.log(withdrawCash(myAccount, 600)); // Guard 3
console.log(withdrawCash(myAccount, 200)); // Success
