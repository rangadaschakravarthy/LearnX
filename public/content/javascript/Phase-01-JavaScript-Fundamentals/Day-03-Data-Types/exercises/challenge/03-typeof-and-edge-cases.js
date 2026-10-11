/**
 * Day 3 Exercise 3 (🔴 Challenge): Universal Type Detector
 * Instruction: Implement a robust getExactType(value) function that accurately detects:
 * "string", "number", "bigint", "boolean", "undefined", "null", "symbol", "array", "object", "function", "date", "regexp", "nan"
 */

"use strict";

function getExactType(value) {
  // TODO: Implement exact type detector below
  if (Number.isNaN(value)) return "nan";
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

console.log(getExactType("Hello"));     // "string"
console.log(getExactType(100));         // "number"
console.log(getExactType(NaN));         // "nan"
console.log(getExactType(null));        // "null"
console.log(getExactType([1, 2, 3]));   // "array"
console.log(getExactType(new Date()));  // "date"
console.log(getExactType(/abc/));       // "regexp"
