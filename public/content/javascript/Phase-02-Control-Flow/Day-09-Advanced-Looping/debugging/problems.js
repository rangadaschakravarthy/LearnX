/**
 * Day 09 — Debugging Exercises: Modern Looping Bugs
 * 
 * INSTRUCTIONS:
 * Each function contains bugs related to modern loop choices or labels.
 * Fix the bugs so the function operates correctly.
 */

// BUG 1: Trying to iterate an plain object with for...of
function calculateTotalScoresBuggy(scoresObj) {
  let total = 0;
  // BUG: Objects are not iterable with for...of directly! Throws TypeError: scoresObj is not iterable
  for (const score of Object.values(scoresObj)) {
    total += score;
  }
  return total;
}

// BUG 2: for...in iterating prototype properties
function getCustomUserKeysBuggy(user) {
  const keys = [];
  // BUG: Missing hasOwnProperty check includes prototype inherited methods/properties
  for (const key in user) {
    if (Object.prototype.hasOwnProperty.call(user, key)) {
      keys.push(key);
    }
  }
  return keys;
}

// BUG 3: Label break placed on wrong block
function findMatrixElementBuggy(matrix, target) {
  let found = false;
  outer: for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === target) {
        found = true;
        break outer; // FIXED: targets outer label directly
      }
    }
  }
  return found;
}

module.exports = {
  calculateTotalScoresBuggy,
  getCustomUserKeysBuggy,
  findMatrixElementBuggy
};
