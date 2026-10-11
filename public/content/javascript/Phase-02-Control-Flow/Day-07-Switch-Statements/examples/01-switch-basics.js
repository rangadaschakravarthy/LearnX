/**
 * Day 7 Example 1: Basic switch Statement & Case Matching
 * Run with Node.js: node 01-switch-basics.js
 */

"use strict";

console.log("==========================================");
console.log("1. Basic switch Showcase");
console.log("==========================================");

function getDayName(dayNumber) {
  switch (dayNumber) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      return "Invalid Day Number";
  }
}

console.log("Day 1:", getDayName(1)); // Monday
console.log("Day 5:", getDayName(5)); // Friday
console.log("Day 9:", getDayName(9)); // Invalid Day Number

// Strict Type Matching Check
const inputString = "1";
switch (inputString) {
  case 1:
    console.log("Matched Number 1");
    break;
  case "1":
    console.log("Matched String '1' (Strict Equality Check!)");
    break;
}
