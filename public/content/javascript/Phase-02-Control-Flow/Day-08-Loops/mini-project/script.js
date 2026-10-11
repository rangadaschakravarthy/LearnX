"use strict";

function setTarget(val) {
  document.getElementById("numberInput").value = val;
  analyzeNumber();
}

function analyzeNumber() {
  const target = Number(document.getElementById("numberInput").value);
  const output = document.getElementById("toolkitOutput");

  if (isNaN(target)) {
    output.innerText = "❌ Please enter a valid integer.";
    return;
  }

  // 1. Prime Verification Loop
  let isPrime = target > 1;
  for (let i = 2; i <= Math.sqrt(Math.abs(target)); i++) {
    if (Math.abs(target) % i === 0) {
      isPrime = false;
      break;
    }
  }

  // 2. Factorial Loop
  let factorial = 1n;
  if (target >= 0 && target <= 20) {
    for (let i = 1n; i <= BigInt(target); i++) {
      factorial *= i;
    }
  }

  // 3. Digit Sum & Reversal Loop
  let temp = Math.abs(target);
  let digitSum = 0;
  let reversed = 0;
  while (temp > 0) {
    const digit = temp % 10;
    digitSum += digit;
    reversed = (reversed * 10) + digit;
    temp = Math.floor(temp / 10);
  }

  const isPalindrome = Math.abs(target) === reversed;

  output.innerHTML = `
    <div><strong>Target Number:</strong> ${target}</div>
    <div><strong>Is Prime Number?:</strong> ${isPrime ? 'Yes ✅' : 'No ❌'}</div>
    <div><strong>Factorial (${target}!):</strong> ${target >= 0 && target <= 20 ? factorial.toString() : 'N/A (Target out of 0-20 range)'}</div>
    <div><strong>Sum of Digits:</strong> ${digitSum}</div>
    <div><strong>Reversed Digits:</strong> ${reversed}</div>
    <div><strong>Is Palindrome Number?:</strong> ${isPalindrome ? 'Yes ✅' : 'No ❌'}</div>
  `;
}

document.addEventListener("DOMContentLoaded", analyzeNumber);
