# DOM Method Reference

Comprehensive reference guide to standard DOM Selection, Manipulation, Traversal, and Element Creation APIs in Vanilla JavaScript.

---

## 1. Selection Methods

| Method | Target | Returns | Live/Static |
|:---|:---|:---|:---|
| `document.getElementById(id)` | Single ID | Element / `null` | N/A |
| `document.querySelector(selector)` | CSS Selector | First Element / `null` | Static snapshot |
| `document.querySelectorAll(selector)` | CSS Selector | NodeList | Static snapshot |
| `document.getElementsByClassName(name)` | Class Name | HTMLCollection | Live collection |
| `document.getElementsByTagName(tag)` | Tag Name | HTMLCollection | Live collection |

---

## 2. Content & Modification Methods

| Property / Method | Description | Security / Use Case |
|:---|:---|:---|
| `element.textContent` | Plain text inside element (including hidden text) | Safe (prevents XSS) |
| `element.innerText` | Rendered human-readable text | Triggers reflow |
| `element.innerHTML` | HTML markup string inside element | Unsafe for user input |
| `element.value` | Value of form input, textarea, or select | Reading/setting input state |

---

## 3. Element Creation & Insertion Methods

| Method | Syntax | Description |
|:---|:---|:---|
| `document.createElement(tag)` | `const div = document.createElement("div")` | Creates a new detached Element node |
| `document.createTextNode(text)` | `const txt = document.createTextNode("hi")` | Creates a new detached Text node |
| `parent.append(...nodesOrStrings)` | `parent.append(div, "text")` | Appends multiple nodes or strings |
| `parent.appendChild(node)` | `parent.appendChild(div)` | Appends a single Node (returns node) |
| `parent.prepend(...nodesOrStrings)` | `parent.prepend(div)` | Inserts at the beginning of parent |
| `target.before(...nodesOrStrings)` | `target.before(div)` | Inserts before target element |
| `target.after(...nodesOrStrings)` | `target.after(div)` | Inserts after target element |
| `target.remove()` | `element.remove()` | Removes element from DOM tree |
| `target.replaceWith(newNode)` | `oldEl.replaceWith(newEl)` | Replaces target node with newNode |
| `node.cloneNode(deepBoolean)` | `el.cloneNode(true)` | Deep clones node and children |

---

## 4. Attributes & ClassList APIs

| Method | Syntax | Description |
|:---|:---|:---|
| `getAttribute(attr)` | `el.getAttribute("href")` | Reads string attribute value |
| `setAttribute(attr, val)` | `el.setAttribute("disabled", "true")` | Sets attribute value |
| `removeAttribute(attr)` | `el.removeAttribute("disabled")` | Removes attribute |
| `hasAttribute(attr)` | `el.hasAttribute("data-role")` | Returns boolean |
| `dataset` | `el.dataset.userId` | Accesses `data-user-id` attributes |
| `classList.add(...cls)` | `el.classList.add("active", "highlight")` | Adds CSS class names |
| `classList.remove(...cls)` | `el.classList.remove("active")` | Removes CSS class names |
| `classList.toggle(cls, force)` | `el.classList.toggle("dark-mode")` | Toggles class name |
| `classList.contains(cls)` | `el.classList.contains("active")` | Returns boolean |
