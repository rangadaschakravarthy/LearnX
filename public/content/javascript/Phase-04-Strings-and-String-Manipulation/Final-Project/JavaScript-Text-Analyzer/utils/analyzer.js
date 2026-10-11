// Text Analyzer Helper Functions
function analyzeText(text) {
  if (typeof text !== "string") return null;
  return {
    length: text.length,
    wordCount: text.trim() ? text.trim().split(/\s+/).length : 0,
    vowelCount: (text.match(/[aeiou]/gi) || []).length
  };
}
module.exports = { analyzeText };
