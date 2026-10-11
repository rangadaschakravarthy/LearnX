# Day 09 Debugging Solutions

## Bug 1: Plain Object Iteration with `for...of`
- **Root Cause**: `for...of` expects an iterable (Array, String, Map, Set, Generator). Plain JS objects do not implement `[Symbol.iterator]`.
- **Fix**: Wrap `scoresObj` in `Object.values(scoresObj)` or `Object.entries(scoresObj)` before iterating with `for...of`.

## Bug 2: Prototype Key Contamination in `for...in`
- **Root Cause**: `for...in` traverses inherited properties up the prototype chain.
- **Fix**: Use `Object.prototype.hasOwnProperty.call(user, key)` or switch to modern `Object.keys(user)`.

## Bug 3: Incorrect Loop Target for `break`
- **Root Cause**: Placing `break` without a label only exits the innermost loop, continuing execution in the outer loop.
- **Fix**: Prefix the outer loop with a label (`outer: for (...)`) and break using `break outer`.
