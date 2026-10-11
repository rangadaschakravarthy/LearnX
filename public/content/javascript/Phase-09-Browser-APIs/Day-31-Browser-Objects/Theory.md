# Day 31 — Browser Objects (BOM: Window, Location, History, Navigator) — Detailed Theory

Welcome to **Day 31** of the JavaScript Mastery curriculum. The **Browser Object Model (BOM)** represents all objects provided by the browser environment outside of the DOM document. It provides interfaces for window controls, URL navigation, browser history management, device hardware sensors, and clipboard access.

This guide provides an exhaustive theoretical foundation covering the `window`, `location`, `history` (HTML5 SPA routing), and `navigator` APIs.

---

## 1. The BOM vs. DOM Architecture

```
                                [ window ] (BOM Root)
                                    │
    ┌──────────────────┬────────────┼────────────┬──────────────────┐
    ▼                  ▼            ▼            ▼                  ▼
[ document ]      [ location ]  [ history ]  [ navigator ]     [ screen ]
 (DOM Root)       (URL State)   (SPA Router) (Browser/Device)  (Display Metrics)
```

### Key Differences

| Feature | DOM (`window.document`) | BOM (`window.location`, `history`, `navigator`) |
| :--- | :--- | :--- |
| **Specification** | W3C Standard | WHATWG HTML / Web Applications WG |
| **Focus** | HTML Page Content & Element Tree | Browser Container Environment & Hardware State |
| **Scope** | Nodes, Attributes, Elements, Styles | URLs, History Stacks, User Agent, Storage, Timers |

---

## 2. The `window` Object

The `window` object represents the browser window containing the DOM document. In browser environments, `window` is the **Global Execution Scope Object**.

```javascript
// 1. Window Viewport Metrics vs Outer Screen Metrics
console.log(window.innerWidth, window.innerHeight);   // Viewport dimensions (excluding devtools/scrollbars)
console.log(window.outerWidth, window.outerHeight); // Browser window frame dimensions

// 2. Scroll Offsets
console.log(window.scrollX, window.scrollY);         // Current pixel scroll offsets

// 3. Programmatic Scrolling
window.scrollTo({
  top: 500,
  behavior: "smooth" // Smooth scrolling animation
});
```

---

## 3. The `location` Object (URL State Parsing & Navigation)

The `window.location` object represents the current URL of the active document and provides methods to trigger page navigation.

```
URL: https://example.com:8080/shop/items?category=books&page=2#reviews

├── protocol:  "https:"
├── host:      "example.com:8080"
├── hostname:  "example.com"
├── port:      "8080"
├── pathname:  "shop/items"
├── search:    "?category=books&page=2"  ──► URLSearchParams API
└── hash:      "#reviews"
```

```javascript
// 1. Parsing Query Parameters using URLSearchParams API
const params = new URLSearchParams(window.location.search);
console.log(params.get("category")); // "books"
console.log(params.get("page"));     // "2"

// 2. Navigation Methods
// Assign: Navigates to URL and pushes a NEW entry into History stack (Back button works)
window.location.assign("https://example.com/login");

// Replace: Navigates to URL and REPLACES current entry in History stack (Back button skips original page!)
window.location.replace("https://example.com/login");

// Reload: Reloads current page
window.location.reload(); // Pass 'true' in legacy browsers for hard reload bypassing cache
```

---

## 4. The `history` Object & HTML5 SPA Routing

The `window.history` object allows manipulation of the browser session history stack. It forms the core foundation of **Single Page Application (SPA) client-side routers** (like React Router).

```javascript
// 1. Basic Stack Navigation
history.back();    // Same as clicking Browser Back button
history.forward(); // Same as clicking Browser Forward button
history.go(-2);    // Move back 2 steps in history stack

// 2. HTML5 History API (pushState & replaceState)
// Allows updating the browser URL bar WITHOUT triggering a full page reload!
const stateData = { pageId: "dashboard", userId: 101 };
const title = "";
const newUrl = "/dashboard/user-101";

// pushState: Appends a new entry to History stack
history.pushState(stateData, title, newUrl);

// replaceState: Overwrites the current entry in History stack
history.replaceState(stateData, title, newUrl);
```

### 4.1 Listening to History Navigation: `popstate` Event

When the user clicks the browser Back or Forward buttons, the browser fires a `popstate` event on `window`:

```javascript
window.addEventListener("popstate", (event) => {
  console.log("Navigated via Back/Forward button!");
  console.log("Restored State Data:", event.state);
  
  // Re-render UI matching event.state or location.pathname
  renderPage(window.location.pathname);
});
```

> [!WARNING]
> `history.pushState()` and `history.replaceState()` do NOT trigger the `popstate` event automatically! `popstate` is triggered strictly by user actions like clicking the Back/Forward buttons or calling `history.back()`.

---

## 5. The `navigator` Object (Device Capabilities & Web APIs)

The `window.navigator` object provides information about the user's browser, operating system, network connection, and hardware capabilities.

```javascript
// 1. Online / Offline Status Detection
console.log(navigator.onLine); // boolean

window.addEventListener("offline", () => console.log("Network Connection Lost!"));
window.addEventListener("online", () => console.log("Network Reconnected!"));

// 2. Async Clipboard API
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard!");
  } catch (err) {
    console.error("Clipboard write failed:", err);
  }
}

// 3. Geolocation API
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(`Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
  },
  (error) => console.error(error.message)
);

// 4. ServiceWorker & Hardware Concurrency
console.log(navigator.hardwareConcurrency); // Number of CPU logical cores
```

---

## 6. Minor Points, Quirks & Traps

### 1. `location.assign()` vs `location.replace()` for Authentication Redirects
When redirecting users away from an unauthorized page or after a login form submission, ALWAYS use `location.replace()`. Using `location.assign()` leaves the login form in the history stack, causing an infinite redirect loop when the user clicks the browser Back button!

---

## 7. Senior Interview Questions & Answers

### Q1: How does a Single Page Application (SPA) client-side router work using the HTML5 History API?
* **Answer**: SPA routers intercept click events on internal navigation links using event delegation. Instead of allowing default hyperlink browser navigation (which performs a full server HTTP fetch), the router calls `event.preventDefault()` and invokes `history.pushState({}, "", targetUrl)` to update the browser URL bar instantly without a page reload. The router then inspects `location.pathname` and dynamically replaces the rendered DOM view using JavaScript. To handle browser Back/Forward navigation, the router listens to the `window.onpopstate` event and updates the view according to `event.state` or the restored URL.

### Q2: Why does calling `history.pushState()` NOT trigger the `window.onpopstate` event?
* **Answer**: By specification design, `history.pushState()` and `history.replaceState()` are programmatic state mutations performed by the application developer; triggering `popstate` automatically on programmatic calls would cause infinite recursion inside router handlers. `popstate` is intended specifically to notify the application of user-initiated history navigation (like pressing the browser Back or Forward buttons).

---

## 8. Summary & Key Takeaways

1. **`window`**: The root container for BOM APIs and global execution context in browsers.
2. **`location`**: Use `location.replace()` for non-retriable redirects; parse queries via `URLSearchParams`.
3. **`history`**: Use `history.pushState()` and `popstate` events to construct client-side SPA routing.
4. **`navigator`**: Use `navigator` to query online status, hardware specs, clipboard, and geolocation APIs.
