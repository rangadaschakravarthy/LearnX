"use strict";

function setSample(exprStr) {
  const inputEl = document.getElementById("exprInput");
  if (inputEl) {
    inputEl.value = exprStr;
    analyzeExpression();
  }
}

function analyzeExpression() {
  const exprStr = document.getElementById("exprInput").value;
  const resultBox = document.getElementById("resultBox");

  try {
    // Safely evaluate expression string
    const evaluatedVal = eval(`(${exprStr})`);
    
    // Determine typeof result
    const typeofResult = typeof evaluatedVal;
    
    // Determine exact [[Class]] tag
    const exactTag = Object.prototype.toString.call(evaluatedVal);
    
    // Determine category: Primitive vs Reference
    const isPrimitive = evaluatedVal === null || (typeof evaluatedVal !== "object" && typeof evaluatedVal !== "function");
    const memoryCategory = isPrimitive ? "Stack Memory (Pass-by-value)" : "Heap Memory (Pass-by-reference)";
    const mutabilityStatus = isPrimitive ? "Immutable Primitive" : "Mutable Reference Type";
    
    // Array & NaN special flags
    const isArray = Array.isArray(evaluatedVal);
    const isNaNVal = Number.isNaN(evaluatedVal);

    resultBox.innerHTML = `
      <div><strong>Evaluated Output:</strong> <span class="val-highlight">${String(evaluatedVal)}</span></div>
      <div><strong>typeof Result:</strong> <span class="type-highlight">${typeofResult}</span></div>
      <div><strong>Exact Tag:</strong> ${exactTag}</div>
      <div><strong>Memory Category:</strong> ${memoryCategory}</div>
      <div><strong>Mutability Status:</strong> ${mutabilityStatus}</div>
      <div><strong>Array.isArray():</strong> ${isArray}</div>
      <div><strong>Number.isNaN():</strong> ${isNaNVal}</div>
    `;

  } catch (err) {
    resultBox.innerHTML = `<div style="color: #f43f5e;">❌ Evaluation Error: ${err.message}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", analyzeExpression);
