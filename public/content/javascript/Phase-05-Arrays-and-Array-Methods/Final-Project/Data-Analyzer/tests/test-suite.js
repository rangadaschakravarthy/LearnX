// Test Suite for Data Analyzer
const stats = require("../utils/stats");
const testItems = [{ price: 10, stock: 2 }, { price: 20, stock: 1 }];
console.log("Test Passed:", stats.calculateTotalValue(testItems) === 40);
