/**
 * Day 09 — Example 02: for...in with Object Properties
 */

// 1. Basic Object Property Iteration
const userProfile = {
  id: 101,
  username: 'dev_alex',
  email: 'alex@example.com',
  role: 'admin',
  isActive: true
};

console.log('--- User Profile Keys and Values ---');
for (const key in userProfile) {
  console.log(`${key}: ${userProfile[key]}`);
}

// 2. Prototype Chain Demonstration with hasOwnProperty Guard
const parentConfig = {
  theme: 'dark',
  language: 'en'
};

// Create child object inheriting from parentConfig
const childConfig = Object.create(parentConfig);
childConfig.sidebarOpen = true;
childConfig.fontSize = 14;

console.log('\n--- Unfiltered for...in (Includes Prototype) ---');
for (const key in childConfig) {
  console.log(`Key: ${key} (Value: ${childConfig[key]})`);
}

console.log('\n--- Filtered with hasOwnProperty Guard ---');
for (const key in childConfig) {
  if (Object.prototype.hasOwnProperty.call(childConfig, key)) {
    console.log(`Own Key: ${key} -> ${childConfig[key]}`);
  }
}

// 3. Why for...in is Avoided for Arrays (Gotcha Example)
const sampleArray = ['a', 'b', 'c'];
sampleArray.customProperty = 'I am custom'; // Adding custom non-index property

console.log('\n--- Unexpected for...in behavior on Arrays ---');
for (const index in sampleArray) {
  console.log(`Index/Key: ${index} (Type of index: ${typeof index})`);
}
