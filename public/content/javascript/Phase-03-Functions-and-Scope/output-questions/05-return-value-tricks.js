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
