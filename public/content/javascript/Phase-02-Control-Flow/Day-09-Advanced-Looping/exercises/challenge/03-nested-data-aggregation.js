/**
 * Day 09 — Exercise 03 (Challenge): Nested Data Aggregation & Matrix Processing
 * 
 * INSTRUCTIONS:
 * Complete the functions below according to the specifications.
 * Use labeled loops or modern iteration constructs to handle nested data structures cleanly.
 */

/**
 * Task 1: Find First Negative In 2D Matrix
 * Uses labeled loops to find the row and column index of the FIRST negative number
 * in a 2D matrix (scanned left-to-right, top-to-bottom).
 * 
 * Example:
 * [
 *   [1, 2, 3],
 *   [4, -5, 6],
 *   [7, -8, 9]
 * ] => { row: 1, col: 1, value: -5 }
 * 
 * If no negative number exists, return null.
 * 
 * @param {number[][]} matrix - 2D grid of numbers.
 * @returns {{row: number, col: number, value: number}|null} Location object or null.
 */
function findFirstNegative(matrix) {
  // TODO: Implement using a labeled loop
  return null;
}

/**
 * Task 2: Aggregate Department Grades
 * Given an array of department objects containing lists of student grade objects:
 * [
 *   {
 *     dept: "CS",
 *     students: [ { name: "Alice", grade: 90 }, { name: "Bob", grade: 80 } ]
 *   },
 *   {
 *     dept: "Math",
 *     students: [ { name: "Charlie", grade: 95 } ]
 *   }
 * ]
 * 
 * Return an object summarizing total students, department averages, and overall average:
 * {
 *   totalStudents: 3,
 *   overallAverage: 88.33,
 *   deptAverages: { CS: 85, Math: 95 }
 * }
 * 
 * @param {Array<{dept: string, students: Array<{name: string, grade: number}>}>} departments
 * @returns {Object} Aggregated summary object.
 */
function aggregateDepartmentGrades(departments) {
  // TODO: Implement using nested for...of loops
  return {
    totalStudents: 0,
    overallAverage: 0,
    deptAverages: {}
  };
}

module.exports = {
  findFirstNegative,
  aggregateDepartmentGrades
};
