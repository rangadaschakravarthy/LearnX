/**
 * Day 7 Exercise 1 (🟢 Easy): Basic Switch Statement
 * Instruction: Implement getDayNameSwitch(dayNum) returning day strings.
 */

"use strict";

function getDayNameSwitch(dayNum) {
  switch (dayNum) {
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    case 7: return "Sunday";
    default: return "Invalid";
  }
}

console.log("Day 3:", getDayNameSwitch(3));
console.log("Day 8:", getDayNameSwitch(8));
