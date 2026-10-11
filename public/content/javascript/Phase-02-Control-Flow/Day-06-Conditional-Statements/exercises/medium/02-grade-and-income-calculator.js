/**
 * Day 6 Exercise 2 (🟡 Medium): Tax Slab Calculator
 * Instruction: Calculate tax percentage based on annual income.
 * Slabs:
 * - Income <= $10,000: 0% Tax
 * - Income <= $50,000: 10% Tax
 * - Income <= $100,000: 20% Tax
 * - Income > $100,000: 30% Tax
 */

"use strict";

function calculateTaxRate(income) {
  if (income <= 0) return 0;
  if (income <= 10000) return 0;
  if (income <= 50000) return 10;
  if (income <= 100000) return 20;
  return 30;
}

console.log("Tax on $8,000:", calculateTaxRate(8000), "%");
console.log("Tax on $35,000:", calculateTaxRate(35000), "%");
console.log("Tax on $120,000:", calculateTaxRate(120000), "%");
