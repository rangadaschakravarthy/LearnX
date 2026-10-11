# Module 2 — Core Modules (`fs`, `path`, `http`, `events`) — Deep-Dive Theoretical Guide

## 1. First Principles of Node.js Built-in Core Architecture

Node.js provides a robust set of built-in modules compiled directly into the binary distribution. These modules allow developers to perform low-level operating system tasks—reading disk files, managing network sockets, handling binary buffers, and building web servers—without requiring third-party libraries.

---

## 2. File System Operations (`fs` & `fs/promises`)

The `fs` module provides APIs for interacting with the file system. Node.js exposes three distinct interface styles for file operations:

| Interface Style | Signature | Use Case | Event Loop Impact |
| :--- | :--- | :--- | :--- |
| **Synchronous** | `fs.readFileSync('file.txt')` | CLI scripts, initial startup configs. | **Blocks Event Loop** completely until disk read finishes. |
| **Callback-based** | `fs.readFile('file.txt', (err, data) => {})` | Legacy Node.js asynchronous code. | Non-blocking (delegates to libuv thread pool). |
| **Promise-based** | `import fs from 'fs/promises'`<br>`await fs.readFile('file.txt')` | Modern `async/await` production applications. | **Non-blocking**, clean async control flow. |

### 2.1 Buffers vs. Streams Memory Allocation
When reading a file using `fs.readFile`, Node.js allocates a contiguous chunk of memory in the V8 heap called a **`Buffer`** to store the *entire file contents at once*.

> [!CAUTION]
> **The Memory Limit Hazard of `readFile`:**
> If an application attempts to load a 2GB log file into memory using `fs.readFile`, Node.js will attempt to allocate a 2GB Buffer in RAM, causing memory spikes, garbage collection freezes, or immediate process crash (`ERR_FS_FILE_TOO_LARGE`).

### 2.2 Streams & Backpressure Management
**Streams** solve this memory constraint by reading and processing data chunk by chunk (default chunk size: 64KB for file streams).

```
File Source ──► [ ReadableStream ] ──► (64KB Chunks) ──► [ WritableStream ] ──► Destination
```

#### Streams Piping Example:
```javascript
import fs from 'fs';

// High-performance streaming file copy (Uses ~64KB of RAM regardless of file size!)
const readStream = fs.createReadStream('./large-video.mp4');
const writeStream = fs.createWriteStream('./copy-video.mp4');

// Backpressure is automatically handled by .pipe()
readStream.pipe(writeStream);

readStream.on('error', (err) => console.error('Read Stream Error:', err));
writeStream.on('error', (err) => console.error('Write Stream Error:', err));
```

---

## 3. Path Resolution & Cross-Platform Path Handling (`path`)

Filesystem paths differ significantly across operating systems:
- **Windows:** Uses backslashes (`C:\Users\Admin\file.txt`).
- **POSIX (Linux / macOS):** Uses forward slashes (`/home/user/file.txt`).

The `path` module provides utilities for normalizing, joining, and resolving file paths cross-platform.

### 3.1 `path.join()` vs. `path.resolve()`

```javascript
import path from 'path';

// Assume current working directory is: /app/server

// 1. path.join(): Concatenates path segments using platform separator
const joinPath = path.join('/users', 'downloads', '../documents', 'file.txt');
// Result: '/users/documents/file.txt'

// 2. path.resolve(): Resolves path segments into an ABSOLUTE path!
// If no absolute path is passed, prepends the current working directory!
const resolvePath1 = path.resolve('static', 'images', 'logo.png');
// Result: '/app/server/static/images/logo.png'

const resolvePath2 = path.resolve('/var/www', 'public', 'index.html');
// Result: '/var/www/public/index.html' (Root '/' resets resolution baseline!)
```

### 3.2 Key Path Decomposition APIs
```javascript
const filePath = '/app/src/components/Header.jsx';

path.extname(filePath);  // '.jsx'
path.basename(filePath); // 'Header.jsx'
path.dirname(filePath);  // '/app/src/components'
path.parse(filePath);
/* Returns object:
{
  root: '/',
  dir: '/app/src/components',
  base: 'Header.jsx',
  ext: '.jsx',
  name: 'Header'
}
*/
```

---

## 4. Native HTTP Server Engine (`http`)

The `http` module provides lower-level abstractions for receiving and responding to web network requests. Higher-level frameworks like Express are wrappers around this core `http` module.

### 4.1 Request (`IncomingMessage`) and Response (`ServerResponse`)
- **`req` (`http.IncomingMessage`):** A **Readable Stream** representing client request headers, URL, method, and request body payload chunks.
- **`res` (`http.ServerResponse`):** A **Writable Stream** used to send response headers, status codes, and body chunks back to the client.

### 4.2 Low-Level HTTP Server Example
```javascript
import http from 'http';

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // 1. Parse Request Body Stream asynchronously
  if (method === 'POST' && url === '/api/data') {
    let bodyChunks = [];

    req.on('data', (chunk) => {
      bodyChunks.push(chunk); // Buffer chunks arriving over TCP socket
    });

    req.on('end', () => {
      // Concatenate and parse JSON buffer payload
      const rawBody = Buffer.concat(bodyChunks).toString();
      const parsedBody = JSON.parse(rawBody || '{}');

      // 2. Set Response Headers & Status Code
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Data Created!', payload: parsedBody }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route Not Found' }));
  }
});

server.listen(4000, () => {
  console.log('HTTP Server listening on port 4000');
});
```

---

## 5. Event-Driven Architecture: `EventEmitter` (`events`)

Node.js is built around an **Event-Driven Architecture**. Many core modules (`http.Server`, `fs.ReadStream`, `process`) inherit from the fundamental `EventEmitter` class.

### 5.1 Syntax & Core API
```javascript
import { EventEmitter } from 'events';

class AuditLogger extends EventEmitter {
  logUserLogin(userId) {
    console.log(`[Audit] User logged in: ${userId}`);
    // Emit custom event with payload
    this.emit('user:login', { userId, timestamp: new Date() });
  }
}

const logger = new AuditLogger();

// 1. Register Event Listener
logger.on('user:login', (eventData) => {
  console.log('Listener Received Event:', eventData);
});

// 2. Execute Method that triggers event
logger.logUserLogin('usr_99182');
```

### 5.2 Listener Memory Leak Warnings
If more than 10 listeners are attached to a single event on an `EventEmitter`, Node.js prints a warning: `MaxListenersExceededWarning: Possible EventEmitter memory leak detected`.

To prevent memory leaks:
- Remove unused listeners using `.off(eventName, listener)`.
- Use `.once(eventName, listener)` for one-time listeners that automatically unsubscribe after firing.

---

## 6. Anti-Patterns vs. Best Practices

```
┌─────────────────────────────────────────────────────────┐
│                     ANTI-PATTERN                        │
├─────────────────────────────────────────────────────────┤
│ 1. Hardcoding file path slashes (`/` or `\`) instead of │
│    using `path.join()` or `path.resolve()`              │
│ 2. Loading multi-gigabyte files into RAM via            │
│    `fs.readFile` instead of streams                 │
│ 3. Forgetting to attach `'error'` listeners to streams  │
│ 4. Accumulating listeners without calling `.off()`      │
└─────────────────────────────────────────────────────────┘
                            ▲
                            │ Contrast
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     BEST PRACTICE                       │
├─────────────────────────────────────────────────────────┤
│ 1. Always use `path.join()` for cross-platform safety   │
│ 2. Stream large files with `createReadStream()` & pipe  │
│ 3. Use `fs/promises` for modern async/await file operations│
│ 4. Handle stream errors explicitly to avoid app crashes │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Senior-Level Interview Questions & Deep-Dive Answers

### Q1: What is stream backpressure in Node.js, and why is it important?
**Answer:**
Backpressure occurs when data is read from a `ReadableStream` faster than a `WritableStream` can write it to its destination (e.g., streaming a fast disk file over a slow network socket). Without backpressure handling, unwritten data chunks accumulate in RAM buffers, leading to memory exhaustion. `.pipe()` handles backpressure automatically: when the Writable Stream buffer exceeds its high watermark (`highWaterMark`), it pauses the Readable Stream until the write buffer drains.

### Q2: What is the key difference between `path.join()` and `path.resolve()`?
**Answer:**
- `path.join()` joins all given path segments together using the platform-specific separator and normalizes the resulting path string.
- `path.resolve()` resolves a sequence of paths into an **absolute path**. It processes path arguments from right to left, prepending paths until an absolute root is formed. If no absolute path segment is encountered, `path.resolve()` prepends the process's current working directory (`process.cwd()`).

---

## 8. Module Summary & Key Takeaways

1. **Streams over Buffers:** Use streams (`createReadStream`) for large file I/O to maintain minimal fixed memory footprint.
2. **Cross-Platform Paths:** Never concatenate path strings manually; always use `path.join()` or `path.resolve()`.
3. **HTTP Mechanics:** Node's native `http` server receives requests as Readable Streams and sends responses as Writable Streams.
4. **Event Emitter:** Implement custom event-driven workflows cleanly using `EventEmitter`, guarding against listener memory leaks.
