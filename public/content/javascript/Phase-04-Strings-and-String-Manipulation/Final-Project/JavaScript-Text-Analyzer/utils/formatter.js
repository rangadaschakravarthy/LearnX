// Text Formatter Helper Functions
function toSlug(text) {
  return String(text).toLowerCase().trim().replaceAll(" ", "-");
}
module.exports = { toSlug };
