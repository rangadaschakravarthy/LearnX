# Day 30 — Event Propagation & Delegation — Detailed Theory

Welcome to **Day 30** of the JavaScript Mastery curriculum. When an event fires on a DOM element, it does not execute in isolation. It travels through a multi-stage path across the DOM tree. Understanding **Event Propagation** (Capturing vs Bubbling) is fundamental to mastering web UI mechanics and implementing high-performance patterns like **Event Delegation**.

This guide provides an exhaustive theoretical foundation covering the 3 W3C Event Phases, `stopPropagation()` vs `stopImmediatePropagation()`, Event Delegation, and the `CustomEvent` API.

---

## 1. The 3 W3C Event Propagation Phases

Under the W3C DOM Events specification, when an event occurs, it passes through three sequential phases:

```
                      [ Window ]
                         │   ▲
            1. Capture   │   │   3. Bubble
              Phase      │   │     Phase
                         ▼   │
                       [ body ]
                         │   ▲
                         │   │
                         ▼   │
                     [ button ]
                   2. Target Phase
```

### Phase Breakdown

1. **Capture Phase (Trickling Phase)**: The event starts at the `Window` object and travels DOWN the DOM hierarchy through ancestors until it reaches the parent of the target element.
2. **Target Phase**: The event reaches the target element (`event.target`). Listeners registered on the target element execute.
3. **Bubbling Phase**: The event travels BACK UP the DOM hierarchy from the target's parent all the way to `Window`.

```javascript
// Registering a listener for the CAPTURE phase ({ capture: true } or 3rd arg true)
element.addEventListener("click", callback, { capture: true });

// Registering a listener for the BUBBLING phase (Default behavior)
element.addEventListener("click", callback, { capture: false });
```

---

## 2. Controlling Propagation: `stopPropagation()` vs. `stopImmediatePropagation()`

JavaScript provides two methods on the `Event` object to halt event propagation:

```javascript
// 1. event.stopPropagation(): Stops event from traveling up/down to other DOM elements
child.addEventListener("click", (e) => {
  e.stopPropagation(); // Parent container listeners will NOT receive this event!
  console.log("Child Clicked (Propagation Stopped)");
});

// 2. event.stopImmediatePropagation(): Stops propagation AND halts remaining listeners on SAME element!
btn.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  console.log("First Listener");
});

btn.addEventListener("click", (e) => {
  console.log("Second Listener"); // Will NEVER execute!
});
```

### Method Differences Table

| Method | Halts Propagation to Parent/Child Elements? | Halts Other Listeners on the SAME Element? | Prevents Default Browser Action? |
| :--- | :--- | :--- | :--- |
| **`event.stopPropagation()`** | 🟢 **Yes** | ❌ No | ❌ No |
| **`event.stopImmediatePropagation()`**| 🟢 **Yes** | 🟢 **Yes** | ❌ No |
| **`event.preventDefault()`** | ❌ No | ❌ No | 🟢 **Yes** |

---

## 3. Events That Do NOT Bubble

Not all events participate in the Bubbling phase. Common non-bubbling events include:

* `focus` & `blur` (Use bubbling equivalents: `focusin` & `focusout`)
* `mouseenter` & `mouseleave` (Use bubbling equivalents: `mouseover` & `mouseout`)
* `load`, `unload`, `abort`, `error`
* `resize` & `scroll` (on non-element document targets)

---

## 4. The Event Delegation Pattern (Performance Masterclass)

### The Problem
Imagine a table or list containing 1,000 items. Attaching individual event listeners to 1,000 buttons creates 1,000 function instances in memory and requires un-binding every listener when elements are deleted.

### The Solution: Event Delegation
**Event Delegation** takes advantage of Event Bubbling. Instead of attaching 1,000 listeners to child elements, you attach **a single event listener to the parent container** and inspect `event.target` to determine which child was clicked.

```javascript
// HTML: <ul id="user-list"> <li>Alice <button class="btn-delete" data-id="1">Delete</button></li> ... </ul>
const userList = document.getElementById("user-list");

// SINGLE Event Listener on Parent Container for 1,000+ items!
userList.addEventListener("click", (event) => {
  // Use .closest() to match target or child elements inside target
  const deleteBtn = event.target.closest(".btn-delete");

  if (deleteBtn && userList.contains(deleteBtn)) {
    const userId = deleteBtn.dataset.id;
    console.log(`Deleting User ID: ${userId}`);
    deleteBtn.closest("li").remove(); // Remove list item from DOM
  }
});
```

### Benefits of Event Delegation
1. **Memory Optimization**: Reduced from $N$ listeners to $1$ single listener.
2. **Dynamic Child Handling**: Automatically works for newly added DOM elements created in the future without needing to re-bind listeners!
3. **Clean Code**: Eliminates memory leak risks during DOM element removal.

---

## 5. Custom Events API (`CustomEvent` & `dispatchEvent`)

Custom Events allow components to publish custom domain signals with arbitrary payloads for decoupled pub-sub communication.

```javascript
// 1. Define Custom Event with 'detail' payload
const userLoggedInEvent = new CustomEvent("userLoggedIn", {
  detail: { username: "Alice", role: "Admin" },
  bubbles: true,     // Allow event to bubble up the DOM tree!
  cancelable: true   // Allow preventDefault() to be called
});

// 2. Register Listener for Custom Event
document.addEventListener("userLoggedIn", (e) => {
  console.log(`Welcome ${e.detail.username}! Role: ${e.detail.role}`);
});

// 3. Dispatch Custom Event on any DOM Target
document.dispatchEvent(userLoggedInEvent);
```

---

## 6. Minor Points, Quirks & Traps

### 1. `mouseenter` vs `mouseover` Traps
* `mouseover`: Bubbles up the DOM tree. Triggers every time the cursor enters any child element inside the container.
* `mouseenter`: Does NOT bubble. Triggers ONLY when entering the boundary of the element itself.

```javascript
// Use mouseenter for clean dropdown/hover menus without child flickering!
container.addEventListener("mouseenter", showDropdown);
```

---

## 7. Senior Interview Questions & Answers

### Q1: Explain the difference between `event.stopPropagation()` and `event.preventDefault()`.
* **Answer**: `event.stopPropagation()` stops the event from traveling further along the W3C propagation path (capturing or bubbling to other DOM nodes). `event.preventDefault()` cancels the browser's default native action associated with the event (e.g. submitting a form, checking a checkbox, navigating a hyperlink) without affecting event propagation across DOM nodes.

### Q2: How does `event.target.closest(selector)` enhance the Event Delegation pattern?
* **Answer**: In Event Delegation, if a button contains inner child elements (e.g., `<button><span>Icon</span> Text</button>`), clicking the icon causes `event.target` to be the `<span>` tag rather than the `<button>`. Calling `event.target.closest(".btn")` traverses up from the clicked `<span>` to cleanly match the target `<button>` element regardless of where inside the button the user clicked.

---

## 8. Summary & Key Takeaways

1. **3 Event Phases**: Capture Phase (top-down) -> Target Phase -> Bubble Phase (bottom-up).
2. **Phase Control**: Use `{ capture: true }` to listen in the Capture phase.
3. **Halting Propagation**: Use `stopPropagation()` to stop bubbling; use `stopImmediatePropagation()` to stop same-element listeners.
4. **Event Delegation**: Attach a single listener to a parent container and check `event.target.closest(selector)` for high performance.
5. **Custom Events**: Use `new CustomEvent(name, { detail: data })` and `dispatchEvent()` for custom component messaging.
