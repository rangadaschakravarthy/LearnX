# 07. Block Scope & Shadowing Practice

> Practice problems covering 07. Block Scope & Shadowing Practice. Complete all exercises in your own test file before checking solutions.

## Problem 1: Block Scope with `let` and `const`
**Description:** Show that variables defined with `let` or `const` inside `{}` block statements are inaccessible outside.

**Expected Behavior / Test:**
```js
{ let blockVar = 1; } console.log(blockVar)
```

---

## Problem 2: `var` Block Scope Leak
**Description:** Show that `var` inside an `if` block or `for` loop leaks into the enclosing function or global scope.

**Expected Behavior / Test:**
```js
if(true){ var leaked = 10; } console.log(leaked) // 10
```

---

## Problem 3: Loop Counter Scope in `for` Loop
**Description:** Compare `for (var i = 0; ...)` vs `for (let i = 0; ...)` inside asynchronous `setTimeout` callbacks.

**Expected Behavior / Test:**
```js
let creates fresh binding per iteration
```

---

## Problem 4: Variable Shadowing in Nested Blocks
**Description:** Demonstrate variable shadowing where block-scoped `let x = 20` masks outer `let x = 10`.

**Expected Behavior / Test:**
```js
shadowingDemo()
```

---

## Problem 5: Shadowing Outer Parameters
**Description:** Shadow a function parameter inside an `if` block with a `let` declaration of the same identifier.

**Expected Behavior / Test:**
```js
shadowParam(x)
```

---

## Problem 6: Illegal `var` Redeclaration of `let`
**Description:** Demonstrate the `SyntaxError: Identifier "x" has already been declared` when using `var x` in the same block as `let x`.

**Expected Behavior / Test:**
```js
{ let x = 1; var x = 2; }
```

---

## Problem 7: Function Declarations in Block Scope
**Description:** Test ES6 block-scoped function declaration behavior inside an `if` block across strict mode vs non-strict mode.

**Expected Behavior / Test:**
```js
if (true) { function blockFn(){} }
```

---

## Problem 8: Switch Statement Scope Block
**Description:** Show why `switch` statement cases share a single block scope, requiring `{}` block scoping per case.

**Expected Behavior / Test:**
```js
switch(x) { case 1: { let a = 1; break; } }
```

---

## Problem 9: Catch Clause Error Shadowing
**Description:** Show that the error variable in `try { ... } catch (err) { ... }` is block-scoped to the catch block.

**Expected Behavior / Test:**
```js
catch(err)
```

---

## Problem 10: Const Block Mutation vs Reassignment
**Description:** Show that `const` prevents re-binding within its block scope, but does not freeze mutated object properties.

**Expected Behavior / Test:**
```js
const obj = {}; obj.a = 1;
```

---

## Problem 11: Nested Loop Shadowing Bug
**Description:** Fix a classic bug where nested `for` loops both use `var i`, causing the outer loop to terminate early.

**Expected Behavior / Test:**
```js
fixNestedLoops()
```

---

## Problem 12: Dead Code Block Scoping
**Description:** Show how unexecuted blocks `if (false) { let x = 5; }` still enforce block isolation.

**Expected Behavior / Test:**
```js
blockIsolation()
```

---

## Problem 13: Block Scope IIFE Replacement Pattern
**Description:** Demonstrate replacing legacy IIFEs with native ES6 block statements `{ let privateVar = 1; }`.

**Expected Behavior / Test:**
```js
ES6 block usage
```

---

## Problem 14: `for...in` and `for...of` Scope Bindings
**Description:** Verify that `for (const key in obj)` creates a new immutable `const` binding for each loop iteration.

**Expected Behavior / Test:**
```js
for(const k in obj)
```

---

## Problem 15: Shadowing Audit Refactoring
**Description:** Identify and refactor shadowed variable names in a complex multi-nested utility function.

**Expected Behavior / Test:**
```js
refactorShadowedCode()
```

---

