/**
 * Day 2 Exercise 2 (🟡 Medium): Scope Leakage Debugging
 * Instruction: Refactor the code below so no variables leak outside their intended block scopes.
 */

"use strict";

// Problem: 'i' and 'totalDiscount' leak out of their loop/if blocks because of 'var'.
function calculateOrderDiscounts(prices) {
  // TODO: Fix variable scoping by replacing var with let/const
  var grandTotal = 0;

  for (var i = 0; i < prices.length; i++) {
    var itemPrice = prices[i];
    if (itemPrice > 50) {
      var totalDiscount = itemPrice * 0.1;
      grandTotal += (itemPrice - totalDiscount);
    } else {
      grandTotal += itemPrice;
    }
  }

  return grandTotal;
}

console.log("Grand Total:", calculateOrderDiscounts([30, 60, 100]));
