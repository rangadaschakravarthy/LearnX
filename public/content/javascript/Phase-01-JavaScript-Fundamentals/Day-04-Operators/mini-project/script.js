"use strict";

function preset(expr) {
  const input = document.getElementById("calcInput");
  if (input) {
    input.value = expr;
    calculateExpr();
  }
}

function calculateExpr() {
  const exprStr = document.getElementById("calcInput").value;
  const display = document.getElementById("calcDisplay");

  try {
    const result = eval(exprStr);
    const resultType = typeof result;

    display.innerHTML = `
      <div><strong>Input Expression:</strong> ${exprStr}</div>
      <div><strong>Evaluated Result:</strong> <span style="color: #38bdf8;">${String(result)}</span></div>
      <div><strong>Result Type:</strong> ${resultType}</div>
    `;
  } catch (err) {
    display.innerHTML = `<div style="color: #f43f5e;">❌ Evaluation Error: ${err.message}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", calculateExpr);
