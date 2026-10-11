/**
 * Day 09 — Exercise 02 (Medium): Object and Array Iteration
 * 
 * INSTRUCTIONS:
 * Complete the function stubs below according to the specifications.
 * Use Object.keys(), Object.values(), or Object.entries() with for...of loops.
 */

/**
 * Task 1: Calculate Total Salary
 * Given an object mapping employee names to their salaries,
 * return the total payroll expenditure using Object.values() and for...of.
 * 
 * Example: { Alice: 50000, Bob: 60000 } => 110000
 * 
 * @param {Object.<string, number>} salaries - Map of employee name to salary.
 * @returns {number} Sum of salaries.
 */
function calculateTotalSalary(salaries) {
  // TODO: Implement using Object.values() and for...of
  return 0;
}

/**
 * Task 2: Format Inventory Summary
 * Given a store inventory object, return an array of formatted strings:
 * "ITEM: COUNT units available".
 * Skip items with 0 count.
 * 
 * Example: { apples: 10, oranges: 0, bananas: 5 }
 * => ["APPLES: 10 units available", "BANANAS: 5 units available"]
 * 
 * @param {Object.<string, number>} inventory - Item name to count mapping.
 * @returns {string[]} Formatted inventory lines.
 */
function formatInventorySummary(inventory) {
  // TODO: Implement using Object.entries() and for...of
  return [];
}

/**
 * Task 3: Invert Key-Value Map
 * Given an object with string keys and string values, return a new object
 * where keys and values are swapped.
 * 
 * Example: { us: 'United States', ca: 'Canada' }
 * => { 'United States': 'us', 'Canada': 'ca' }
 * 
 * @param {Object.<string, string>} map - Input key-value pairs.
 * @returns {Object.<string, string>} Inverted key-value object.
 */
function invertKeyValueMap(map) {
  // TODO: Implement using Object.entries() and for...of
  return {};
}

module.exports = {
  calculateTotalSalary,
  formatInventorySummary,
  invertKeyValueMap
};
