# Day 41 — RESTful API Design & Client Architecture — Detailed Theory

Welcome to **Day 41** of the JavaScript Mastery curriculum. **REST (Representational State Transfer)** is an architectural style defined by Roy Fielding in 2000 for designing networked applications. RESTful APIs use standard HTTP verbs and URIs to manipulate resources.

This guide provides an exhaustive theoretical foundation covering the 6 REST Constraints, Resource-Oriented URI Design, CRUD mapping to HTTP verbs, Pagination strategies (Offset vs Cursor), Richardson Maturity Model, and API Authentication patterns.

---

## 1. The 6 Architectural Constraints of REST

To be classified as a truly RESTful API, a system must adhere to six architectural constraints:

```
                          ┌─────────────────────────────┐
                          │    6 REST Constraints       │
                          └──────────────┬──────────────┘
                                         │
     ┌──────────────────┬────────────────┼────────────────┬──────────────────┐
     ▼                  ▼                ▼                ▼                  ▼
Client-Server      Stateless        Cacheable       Uniform Interface  Layered System
(Decoupled UI)   (No Session)     (HTTP Headers)  (Standard URIs)   (Proxies/Load Balancers)
```

1. **Client-Server Separation**: The user interface (client) and data storage (server) are completely decoupled, allowing clients (web, mobile, CLI) to evolve independently of the server platform.
2. **Statelessness**: Every request from client to server must contain all information required to understand and fulfill the request. The server stores no client session context between requests.
3. **Cacheability**: Responses must implicitly or explicitly define themselves as cacheable or non-cacheable (`Cache-Control` headers) to prevent clients from re-fetching stagnant data.
4. **Uniform Interface**: Resources are identified by URIs; manipulation is performed through standard representations (JSON/XML) using standard HTTP verbs.
5. **Layered System**: A client cannot ordinarily tell whether it is connected directly to the end server or to an intermediate load balancer, CDN, or security proxy.
6. **Code on Demand (Optional)**: Servers can temporarily extend client functionality by transferring executable code (e.g. JavaScript scripts).

---

## 2. Resource-Oriented URI Naming Conventions

RESTful APIs are **resource-oriented**. URIs should represent **Nouns** (entities), NOT Verbs (actions).

```text
❌ ANTI-PATTERN (Verbs in URI):
GET  /api/getUserData?id=101
POST /api/createNewUser
POST /api/deleteUser101

🟢 RESTFUL STANDARD (Nouns + HTTP Verbs):
GET    /api/v1/users        --> Retrieve list of users
POST   /api/v1/users        --> Create a new user
GET    /api/v1/users/101    --> Retrieve user 101
PUT    /api/v1/users/101    --> Completely replace user 101
PATCH  /api/v1/users/101    --> Partially update user 101
DELETE /api/v1/users/101    --> Remove user 101
```

### 2.1 Nested Sub-Resource Relationships
Represent sub-resource hierarchies intuitively using path nesting:

```text
GET /api/v1/users/101/orders         --> Retrieve all orders belonging to user 101
POST /api/v1/users/101/orders        --> Create a new order for user 101
GET /api/v1/users/101/orders/5001    --> Retrieve specific order 5001 of user 101
```

---

## 3. Mapping CRUD Operations to HTTP Verbs

```javascript
// 1. CREATE (POST /api/v1/products)
const newProduct = await fetch("/api/v1/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Desk Lamp", price: 45 })
}); // Expects 201 Created with new resource JSON in body

// 2. READ LIST (GET /api/v1/products)
const products = await fetch("/api/v1/products").then(r => r.json()); // Expects 200 OK

// 3. FULL UPDATE (PUT /api/v1/products/101)
const replaced = await fetch("/api/v1/products/101", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Desk Lamp", price: 50, category: "Office" }) // Complete representation
}); // Expects 200 OK or 204 No Content

// 4. PARTIAL UPDATE (PATCH /api/v1/products/101)
const updated = await fetch("/api/v1/products/101", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ price: 40 }) // Only updated field sent!
}); // Expects 200 OK

// 5. DELETE (DELETE /api/v1/products/101)
const deleted = await fetch("/api/v1/products/101", { method: "DELETE" }); // Expects 204 No Content
```

---

## 4. Query Parameter Patterns: Pagination, Filtering & Sorting

Use URL Query Parameters (`?key=val`) to modify data views without altering resource URIs:

```text
GET /api/v1/products?category=electronics&min_price=100&sort=-created_at&page=2&limit=20
```

### 4.1 Offset/Limit vs. Cursor-Based Pagination

| Pagination Type | Query Pattern | Database Execution | Pros & Cons |
| :--- | :--- | :--- | :--- |
| **Offset / Limit** | `?offset=40&limit=20` | `SELECT * FROM items OFFSET 40 LIMIT 20;` | 🟢 Easy to implement. <br>⚠️ **Slow on large tables** ($O(N)$ scan overhead). Missing/duplicate items if rows inserted while paging. |
| **Cursor-Based** | `?starting_after=prod_123&limit=20` | `SELECT * FROM items WHERE id > 'prod_123' LIMIT 20;` | 🚀 **Fast $O(1)$ index lookup**. Resilient against row insertion shifts. <br>❌ Cannot jump to arbitrary page numbers. |

---

## 5. The Richardson Maturity Model

The **Richardson Maturity Model** breaks down the steps to reaching full REST compliance:

```
Level 3: HATEOAS (Hypermedia As The Engine Of Application State - Links in JSON)
   ▲
Level 2: HTTP Verbs & Status Codes (GET, POST, PUT, DELETE + 200, 404, 500)
   ▲
Level 1: Resources (Individual URIs for entities: /users/101)
   ▲
Level 0: The Swamp of POX (Single URI endpoint, single verb: POST /endpoint)
```

### Level 3 (HATEOAS) Response Payload Example
Hypermedia links embedded inside JSON instruct the client what actions can be performed next:

```json
{
  "id": 101,
  "name": "Alice",
  "balance": 250.00,
  "_links": {
    "self": { "href": "/api/v1/users/101" },
    "deposit": { "href": "/api/v1/users/101/deposit", "method": "POST" },
    "withdraw": { "href": "/api/v1/users/101/withdraw", "method": "POST" }
  }
}
```

---

## 6. Minor Points, Quirks & Traps

### 1. Plural vs Singular Naming Convention
Consistently use **plural nouns** for resource collections (e.g. `/users`, `/products`, `/orders`). Avoid mixing singular and plural endpoints like `/user/101` and `/products`.

---

## 7. Senior Interview Questions & Answers

### Q1: What is the difference between `PUT` and `PATCH` in RESTful API design?
* **Answer**: `PUT` is used for **complete resource replacement**. A `PUT` request payload must contain the full representation of the resource; any fields omitted from the payload should be reset to null or default values by the server. `PATCH` is used for **partial resource updates**, modifying only the fields explicitly provided in the request body while leaving all un-mentioned fields untouched on the server.

### Q2: Compare Offset-based pagination with Cursor-based pagination for large database datasets.
* **Answer**: Offset-based pagination (`?offset=10000&limit=20`) requires the database to scan and discard 10,000 rows before returning the 20 requested items, leading to $O(N)$ query degradation on large tables. Additionally, if new items are inserted while a user is paging, offset pagination displays duplicate or missed items. Cursor-based pagination (`?starting_after=id_9999`) uses an indexed primary key to jump directly to the target record in $O(1)$ constant time, providing superior query performance and complete stability against real-time data insertions.

---

## 8. Summary & Key Takeaways

1. **Nouns Over Verbs**: Use plural nouns (`/api/v1/users`) for resource URIs, not verbs (`/getUsers`).
2. **HTTP Verb Mapping**: Use `POST` (Create), `GET` (Read), `PUT` (Replace), `PATCH` (Modify), and `DELETE` (Remove).
3. **Idempotency**: `GET`, `PUT`, `DELETE` are idempotent; `POST` and `PATCH` are non-idempotent.
4. **Cursor Pagination**: Prefer Cursor-based pagination over Offset-based pagination for high-volume database performance.
5. **HATEOAS (Level 3)**: Include hypermedia links in JSON payloads to enable self-describing client workflows.
