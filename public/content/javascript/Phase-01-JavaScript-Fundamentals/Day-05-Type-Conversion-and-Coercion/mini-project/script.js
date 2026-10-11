"use strict";

function preset(v1, v2) {
  document.getElementById("val1").value = v1;
  document.getElementById("val2").value = v2;
  runConversionLab();
}

function runConversionLab() {
  const v1Raw = document.getElementById("val1").value;
  const v2Raw = document.getElementById("val2").value;
  const display = document.getElementById("resultsDisplay");

  try {
    const val1 = eval(`(${v1Raw})`);
    const val2 = eval(`(${v2Raw})`);

    const explicitString1 = String(val1);
    const explicitNumber1 = Number(val1);
    const explicitBoolean1 = Boolean(val1);
    const parsedInt1 = parseInt(String(val1), 10);

    const plusResult = val1 + val2;
    const minusResult = val1 - val2;

    const looseEquality = val1 == val2;
    const strictEquality = val1 === val2;

    display.innerHTML = `
      <div><strong>Value 1 Input:</strong> ${v1Raw} (Type: ${typeof val1})</div>
      <div><strong>Value 2 Input:</strong> ${v2Raw} (Type: ${typeof val2})</div>
      <hr style="border-color: #334155;">
      <div><strong>String(val1):</strong> "${explicitString1}"</div>
      <div><strong>Number(val1):</strong> ${explicitNumber1}</div>
      <div><strong>Boolean(val1):</strong> ${explicitBoolean1} (${explicitBoolean1 ? 'Truthy' : 'Falsy'})</div>
      <div><strong>parseInt(val1, 10):</strong> ${parsedInt1}</div>
      <hr style="border-color: #334155;">
      <div><strong>val1 + val2 (Plus Coercion):</strong> ${typeof plusResult === 'string' ? `"${plusResult}"` : plusResult} (${typeof plusResult})</div>
      <div><strong>val1 - val2 (Minus Coercion):</strong> ${minusResult} (${typeof minusResult})</div>
      <div><strong>val1 == val2 (Loose Equality):</strong> ${looseEquality}</div>
      <div><strong>val1 === val2 (Strict Equality):</strong> ${strictEquality}</div>
    `;

  } catch (err) {
    display.innerHTML = `<div style="color: #f43f5e;">❌ Evaluation Error: ${err.message}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", runConversionLab);
