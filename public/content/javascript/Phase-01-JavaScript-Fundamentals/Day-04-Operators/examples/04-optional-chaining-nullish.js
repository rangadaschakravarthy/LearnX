/**
 * Day 4 Example 4: Modern ES2020 Operators (Nullish ?? & Optional Chaining ?.)
 * Run with Node.js: node 04-optional-chaining-nullish.js
 */

console.log("==========================================");
console.log("4. Nullish Coalescing (??) & Optional Chaining (?.)");
console.log("==========================================");

// 1. Comparison of || vs ?? with 0 and empty strings
const appConfig = {
  maxRetries: 0,
  customTitle: ""
};

console.log("OR || Fallback for maxRetries (0):", appConfig.maxRetries || 5); // 5 (BUG: 0 is valid!)
console.log("Nullish ?? Fallback for maxRetries (0):", appConfig.maxRetries ?? 5); // 0 (CORRECT!)

console.log("OR || Fallback for customTitle (''):", appConfig.customTitle || "Untitled"); // "Untitled"
console.log("Nullish ?? Fallback for customTitle (''):", appConfig.customTitle ?? "Untitled"); // ""

// 2. Optional Chaining (?.)
const userResponse = {
  status: 200,
  data: {
    profile: {
      firstName: "Marcus"
    }
  }
};

console.log("\nOptional Chaining Access:");
console.log("Existing Property:", userResponse?.data?.profile?.firstName); // "Marcus"
console.log("Missing Nested Property:", userResponse?.data?.address?.city); // undefined (No Error!)

// 3. Optional Function Calling
const service = {
  logMessage: function(msg) { console.log("Service Log:", msg); }
};

service.logMessage?.("System online");
// @ts-ignore
service.nonExistentMethod?.(); // Safely ignored!
