/**
 * Day 1 Example 2: Script Loading & Parsing Demonstration
 * Simulates HTML script execution logging
 */

console.log("------------------------------------------");
console.log("Script Execution Simulation");
console.log("------------------------------------------");

function simulateScriptExecution(scriptName, loadingType) {
  console.log(`[${new Date().toISOString()}] Executing script: ${scriptName} (${loadingType})`);
}

// 1. Regular Script (Blocking)
simulateScriptExecution("inline-header.js", "Blocking / Head");

// 2. Async Script
simulateScriptExecution("analytics-tracker.js", "Async");

// 3. Defer Script
simulateScriptExecution("app-main-logic.js", "Defer / DOM Ready");
