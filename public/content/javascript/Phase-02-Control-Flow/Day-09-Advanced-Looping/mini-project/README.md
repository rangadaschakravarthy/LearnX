# Day 09 Mini-Project — Student Data Analyzer

## 1. Overview
The **Student Data Analyzer** is an interactive web-based dashboard and CLI tool that processes complex, nested student dataset records using `for...of`, `for...in`, `Object.keys()`, `Object.values()`, and `Object.entries()`.

## 2. Requirements & Features
- **JSON Input Processing**: Parse multi-department student data records containing names, subject scores, and enrollment statuses.
- **Metrics Calculated**:
  - Class average and top performer identification (`for...of` + destructuring).
  - Subject score distributions (`Object.entries()`).
  - Honor roll student filtering (`for...of`).
  - Prototype-safe property verification (`for...in` + `hasOwnProperty`).
- **Interactive UI**: Load pre-set datasets or custom JSON, displaying metrics in clean dark-mode UI cards.

## 3. How to Run
- **Browser**: Open `index.html` directly in your browser.
- **Node.js**: Run `node script.js` in your terminal for automated verification.
