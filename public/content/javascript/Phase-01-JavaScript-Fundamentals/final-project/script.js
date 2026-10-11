"use strict";

function switchTab(tabId) {
  // Toggle tab buttons
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(btn => btn.classList.remove("active"));

  // Toggle active panel
  const panels = document.querySelectorAll(".panel-content");
  panels.forEach(panel => panel.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");

  // Highlight active tab button
  const activeBtn = Array.from(buttons).find(btn => btn.getAttribute("onclick").includes(tabId));
  if (activeBtn) activeBtn.classList.add("active");
}

// === MODULE 1: SCOPE SIMULATOR ===
function runScopeTest(mode) {
  const output = document.getElementById("scopeOutput");
  
  if (mode === "var") {
    let logs = [];
    if (true) {
      var leakedVar = "I am a var variable leaking out of if block!";
    }
    logs.push("Inside if block: declared var leakedVar");
    logs.push(`Outside block access: ${leakedVar}`);
    logs.push("Result: ✅ var is function-scoped; it leaks out of block {} boundaries!");
    output.innerText = logs.join("\n");
  } 
  else if (mode === "let") {
    let logs = [];
    if (true) {
      let trappedLet = "I am trapped inside block!";
      logs.push(`Inside block access: ${trappedLet}`);
    }
    try {
      // @ts-ignore
      eval("console.log(trappedLet);");
    } catch (err) {
      logs.push(`Outside block access: ReferenceError: trappedLet is not defined`);
      logs.push("Result: ✅ let is strictly block-scoped; it cannot leak out of {} boundaries!");
    }
    output.innerText = logs.join("\n");
  }
  else if (mode === "const") {
    let logs = [];
    const userObj = { name: "Alex", role: "Developer" };
    logs.push(`Initial const object: ${JSON.stringify(userObj)}`);
    userObj.role = "Lead Architect";
    logs.push(`After property mutation: ${JSON.stringify(userObj)}`);
    logs.push("Result: ✅ Property mutation is allowed on const objects! const prevents variable binding reassignment, not internal property mutation.");
    output.innerText = logs.join("\n");
  }
  else if (mode === "tdz") {
    let logs = [];
    try {
      eval("console.log(tdzVar); let tdzVar = 100;");
    } catch (err) {
      logs.push(`Attempted to access let tdzVar before declaration line...`);
      logs.push(`Trapped Error: ${err.name} - ${err.message}`);
      logs.push("Result: ❌ Temporal Dead Zone (TDZ) trapped early variable access!");
    }
    output.innerText = logs.join("\n");
  }
}

// === MODULE 2: DATA TYPE INSPECTOR ===
function inspectPreset(valStr) {
  document.getElementById("typeInput").value = valStr;
  inspectType();
}

function inspectType() {
  const expr = document.getElementById("typeInput").value;
  const output = document.getElementById("typeOutput");

  try {
    const val = eval(`(${expr})`);
    const typeofResult = typeof val;
    const exactTag = Object.prototype.toString.call(val);
    const isPrimitive = val === null || (typeof val !== "object" && typeof val !== "function");

    let logs = [
      `Expression Input: ${expr}`,
      `Evaluated Value: ${String(val)}`,
      `typeof Result: ${typeofResult}`,
      `Exact [[Class]] Tag: ${exactTag}`,
      `Storage Mode: ${isPrimitive ? "Stack Memory (Pass-by-value)" : "Heap Memory (Pass-by-reference)"}`,
      `Mutability Status: ${isPrimitive ? "Immutable Primitive" : "Mutable Reference Type"}`
    ];

    if (Array.isArray(val)) logs.push("Array.isArray(): true (Confirmed Array Subtype)");
    if (Number.isNaN(val)) logs.push("Number.isNaN(): true (Numeric Error State)");

    output.innerText = logs.join("\n");
  } catch (err) {
    output.innerText = `❌ Evaluation Error: ${err.message}`;
  }
}

// === MODULE 3: OPERATORS & SHORT-CIRCUIT ===
function opPreset(expr) {
  document.getElementById("opInput").value = expr;
  evaluateOperator();
}

function evaluateOperator() {
  const expr = document.getElementById("opInput").value;
  const output = document.getElementById("opOutput");

  try {
    const result = eval(expr);
    output.innerText = `Expression: ${expr}\nEvaluated Result: ${String(result)}\nResult Type: ${typeof result}`;
  } catch (err) {
    output.innerText = `❌ Evaluation Error: ${err.message}`;
  }
}

// === MODULE 4: COERCION & EQUALITY ===
function coercionPreset(v1, v2) {
  document.getElementById("coercionV1").value = v1;
  document.getElementById("coercionV2").value = v2;
  compareCoercion();
}

function compareCoercion() {
  const v1Raw = document.getElementById("coercionV1").value;
  const v2Raw = document.getElementById("coercionV2").value;
  const output = document.getElementById("coercionOutput");

  try {
    const val1 = eval(`(${v1Raw})`);
    const val2 = eval(`(${v2Raw})`);

    const loose = val1 == val2;
    const strict = val1 === val2;

    let logs = [
      `Value 1: ${v1Raw} (${typeof val1})`,
      `Value 2: ${v2Raw} (${typeof val2})`,
      `Loose Equality (val1 == val2): ${loose}`,
      `Strict Equality (val1 === val2): ${strict}`
    ];

    if (loose !== strict) {
      logs.push("\n⚠️ Coercion Warning: Loose equality coerces types implicitly! Always prefer strict equality (===) to prevent unexpected traps.");
    }

    output.innerText = logs.join("\n");
  } catch (err) {
    output.innerText = `❌ Evaluation Error: ${err.message}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inspectType();
  evaluateOperator();
  compareCoercion();
});
