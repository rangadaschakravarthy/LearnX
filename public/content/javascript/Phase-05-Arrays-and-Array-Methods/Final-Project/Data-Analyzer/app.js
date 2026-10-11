// Data Analyzer Capstone Entry Point
const data = require("./data");
const stats = require("./utils/stats");

console.log("=== JavaScript Data Analyzer Output ===");
console.log("Total Records:", data.products.length);
console.log("Total Inventory Value:", stats.calculateTotalValue(data.products));
console.log("Filtered Expensive Products (> 100):", stats.filterByPrice(data.products, 100));
