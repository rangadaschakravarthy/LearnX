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
