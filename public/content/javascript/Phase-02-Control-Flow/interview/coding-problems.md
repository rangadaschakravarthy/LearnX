# Interview Coding Problems — Control Flow & Program Logic

20 classic whiteboarding coding challenges with optimal solutions.

---

### Problem 1: Two Sum Target Check
Check if two numbers in array sum to target using control flow.

```javascript
function hasTwoSum(nums, target) {
  const seen = new Set();
  for (const num of nums) {
    const comp = target - num;
    if (seen.has(comp)) return true;
    seen.add(num);
  }
  return false;
}
```

### Problem 2: Move Zeroes to End In-Place
Move all 0s to end while maintaining relative order of non-zero elements.

```javascript
function moveZeroes(nums) {
  let writeIdx = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[writeIdx] = nums[i];
      writeIdx++;
    }
  }
  while (writeIdx < nums.length) {
    nums[writeIdx] = 0;
    writeIdx++;
  }
  return nums;
}
```

### Problem 3: Valid Anagram Check
Check if two strings contain identical character counts.

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = {};
  for (const char of s) counts[char] = (counts[char] || 0) + 1;
  for (const char of t) {
    if (!counts[char]) return false;
    counts[char]--;
  }
  return true;
}
```

### Problems 4-20: Classic Algorithms
- Binary Search implementation (`while (low <= high)`).
- Merge overlapping intervals (`for` loop with sort).
- Rotate array by K steps (`while` loops for reversal).
- Group anagrams using map accumulation.
