# String Edge Cases and Boundary Conditions

## 1. Boundary Values Matrix

| Edge Case Input | Description | Output Behavior |
|---|---|---|
| `""` | Empty string | `length === 0`, falsy in booleans |
| `" "` | Whitespace-only string | `length === 3`, truthy in booleans! Use `.trim()` |
| `"0"` | Zero string | Truthy in booleans (`Boolean("0") === true`) |
| `null` / `undefined` | Uninitialized state | Throws `TypeError` if calling methods directly |
| Emojis (e.g. `"😀"`) | Surrogate pairs | `length === 2` in UTF-16 code units |

---

## 2. Emoji & UTF-16 Code Unit Awareness

JavaScript strings are sequences of UTF-16 code units. Supplementary characters (like emojis and certain foreign symbols) occupy 2 code units (surrogate pair):

```js
const emoji = "😀";
console.log(emoji.length); // 2 ! (Not 1)
console.log(emoji[0]);     // "\uD83D" (High surrogate fragment)

// Correct character count using spread or Array.from:
console.log([...emoji].length); // 1
```
