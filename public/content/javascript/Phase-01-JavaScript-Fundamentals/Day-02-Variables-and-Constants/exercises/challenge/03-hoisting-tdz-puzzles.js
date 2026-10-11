/**
 * Day 2 Exercise 3 (🔴 Challenge): TDZ & Hoisting Puzzle
 * Instruction: Fix the hoisting & TDZ errors without changing the final logic values.
 */

"use strict";

function processUserData() {
  // Problem: Accessing variables inside Temporal Dead Zone
  // TODO: Re-order lines so no ReferenceError occurs.

  console.log("Processing user:", userName); // TDZ Error!
  let userName = "Elizabeth";

  let finalStatus = checkStatus(); // Function Hoisting check
  console.log("User Status:", finalStatus);

  function checkStatus() {
    return "Active";
  }
}

// Fixed version function:
function processUserDataFixed() {
  let userName = "Elizabeth";
  console.log("Processing user:", userName);

  function checkStatus() {
    return "Active";
  }
  let finalStatus = checkStatus();
  console.log("User Status:", finalStatus);
}

processUserDataFixed();
