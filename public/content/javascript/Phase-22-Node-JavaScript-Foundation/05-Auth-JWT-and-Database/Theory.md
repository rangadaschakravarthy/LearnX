# Module 5 — Auth, JWT & Database Integration — Deep-Dive Theoretical Guide

## 1. First Principles: Authentication vs. Authorization

Security architecture relies on two distinct concepts:
- **Authentication (AuthN):** Verification of identity ("Who are you?"). Verified during login via credentials (email + password, OAuth provider, MFA).
- **Authorization (AuthZ):** Verification of permissions ("What are you allowed to do?"). Verified on protected routes by checking user roles or access scopes (e.g., `admin` vs `user`).

---

## 2. Password Storage & Cryptographic Hashing

Storing plain-text passwords or using fast non-keyed hashing algorithms (like MD5, SHA-1, or SHA-256) in a database is a critical security vulnerability. Fast hashes allow attackers to compute millions of combinations per second using GPU rainbow tables.

### 2.1 Password Salting & Key Derivation Functions (`bcrypt`)
Production authentication uses slow, adaptive password hashing algorithms like **bcrypt** or **Argon2**.

```
Plain Text Password + Random Salt ──► [ bcrypt KDF (Work Factor 12) ] ──► Hashed Digest
```

1. **Salt:** A cryptographically random string generated uniquely for every user. It prevents pre-computed rainbow table attacks.
2. **Work Factor (Cost Factor):** Controls how many iterations of the algorithm are performed (e.g., $2^{12} = 4096$ rounds). This deliberately slows down hashing to render brute-force attacks computationally infeasible.

```javascript
import bcrypt from 'bcryptjs';

// 1. Password Hashing on User Registration
const SALT_ROUNDS = 12;
const hashedPassword = await bcrypt.hash(userPassword, SALT_ROUNDS);

// 2. Password Verification on User Login
const isPasswordValid = await bcrypt.compare(candidatePassword, hashedPassword);
```

---

## 3. JSON Web Tokens (JWT) Architecture

A **JSON Web Token (JWT)** is an open, industry-standard (RFC 7519) compact, self-contained method for securely transmitting information between client and server as a JSON object.

### 3.1 Anatomical Structure of a JWT String
A JWT string consists of three distinct parts separated by dots (`.`):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTgxYiIsImlhdCI6MTY4OTAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
└─────────────┬────────────────────┘ └─────────────┬────────────────────┘ └─────────────┬──────────────────────┘
            Header                              Payload                              Signature
```

1. **Header:** JSON specifying token type (`JWT`) and signing algorithm (e.g., `HS256` or `RS256`), Base64URL-encoded.
2. **Payload:** JSON containing claims (user identity `id`, role `admin`, issue timestamp `iat`, expiration timestamp `exp`), Base64URL-encoded.
3. **Signature:** Cryptographic hash created by signing the encoded header + encoded payload using a server-side secret key:
   $$\text{Signature} = \text{HMACSHA256}(\text{Base64}(H) + "." + \text{Base64}(P), \text{secretKey})$$

> [!WARNING]
> **JWT Base64 Encoding is NOT Encryption:**
> The Header and Payload of a JWT are merely Base64URL-encoded strings, **not encrypted**. Anyone who intercepts a JWT can decode the payload and read its contents. Never store sensitive secrets (passwords, credit card numbers, API keys) inside a JWT payload!

---

## 4. Stateless JWT vs. Stateful Session Storage

| Feature / Metric | Stateful Session Authentication | Stateless JWT Authentication |
| :--- | :--- | :--- |
| **State Location** | Server Memory / Redis Database session store. | Client storage (HTTP-Only Cookie or Memory). |
| **Server Storage Overhead** | Scales with active user count ($O(N)$ memory). | **Zero** server storage overhead ($O(1)$). |
| **Scalability** | Requires centralized session store (Redis) across server clusters. | Trivial horizontal scaling across microservice clusters. |
| **Revocation Capability** | Instantaneous (Delete session ID from Redis). | Difficult prior to token expiration (Requires token blacklists). |
| **Recommended Storage** | Server-side Redis store. | `HttpOnly`, `SameSite=Strict`, `Secure` Web Cookies. |

---

## 5. Complete Production Auth & Guard Middleware Architecture

Below is a complete, production-ready Express authentication and authorization implementation:

### 5.1 Token Generation Utility
```javascript
import jwt from 'jsonwebtoken';

export const signToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};
```

### 5.2 Authentication Guard Middleware (`src/middleware/protect.js`)
```javascript
import jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import User from '../models/user.model.js';

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1. Extract Bearer Token from Authorization Header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please supply a valid authentication token.', 401));
  }

  // 2. Verify Cryptographic Token Signature & Expiration
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Check if target user still exists in database
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // 4. Attach authenticated user to request context
  req.user = currentUser;
  next();
});
```

### 5.3 Role-Based Access Control (RBAC) Middleware (`src/middleware/restrictTo.js`)
```javascript
export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }
    next();
  };
};
```

---

## 6. Database Connection Patterns (MongoDB / PostgreSQL)

Modern Node.js backends connect to databases using ODMs (Object Document Mappers like **Mongoose** for MongoDB) or ORMs (Object Relational Mappers like **Prisma** or **Sequelize** for SQL).

### 6.1 Database Connection Pooling
Connecting to a database over TCP carries overhead. Node.js applications use **Connection Pools**—maintaining a persistent pool of active database socket connections that are reused across incoming HTTP requests.

```javascript
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Database Connection Error: ${err.message}`);
    process.exit(1);
  }
};
```

---

## 7. Anti-Patterns vs. Best Practices

```
┌─────────────────────────────────────────────────────────┐
│                     ANTI-PATTERN                        │
├─────────────────────────────────────────────────────────┤
│ 1. Storing plain-text passwords or using MD5/SHA256     │
│ 2. Storing JWTs in browser `localStorage`               │
│    (vulnerable to Cross-Site Scripting - XSS)          │
│ 3. Storing sensitive data (passwords) in JWT payloads   │
│ 4. hardcoding `JWT_SECRET` in source code repositories   │
└─────────────────────────────────────────────────────────┘
                            ▲
                            │ Contrast
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     BEST PRACTICE                       │
├─────────────────────────────────────────────────────────┤
│ 1. Hash passwords using `bcrypt` with cost factor >= 12  │
│ 2. Store JWTs in `HttpOnly`, `Secure`, `SameSite` cookies│
│ 3. Store only non-sensitive IDs & roles in JWT payloads │
│ 4. Load secrets securely via `process.env.JWT_SECRET`   │
└─────────────────────────────────────────────────────────┘
```

---

## 8. Senior-Level Interview Questions & Deep-Dive Answers

### Q1: Why is storing JWT tokens in browser `localStorage` an insecure security practice compared to `HttpOnly` cookies?
**Answer:**
Data stored in `localStorage` is accessible to **any JavaScript script** running in the browser context via `window.localStorage`. If an application is vulnerable to Cross-Site Scripting (XSS)—such as an attacker injecting a malicious `<script>` tag via a comment field—the malicious script can instantly read the JWT from `localStorage` and exfiltrate it to a remote attacker server. `HttpOnly` cookies, by contrast, cannot be accessed or read by JavaScript code (`document.cookie`), making them immune to XSS token theft.

### Q2: How can a server revoke a JWT token before its expiration time if JWT authentication is stateless?
**Answer:**
Because the server does not store active JWT state, native token revocation before expiration requires hybrid strategies:
1. **Short-Lived Access Tokens + Refresh Tokens:** Issue short-lived access tokens (e.g., 15-minute expiry) paired with long-lived refresh tokens stored in a database/Redis. To revoke access, delete the refresh token from the database so no new access tokens can be minted.
2. **Token Blacklisting / Revocation List:** Store revoked token IDs (JTI - JWT ID) in a high-speed Redis in-memory cache until their original expiration timestamp passes.
3. **User Password/Security Timestamp Check:** Store a `passwordChangedAt` timestamp on the User record. If `decoded.iat < user.passwordChangedAt`, invalidate the token.

---

## 9. Module Summary & Key Takeaways

1. **Password Security:** Always hash passwords asynchronously using `bcrypt` with a work factor of 12+.
2. **JWT Structure:** JWTs consist of Header, Payload, and Signature. They are Base64URL-encoded, not encrypted; never store passwords inside payloads.
3. **Secure Token Storage:** Transmit JWTs via `HttpOnly`, `SameSite=Strict`, `Secure` HTTP cookies to shield against XSS attacks.
4. **Guards & Roles:** Implement authentication via a `protect` middleware and authorization via a `restrictTo(...roles)` middleware.
