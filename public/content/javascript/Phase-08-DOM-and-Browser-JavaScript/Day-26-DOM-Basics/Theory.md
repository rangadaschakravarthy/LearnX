# Day 26 — DOM Architecture & Selection API — Detailed Theory

Welcome to **Day 26** of the JavaScript Mastery curriculum. The **Document Object Model (DOM)** is the browser's programming interface for HTML and XML documents. It represents the page as a structured tree of objects so that programs can change the document structure, style, and content dynamically.

This guide provides an exhaustive theoretical foundation covering DOM Node hierarchy, DOM Selection APIs, Live `HTMLCollection` vs. Static `NodeList`, Content modification (`textContent` vs `innerText` vs `innerHTML`), and Attribute/ClassList mechanics.

---

## 1. The DOM Tree & Node Hierarchy Architecture

When a browser loads an HTML document, its HTML parser converts raw markup into an object tree called the **DOM Tree**.

```
                           [ Document ]
                                │
                          [ html Element ]
                                │
             ┌──────────────────┴──────────────────┐
             ▼                                     ▼
       [ head Element ]                      [ body Element ]
             │                                     │
       [ title Element ]                ┌──────────┴──────────┐
             │                          ▼                     ▼
       ( Text Node )              [ h1 Element ]        [ p Element ]
                                        │                     │
                                  ( Text Node )         ( Text Node )
```

### 1.1 Node Types Hierarchy

In the DOM, every component is a **Node**. The fundamental node types are:

1. **`DocumentNode` (`nodeType === 9`)**: Root entry point (`document`).
2. **`ElementNode` (`nodeType === 1`)**: HTML element tags (`<div>`, `<p>`, `<a>`).
3. **`TextNode` (`nodeType === 3`)**: Text content inside HTML tags (including whitespace and newlines).
4. **`CommentNode` (`nodeType === 8`)**: HTML comment blocks (`<!-- comment -->`).

```javascript
const heading = document.querySelector("h1");

console.log(heading.nodeType); // 1 (Element Node)
console.log(heading.nodeName); // "H1"
console.log(heading.childNodes[0].nodeType); // 3 (Text Node inside h1)
```

---

## 2. DOM Element Selection API: Legacy vs. Modern

JavaScript provides two eras of selection APIs to retrieve elements from the DOM tree:

```javascript
// 1. Legacy Selector Methods (Returns Live Collections or single element)
const elById = document.getElementById("main-header");          // Element or null
const elByClass = document.getElementsByClassName("btn");       // Live HTMLCollection
const elByTag = document.getElementsByTagName("div");           // Live HTMLCollection

// 2. Modern Selectors API (ES5+ - Accepts ANY valid CSS selector string)
const singleMatch = document.querySelector(".container > p.intro"); // First matching Element or null
const allMatches = document.querySelectorAll("ul.nav-list > li");    // Static NodeList
```

---

## 3. Live `HTMLCollection` vs. Static `NodeList`

Understanding the difference between live and static element collections is a frequent interview topic:

```javascript
// Live HTMLCollection (Updates AUTOMATICALLY when DOM elements are added/deleted!)
const liveCollection = document.getElementsByClassName("item");

// Static NodeList (Snapshot in time; does NOT update when DOM mutates!)
const staticList = document.querySelectorAll(".item");

console.log(liveCollection.length); // e.g. 2
console.log(staticList.length);     // e.g. 2

// Dynamically insert a new element into DOM:
const newItem = document.createElement("div");
newItem.className = "item";
document.body.appendChild(newItem);

console.log(liveCollection.length); // 3! (AUTOMATICALLY UPDATED!)
console.log(staticList.length);     // 2  (STILL 2! Static snapshot)
```

### Complete Collection Comparison Matrix

| Feature | `HTMLCollection` | `NodeList` (`querySelectorAll`) | `NodeList` (`childNodes`) |
| :--- | :--- | :--- | :--- |
| **Contains** | **Element Nodes ONLY** | **Element Nodes ONLY** | **All Nodes** (Elements, Text, Comments) |
| **Live / Static** | **LIVE** (Reflects DOM changes) | **STATIC** (Snapshot) | **LIVE** |
| **`.forEach()` Method?**| ❌ No (Must convert to Array) | 🟢 **Yes** | 🟢 **Yes** |
| **Array Conversion** | `Array.from(collection)` | `Array.from(list)` or `[...list]` | `Array.from(list)` |

---

## 4. Reading & Modifying Content: `textContent` vs. `innerText` vs. `innerHTML`

```html
<!-- HTML Structure -->
<div id="demo">
  Hello <span style="display: none;">Hidden World</span>
</div>
```

```javascript
const demo = document.getElementById("demo");

// 1. textContent (Raw Node Text - Fast, Security Safe)
console.log(demo.textContent); 
// Output: "Hello Hidden World" (Returns text of ALL nodes, ignoring CSS styling!)

// 2. innerText (Rendered Text - Triggers Layout Reflow!)
console.log(demo.innerText); 
// Output: "Hello" (Respects CSS! Ignores hidden element, normalizes whitespace)

// 3. innerHTML (Raw HTML Parsing - Security Danger!)
console.log(demo.innerHTML);
// Output: "\n  Hello <span style=\"display: none;\">Hidden World</span>\n"
```

### Comparison & Usage Rules

| Property | Reads Hidden Text? | Triggers Layout Reflow? | Parses HTML Markup? | XSS Vulnerability Risk? |
| :--- | :--- | :--- | :--- | :--- |
| **`textContent`** | **Yes** | ❌ **No** (High Performance) | ❌ No (Raw Text) | 🟢 **Safe** |
| **`innerText`** | ❌ No | ⚠️ **Yes** (Computes Layout) | ❌ No (Raw Text) | 🟢 **Safe** |
| **`innerHTML`** | **Yes** | ⚠️ **Yes** (Re-parses DOM) | 🟢 **Yes** | 🚨 **HIGH XSS RISK** |

> [!WARNING]
> Never assign un-sanitized user input directly to `element.innerHTML = userInput`. Doing so exposes your website to **Cross-Site Scripting (XSS)** vulnerabilities! Always use `textContent` for plain text.

---

## 5. Attributes vs. DOM Properties

An HTML **Attribute** is written in source markup (`<input value="default">`). A DOM **Property** is a key on the JS Element object (`input.value`).

```javascript
const input = document.querySelector("input");

// Reading HTML Attribute vs DOM Property
console.log(input.getAttribute("value")); // "default" (Initial attribute in HTML source)
console.log(input.value);                  // "default" (Current DOM property state)

// User types "hello" into the input box:
console.log(input.getAttribute("value")); // "default" (Unchanged initial attribute!)
console.log(input.value);                  // "hello" (Updated DOM property!)
```

### Standard Attribute Methods & Custom `dataset`
```javascript
// Attribute API
input.setAttribute("placeholder", "Enter name...");
input.hasAttribute("disabled"); // boolean
input.removeAttribute("placeholder");

// Custom Data Attributes (data-*) via dataset API:
// HTML: <div id="user" data-user-id="101" data-role="admin"></div>
const userEl = document.getElementById("user");

console.log(userEl.dataset.userId); // "101" (camelCase conversion of data-user-id)
userEl.dataset.role = "super-admin"; // Updates attribute: data-role="super-admin"
```

---

## 6. Class & Style Manipulation (`classList` vs `style`)

### 6.1 `classList` API (Preferred for Styling)

```javascript
const btn = document.querySelector("button");

btn.classList.add("active", "primary"); // Add classes
btn.classList.remove("hidden");          // Remove class
btn.classList.toggle("selected");        // Toggles class (Adds if missing, removes if present)
btn.classList.replace("old", "new");     // Replaces class

if (btn.classList.contains("active")) {
  console.log("Button is active!");
}
```

---

### 6.2 Inline Styles via `element.style`

The `element.style` property controls **inline CSS styles** (using camelCase property names):

```javascript
const box = document.querySelector(".box");

box.style.backgroundColor = "deepskyblue"; // CSS: background-color
box.style.marginTop = "20px";              // CSS: margin-top
box.style.display = "flex";
```

---

## 7. Minor Points, Quirks & Traps

### 1. `document.querySelector` Returns `null` if Not Found
Always verify element existence before accessing properties to prevent `TypeError: Cannot read properties of null`:

```javascript
const missing = document.querySelector("#non-existent");
// missing.classList.add("test"); // TypeError!

// Safe Guard:
missing?.classList.add("test");
```

---

## 8. Senior Interview Questions & Answers

### Q1: Why is `textContent` vastly faster and safer than `innerHTML` and `innerText`?
* **Answer**: `textContent` sets or reads the raw textual value of text nodes directly without triggering the HTML parser (unlike `innerHTML`) and without forcing a synchronous CSS style computation / layout reflow pass (unlike `innerText`). Furthermore, because it does not evaluate HTML tags, it is immune to XSS injection attacks.

### Q2: What is the difference between `childNodes` and `children` on a DOM Element?
* **Answer**: `element.childNodes` returns a live `NodeList` containing **ALL child nodes**, including Element nodes, Text nodes (whitespace/newlines), and Comment nodes. `element.children` returns a live `HTMLCollection` containing **ONLY Element nodes** (`nodeType === 1`), stripping out text and comments.

---

## 9. Summary & Key Takeaways

1. **DOM Tree**: Nodes represent elements, text, and comments. Root is `document`.
2. **Selector Methods**: Use `querySelector` and `querySelectorAll` for modern CSS selector queries.
3. **Live vs Static**: `getElementsByClassName` returns live `HTMLCollection`; `querySelectorAll` returns static `NodeList`.
4. **Text Content**: Use `textContent` for fast, safe text updates. Avoid `innerHTML` with user input.
5. **Class Management**: Use `classList` (`add`, `remove`, `toggle`) rather than overwriting `className`.
