# Module 3 — Express Framework & Routing — Deep-Dive Theoretical Guide

## 1. First Principles: What is Express.js?

**Express.js** is a minimal, unopinionated, flexible web application framework for Node.js. It acts as an abstraction layer built on top of Node's native `http` module, simplifying request routing, middleware integration, header manipulation, and HTTP response formatting.

### 1.1 The Native HTTP vs. Express Abstraction Layer
Native `http` requires manual URL parsing, query string parsing, header setting, body stream chunking, and regex route matching. Express encapsulates this complexity inside intuitive objects:

```
Incoming HTTP Request ──► [ Express Engine ] ──► Populates `req` (params, query, body)
                                                         │
                                                         ▼
Outgoing HTTP Response ◄── [ Express Methods ] ◄── `res.status(200).json(...)`
```

---

## 2. Express Server Initialization & Application Architecture

At its core, an Express application is a callable function assigned as the request listener for an HTTP server.

```javascript
import express from 'express';

// 1. Instantiate Express Application instance
const app = express();

// 2. Built-in body parsing middleware (Mandatory for reading JSON payloads!)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Define basic route handler
app.get('/', (req, res) => {
  res.status(200).send('Hello World from Express!');
});

// 4. Bind server to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
```

---

## 3. Routing Mechanics & Path Matching

Routing refers to determining how an application responds to a client request to a specific endpoint (a URI/path combined with an HTTP request method).

### 3.1 HTTP Verbs & CRUD Operations Mapping

| HTTP Verb | CRUD Action | Express Method | Typical Payload / Behavior |
| :--- | :--- | :--- | :--- |
| **GET** | Read | `app.get()` | Reads resources. No body payload. |
| **POST** | Create | `app.post()` | Creates a new resource. Passes body payload. |
| **PUT** | Replace | `app.put()` | Replaces an entire target resource completely. |
| **PATCH** | Update | `app.patch()` | Partially updates specific fields of a resource. |
| **DELETE** | Delete | `app.delete()` | Removes a target resource by ID. |

### 3.2 Dynamic Route Parameters vs. Query Parameters

#### Route Parameters (`req.params`):
Named URL segments used to capture specific resource identifiers specified with a colon `:` in the path.

```javascript
// URL: /api/users/8921/orders/45
app.get('/api/users/:userId/orders/:orderId', (req, res) => {
  const { userId, orderId } = req.params;
  res.json({ userId, orderId });
});
```

#### Query Parameters (`req.query`):
Key-value pairs following the `?` symbol in the URL, used for filtering, sorting, or pagination.

```javascript
// URL: /api/products?category=electronics&sort=asc&page=2
app.get('/api/products', (req, res) => {
  const { category, sort, page } = req.query;
  res.json({ category, sort, page: Number(page) });
});
```

---

## 4. Modular Routing with `express.Router()`

As applications scale, defining all routes inside a single `server.js` or `app.js` file creates unmaintainable spaghetti code. `express.Router()` allows developers to split routing into isolated, reusable sub-modules.

### 4.1 Modular Architecture Directory Layout
```
src/
  ├── routes/
  │   ├── users.routes.js
  │   └── products.routes.js
  └── server.js
```

### 4.2 Step 1: Define Sub-Router (`src/routes/users.routes.js`)
```javascript
import { Router } from 'express';

const router = Router();

// Endpoint: GET /api/users
router.get('/', (req, res) => {
  res.json({ users: [{ id: 1, name: 'Alice' }] });
});

// Endpoint: GET /api/users/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: 'Alice' });
});

// Endpoint: POST /api/users
router.post('/', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: Date.now(), name, email });
});

export default router;
```

### 4.3 Step 2: Mount Sub-Router in App (`src/server.js`)
```javascript
import express from 'express';
import usersRouter from './routes/users.routes.js';

const app = express();
app.use(express.json());

// Mount router under base path '/api/users'
app.use('/api/users', usersRouter);
```

---

## 5. Request & Response Utility Methods

Express enriches native HTTP request/response objects with essential helper methods:

### 5.1 Key Response Helper APIs
- **`res.json(data)`:** Converts a JavaScript object/array to JSON, sets the `Content-Type: application/json` header, and sends the HTTP response.
- **`res.status(code)`:** Sets the HTTP status code (e.g., `200`, `201`, `400`, `404`, `500`) fluently.
- **`res.sendFile(absolutePath)`:** Streams a static file from disk directly to the client browser.
- **`res.redirect(url)`:** Sends an HTTP `302` or `301` redirect status code redirecting the client to a new URL location.

---

## 6. Anti-Patterns vs. Best Practices

```
┌─────────────────────────────────────────────────────────┐
│                     ANTI-PATTERN                        │
├─────────────────────────────────────────────────────────┤
│ 1. Writing all routes directly inside `server.js`       │
│ 2. Forgetting `app.use(express.json())` middleware      │
│    (results in `req.body` being `undefined`)            │
│ 3. Returning multiple responses (`res.json()`) in a     │
│    single route handler execution branch                │
│ 4. Confusing Route Params (`:id`) with Query String (`?`) │
└─────────────────────────────────────────────────────────┘
                            ▲
                            │ Contrast
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     BEST PRACTICE                       │
├─────────────────────────────────────────────────────────┤
│ 1. Modularize routes into separate files via `Router()`  │
│ 2. Always register body-parsing middleware first        │
│ 3. Explicitly return response calls (`return res.json`) │
│ 4. Use RESTful URI naming conventions (`/api/resources`)│
└─────────────────────────────────────────────────────────┘
```

---

## 7. Senior-Level Interview Questions & Deep-Dive Answers

### Q1: What happens if a developer omits `return` before calling `res.json(...)` inside an `if` block in an Express route handler?
**Answer:**
Calling `res.json(...)` sends the HTTP response headers and body payload back to the client over the socket, but it does **not** terminate JavaScript execution inside the handler function. If the `if` block execution continues into subsequent lines that call `res.json(...)` a second time, Express throws the error: `ERR_HTTP_HEADERS_SENT: Cannot set headers after they are sent to the client`. Always use `return res.json(...)` inside conditional branches to halt execution flow.

### Q2: How does `express.Router()` encapsulate middleware mounting scope?
**Answer:**
`express.Router()` instances act as isolated mini-applications. Middleware mounted on a specific router instance via `router.use(authMiddleware)` applies exclusively to endpoints declared on *that specific router*. It does not pollute or intercept routes registered on the root `app` or other independent `Router` instances, enabling clean authorization scoping across sub-routes.

---

## 8. Module Summary & Key Takeaways

1. **Express Abstraction:** Express wraps native Node HTTP `req` and `res` objects into intuitive interfaces.
2. **Body Parsing:** Always register `app.use(express.json())` at the top of your app to enable `req.body`.
3. **Modular Routing:** Separate route definitions using `express.Router()` and mount them under base resource paths.
4. **Clean Returns:** Always use `return res.status(...).json(...)` in route branches to prevent double-header errors.
