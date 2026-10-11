/**
 * Day 4 Exercise 2 (🟡 Medium): Short-Circuit & Nullish Coalescing Refactoring
 * Instruction: Refactor the configuration fallback logic below using ?? and ?.
 */

"use strict";

const userSettings = {
  theme: "light",
  volume: 0,
  accountDetails: null
};

// Problem: The legacy logic below uses || which replaces volume: 0 with 50!
// And accessing userSettings.accountDetails.email throws a TypeError!

function getProcessedSettings(settings) {
  // TODO: Fix volume fallback using ?? so volume: 0 is preserved!
  const volume = settings.volume ?? 50;

  // TODO: Fix email retrieval using ?. optional chaining
  const email = settings?.accountDetails?.email ?? "no-email@domain.com";

  return { volume, email };
}

console.log("Processed Settings:", getProcessedSettings(userSettings));
// Expected output: { volume: 0, email: 'no-email@domain.com' }
