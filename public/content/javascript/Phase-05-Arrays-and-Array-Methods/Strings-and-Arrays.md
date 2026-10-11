# Strings and Arrays Connection

Strings and arrays are closely connected sequential data structures in JavaScript. Converting between them using `split()` and `join()` enables powerful text processing algorithms.

---

## 1. String to Array: `split(delimiter)`

```js
const text = "JavaScript is awesome";
const words = text.split(" ");
console.log(words); // ["JavaScript", "is", "awesome"]

const characters = "Hello".split("");
console.log(characters); // ["H", "e", "l", "l", "o"]
```

---

## 2. Array to String: `join(delimiter)`

```js
const words = ["JavaScript", "is", "awesome"];
const sentence = words.join(" ");
console.log(sentence); // "JavaScript is awesome"

const slug = words.map(w => w.toLowerCase()).join("-");
console.log(slug); // "javascript-is-awesome"
```

---

## 3. Practical Example: Sentence Reversal

```js
function reverseWords(sentence) {
  return sentence
    .split(" ")
    .reverse()
    .join(" ");
}
console.log(reverseWords("Learn JavaScript Today")); // "Today JavaScript Learn"
```
