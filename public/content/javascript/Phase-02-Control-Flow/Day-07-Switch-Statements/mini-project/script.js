"use strict";

function executeMenuSelection() {
  const choice = Number(document.getElementById("menuChoice").value);
  const a = Number(document.getElementById("numA").value);
  const b = Number(document.getElementById("numB").value);
  const display = document.getElementById("menuDisplay");

  let resultMessage = "";

  // Switch Menu Router
  switch (choice) {
    case 1:
      resultMessage = `Option 1 (Add): ${a} + ${b} = ${a + b}`;
      break;

    case 2:
      resultMessage = `Option 2 (Subtract): ${a} - ${b} = ${a - b}`;
      break;

    case 3:
      resultMessage = `Option 3 (Multiply): ${a} * ${b} = ${a * b}`;
      break;

    case 4:
      if (b === 0) {
        resultMessage = "Option 4 (Divide): Error - Cannot divide by zero!";
      } else {
        resultMessage = `Option 4 (Divide): ${a} / ${b} = ${a / b}`;
      }
      break;

    case 5:
      resultMessage = "Option 5: System Exited. Goodbye!";
      break;

    default:
      resultMessage = `Error: Invalid Choice Option ${choice}`;
      break;
  }

  display.innerHTML = `<div><strong>Menu Dispatch Result:</strong></div><div>${resultMessage}</div>`;
}

document.addEventListener("DOMContentLoaded", executeMenuSelection);
