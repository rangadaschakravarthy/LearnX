/**
 * Day 6 Debugging Problems
 * Identify the bug in each function and correct it!
 */

"use strict";

// Problem 1: Accidental assignment bug
function checkAdminAccess(role) {
  // @ts-ignore
  if (role = "admin") { // BUG!
    return "Access Granted";
  }
  return "Access Denied";
}

// Problem 2: Wrong boundary check
function canDrive(age) {
  if (age > 16) { // BUG! 16-year-olds are allowed to drive!
    return "Can drive";
  }
  return "Cannot drive";
}

// Problem 3: Out of order else-if chain
function getSpeedCategory(speed) {
  if (speed > 30) return "Moderate";
  if (speed > 80) return "Fast"; // BUG!
  return "Slow";
}

console.log("Bug 1 Test (role='user'):", checkAdminAccess("user")); // Expected: Access Denied
console.log("Bug 2 Test (age=16):", canDrive(16)); // Expected: Can drive
console.log("Bug 3 Test (speed=90):", getSpeedCategory(90)); // Expected: Fast
