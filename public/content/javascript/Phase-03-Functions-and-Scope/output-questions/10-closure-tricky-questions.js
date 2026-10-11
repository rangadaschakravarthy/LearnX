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
