/**
 * Day 1 Example 1: Hello World & Console API Showcase
 * Run with Node.js: node 01-hello-world-and-console.js
 */

// 1. Basic Console Log Output
console.log("==========================================");
console.log("1. Hello, World! Welcome to JS Mastery");
console.log("==========================================");

// 2. Logging Different Data Types
console.log("String Output:", "JavaScript Engine");
console.log("Numeric Output:", 2026);
console.log("Boolean Output:", true);
console.log("Array Output:", [10, 20, 30]);
console.log("Object Output:", { language: "JavaScript", creator: "Brendan Eich" });

// 3. Different Console Methods
console.info("ℹ️ Console Info: Application initialized successfully.");
console.warn("⚠️ Console Warn: Deprecated feature detected.");
console.error("❌ Console Error: Failed to fetch user credentials.");

// 4. Tabular Console Output
console.log("\n4. Console Table Demonstration:");
const userList = [
  { id: 101, username: "alex99", role: "Admin" },
  { id: 102, username: "sarah_m", role: "Developer" },
  { id: 103, username: "john_doe", role: "Tester" }
];
console.table(userList);

// 5. Console Timer Profiling
console.log("\n5. Profiling Code Execution Time:");
console.time("LoopPerformanceTimer");
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
console.timeEnd("LoopPerformanceTimer");
console.log("Sum result:", sum);
