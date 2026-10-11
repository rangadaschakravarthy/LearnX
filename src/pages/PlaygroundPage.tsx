import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Square,
  RotateCcw,
  Copy,
  Trash2,
  Terminal,
  FolderGit2,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { CodeEditor } from '../components/editor/CodeEditor';
import { ConsoleOutput } from '../components/playground/ConsoleOutput';
import { ExecutionService } from '../services/executionService';
import { IExecutionController } from '../services/runtime/types';
import { StorageService } from '../services/storageService';
import { ConsoleLogEntry } from '../types/course';

const STARTER_TEMPLATES = {
  consoleBasics: {
    name: 'Console Methods & Output Formats',
    code: `// LearnX Playground: Console API Demonstration
console.log("Welcome to LearnX JavaScript Playground!");
console.info("Information: Running in an isolated Web Worker.");
console.warn("Notice: Untrusted scripts are sandboxed with 10s timeout.");

// Array and Object formatting
const developers = [
  { id: 1, name: "Alice", role: "Frontend Architect", years: 6 },
  { id: 2, name: "Bob", role: "Systems Engineer", years: 8 },
  { id: 3, name: "Charlie", role: "Compiler Specialist", years: 10 }
];

console.table(developers);

console.time("Loop Benchmark");
let sum = 0;
for (let i = 0; i < 1_000_000; i++) {
  sum += i;
}
console.timeEnd("Loop Benchmark");

console.log("Computed sum of 1 million integers:", sum);
`,
  },
  asyncTimers: {
    name: 'Async Timers & Event Loop (Reproduction Test)',
    code: `// Verification of Asynchronous Output & Event Loop Ordering
console.log(1);

setTimeout(() => {
  console.log(2);
}, 100);

console.log(3);

// Expected order:
// 1
// 3
// 2 (streamed into console after 100ms)
`,
  },
  circularBigInt: {
    name: 'Circular Objects & BigInt Support',
    code: `// Circular Data Structures & BigInt Serialization
const user = { name: "LearnX", role: "JavaScript Runtime Engine" };
user.self = user; // Circular reference

console.log("Circular structure:", user);

const bigNumber = 12345678901234567890n;
console.log("BigInt value:", bigNumber);

console.log("Multi-argument formatting:", "Answer:", 42, true, null, undefined);
`,
  },
  asyncPromises: {
    name: 'Async/Await & Promises',
    code: `// Async JavaScript & Microtask Queue Demonstration
async function fetchUserSimulation(userId) {
  console.log(\`Fetching user record \${userId}...\`);
  
  // Simulating asynchronous operation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, username: "dev_coder", tier: "PRO" });
    }, 400);
  });
}

async function runWorkflow() {
  console.log("Step 1: Initiation");
  
  const user = await fetchUserSimulation(42);
  console.log("Step 2: User record received:", user);
  
  const permissions = ["READ", "WRITE", "EXECUTE"];
  console.log("Step 3: Permissions verified:", permissions);
}

runWorkflow();
`,
  },
  closures: {
    name: 'Closures & Scope Mastery',
    code: `// Closures and Private State Encapsulation
function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable enclosed by inner functions

  return {
    increment(step = 1) {
      count += step;
      return count;
    },
    decrement(step = 1) {
      count -= step;
      return count;
    },
    getValue() {
      return count;
    }
  };
}

const counterA = createCounter(10);
console.log("Counter A increment:", counterA.increment(5));
console.log("Counter A decrement:", counterA.decrement(2));
console.log("Counter A current value:", counterA.getValue());

const counterB = createCounter(100);
console.log("Counter B (isolated state):", counterB.increment(50));
`,
  },
  infiniteLoopGuard: {
    name: 'Infinite Loop Timeout Safeguard (Test)',
    code: `// Timeout Safeguard Test
// This demonstrates the infinite loop watchdog protection.
// Notice that the supervisor terminates cleanly without freezing your browser!

console.log("Starting a simulated infinite loop...");
let count = 0;

while (true) {
  count++;
  // This intentionally runs forever.
  // Watch LearnX watchdog supervisor kill the worker cleanly!
}
`,
  },
};

export const PlaygroundPage: React.FC = () => {
  const [code, setCode] = useState<string>(() => {
    // Check if code was transferred from a lesson
    try {
      const transferred = sessionStorage.getItem('learnx_playground_transfer');
      if (transferred) {
        const parsed = JSON.parse(transferred);
        return parsed.code;
      }
    } catch {}
    return STARTER_TEMPLATES.asyncTimers.code;
  });

  const [sourcePath, setSourcePath] = useState<string | null>(() => {
    try {
      const transferred = sessionStorage.getItem('learnx_playground_transfer');
      if (transferred) {
        const parsed = JSON.parse(transferred);
        return parsed.sourcePath;
      }
    } catch {}
    return null;
  });

  const [starterCode, setStarterCode] = useState<string>(code);
  const [logs, setLogs] = useState<ConsoleLogEntry[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [durationMs, setDurationMs] = useState<number | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('asyncTimers');
  const controllerRef = useRef<IExecutionController | null>(null);

  // Handle running code with incremental real-time streaming
  const handleRun = () => {
    setIsExecuting(true);
    setLogs([]);
    setDurationMs(undefined);

    const { promise, controller } = ExecutionService.executeStreaming(code, {
      onLog: (entry) => {
        setLogs((prev) => [...prev, entry]);
      },
      onStatusChange: (status) => {
        if (status !== 'running') {
          setIsExecuting(false);
        }
      },
    });

    controllerRef.current = controller;

    promise.then((result) => {
      setDurationMs(result.durationMs);
      setIsExecuting(false);
    });
  };

  const handleStop = () => {
    if (controllerRef.current) {
      controllerRef.current.stop('Stopped by user');
    } else {
      ExecutionService.cancelCurrent();
    }
    setIsExecuting(false);
  };

  const handleReset = () => {
    setCode(starterCode);
    setLogs([]);
    setDurationMs(undefined);
  };

  const handleClear = () => {
    setCode('');
    setLogs([]);
    setDurationMs(undefined);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleSelectTemplate = (key: string) => {
    if (key in STARTER_TEMPLATES) {
      const template = STARTER_TEMPLATES[key as keyof typeof STARTER_TEMPLATES];
      setCode(template.code);
      setStarterCode(template.code);
      setSourcePath(null);
      setSelectedTemplate(key);
      setLogs([]);
      setDurationMs(undefined);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
      {/* Playground Top Action Bar */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <h1 className="font-bold text-white text-base">JavaScript Playground</h1>
          </div>

          {sourcePath && (
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 font-mono">
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Loaded from: {sourcePath}</span>
            </div>
          )}
        </div>

        {/* Template Selector & Action Buttons */}
        <div className="flex items-center space-x-2 flex-wrap">
          {/* Templates dropdown */}
          <select
            value={selectedTemplate}
            onChange={(e) => handleSelectTemplate(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="custom">Templates: Choose a preset...</option>
            <option value="asyncTimers">Async Timers & Event Loop (Reproduction Test)</option>
            <option value="circularBigInt">Circular Objects & BigInt</option>
            <option value="consoleBasics">Console Methods & Output Formats</option>
            <option value="asyncPromises">Async/Await & Promises</option>
            <option value="closures">Closures & Scope Mastery</option>
            <option value="infiniteLoopGuard">Infinite Loop Guard (Timeout Demo)</option>
          </select>

          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition flex items-center space-x-1.5"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition flex items-center space-x-1.5"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs font-medium transition flex items-center space-x-1.5"
            title="Clear editor"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {isExecuting ? (
            <button
              onClick={handleStop}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition shadow-lg shadow-rose-600/25 flex items-center space-x-2 animate-pulse"
              title="Stop running program"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              onClick={handleRun}
              className="px-5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-600/25 flex items-center space-x-2"
              title="Execute JavaScript (Ctrl + Enter)"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run (Ctrl+Enter)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split Layout: Editor (Left) & Console (Right) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 overflow-hidden">
        {/* Left Side: Code Editor */}
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border border-slate-800 border-b-0 rounded-t-xl text-xs text-slate-400">
            <span className="font-mono text-slate-300">JavaScript Source</span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">Shortcut: Ctrl + Enter to execute</span>
          </div>
          <div className="flex-1 h-full min-h-0 overflow-hidden">
            <CodeEditor
              value={code}
              onChange={setCode}
              onRun={handleRun}
              height="100%"
            />
          </div>
        </div>

        {/* Right Side: Console Output */}
        <div className="flex flex-col h-full overflow-hidden">
          <ConsoleOutput
            logs={logs}
            onClear={() => setLogs([])}
            durationMs={durationMs}
            isRunning={isExecuting}
          />
        </div>
      </div>

      {/* Limitations and Sandbox Disclaimer Footer */}
      <div className="px-4 py-2 border-t border-slate-800 bg-slate-950 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Execution Isolation: Code runs in a dedicated Web Worker sandbox with 3.5s timeout.</span>
        </div>
        <div className="flex items-center space-x-1">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>Browser execution limitations: Node.js fs, net, and process APIs are not available in browser runtimes.</span>
        </div>
      </div>
    </div>
  );
};
