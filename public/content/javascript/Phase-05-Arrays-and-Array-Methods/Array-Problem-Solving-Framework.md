# Array Problem-Solving Framework

Follow this systematic 13-step framework when solving any array algorithm or DSA problem:

---

## 📋 The 13-Question Array Matrix

1. **What is the exact input type?** Is it an array of numbers, strings, objects, or nested 2D arrays?
2. **What should be returned?** Primitive number, modified array, boolean, index, or sub-array?
3. **Does element order matter?** Does sorting help, or must relative order be preserved?
4. **Do duplicates matter?** Are we looking for unique values or frequency counts?
5. **Is in-place mutation allowed?** Can we mutate the original input array ($O(1)$ extra space) or must we return a new copy?
6. **Is a simple linear traversal sufficient?** Can a single `for` loop solve it in $O(N)$ time?
7. **Is searching or condition testing needed?** `indexOf()`, `includes()`, `find()`, `some()`, `every()`.
8. **Is accumulation or reduction required?** Counter variable, running max/min, or `reduce()`.
9. **Does sorting simplify the problem?** Sorting enables binary search, two-pointer convergence, and duplicate grouping.
10. **Would a two-pointer technique work?** `left` at index 0 and `right` at index `len - 1` moving inward.
11. **Are we dealing with nested or multidimensional structures?** Requires double loops `for (row) for (col)`.
12. **What are the boundary edge cases?** Empty array `[]`, single element `[1]`, all duplicates, negative numbers, sparse arrays.
13. **What is the Time and Space Complexity?** Target $O(N)$ or $O(N \log N)$ time complexity.

---

## 🔄 Algorithm Lifecycle
```text
Understand Input/Output -> Draft Examples -> Identify Pattern -> Design Algorithm -> Code Solution -> Test Boundary Cases -> Optimize Complexity
```
