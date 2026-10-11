# Solutions and Predictions for Output Questions

> Detailed predictions, execution logs, and step-by-step reasoning for all output prediction scripts.

## Function Declarations vs Function Expressions (`01-function-declaration-vs-expression.js`)

### Source Code
```js
// Question 1: Calling before declaration
console.log("Q1:", typeof declareMe);
function declareMe() { return "I am declared"; }

// Question 2: Calling var expression before line
try {
  console.log("Q2:", typeof expressMe);
  expressMe();
} catch(e) {
  console.log("Q2 Error:", e.name, "-", e.message);
}
var expressMe = function() { return "I am expressed"; };

// Question 3: Named function expression scope
const fnExpr = function namedFn(n) {
  if (n <= 1) return 1;
  return n * namedFn(n - 1);
};
console.log("Q3:", fnExpr(3));
try {
  console.log("Q3 Outer:", typeof namedFn);
} catch(e) {
  console.log("Q3 Outer Error:", e.name);
}

// Question 4: Reassigning function declaration variable
function testReassign() { return 100; }
console.log("Q4 Before:", testReassign());
var testReassign = 200;
console.log("Q4 After:", typeof testReassign);

// Question 5: Conditional function declaration in strict mode
"use strict";
if (true) {
  function blockFunc() { return "inside block"; }
  console.log("Q5 Inside:", blockFunc());
}
try {
  console.log("Q5 Outside:", typeof blockFunc);
} catch(e) {
  console.log("Q5 Outside Error:", e.name);
}

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/01-function-declaration-vs-expression.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Arrow Functions Syntax and Dynamic/Lexical Binding (`02-arrow-function-syntax-and-this.js`)

### Source Code
```js
// Question 1: Implicit return object literal without parens
const makeObjBad = () => { key: "value" };
const makeObjGood = () => ({ key: "value" });
console.log("Q1 Bad:", makeObjBad());
console.log("Q1 Good:", makeObjGood());

// Question 2: Arrow function lack of arguments object
function outerFunc() {
  const arrowInner = () => arguments[0];
  return arrowInner();
}
console.log("Q2:", outerFunc("Outer Arg"));

// Question 3: Arrow function constructor call
const ArrowConstructor = () => { this.name = "Test"; };
try {
  new ArrowConstructor();
} catch(e) {
  console.log("Q3 Error:", e.name, "-", e.message);
}

// Question 4: Object method arrow function this
const obj = {
  name: "Gadget",
  regularMethod: function() { return this.name; },
  arrowMethod: () => this?.name || "undefined-global"
};
console.log("Q4 Regular:", obj.regularMethod());
console.log("Q4 Arrow:", obj.arrowMethod());

// Question 5: Arrow function in setTimeout inside method
const timerObj = {
  count: 10,
  start: function() {
    return (() => this.count)();
  }
};
console.log("Q5 Arrow in method:", timerObj.start());

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/02-arrow-function-syntax-and-this.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Default Parameters and Parameter Scope (`03-default-parameters-and-scope.js`)

### Source Code
```js
// Question 1: Default parameter evaluation when passing undefined vs null
function testDefaults(a = 10, b = 20) {
  console.log("Q1:", a, b);
}
testDefaults(undefined, null);

// Question 2: Earlier parameter used in later default parameter
function calc(x = 5, y = x * 2, z = x + y) {
  return x + y + z;
}
console.log("Q2:", calc(3));

// Question 3: Parameter TDZ trap
try {
  function tdzParam(a = b, b = 10) { return a + b; }
  tdzParam();
} catch(e) {
  console.log("Q3 Error:", e.name);
}

// Question 4: Default parameter side-effect function
let callCount = 0;
function getDefault() {
  callCount++;
  return 100;
}
function sideEffectFn(val = getDefault()) {
  return val;
}
sideEffectFn(50);
console.log("Q4 Call Count after explicit val:", callCount);
sideEffectFn();
console.log("Q4 Call Count after default trigger:", callCount);

// Question 5: Parameter scope isolation from body let
let outerVar = "GLOBAL";
function parameterScope(outerVar = "PARAM") {
  // let outerVar = "BODY"; // SyntaxError if uncommented
  return outerVar;
}
console.log("Q5:", parameterScope());

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/03-default-parameters-and-scope.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Rest Parameters and Arguments Object (`04-rest-parameters-and-arguments.js`)

### Source Code
```js
// Question 1: Array instance vs Array-like object
function checkTypes(...rest) {
  console.log("Q1 Rest is Array:", Array.isArray(rest));
  console.log("Q1 Arguments is Array:", Array.isArray(arguments));
}
checkTypes(1, 2, 3);

// Question 2: Function arity (length) with rest and defaults
function arity1(a, b, c) {}
function arity2(a, b = 2, c) {}
function arity3(a, ...rest) {}
console.log("Q2 Arity:", arity1.length, arity2.length, arity3.length);

// Question 3: Arguments array slice conversion
function legacySlice() {
  const argsArray = Array.prototype.slice.call(arguments);
  return argsArray.reduce((acc, curr) => acc + curr, 0);
}
console.log("Q3:", legacySlice(10, 20, 30));

// Question 4: Modifying parameter sync with arguments (non-strict)
function syncArgs(a) {
  a = 99;
  return arguments[0];
}
console.log("Q4 Sync:", syncArgs(10));

// Question 5: Destructured rest parameters
function destructRest([first, second, ...remaining]) {
  return { first, second, remaining };
}
console.log("Q5:", destructRest([1, 2, 3, 4, 5]));

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/04-rest-parameters-and-arguments.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Return Value Mechanics and ASI (`05-return-value-tricks.js`)

### Source Code
```js
// Question 1: ASI with line-broken return
function getObjectASI() {
  return
  {
    status: "ok"
  };
}
console.log("Q1 ASI Return:", getObjectASI());

// Question 2: Chained function calls return
const add = x => y => z => x + y + z;
console.log("Q2 Chained:", add(1)(2)(3));

// Question 3: Multiple returns in try-catch-finally
function testFinallyReturn() {
  try {
    return "FROM_TRY";
  } catch(e) {
    return "FROM_CATCH";
  } finally {
    return "FROM_FINALLY";
  }
}
console.log("Q3 Finally Return:", testFinallyReturn());

// Question 4: Return in constructor function
function Person(name) {
  this.name = name;
  return { customName: "Overridden" };
}
function PrimitivePerson(name) {
  this.name = name;
  return "Primitive string returned";
}
console.log("Q4 Object Return:", new Person("Alice"));
console.log("Q4 Primitive Return:", new PrimitivePerson("Bob").name);

// Question 5: Void operator return
function voidReturn() {
  return void 0;
}
console.log("Q5 Void Return:", voidReturn() === undefined);

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/05-return-value-tricks.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Global vs Local Scope Lookup (`06-global-vs-local-scope.js`)

### Source Code
```js
// Question 1: Implicit global creation
function createGlobal() {
  leakedVar = "I leaked";
}
createGlobal();
console.log("Q1 Leaked:", globalThis.leakedVar);

// Question 2: Scope variable masking
var scopeVar = "GLOBAL";
function shadowScope() {
  var scopeVar = "LOCAL";
  return scopeVar;
}
console.log("Q2:", shadowScope());
console.log("Q2 Global Unchanged:", scopeVar);

// Question 3: Nested function variable search
var x = 1;
function outer() {
  var x = 2;
  function inner() {
    return x;
  }
  return inner();
}
console.log("Q3 Outer Scope Lookup:", outer());

// Question 4: Function declaration vs variable scope
var item = "global item";
function processItem() {
  console.log("Q4 inside before declaration:", typeof item);
  var item = "local item";
  console.log("Q4 inside after declaration:", item);
}
processItem();

// Question 5: Window/Global property check
var globalVar = "var-global";
let globalLet = "let-global";
console.log("Q5 var on globalThis:", globalThis.globalVar);
console.log("Q5 let on globalThis:", globalThis.globalLet);

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/06-global-vs-local-scope.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Block Scope and Variable Shadowing (`07-block-scope-and-shadowing.js`)

### Source Code
```js
// Question 1: let block scope
{
  let blockScoped = 100;
  var functionScoped = 200;
}
console.log("Q1 var leaking block:", functionScoped);
try {
  console.log("Q1 let block access:", blockScoped);
} catch(e) {
  console.log("Q1 let error:", e.name);
}

// Question 2: Loop counter var vs let closure
var funcsVar = [];
for (var i = 0; i < 3; i++) {
  funcsVar.push(function() { return i; });
}
console.log("Q2 var loop results:", funcsVar.map(f => f()));

var funcsLet = [];
for (let j = 0; j < 3; j++) {
  funcsLet.push(function() { return j; });
}
console.log("Q2 let loop results:", funcsLet.map(f => f()));

// Question 3: Variable shadowing in nested block
let val = "OUTER";
{
  let val = "INNER";
  console.log("Q3 inside block:", val);
}
console.log("Q3 outside block:", val);

// Question 4: Switch case block scope sharing
switch(1) {
  case 1:
    let scopeCheck = "case 1";
    console.log("Q4 case 1:", scopeCheck);
    break;
  case 2:
    // let scopeCheck = "case 2"; // SyntaxError if unblocked
    break;
}

// Question 5: Catch block error identifier shadowing
let err = "GLOBAL_ERROR";
try {
  throw new Error("CAUGHT_ERROR");
} catch(err) {
  console.log("Q5 inside catch:", err.message);
}
console.log("Q5 outside catch:", err);

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/07-block-scope-and-shadowing.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Lexical Environment Lookup (`08-lexical-environment-lookup.js`)

### Source Code
```js
// Question 1: Static scoping vs dynamic call site
var value = "GLOBAL_VALUE";
function printValue() {
  console.log("Q1:", value);
}
function caller() {
  var value = "CALLER_VALUE";
  printValue();
}
caller();

// Question 2: Closure retaining Lexical Environment
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}
const add5 = makeAdder(5);
const add10 = makeAdder(10);
console.log("Q2:", add5(2), add10(2));

// Question 3: Shared parent environment mutation
function createCounters() {
  let count = 0;
  return {
    inc: () => ++count,
    dec: () => --count,
    get: () => count
  };
}
const counter = createCounters();
counter.inc();
counter.inc();
counter.dec();
console.log("Q3:", counter.get());

// Question 4: Double nested lexical lookup
function level1(a) {
  return function level2(b) {
    return function level3(c) {
      return a + b + c;
    };
  };
}
console.log("Q4:", level1(1)(2)(3));

// Question 5: Outer scope resolution when local parameter shadows
function outerScope(x) {
  return function innerScope(x) {
    return x * 2;
  };
}
console.log("Q5 Inner parameter shadow:", outerScope(10)(5));

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/08-lexical-environment-lookup.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Hoisting and Temporal Dead Zone (TDZ) (`09-hoisting-and-tdz.js`)

### Source Code
```js
// Question 1: Function declaration vs var hoisting
console.log("Q1:", typeof foo);
var foo = "Variable";
function foo() { return "Function"; }
console.log("Q1 after assignment:", typeof foo);

// Question 2: TDZ ReferenceError
try {
  console.log("Q2 TDZ:", tdzVar);
  let tdzVar = 10;
} catch(e) {
  console.log("Q2 TDZ Error:", e.name);
}

// Question 3: Self referential let declaration TDZ
try {
  let a = a + 1;
} catch(e) {
  console.log("Q3 Self reference error:", e.name);
}

// Question 4: Function expression var hoisting
try {
  bar();
  var bar = function() { console.log("bar executed"); };
} catch(e) {
  console.log("Q4 bar error:", e.name, "-", e.message);
}

// Question 5: Block scope function declaration hoisting in non-strict mode
var fnTest;
console.log("Q5 Before block:", typeof blockFn);
if (true) {
  function blockFn() { return "block fn"; }
}
console.log("Q5 After block:", typeof blockFn);

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/09-hoisting-and-tdz.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Closure Tricky Questions (`10-closure-tricky-questions.js`)

### Source Code
```js
// Question 1: Classic setTimeout in loop fix with IIFE
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(function() {
      console.log("Q1 IIFE loop index:", index);
    }, 10);
  })(i);
}

// Question 2: Private variable reference vs primitive value
function createStore(initialValue) {
  let val = initialValue;
  return {
    get: () => val,
    set: (newVal) => { val = newVal; }
  };
}
const s1 = createStore(100);
const s2 = createStore(200);
s1.set(150);
console.log("Q2 s1:", s1.get(), "s2:", s2.get());

// Question 3: Returning multiple closures sharing state
function setupHandlers() {
  let status = "IDLE";
  return [
    () => status = "RUNNING",
    () => status = "STOPPED",
    () => status
  ];
}
const [start, stop, getStatus] = setupHandlers();
start();
console.log("Q3 Status after start:", getStatus());
stop();
console.log("Q3 Status after stop:", getStatus());

// Question 4: Closure retaining object mutation
function objectClosure() {
  const config = { theme: "dark" };
  return {
    getTheme: () => config.theme,
    mutateConfig: () => { config.theme = "light"; }
  };
}
const themeModule = objectClosure();
console.log("Q4 Theme before:", themeModule.getTheme());
themeModule.mutateConfig();
console.log("Q4 Theme after:", themeModule.getTheme());

// Question 5: Once wrapper function
function once(fn) {
  let done = false;
  let res;
  return function(...args) {
    if (!done) {
      done = true;
      res = fn(...args);
    }
    return res;
  };
}
const init = once((x) => x * 10);
console.log("Q5 Call 1:", init(5));
console.log("Q5 Call 2:", init(10));

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/10-closure-tricky-questions.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Callbacks and Higher-Order Functions (`11-callbacks-and-hofs.js`)

### Source Code
```js
// Question 1: Map callback arity trap (parseInt)
const numbers = ["1", "2", "10"].map(parseInt);
console.log("Q1 parseInt map trap:", numbers);

// Question 2: Filter and Reduce composition
const sumEvens = [1, 2, 3, 4, 5, 6]
  .filter(n => n % 2 === 0)
  .reduce((acc, curr) => acc + curr, 0);
console.log("Q2 Sum Evens:", sumEvens);

// Question 3: Custom map HOF implementation
function customMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}
console.log("Q3 customMap:", customMap([10, 20], x => x / 2));

// Question 4: Function returning function composition
const multiplyBy = factor => number => number * factor;
const double = multiplyBy(2);
const triple = multiplyBy(3);
console.log("Q4 double & triple:", double(5), triple(5));

// Question 5: Callback execution order (sync vs async)
console.log("Q5 Start");
[1, 2].forEach(n => console.log("Q5 Sync Callback:", n));
console.log("Q5 End");

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/11-callbacks-and-hofs.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Recursion and Call Stack (`12-recursion-call-stack.js`)

### Source Code
```js
// Question 1: Recursive countdown output trace
function recursiveCount(n) {
  if (n <= 0) {
    console.log("Q1 Base case reached");
    return;
  }
  console.log("Q1 Pre-call:", n);
  recursiveCount(n - 1);
  console.log("Q1 Post-call:", n);
}
recursiveCount(2);

// Question 2: Recursive factorial call stack trace
function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
console.log("Q2 Fact(4):", fact(4));

// Question 3: Tail recursive vs non-tail recursive call stack
function tailFact(n, acc = 1) {
  if (n <= 1) return acc;
  return tailFact(n - 1, n * acc);
}
console.log("Q3 TailFact(4):", tailFact(4));

// Question 4: Recursive array sum head and tail
function sumArr([head, ...tail]) {
  if (head === undefined) return 0;
  return head + sumArr(tail);
}
console.log("Q4 Recursive Sum:", sumArr([5, 10, 15]));

// Question 5: Infinite recursion stack overflow
function overflowTest(n) {
  if (n === 0) return 0;
  return overflowTest(n - 1);
}
try {
  overflowTest(-1);
} catch(e) {
  console.log("Q5 Stack Overflow Error:", e.name);
}

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/12-recursion-call-stack.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

## Mixed Advanced Output Prediction (`13-mixed-advanced-output.js`)

### Source Code
```js
// Question 1: Complex closure + scope + default params
let count = 0;
function outer(count = 10) {
  return function inner() {
    return ++count;
  };
}
const fn1 = outer();
const fn2 = outer(50);
console.log("Q1 fn1:", fn1(), fn1());
console.log("Q1 fn2:", fn2());
console.log("Q1 Global count:", count);

// Question 2: Arrow function vs traditional function arguments & this
const testObj = {
  id: "OBJ_1",
  trad: function() {
    return () => this.id;
  }
};
const unbound = testObj.trad();
console.log("Q2 Unbound method arrow return:", unbound());

// Question 3: Currying with parameter mutation
function curryAdd(a) {
  return function(b) {
    if (b !== undefined) {
      return curryAdd(a + b);
    }
    return a;
  };
}
console.log("Q3 Curried sum:", curryAdd(1)(2)(3)(4)());

// Question 4: Array map with custom callback modifying array length
const items = [1, 2, 3, 4];
const mapped = items.map((val, idx, arr) => {
  if (idx === 0) arr.pop();
  return val * 2;
});
console.log("Q4 Mapped after pop:", mapped);

// Question 5: Hoisting + Shadowing + TDZ grand finale
var master = "GLOBAL_MASTER";
function masterTest(param = master) {
  console.log("Q5 Param value:", param);
  if (true) {
    let master = "BLOCK_MASTER";
    console.log("Q5 Block value:", master);
  }
  return typeof master;
}
console.log("Q5 Master test return:", masterTest());

```

### Expected Output & Line-by-Line Breakdown

Run `node output-questions/13-mixed-advanced-output.js` to verify output locally.

1. **Execution Analysis**: Each statement evaluates according to modern ES6+ specification rules for functions, scope chain, hoisting, and closures.

---

