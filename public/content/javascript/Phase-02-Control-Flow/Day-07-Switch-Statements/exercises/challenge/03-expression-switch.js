/**
 * Day 7 Exercise 3 (🔴 Challenge): switch (true) Discount Engine
 * Instruction: Implement getDiscountPercentage(orderTotal, isVIP) using switch (true).
 */

"use strict";

function getDiscountPercentage(orderTotal, isVIP) {
  switch (true) {
    case (isVIP && orderTotal >= 500):
      return 30; // 30% discount for VIP large orders
    case (isVIP || orderTotal >= 500):
      return 20; // 20% discount
    case (orderTotal >= 200):
      return 10; // 10% discount
    default:
      return 0;  // 0% discount
  }
}

console.log("VIP $600 order discount:", getDiscountPercentage(600, true), "%");
console.log("Standard $250 order discount:", getDiscountPercentage(250, false), "%");
