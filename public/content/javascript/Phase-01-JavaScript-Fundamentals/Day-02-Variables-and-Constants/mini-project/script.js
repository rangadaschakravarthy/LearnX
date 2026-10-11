"use strict";

// Global compile-time constants (UPPER_SNAKE_CASE)
const USER_ID = "USR-98421";

// Constant binding for mutable reference type (object)
const userProfile = {
  name: "Marcus Aurelius",
  role: "Junior Developer"
};

// Reassignable state variables (camelCase)
let userAge = 24;
let userStatus = "Active";

function renderProfileUI() {
  document.getElementById("userIdVal").innerText = USER_ID;
  document.getElementById("userNameVal").innerText = `${userProfile.name} (${userProfile.role})`;
  document.getElementById("userAgeVal").innerText = userAge;
  document.getElementById("userStatusVal").innerText = userStatus;
}

function incrementAge() {
  userAge += 1; // Reassignment allowed for 'let'
  console.log(`Updated userAge (let reassigned): ${userAge}`);
  renderProfileUI();
}

function updateRole() {
  // Property mutation allowed on 'const' object!
  userProfile.role = "Senior Engineer";
  console.log(`Updated userProfile object property (const mutated):`, userProfile);
  renderProfileUI();
}

function attemptConstReassign() {
  try {
    // Attempting binding reassignment on const
    // @ts-ignore
    USER_ID = "USR-NEW";
  } catch (err) {
    console.error("Const Reassignment Trapped Error:", err.message);
    alert(`Trapped TypeError! const prevents binding reassignment: ${err.message}`);
  }
}

// Initial UI Render when script loads
document.addEventListener("DOMContentLoaded", renderProfileUI);
