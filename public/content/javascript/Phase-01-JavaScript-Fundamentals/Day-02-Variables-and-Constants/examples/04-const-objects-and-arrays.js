/**
 * Day 2 Example 4: const Object Mutation vs Reassignment
 * Run with Node.js: node 04-const-objects-and-arrays.js
 */

console.log("==========================================");
console.log("4. const Object Mutation vs Reassignment");
console.log("==========================================");

// 1. const Object Mutation
const developerProfile = {
  name: "Marcus",
  role: "Frontend Developer",
  skills: ["HTML", "CSS"]
};

console.log("Initial Object:", developerProfile);

// ✅ Allowed: Mutating properties
developerProfile.role = "Senior Engineer";
developerProfile.skills.push("JavaScript");

console.log("Mutated const Object:", developerProfile);

// ❌ Forbidden: Binding Reassignment
try {
  // @ts-ignore
  developerProfile = { name: "New Person" };
} catch (err) {
  console.log("✅ Caught const object binding reassignment error:", err.name);
}

// 2. Object.freeze() Demonstration
const frozenConfig = Object.freeze({
  theme: "dark",
  version: 1.0
});

try {
  // @ts-ignore
  frozenConfig.theme = "light"; // Fails in strict mode / ignored in sloppy mode
} catch (err) {
  console.log("✅ Caught frozen object mutation error:", err.name);
}
console.log("Frozen Config after attempted mutation:", frozenConfig);
