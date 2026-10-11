/**
 * Day 3 Exercise 2 (🟡 Medium): Primitive vs Reference Cloning
 * Instruction: Fix the shallow copy mutation bug in the function below.
 */

"use strict";

const initialSetting = {
  theme: "dark",
  user: {
    name: "Alex",
    permissions: ["read", "write"]
  }
};

// Buggy Function: Performs shallow copy using spread operator.
// Modifying cloned.user.name accidentally mutates initialSetting.user.name!
function cloneAndModifyUser(settings, newName) {
  // TODO: Fix this function to perform a clean copy so settings is not mutated.
  const copy = JSON.parse(JSON.stringify(settings)); // Or structuredClone
  copy.user.name = newName;
  return copy;
}

const updatedSetting = cloneAndModifyUser(initialSetting, "Alexander");

console.log("Original User Name:", initialSetting.user.name); // Expected: "Alex"
console.log("Updated User Name:", updatedSetting.user.name);  // Expected: "Alexander"
