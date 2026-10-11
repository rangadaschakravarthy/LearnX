/**
 * Day 2 Example 2: Scope Boundaries (Global, Function & Block)
 * Run with Node.js: node 02-scope-demonstration.js
 */

console.log("==========================================");
console.log("2. Scope Boundaries Showcase");
console.log("==========================================");

// Global Scope
const globalAppName = "JS Mastery Hub";

function testScope() {
  // Function Scope
  var functionScopedVar = "Inside Function";
  let functionScopedLet = "Inside Function Let";

  if (true) {
    // Block Scope
    var leakedVar = "var leaks out of if block!";
    let trappedLet = "let is trapped in if block!";
    const trappedConst = "const is trapped in if block!";

    console.log("Inside Block:", trappedLet, "|", trappedConst);
  }

  // leakedVar is accessible here because var is function-scoped!
  console.log("Outside Block (Function Scope):", leakedVar);

  // trappedLet is NOT accessible here:
  try {
    // @ts-ignore
    console.log(trappedLet);
  } catch (err) {
    console.log("✅ Caught block-scope error for trappedLet:", err.name);
  }
}

testScope();
console.log("Global Scope Check:", globalAppName);
