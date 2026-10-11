// Data Analysis Statistical Utilities
function calculateTotalValue(items) {
  return items.reduce((total, item) => total + (item.price * item.stock), 0);
}
function filterByPrice(items, minPrice) {
  return items.filter(item => item.price >= minPrice);
}
module.exports = { calculateTotalValue, filterByPrice };
