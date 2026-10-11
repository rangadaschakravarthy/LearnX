# String Problem-Solving Framework

When approaching any string manipulation or string-based algorithmic problem, follow this 12-step systematic framework:

---

## 📋 The 12-Question Decision Matrix

1. **What is the exact input type and format?**
   - Is it a primitive string, `null`, `undefined`, or a number wrapped as a string?
2. **What exactly should be returned?**
   - Is it a new string, a boolean (`true`/`false`), a count (`number`), an array of words, or an object summary?
3. **Is the problem character-based or word-based?**
   - Character-based: requires loop traversal, `charAt()`, or index manipulation.
   - Word-based: requires `split(" ")` or delimiter tokenization.
4. **Do I need to traverse the string?**
   - Forward loop (`0` to `len - 1`) vs reverse loop (`len - 1` down to `0`) vs two-pointer traversal (`left` & `right`).
5. **Do I need counting or accumulation?**
   - Counter variable (`let count = 0`) vs accumulator string (`let result = ""`).
6. **Do I need searching or lookup?**
   - `includes()`, `indexOf()`, `startsWith()`, `endsWith()`.
7. **Do I need to build a brand-new string?**
   - Remember: strings are immutable. Every modification creates a new string reference!
8. **Do I need `split()` and `join()`?**
   - Useful for word reversal, delimiter replacement, or converting string to array for processing.
9. **Do I need normalization first?**
   - `trim()` whitespace, convert case (`toLowerCase()`), remove non-alphanumeric characters.
10. **What are the edge cases?**
    - Empty string `""`, single character `"a"`, whitespace-only `"   "`, numbers inside string `"123"`, emojis/surrogate pairs.
11. **Can I solve it with a simple loop first?**
    - Always build the straightforward loop solution first before optimizing!
12. **What is the Time and Space Complexity?**
    - Target O(N) time and O(N) space where N is string length.

---

## 🔄 The 8-Step Problem-Solving Lifecycle

```text
Understand Problem -> Write Examples -> Identify Pattern -> Draft Algorithm -> Code Solution -> Test Output -> Handle Edge Cases -> Analyze Complexity
```
