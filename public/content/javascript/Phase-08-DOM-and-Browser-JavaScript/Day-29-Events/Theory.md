# Day 29 — Browser Event System & Listeners — Detailed Theory

Welcome to **Day 29** of the JavaScript Mastery curriculum. Browsers operate on an **Event-Driven Architecture**. User actions (clicks, keypresses, scrolls), page lifecycle changes, network updates, and timers generate asynchronously dispatched signals called **Events**.

This guide provides an exhaustive theoretical foundation covering `addEventListener()`, listener options (`passive`, `once`, `signal`), Event Object properties (`target` vs `currentTarget`), default action cancellation (`preventDefault`), and lifecycle event categories.

---

## 1. The Browser Event System Architecture

Browsers connect asynchronous system events to JavaScript code through an **Event Dispatcher** and the **Event Loop Queue**:

```
[ User Action / Sensor / OS ]
              │ (Generates Event Signal)
              ▼
    [ Browser Event Dispatcher ]
              │ (Pushes Event Task to Task Queue)
              ▼
       [ Event Loop Queue ]
              │ (Pops Task when Call Stack is empty)
              ▼
   [ Executing Event Listener Callback ]
```

---

## 2. Registering Event Handlers: Evolution & Best Practices

JavaScript has evolved through three iterations of event handling:

```javascript
const btn = document.querySelector("button");

// 1. Inline HTML Attribute (LEGACY / DO NOT USE)
// <button onclick="handleClick()">Click</button>

// 2. DOM Object Property (LEGACY / SINGLE HANDLER LIMITATION)
btn.onclick = function() { console.log("Handler 1"); };
btn.onclick = function() { console.log("Handler 2"); }; // Overwrites Handler 1!

// 3. W3C Standard addEventListener API (RECOMMENDED)
btn.addEventListener("click", () => console.log("Listener 1"));
btn.addEventListener("click", () => console.log("Listener 2")); // Both Listeners Execute!
```

---

## 3. `addEventListener(type, listener, options)` In-Depth

The standard signature for registering event listeners is:

```javascript
target.addEventListener(type, listener, options);
```

### Options Object Breakdown

```javascript
btn.addEventListener("click", handleSave, {
  once: true,      // 1. Automatically removes the listener after it fires ONCE!
  passive: true,   // 2. Guarantees the listener will NEVER call preventDefault()
  capture: false,  // 3. Controls whether listener fires in Capture or Bubble phase
  signal: controller.signal // 4. Allows bulk listener removal via AbortController
});
```

#### 3.1 Scroll Performance via `passive: true`
When scrolling, the browser main thread normally pauses page rendering to check if a `touchstart` or `wheel` listener calls `event.preventDefault()`. Specifying `{ passive: true }` tells the browser rendering engine that the listener will never cancel scrolling, allowing **silky-smooth 60fps scrolling performance**.

#### 3.2 Bulk Listener Cleanup via `AbortController` (ES2022)
Instead of calling `removeEventListener()` multiple times, use an `AbortController` signal to unbind dozens of listeners in a single line:

```javascript
const controller = new AbortController();

window.addEventListener("resize", onResize, { signal: controller.signal });
window.addEventListener("scroll", onScroll, { signal: controller.signal });

// Clean up ALL listeners at once (e.g. when unmounting a UI component):
controller.abort(); // Unbinds both onResize and onScroll immediately!
```

---

## 4. `removeEventListener()` & Function Reference Equality

To remove an event listener using `removeEventListener()`, you MUST pass the **exact same function reference** used when registering it!

```javascript
function handleClick() {
  console.log("Clicked!");
}

// 1. Correct Registration & Removal
btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick); // REMOVED CLEANLY!

// 2. The Anonymous Function Trap (MEMORY LEAK!)
btn.addEventListener("click", () => console.log("Clicked!"));
btn.removeEventListener("click", () => console.log("Clicked!")); 
// Fails to remove! The arrow function passed to removeEventListener is a DIFFERENT object in memory!
```

---

## 5. The Event Object: `event.target` vs. `event.currentTarget`

When an event handler is invoked, JavaScript automatically passes an **`Event` object** as the first argument to the callback function.

```javascript
// HTML: <button id="btn"><span>Click Me</span></button>
const btn = document.getElementById("btn");

btn.addEventListener("click", function(event) {
  // If user clicks directly on the inner <span> tag:
  console.log(event.target);        // <span>Click Me</span> (Originating clicked element)
  console.log(event.currentTarget); // <button id="btn">  (Element holding this listener)
  console.log(this);                // <button id="btn">  (In standard functions, 'this' === currentTarget)
});
```

### Key Event Object Properties & Methods

| Property / Method | Description |
| :--- | :--- |
| **`event.target`** | The deepest originating DOM element where the event occurred. |
| **`event.currentTarget`** | The DOM element to which the event listener callback is currently attached. |
| **`event.preventDefault()`** | Prevents the default browser action for the event (e.g. stops link navigation, form submits). |
| **`event.type`** | String name of the event (e.g. `"click"`, `"submit"`). |
| **`event.timeStamp`** | Time (in milliseconds) at which the event was created relative to page load. |

```javascript
// Canceling Default Form Submission
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents page refresh on form submission!
  console.log("Handling form submission via JavaScript AJAX...");
});
```

---

## 6. Essential Browser Event Categories

### 6.1 Page Lifecycle Events

```javascript
// 1. DOMContentLoaded: HTML parsed & DOM tree constructed. (Images/CSS may still be loading)
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Ready! Safe to select elements.");
});

// 2. load: ENTIRE page fully loaded (HTML, CSS, Images, Frames, External Scripts)
window.addEventListener("load", () => {
  console.log("All page resources fully loaded.");
});

// 3. beforeunload: Fires right before user leaves or refreshes page
window.addEventListener("beforeunload", (event) => {
  // Prompt unsaved changes confirmation
  event.preventDefault();
  event.returnValue = ""; // Standard requirement for modern browsers to display prompt
});
```

---

### 6.2 Form & Input Events (`input` vs `change`)

```javascript
const textInput = document.querySelector("input[type='text']");

// 'input': Fires IMMEDIATELY on every single keystroke or character edit
textInput.addEventListener("input", (e) => {
  console.log("Real-time input value:", e.target.value);
});

// 'change': Fires ONLY when focus leaves the input (on 'blur') after modification
textInput.addEventListener("change", (e) => {
  console.log("Final committed value:", e.target.value);
});
```

---

## 7. Minor Points, Quirks & Traps

### 1. `event.key` vs `event.code` Keyboard Properties
* `event.key`: The physical character value generated (respects shift/caps lock, e.g. `"A"` vs `"a"`).
* `event.code`: The physical mechanical key code on the keyboard layout (e.g. `"KeyA"`).

```javascript
window.addEventListener("keydown", (e) => {
  console.log(`Key pressed: ${e.key}, Mechanical Code: ${e.code}`);
});
```

---

## 8. Senior Interview Questions & Answers

### Q1: Compare `event.target` vs `event.currentTarget`.
* **Answer**: `event.target` refers to the exact, deepest DOM element where the event originated (the element that was clicked or triggered). `event.currentTarget` refers to the DOM element to which the active event listener callback is currently attached. In event delegation patterns, `event.currentTarget` remains constant (the parent container), while `event.target` varies depending on which child element was clicked.

### Q2: Why cannot anonymous arrow functions be un-bound using `removeEventListener()`?
* **Answer**: `removeEventListener()` matches listeners by object reference equality. Passing an inline anonymous function or arrow function to `removeEventListener()` creates a brand new function instance in heap memory that does not match the memory address of the function registered in `addEventListener()`. To un-bind listeners cleanly, store the function in a named variable reference or use an `AbortController` signal.

---

## 9. Summary & Key Takeaways

1. **Standard `addEventListener`**: Use `addEventListener()` to bind multiple non-destructive handlers.
2. **`target` vs `currentTarget`**: `target` is the clicked origin element; `currentTarget` is the element carrying the listener.
3. **Passive Listeners**: Pass `{ passive: true }` on touch/wheel listeners to guarantee smooth 60fps scrolling.
4. **Clean Un-binding**: Save function references or use `AbortController` signals to remove event listeners and prevent memory leaks.
