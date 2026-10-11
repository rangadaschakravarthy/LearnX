# Event Reference

Complete reference of common DOM event types, event object properties, and event listener control methods.

---

## 1. Common Event Types

### Mouse Events
- `click`: Fired when an element is clicked.
- `dblclick`: Fired when an element is double-clicked.
- `mousedown`: Fired when mouse button is pressed down over element.
- `mouseup`: Fired when mouse button is released over element.
- `mouseenter`: Fired when cursor enters element (does NOT bubble).
- `mouseleave`: Fired when cursor leaves element (does NOT bubble).
- `mouseover`: Fired when cursor enters element or descendants (bubbles).
- `mouseout`: Fired when cursor leaves element or descendants (bubbles).
- `mousemove`: Fired continuously as mouse moves over element.
- `contextmenu`: Fired when user right-clicks to open context menu.

### Keyboard Events
- `keydown`: Fired when a key is pressed down.
- `keyup`: Fired when a key is released.

### Form & Input Events
- `submit`: Fired when a form is submitted.
- `input`: Fired synchronously as user modifies text input value.
- `change`: Fired when input value is committed (e.g., losing focus, checking box).
- `focus`: Fired when an element gains focus (does NOT bubble).
- `blur`: Fired when an element loses focus (does NOT bubble).

### Document & Window Events
- `DOMContentLoaded`: Fired when initial HTML document parsing is completed.
- `load`: Fired when HTML, CSS, images, and external assets finish loading.
- `resize`: Fired when browser window dimensions change.
- `scroll`: Fired when document or container is scrolled.

---

## 2. Event Object (`e` / `event`) Properties

| Property | Type | Description |
|:---|:---|:---|
| `e.target` | Element | Element that originated the event (deepest target clicked) |
| `e.currentTarget` | Element | Element currently handling event (element holding event listener) |
| `e.type` | String | Event name (e.g., `"click"`, `"submit"`) |
| `e.key` | String | Keyboard key character (e.g., `"Enter"`, `"Escape"`, `"a"`) |
| `e.code` | String | Physical key code on keyboard (e.g., `"KeyA"`, `"Digit1"`) |
| `e.preventDefault()` | Method | Cancels default browser behavior (e.g., form submit navigation) |
| `e.stopPropagation()` | Method | Stops event from propagating up/down DOM tree |
