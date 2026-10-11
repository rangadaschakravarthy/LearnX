# Browser API Reference

Reference for built-in Browser APIs: Storage, Timers, Window Location, History, and Navigator.

---

## 1. Web Storage API (`localStorage` & `sessionStorage`)

| Method / Property | Syntax | Description |
|:---|:---|:---|
| `setItem(key, value)` | `localStorage.setItem("user", JSON.stringify(obj))` | Stores key-value string pair |
| `getItem(key)` | `const data = localStorage.getItem("user")` | Retrieves string value (or `null`) |
| `removeItem(key)` | `localStorage.removeItem("user")` | Removes key from storage |
| `clear()` | `localStorage.clear()` | Removes all key-value pairs |
| `length` | `localStorage.length` | Returns number of stored items |

---

## 2. Timers API

| Function | Syntax | Description |
|:---|:---|:---|
| `setTimeout(fn, delay)` | `const id = setTimeout(cb, 1000)` | Executes `cb` once after `delay` ms |
| `clearTimeout(id)` | `clearTimeout(id)` | Cancels scheduled timeout timer |
| `setInterval(fn, delay)` | `const id = setInterval(cb, 1000)` | Repeatedly executes `cb` every `delay` ms |
| `clearInterval(id)` | `clearInterval(id)` | Cancels repeating interval timer |

---

## 3. Location, History & Navigator APIs

- **`window.location`**:
  - `location.href`: Full URL string of current page.
  - `location.pathname`: Path portion of URL.
  - `location.search`: Query parameters string (e.g., `"?q=js"`).
  - `location.reload()`: Reloads current document.
- **`window.history`**:
  - `history.back()`: Navigates to previous page in session history.
  - `history.forward()`: Navigates forward in session history.
- **`window.navigator`**:
  - `navigator.userAgent`: Browser user agent string.
  - `navigator.language`: Browser language code (e.g., `"en-US"`).
