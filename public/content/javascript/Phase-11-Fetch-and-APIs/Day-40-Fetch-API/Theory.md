# Day 40 — Fetch API & Request Cancellation — Detailed Theory

Welcome to **Day 40** of the JavaScript Mastery curriculum. The **Fetch API** is the modern browser standard for making asynchronous HTTP requests. Built on promises and streaming data bodies, `fetch()` replaced legacy `XMLHttpRequest` (XHR) APIs.

This guide provides an exhaustive theoretical foundation covering `fetch()` execution, Response Body Stream consumption rules, the **404/500 `res.ok` Trap**, JSON serialization, request cancellation via **`AbortController`**, and custom fetch wrapper architectures.

---

## 1. The `fetch()` API Architecture

The `fetch()` function accepts a resource URL and an optional configuration options object, returning a Promise that resolves to a **`Response` object**:

```javascript
fetch("https://api.example.com/data")
  .then(response => {
    // 'response' is an HTTP Response Stream Container
    return response.json(); // Parses JSON body stream asynchronously
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## 2. The Great `fetch()` Trap: HTTP Error Status Handling

> [!CAUTION]
> **The #1 Fetch Mistake**: The Promise returned by `fetch()` **does NOT reject on HTTP error status codes** (like `404 Not Found`, `401 Unauthorized`, or `500 Internal Server Error`)!
> `fetch()` rejects ONLY if the request was completely blocked from completing (e.g. network disconnect, DNS failure, or CORS blocked).

### The `response.ok` Property
To detect HTTP error status codes, you MUST manually check `response.ok` (a boolean that is `true` if `status` is in the `200–299` range):

```javascript
async function fetchUser(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);

    // Manual check for 4xx and 5xx HTTP error status codes!
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status} (${response.statusText})`);
    }

    const user = await response.json();
    return user;

  } catch (err) {
    console.error("Fetch Request Failed:", err.message);
    throw err;
  }
}
```

---

## 3. Response Object & Body Stream Consumption Rules

The HTTP response body is delivered to the browser as a **ReadableStream**.

### 3.1 Stream Consumption Methods

| Method | Output Type | Primary Use Case |
| :--- | :--- | :--- |
| **`response.json()`** | Parsed JS Object / Array | REST API JSON Payloads |
| **`response.text()`** | String | Plain Text, HTML, CSV data |
| **`response.blob()`** | `Blob` Object | Binary Images, Video files, PDFs |
| **`response.arrayBuffer()`**| `ArrayBuffer` | Raw Binary TypedArray Buffer |
| **`response.formData()`** | `FormData` Object | Multipart Form Data |

```javascript
// Reading Image Binary Blob and displaying in DOM:
const imageRes = await fetch("https://example.com/avatar.png");
const imageBlob = await imageRes.blob();
const imageUrl = URL.createObjectURL(imageBlob);

document.querySelector("img").src = imageUrl;
```

---

### 3.2 The Single Body Consumption Rule

> [!WARNING]
> Response body streams can **only be read ONCE**! Calling `res.json()` and then `res.text()` on the same response instance throws a `TypeError: Already read`.

```javascript
const res = await fetch("/api/data");

const data = await res.json(); // Consumes the body stream!
// const text = await res.text(); // TypeError: Failed to execute 'text' on 'Response': body stream already read!

// Solution: Clone the response before reading if multiple consumers exist:
const resClone = res.clone();
```

---

## 4. Configuring POST, PUT, and DELETE Requests

When making non-`GET` requests, configure headers and serialize the JSON body:

```javascript
async function createPost(postData) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST", // HTTP Verb
    headers: {
      "Content-Type": "application/json", // Tells server body payload format!
      "Authorization": "Bearer token_secret_123"
    },
    body: JSON.stringify(postData), // Serialize JS object to JSON string
    credentials: "same-origin" // Handling cookies ("include" | "same-origin" | "omit")
  });

  if (!response.ok) {
    throw new Error(`Failed to create post. Status: ${response.status}`);
  }

  return await response.json();
}
```

---

## 5. Canceling Fetch Requests via `AbortController`

Network requests can be canceled on demand (e.g. when a user navigates away or types a new search query into an autocomplete box) using **`AbortController`**.

```javascript
let searchController = null;

async function searchAutocomplete(query) {
  // 1. Cancel previous pending fetch request if user types again!
  if (searchController) {
    searchController.abort();
  }

  // 2. Instantiate a new AbortController
  searchController = new AbortController();

  try {
    const response = await fetch(`https://api.example.com/search?q=${query}`, {
      signal: searchController.signal // Pass signal parameter to fetch!
    });

    const results = await response.json();
    return results;

  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Fetch request was successfully canceled!");
    } else {
      console.error("Fetch Error:", err);
    }
  }
}
```

---

## 6. Building a Production Fetch Client Wrapper

```javascript
// Centralized API Client with automated header injection & error handling
async function apiClient(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("jwt_token");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`https://api.example.com${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `HTTP Error ${response.status}`);
    error.status = response.status;
    throw error;
  }

  // Handle 204 No Content
  if (response.status === 204) return null;

  return await response.json();
}
```

---

## 7. Minor Points, Quirks & Traps

### 1. The `mode: "no-cors"` Trap
Setting `{ mode: "no-cors" }` in `fetch()` does NOT bypass CORS security rules! It forces an **opaque response** with `status = 0`, where JavaScript is completely forbidden from reading the response headers or body stream!

---

## 8. Senior Interview Questions & Answers

### Q1: Why does `fetch()` NOT reject its returned Promise when a server returns a `404 Not Found` or `500 Internal Server Error` status code?
* **Answer**: `fetch()` models the underlying HTTP network lifecycle. An HTTP response with a `404` or `500` status code represents a successful HTTP request-response exchange over TCP/IP—the server received the request and sent back a valid HTTP response payload. `fetch()` rejects its Promise *only* when the network transaction itself fails completely (e.g. offline status, DNS failure, connection timeout, or browser CORS blocking). Therefore, developers must inspect `response.ok` or `response.status` to handle 4xx/5xx application errors.

### Q2: How do you cancel an active `fetch()` network request in modern browser JavaScript?
* **Answer**: An active `fetch()` request is canceled by instantiating an `AbortController` (`const controller = new AbortController()`), passing its signal instance to `fetch(url, { signal: controller.signal })`, and executing `controller.abort()`. When `.abort()` is called, the browser aborts the network socket and `fetch()` rejects with an `AbortError` DOMException.

---

## 9. Summary & Key Takeaways

1. **`response.ok` Check**: Always check `if (!res.ok)` because `fetch()` does not reject on 4xx or 5xx HTTP status errors.
2. **Single Stream Reading**: Body stream methods (`res.json()`, `res.text()`) can be called ONLY ONCE per response instance.
3. **JSON Serialization**: Set `Content-Type: application/json` and pass `JSON.stringify(data)` in request body for `POST`/`PUT`.
4. **AbortController**: Use `AbortController` and `{ signal }` to cancel stale network requests.
