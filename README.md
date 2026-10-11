# LearnX — Repository-Powered Interactive Learning Platform

> Convert programming Git repositories into interactive online courses with structured curriculum navigation, rich Markdown lessons, and an in-browser JavaScript code playground.

---

## 🌟 Overview

**LearnX** bridges the gap between static Git learning repositories and modern interactive learning platforms. Instead of manually copying lessons or creating synthetic demos, LearnX directly synchronizes with your cloned programming repository, preserving:
- All 22 phases, modules, and subtopics
- Theory, runnable examples, practice challenges, solutions, and interview questions
- Original relative file paths and source integrity
- An interactive in-browser playground powered by an isolated Web Worker runtime

---

## 🏗️ Workspace Architecture

LearnX resides as an independent sibling folder alongside your technology repository:

```text
MyWorkspace/
├── JavaScript/                # Source repository (Untouched & read-only)
│   ├── README.md
│   ├── Phase-01-JavaScript-Fundamentals/
│   ├── ...
│   └── Phase-22-Node-JavaScript-Foundation/
│
└── LearnX/                    # LearnX platform website
    ├── public/
    │   └── content/           # Generated course assets (Markdown & JS)
    ├── scripts/
    │   └── sync-course-content.ts   # Synchronization engine
    ├── src/
    │   ├── generated/         # Manifest & pre-indexed search data
    │   ├── components/        # UI components (Editor, Console, Markdown, Workspace)
    │   ├── pages/             # Home, Catalog, Overview, Learning Workspace, Playground
    │   ├── services/          # Web Worker Execution, Storage, Search, Content
    │   └── types/             # TypeScript definitions
    ├── package.json
    ├── vite.config.ts
    └── README.md
```

### Strict Directory Guarantees
- The source repository is never modified, deleted, moved, or renamed.
- All derived assets, builds, caches, and node_modules remain strictly inside `LearnX`.
- The source repository remains an independent, usable Git repository.

---

## 🚀 Quick Start & Development

### 1. Prerequisites
- **Node.js** v18+ (tested on v24)
- **npm** v9+

### 2. Configure Course Repository (Optional)
LearnX defaults to looking for `../JavaScript` as a sibling directory. You can customize the source repository path via a local `.env` file:

```env
COURSE_REPOSITORY_PATH=../JavaScript
```

### 3. Synchronize Content
Run the content discovery and indexing pipeline:

```bash
npm run content:sync
```

This discovers all 22 phases, 271 modules, 2,283 lessons, 494 exercises, and builds both `course-manifest.json` and `search-index.json`.

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## ⚡ Core Features

### 1. Learning Workspace (Three-Panel Layout)
- **Left Panel (Sidebar)**: Expandable phase accordions (Phases 01 to 22), Day modules, completed lesson checkmarks, active indicator, and live search filter.
- **Center Panel (Lesson)**:
  - Tabbed category navigation (Theory, Examples, Exercises, Solutions, Interview, Project).
  - GitHub-Flavored Markdown rendering with syntax highlighting and copy code actions.
  - Interactive `.js` code scratchpad: edit and execute code directly inside the lesson.
  - Exercise mode with starter code and solution reveal toggle.
  - Previous / Next sequential navigation and "Mark as Complete" with confetti.
- **Right Panel (Context Nav)**:
  - Table of Contents heading jumps.
  - One-click "Open in Playground" for module scripts.
  - Bookmarks toggle and study time estimates.

### 2. Isolated JavaScript Execution Engine & Playground
- Powered by a dedicated **Web Worker** sandbox with dual adapter support (`window.Worker` and `node:worker_threads`).
- **Complete Asynchronous Event-Loop Capture**: Full capture of microtasks and macrotasks (`setTimeout`, `setInterval`, Promises, `async/await`, `queueMicrotask`) without premature session termination.
- **Independent Main-Thread Watchdog Supervisor**: Infinite synchronous loops (`while(true){}`) are terminated without freezing the main IDE thread.
- **Fault-Tolerant Serialization**: Handles circular references, `BigInt` values (`123n`), `Symbol`, `NaN`, `Infinity`, and formatted tabular output (`console.table`).
- **Real-Time Streaming Output & Interactive Stop**: Incremental log streaming with active session cancellation.
- Complete architectural specification available in [Runtime Architecture Documentation](file:///docs/RUNTIME_ARCHITECTURE.md).

### 3. Instant Search (Ctrl + K)
- Pre-indexed client-side search across 2,289 topics, exercises, and examples.
- Multi-token ranking with category filters (Theory, Exercises, Examples, Reference Guides).

### 4. Local Persistence
- Tracks completed lessons, percentage progress, last visited lesson, and bookmarks in `localStorage`.
- Dark and Light themes with system preferences.

---

## 🛡️ Browser Execution Limitations
- Code execution runs inside the browser's Web Worker context.
- Node.js specific APIs (such as `fs`, `net`, `child_process`) are not available in browser runtimes.
- DOM manipulation examples are designed for visual inspection or sandboxed iframe previews.

---

## 📦 Extensibility: Adding More Courses
LearnX is built with a pluggable course registry. To add a new course (e.g. `TypeScript` or `Python`):
1. Place the repository in the parent directory (e.g. `../TypeScript`).
2. Add a new configuration entry in `scripts/sync-course-content.ts`.
3. Re-run `npm run content:sync` to index the new course.
