# Day 50 — Error Handling & Custom Errors — Detailed Theory

Welcome to **Day 50** of the JavaScript Mastery curriculum. Error handling is an essential pillar of resilient software engineering. In JavaScript, runtime exceptions interrupt normal execution flow and unwind the Call Stack unless caught by exception handlers.

This guide provides an exhaustive theoretical foundation covering the `Error` object anatomy, Built-in Error Types, `try...catch...finally` execution semantics, Custom Error Subclassing, **ES2022 Error Cause chaining**, and Global Exception Traps.

---

## 1. Anatomy of the JavaScript `Error` Object

In JavaScript, errors are instances of the standard `Error` class (or its subclasses). An error object contains three core properties:

```javascript
try {
  throw new Error("Invalid User Payload");
} catch (err) {
  console.log(err.name);    // "Error" (Name of error constructor class)
  console.log(err.message); // "Invalid User Payload" (Human-readable description)
  console.log(err.stack);   // String trace of Call Stack execution frame history
}
```

---

## 2. The 7 Built-In ECMAScript Error Types

JavaScript provides seven built-in error constructors representing distinct category failures:

| Error Class | Trigger Cause | Code Example |
| :--- | :--- | :--- |
| **`TypeError`** | Operation executed on incompatible type or `null`/`undefined` dereference. | `null.toUpperCase()` |
| **`ReferenceError`** | Invalid variable identifier reference or TDZ access. | `console.log(unDeclaredVar)` |
| **`SyntaxError`** | Invalid JavaScript code grammar failed during parsing. | `JSON.parse("invalid json")` |
| **`RangeError`** | Number value falls outside allowed numeric range. | `new Array(-1)` or recursion stack overflow |
| **`URIError`** | Invalid URI encoding/decoding parameters passed. | `decodeURIComponent("%")` |
| **`AggregateError`**| Multiple errors wrapped into a single error (ES2021). | `Promise.any([rej1, rej2])` |
| **`EvalError`** | Legacy error associated with global `eval()` function. | Legacy eval usage |

---

## 3. `try...catch...finally` Execution Semantics

The `try...catch...finally` structure handles synchronous runtime exceptions:

```javascript
function processFile(filename) {
  let fileResource = null;

  try {
    fileResource = openFile(filename);
    parseContent(fileResource);
    return "SUCCESS";

  } catch (err) {
    console.error(`Failed to process ${filename}:`, err.message);
    return "FAILURE";

  } finally {
    // GUARANTEED EXECUTION: Runs regardless of whether try succeeded or catch threw!
    if (fileResource) {
      closeFile(fileResource);
      console.log("File resource cleaned up.");
    }
  }
}
```

### The `finally` Return Trap
> [!WARNING]
> If a `finally` block explicitly returns a value (`return x;`), it **overrides any return value or thrown exception** coming from the preceding `try` or `catch` blocks!

```javascript
function dangerousReturn() {
  try {
    throw new Error("Fatal Error!");
  } catch (err) {
    return "CATCH_RETURN";
  } finally {
    return "FINALLY_OVERRIDE"; // Overrides catch return AND swallows the error!
  }
}

console.log(dangerousReturn()); // "FINALLY_OVERRIDE"
```

---

## 4. Subclassing Custom Error Classes

Creating custom domain-specific error classes enhances error handling granularity across application layers:

```javascript
// Base Application Error
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // V8 Stack trace clean-up
  }
}

// Custom Validation Error Subclass
class ValidationError extends AppError {
  constructor(message, fieldErrors = []) {
    super(message, 422); // HTTP 422 Unprocessable Entity
    this.fieldErrors = fieldErrors;
  }
}

// Usage in business logic:
try {
  throw new ValidationError("User validation failed", [
    { field: "email", message: "Email is invalid" }
  ]);
} catch (err) {
  if (err instanceof ValidationError) {
    console.log(`Validation Failed (Status ${err.statusCode}):`, err.fieldErrors);
  } else {
    console.log("Generic System Error:", err);
  }
}
```

---

## 5. ES2022 Feature: Error Cause Chaining (`cause`)

Prior to ES2022, catching a low-level error and re-throwing a higher-level domain error lost the original low-level stack trace.

ES2022 introduced **Error Cause Chaining** via `{ cause: originalError }`:

```javascript
async function fetchConfig() {
  try {
    return await fetch("/api/config");
  } catch (netErr) {
    // Re-throw high-level ConfigurationError while preserving original netErr cause!
    throw new Error("Configuration Load Failed", { cause: netErr });
  }
}

try {
  await fetchConfig();
} catch (err) {
  console.error("High-Level Error:", err.message); // "Configuration Load Failed"
  console.error("Original Root Cause:", err.cause); // NetworkTypeError / Fetch Error
}
```

---

## 6. Global Unhandled Exception Traps

To catch errors that escape all local `try/catch` blocks:

```javascript
// 1. Browser Uncaught Exception Handler
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global Error Intercepted:", message);
  // Send crash report to telemetry service (Sentry, Datadog)
  return true; // Prevents default browser error dialog
};

// 2. Node.js Uncaught Exception Handler
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception! Shutting down process safely...", error);
  process.exit(1); // Graceful exit
});
```

---

## 7. Minor Points, Quirks & Traps

### 1. Swallowing Errors in Empty Catch Blocks
Never write empty catch blocks (`catch (e) {}`). Swallowing errors silently turns critical application failures into invisible debugging nightmares! Always log, re-throw, or handle exceptions explicitly.

---

## 8. Senior Interview Questions & Answers

### Q1: How does ES2022 Error Cause (`{ cause }`) improve exception handling in layered software architectures?
* **Answer**: In multi-layered architectures (e.g. Data Layer -> Service Layer -> UI Layer), low-level exceptions (such as a database query timeout) should not be exposed raw to the UI layer. However, wrapping and re-throwing a generic `ServiceError` previously destroyed the original database exception stack trace. The ES2022 `{ cause: originalErr }` property allows high-level domain errors to wrap original low-level exceptions while preserving the full root-cause chain for debugging and telemetry services.

### Q2: What happens if a `finally` block executes a `return` statement while an exception was thrown in the `try` block?
* **Answer**: Executing a `return` statement inside a `finally` block immediately terminates the function and returns that value, silently discarding and swallowing any exception that was thrown in the `try` or `catch` blocks. For this reason, `return` statements should never be placed inside `finally` blocks.

---

## 9. Summary & Key Takeaways

1. **Error Anatomy**: Errors contain `name`, `message`, and `stack` properties.
2. **Built-in Errors**: Recognize `TypeError`, `ReferenceError`, `SyntaxError`, `RangeError`, and `AggregateError`.
3. **`finally` Guarantee**: `finally` always runs; avoid putting `return` statements in `finally`.
4. **Custom Errors**: Extend `Error` or `AppError` base classes for specialized validation errors.
5. **Error Cause**: Use `new Error(msg, { cause: err })` to chain exceptions without losing root stack traces.
