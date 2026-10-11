/**
 * Day 09 — Example 03: Modern Object Iteration using Object.keys, Object.values, and Object.entries
 */

const productStock = {
  laptop: 15,
  monitor: 8,
  keyboard: 25,
  mouse: 40,
  desk: 4
};

// 1. Object.keys() + for...of
console.log('--- Product Names (Object.keys) ---');
const keys = Object.keys(productStock);
for (const key of keys) {
  console.log(`Product: ${key}`);
}

// 2. Object.values() + for...of
console.log('\n--- Total Inventory Count (Object.values) ---');
const values = Object.values(productStock);
let totalUnits = 0;
for (const quantity of values) {
  totalUnits += quantity;
}
console.log(`Total items in stock: ${totalUnits}`);

// 3. Object.entries() + Array Destructuring
console.log('\n--- Inventory Summary & Low-Stock Alerts (Object.entries) ---');
for (const [item, count] of Object.entries(productStock)) {
  const status = count < 10 ? 'LOW STOCK ALERT!' : 'In Stock';
  console.log(`Item: ${item.padEnd(10)} | Units: ${String(count).padStart(3)} | Status: ${status}`);
}
