# Day 66 — Frontend Web Security & Defense-in-Depth — Detailed Theory

Welcome to **Day 66** of the JavaScript Mastery curriculum. Client-side security is an essential discipline for frontend engineers. Modern web applications process sensitive user data, handle session credentials, and execute untrusted code.

This guide provides an exhaustive theoretical foundation covering **Cross-Site Scripting (XSS)**, **Cross-Site Request Forgery (CSRF)**, **Content Security Policy (CSP)**, Open Redirects, Clickjacking, and Secure Cookie Storage.

---

## 1. Cross-Site Scripting (XSS) Deep Dive

**Cross-Site Scripting (XSS)** occurs when an attacker tricks a web application into executing malicious JavaScript code within the victim's browser session.

```
Attacker Payload ──► Injected Script Executed in Victim Browser ──► Steals Session Cookies / JWT / Perform Actions
```

### 1.1 The 3 Categories of XSS

| XSS Category | Execution Mechanism | Persistence | Example Scenario |
| :--- | :--- | :--- | :--- |
| **Stored XSS** | Malicious script is permanently saved in backend database. | **Permanent** | Malicious script submitted in blog comment box; executed by every user viewing the post. |
| **Reflected XSS** | Script payload is reflected off server via URL query parameters. | **Transient** | Phishing link: `https://app.com/search?q=<script>steal()</script>`. |
| **DOM-based XSS** | Vulnerable client-side JS reads untrusted data from DOM source (`location.search`) into sink (`innerHTML`). | **Client-Side** | Client JS reads `location.hash` and passes it directly to `element.innerHTML`. |

---

### 1.2 Dangerous DOM Sinks & Safe Alternatives

A **DOM Sink** is a JavaScript function or DOM property that evaluates or executes string inputs:

```javascript
// 🚨 DANGEROUS DOM SINKS (Avoid with untrusted data):
element.innerHTML = userInput;
element.outerHTML = userInput;
document.write(userInput);
eval(userInput);
setTimeout(userInput, 100); // Strings in setTimeout evaluate as eval!
location.href = userInput;   // Danger if userInput starts with "javascript:"

// 🟢 SAFE ALTERNATIVES:
element.textContent = userInput; // Encodes text automatically
element.setAttribute("title", userInput);
```

---

### 1.3 HTML Sanitization with DOMPurify
When rendering rich HTML input (e.g. Markdown editors), ALWAYS sanitize the HTML string using a battle-tested library like **DOMPurify**:

```javascript
import DOMPurify from "dompurify";

const untrustedHTML = `<img src="x" onerror="alert('HACKED!')"> <b>Hello</b>`;

// Sanitize HTML string before injecting into DOM
const cleanHTML = DOMPurify.sanitize(untrustedHTML);
console.log(cleanHTML); // "<b>Hello</b>" (Malicious onerror handler completely stripped out!)

element.innerHTML = cleanHTML; // Safe!
```

---

## 2. Cross-Site Request Forgery (CSRF)

**CSRF** is an attack that tricks an authenticated user into executing unwanted actions on a web application in which they are currently logged in.

```
1. User logs into bank.com (Session cookie stored in browser).
2. User visits evil.com in another tab.
3. evil.com submits form to bank.com/transfer?amount=1000&to=attacker.
4. Browser AUTOMATICALLY attaches bank.com authentication cookies to request!
5. Bank processes transfer because valid cookie was present!
```

### 2.1 Mitigating CSRF

1. **`SameSite` Cookie Attributes**:
   - `SameSite=Strict`: Cookies are NEVER sent on cross-site requests (Complete CSRF Protection).
   - `SameSite=Lax`: Cookies are sent only on top-level GET navigations.
2. **Anti-CSRF Tokens (Synchronizer Token Pattern)**:
   - Server generates a cryptographically random, unique token per session/form.
   - Client sends this token in a custom HTTP header (`X-CSRF-Token`). Attacker sites cannot read or guess custom headers across origins due to SOP/CORS restrictions!

---

## 3. Content Security Policy (CSP)

A **Content Security Policy (CSP)** is an HTTP response header that restricts the resources (scripts, images, stylesheets, fonts) that the browser is allowed to load for a given page.

```text
Content-Security-Policy: default-src 'self'; script-src 'self' https://trustedscripts.com; object-src 'none';
```

### Essential CSP Directives

| Directive | Functionality | Recommended Setting |
| :--- | :--- | :--- |
| **`default-src`** | Fallback policy for all resource types. | `'self'` |
| **`script-src`** | Specifies allowed sources for JavaScript. | `'self' 'nonce-rAnd0m'` (Disables inline scripts & `eval`) |
| **`object-src`** | Specifies allowed sources for `<object>`, `<embed>`. | `'none'` |
| **`frame-ancestors`**| Controls who can embed the page in an `<iframe>` (Replaces `X-Frame-Options`). | `'none'` or `'self'` (Prevents Clickjacking) |
| **`connect-src`** | Restricts URLs reachable via `fetch()`, `XHR`, `WebSocket`. | `'self' https://api.example.com` |

---

## 4. Clickjacking & Frame Busting

**Clickjacking** (UI Redressing) occurs when an attacker embeds your website inside a transparent `<iframe>` on a malicious site, tricking the user into clicking buttons on your hidden site.

### Mitigating Clickjacking
* Use CSP Directive: `frame-ancestors 'none';`
* Use Legacy HTTP Header: `X-Frame-Options: DENY`

---

## 5. Security Defense-in-Depth Checklist

```javascript
// Security Best Practices Checklist:
// 1. Never use eval() or innerHTML with user input.
// 2. Sanitize user HTML input via DOMPurify.
// 3. Store Auth Tokens in HttpOnly, Secure, SameSite=Strict Cookies.
// 4. Implement strict Content-Security-Policy (CSP) headers without 'unsafe-inline'.
// 5. Use frame-ancestors 'none' to block Clickjacking.
// 6. Freeze Object.prototype to prevent Prototype Pollution.
```

---

## 6. Senior Interview Questions & Answers

### Q1: Compare XSS vs CSRF regarding attack vector and mitigation techniques.
* **Answer**: **XSS (Cross-Site Scripting)** occurs when an attacker injects malicious JavaScript into a site to execute arbitrary code in the victim's browser session (stealing session tokens or reading data). XSS is mitigated by output encoding, using `textContent`, sanitizing HTML via DOMPurify, and enforcing CSP rules. **CSRF (Cross-Site Request Forgery)** occurs when a malicious site tricks a victim's browser into sending an unwanted HTTP request to a target site where the user is authenticated (exploiting automatic cookie submission). CSRF is mitigated by `SameSite=Strict` cookie attributes and Anti-CSRF Synchronizer tokens in request headers.

### Q2: How does a Nonce-based Content Security Policy (CSP) prevent inline XSS attacks?
* **Answer**: A Nonce-based CSP generates a cryptographically random, one-time-use string token (a "nonce") on the server for every HTTP request (e.g. `Content-Security-Policy: script-src 'nonce-2726c7f'`). The server includes this exact nonce attribute on authorized inline `<script nonce="2726c7f">` tags. The browser executes only inline script tags containing the matching valid nonce header; any inline script injected by an attacker (via XSS) lacks the correct random nonce token and is blocked by the browser engine.

---

## 7. Summary & Key Takeaways

1. **XSS Defense**: Encode text output, use `textContent`, sanitize HTML via DOMPurify, and restrict inline scripts via CSP.
2. **CSRF Defense**: Store auth tokens in `SameSite=Strict` cookies and use custom Anti-CSRF headers for mutating requests.
3. **CSP**: Enforce strict `Content-Security-Policy` headers to restrict script execution origins and disable `eval()`.
4. **Clickjacking**: Use `frame-ancestors 'none'` or `X-Frame-Options: DENY` to block framing.
