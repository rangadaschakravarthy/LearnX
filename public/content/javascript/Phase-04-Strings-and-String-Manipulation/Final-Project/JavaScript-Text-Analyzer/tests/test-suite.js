// Test Suite for Text Analyzer
const analyzer = require("../utils/analyzer");
const res = analyzer.analyzeText("hello world");
console.log("Test Passed:", res.wordCount === 2);
