# Day 65 — Regular Expressions & ReDoS Security — Detailed Theory

Welcome to **Day 65** of the JavaScript Mastery curriculum. **Regular Expressions (RegExp)** are powerful pattern-matching engines used for searching, text validation, parsing, and data extraction.

This guide provides an exhaustive theoretical foundation covering NFA Backtracking Engine mechanics, Quantifiers & Anchors, Capturing Groups & Lookarounds (`?=`, `?!`, `?<=`, `?<!`), JS RegExp APIs (`exec`, `test`, `matchAll`), and **ReDoS (Regular Expression Denial of Service)** security vulnerabilities.

---

## 1. The NFA Backtracking Engine Architecture

JavaScript uses a **Nondeterministic Finite Automaton (NFA)** backtracking engine.

```
Pattern: /a*b/ on Text: "aaaa"

1. Engine consumes 'a', 'a', 'a', 'a' using greedy '*' quantifier.
2. Engine attempts to match 'b'. Fails (End of string).
3. BACKTRACKING: Engine steps back 1 character ('aaa') and tries to match 'b'. Fails.
4. BACKTRACKING: Engine steps back to 'aa', 'a', ''...
```

> **Key Rule**: NFA engines test possibilities greedily. When a branch fails, the engine **backtracks** to the last decision point and tests alternate paths.

---

## 2. Flags & Character Classes Matrix

### 2.1 RegExp Flags

| Flag | Name | Functionality |
| :--- | :--- | :--- |
| **`g`** | Global | Matches ALL instances across the string (does not stop at first match). |
| **`i`** | Insensitive | Case-insensitive matching (`A` matches `a`). |
| **`m`** | Multiline | `^` and `$` match start/end of EACH line (separated by `\n`). |
| **`s`** | dotAll | Allows dot `.` to match newline characters `\n`. |
| **`u`** | Unicode | Enables full UTF-16 Unicode code point matching and surrogate pair support. |
| **`y`** | Sticky | Matches ONLY at `lastIndex` position in target string. |
| **`d`** | HasIndices | Includes start/end character index bounds for captured groups (`match.indices`). |

---

### 2.2 Character Shorthands & Anchors

```javascript
// Shorthands
// \d -> Digit [0-9]               | \D -> Non-digit [^0-9]
// \w -> Word char [a-zA-Z0-9_]    | \W -> Non-word char
// \s -> Whitespace [ \t\n\r]       | \S -> Non-whitespace

// Anchors
// ^ -> Start of string/line       | $ -> End of string/line
// \b -> Word boundary             | \B -> Non-word boundary

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test("user@example.com")); // true
```

---

## 3. Quantifiers: Greedy vs. Lazy (Non-Greedy)

* **Greedy Quantifiers (`*`, `+`, `{n,m}`)**: Match as MUCH text as possible, backtracking only if necessary.
* **Lazy / Non-Greedy Quantifiers (`*?`, `+?`, `{n,m}?`)**: Match as LITTLE text as possible, expanding only if necessary.

```javascript
const html = "<div>Content 1</div><div>Content 2</div>";

// 1. Greedy Match (/*/) -> Matches from FIRST <div> to LAST </div>!
console.log(html.match(/<div>.*<\/div>/)[0]); 
// Output: "<div>Content 1</div><div>Content 2</div>"

// 2. Lazy Match (/*?/) -> Matches FIRST <div> block only!
console.log(html.match(/<div>.*?<\/div>/)[0]); 
// Output: "<div>Content 1</div>"
```

---

## 4. Groups, Named Captures & Lookarounds

### 4.1 Named Capturing Groups `(?<name>pattern)`

```javascript
const dateString = "2026-09-13";
const dateRegex = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/;

const match = dateString.match(dateRegex);
console.log(match.groups.year);  // "2026"
console.log(match.groups.month); // "09"
console.log(match.groups.day);   // "13"
```

---

### 4.2 Lookaround Assertions (Zero-Width Assertions)

Lookarounds inspect surrounding text **without consuming characters** in the match:

```javascript
// 1. Positive Lookahead (?=x) -> Matches if followed by 'x'
const price = "$100";
console.log(price.match(/\d+(?=\s*USD|\$)/)); // Matches "100" (followed by $)

// 2. Negative Lookahead (?!x) -> Matches if NOT followed by 'x'
const code = "item100USD";
console.log(code.match(/\d+(?!USD)/)); // null (because 100 IS followed by USD)

// 3. Positive Lookbehind (?<=x) -> Matches if preceded by 'x'
const amount = "$250";
console.log(amount.match(/(?<=\$)\d+/)[0]); // "250" (preceded by $)

// 4. Negative Lookbehind (?<!x) -> Matches if NOT preceded by 'x'
console.log("250".match(/(?<!\$)\d+/)[0]); // "250" (not preceded by $)
```

---

## 5. Security Threat: Catastrophic Backtracking (ReDoS)

**Regular Expression Denial of Service (ReDoS)** occurs when a vulnerable regular expression containing nested quantifiers experiences **Exponential Backtracking** ($O(2^N)$) on crafted input.

```javascript
// 🚨 VULNERABLE REDOS REGEX (Nested Quantifiers):
const dangerousRegex = /(a+)+b/;

// Input string with many 'a's and NO 'b' at the end:
const evilInput = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaX";

// Testing this regex freezes CPU/thread for minutes/hours!
// dangerousRegex.test(evilInput); // 100% CPU Thread Freeze!
```

### Preventing ReDoS
1. Avoid nested quantifiers (`(a+)+` or `(a|a)+`).
2. Use atomic groups, strict anchors (`^`/`$`), or non-backtracking validation libraries.
3. Validate input string length limits BEFORE running RegExp execution.

---

## 6. Minor Points, Quirks & Traps

### 1. `lastIndex` Statefulness with the `g` Flag
When using `.exec()` or `.test()` with a global RegExp (`/g`), the RegExp object stores state in **`regex.lastIndex`**. Calling `.test()` repeatedly toggles between `true` and `false`!

```javascript
const globalRegex = /foo/g;
const str = "foo";

console.log(globalRegex.test(str)); // true  (lastIndex updated to 3)
console.log(globalRegex.test(str)); // false (Searches starting from index 3 -> fails!)
console.log(globalRegex.test(str)); // true  (lastIndex reset to 0 -> succeeds!)
```

---

## 7. Senior Interview Questions & Answers

### Q1: What is Catastrophic Backtracking (ReDoS) and how do you prevent it in production RegExp patterns?
* **Answer**: Catastrophic Backtracking occurs when a regular expression processed by an NFA engine contains overlapping or nested ambiguous quantifiers (such as `(a+)+` or `([a-z]+)+`). When presented with a non-matching input string, the engine evaluates every possible permutation of character splits across the nested quantifiers, resulting in $O(2^N)$ exponential time complexity that freezes the CPU thread (ReDoS). It is prevented by eliminating nested quantifiers, enforcing input character length limits prior to matching, using non-overlapping character classes, and testing RegExp patterns using static analysis tools like `safe-regex`.

### Q2: Compare `RegExp.prototype.test()` vs `String.prototype.matchAll()` in ES2020.
* **Answer**: `test()` returns a boolean indicating whether a match exists, but if used with the global flag `/g`, it mutates the stateful `lastIndex` property on the RegExp instance. `matchAll()` (ES2020) accepts a global RegExp and returns an **Iterator** yielding full match arrays for every match (including capturing groups, named groups, and match indices) without mutating state.

---

## 8. Summary & Key Takeaways

1. **NFA Engine**: JS RegExp engines use NFA backtracking; avoid overlapping nested quantifiers.
2. **Greedy vs Lazy**: `*` and `+` match max characters; append `?` (`*?`, `+?`) for non-greedy minimal matching.
3. **Lookarounds**: Use lookaheads `(?=)` and lookbehinds `(?<=)` for zero-width context assertions.
4. **Stateful `lastIndex`**: Beware that global `/g` regexes retain state across repeated `.test()` calls.
5. **ReDoS**: Guard against exponential backtracking vulnerabilities on untrusted input strings.
