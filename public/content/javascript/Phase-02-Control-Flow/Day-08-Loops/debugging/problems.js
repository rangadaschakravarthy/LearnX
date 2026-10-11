/**
 * Day 8 Debugging Problems
 * Identify and fix loop bugs!
 */

"use strict";

// Problem 1: Infinite Loop Bug
function countToFive() {
  let i = 1;
  while (i <= 5) {
    console.log(i);
    // BUG: Forgot i++!
    i++;
  }
}

// Problem 2: Off-by-one array index bug
function printArray(arr) {
  // BUG: i <= arr.length accesses arr[arr.length] which is undefined!
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// Problem 3: continue while loop trap
function skipThree() {
  let i = 0;
  while (i < 5) {
    i++; // Fixed counter increment before continue
    if (i === 3) continue;
    console.log("Val:", i);
  }
}

countToFive();
printArray([10, 20, 30]);
skipThree();
