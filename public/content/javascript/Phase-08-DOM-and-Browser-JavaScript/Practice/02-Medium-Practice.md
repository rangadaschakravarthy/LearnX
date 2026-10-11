# Phase 8: Medium Practice Problems

## Overview
30 intermediate problems covering event delegation, form validation, localStorage integration, dynamic rendering loops, and custom modal handling.

---

### Problem 1: Event Delegation on Dynamic List
Attach a single click listener to `<ul id="todo-list">` that logs text of any clicked `<li>`.

### Problem 2: Delete Button Event Delegation
Attach click listener to list parent handling delete action for buttons with class `.delete-btn`.

### Problem 3: Live Input Character Counter
Bind an `input` event to `<textarea id="bio">` updating `<span id="counter">` with current length.

### Problem 4: Real-time Form Validation
Validate email field on `blur` event showing error message if string lacks `"@"`.

### Problem 5: Password Toggle Visibility
Implement click listener on eye button toggling password input type between `"password"` and `"text"`.

### Problem 6: Save User Theme to localStorage
Save theme choice (`"dark"` or `"light"`) in `localStorage` on select change.

### Problem 7: Load User Theme from localStorage
On page load, read theme from `localStorage` and apply class `"dark-mode"` to `document.body`.

### Problem 8: Dynamic Table Row Insertion
Write a function `addRow(name, role)` creating and appending a `<tr>` with two `<td>` elements.

### Problem 9: Tabbed Interface Controller
Implement click handler for `.tab-btn` elements showing corresponding `.tab-content` div.

### Problem 10: Modal Dialog Open & Close
Implement click handlers for opening `#modal` and closing via backdrop or `#close-modal-btn`.

### Problem 11: Filter List Items by Search Query
Filter visibility of `<li>` elements based on query typed into `#search-input`.

### Problem 12: Accordion Collapse/Expand
Toggle visibility of panel div when accordion header button is clicked.

### Problem 13: Form Submit Handler with Reset
Handle `#register-form` submit, call `e.preventDefault()`, log values, and call `form.reset()`.

### Problem 14: Stopwatch Counter with Timers
Build start/stop interval handlers updating `<span id="stopwatch">`.

### Problem 15: Select All Checkboxes Master Toggle
Implement master checkbox toggling `checked` state of all list checkboxes.

### Problem 16: Dynamic Star Rating System
Highlight stars up to index hovered over and save rating state on click.

### Problem 17: Infinite Scroll Mock Trigger
Detect when user scrolls near bottom of page (`window.innerHeight + window.scrollY >= document.body.offsetHeight - 100`).

### Problem 18: Drag & Drop Placeholder Style Toggle
Add class `"drag-over"` on `dragover` event and remove on `dragleave`.

### Problem 19: Keyboard Shortcut Listener
Listen for `Ctrl + S` / `Cmd + S` keyboard shortcut, prevent browser save, and call `saveDocument()`.

### Problem 20: Auto-Save Draft to Storage
Bind `input` event on textarea auto-saving draft string to `localStorage` every keypress.

### Problem 21: Render Object Array to Cards
Write `renderProducts(productsArray)` generating HTML cards using `DocumentFragment`.

### Problem 22: Safe HTML Escaper Utility
Write `escapeHTML(str)` returning safe string replacing `<`, `>`, `&`, `"`.

### Problem 23: Dynamic Breadcrumbs Generator
Generate breadcrumb link nodes from array of path objects.

### Problem 24: Form Data Serialization to Object
Write `getFormData(formElement)` returning key-value plain JavaScript object.

### Problem 25: Custom Dropdown Select Controller
Build accessible click controller for custom HTML dropdown element.

### Problem 26: Storage Event Multi-Tab Sync
Listen for `window.addEventListener("storage", ...)` updating UI across open browser tabs.

### Problem 27: Copy Text to Clipboard (Conceptual DOM Selection)
Select text in `#coupon-code` element and execute copy trigger.

### Problem 28: Focus Trapping in Modal
Keep keyboard focus cycling between first and last focusable elements inside open modal.

### Problem 29: Clear All Completed Items
Filter DOM list removing all child nodes possessing class `.completed`.

### Problem 30: Dynamic Tooltip Controller
Show floating tooltip element positioned at mouse `e.pageX`, `e.pageY` coordinates.
