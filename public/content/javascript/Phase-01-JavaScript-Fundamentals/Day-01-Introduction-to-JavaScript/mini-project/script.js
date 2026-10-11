"use strict";

console.log("🟢 [Day 01 Lab] script.js loaded successfully via <script defer>!");

function updateStatus(msg) {
  const outputBox = document.getElementById("outputBox");
  if (outputBox) {
    outputBox.innerText = `Status: ${msg}`;
  }
}

function runConsoleDemo() {
  console.clear();
  console.log("--- 1. Console API Output Showcase ---");
  console.log("Standard Info Log: Welcome to JavaScript Mastery!");
  console.info("Info Banner: Environment loaded cleanly.");
  console.warn("Warning: Always declare variables with let or const!");
  console.error("Error Simulation: Sample network request failed.");
  
  console.time("Performance Audit Timer");
  let accum = 0;
  for (let i = 0; i < 500000; i++) { accum += i; }
  console.timeEnd("Performance Audit Timer");

  updateStatus("Console logs sent! Check browser DevTools Console tab.");
}

function runTableDemo() {
  console.clear();
  console.log("--- 2. Console Table Showcase ---");
  const jsCoreTopics = [
    { day: 1, topic: "JS History & Fundamentals", status: "Completed" },
    { day: 2, topic: "Variables & Scope", status: "In Progress" },
    { day: 3, topic: "Data Types & Typeof", status: "Upcoming" },
    { day: 4, topic: "Operators & Precedence", status: "Upcoming" },
    { day: 5, topic: "Type Coercion & Equality", status: "Upcoming" }
  ];
  console.table(jsCoreTopics);

  updateStatus("Tabular data rendered in DevTools Console!");
}

function runStrictDemo() {
  console.clear();
  console.log("--- 3. Strict Mode Error Trap Verification ---");
  try {
    // Attempting undeclared assignment inside strict mode
    // @ts-ignore
    eval("invalidGlobalVar = 999;");
  } catch (err) {
    console.error("Strict Mode Trapped Error Successfully:", err.message);
  }

  updateStatus("Strict mode successfully caught undeclared variable error!");
}
