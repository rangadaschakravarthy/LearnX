/**
 * Day 6 Exercise 3 (🔴 Challenge): E-Commerce Checkout Validation
 * Instruction: Refactor nested logic using Guard Clauses.
 */

"use strict";

function processCheckout(cart, user) {
  // Guard 1: User logged in
  if (!user || !user.isLoggedIn) return "Checkout Failed: User not logged in";

  // Guard 2: Cart not empty
  if (!cart || cart.items.length === 0) return "Checkout Failed: Cart is empty";

  // Guard 3: Payment method valid
  if (!user.hasValidPayment) return "Checkout Failed: No valid payment method";

  // Happy Path
  return `Checkout Success! Processing ${cart.items.length} items for ${user.name}.`;
}

const sampleUser = { name: "Alice", isLoggedIn: true, hasValidPayment: true };
const sampleCart = { items: ["Laptop", "Mouse"] };

console.log(processCheckout(sampleCart, sampleUser));
