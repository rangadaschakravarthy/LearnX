// JavaScript Text Analyzer Entry Point
const analyzer = require("./utils/analyzer");
const formatter = require("./utils/formatter");

const sampleText = "JavaScript is a versatile programming language created in 1995. Learn JS!";
console.log("=== JavaScript Text Analyzer Output ===");
console.log(analyzer.analyzeText(sampleText));
