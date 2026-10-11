import React, { useState, useRef } from 'react';
import { Copy, Check, Play, Square, Terminal, ChevronDown, ChevronUp, Clock, AlertTriangle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExecutionService } from '../../services/executionService';
import { IExecutionController } from '../../services/runtime/types';
import { ConsoleLogEntry } from '../../types/course';

interface CodeBlockProps {
  language?: string;
  value: string;
  sourcePath?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language = 'text', value, sourcePath }) => {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [logs, setLogs] = useState<ConsoleLogEntry[]>([]);
  const [durationMs, setDurationMs] = useState<number | undefined>(undefined);
  const controllerRef = useRef<IExecutionController | null>(null);
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const isJavaScript = ['javascript', 'js', 'mjs', 'node'].includes(language.toLowerCase());

  const handleOpenPlayground = () => {
    sessionStorage.setItem(
      'learnx_playground_transfer',
      JSON.stringify({
        code: value,
        sourcePath: sourcePath || 'Code snippet from lesson',
        timestamp: Date.now(),
      })
    );
    navigate('/playground');
  };

  const handleInlineRun = () => {
    setIsRunning(true);
    setShowConsole(true);
    setLogs([]);
    setDurationMs(undefined);

    const { promise, controller } = ExecutionService.executeStreaming(value, {
      onLog: (entry) => {
        setLogs((prev) => [...prev, entry]);
      },
      onStatusChange: (status) => {
        if (status !== 'running') {
          setIsRunning(false);
        }
      },
    });

    controllerRef.current = controller;

    promise.then((result) => {
      setDurationMs(result.durationMs);
      setIsRunning(false);
    });
  };

  const handleStopInline = () => {
    if (controllerRef.current) {
      controllerRef.current.stop('Stopped by user');
    } else {
      ExecutionService.cancelCurrent();
    }
    setIsRunning(false);
  };

  return (
    <div className="relative group my-5 rounded-xl overflow-hidden border border-slate-700/60 bg-[#161b22] shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          <span className="ml-2 uppercase font-semibold text-slate-300 tracking-wider">
            {language || 'code'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {isJavaScript && (
            <>
              {isRunning ? (
                <button
                  onClick={handleStopInline}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 hover:text-rose-100 transition border border-rose-500/30 font-sans text-xs font-medium animate-pulse"
                  title="Stop running snippet"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>Stop</span>
                </button>
              ) : (
                <button
                  onClick={handleInlineRun}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 hover:text-emerald-100 transition border border-emerald-500/30 font-sans text-xs font-medium"
                  title="Execute code directly in sandbox"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run Snippet</span>
                </button>
              )}

              <button
                onClick={handleOpenPlayground}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-indigo-100 transition border border-indigo-500/30 font-sans text-xs font-medium"
                title="Run and edit in JavaScript Playground"
              >
                <Terminal className="w-3 h-3" />
                <span>Open in Playground</span>
              </button>
            </>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700 font-sans text-xs font-medium"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto p-4 text-[13.5px] leading-relaxed font-mono">
        <pre className="!bg-transparent !p-0 !m-0">
          <code className={`language-${language} !bg-transparent`}>
            {value}
          </code>
        </pre>
      </div>

      {/* Inline Execution Console (if executed) */}
      {showConsole && (
        <div className="border-t border-slate-800 bg-[#0d1117] p-3 text-xs font-mono">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-slate-400">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold text-slate-200">Execution Output</span>
              {durationMs !== undefined && (
                <span className="text-[11px] text-slate-500">({durationMs}ms)</span>
              )}
            </div>
            <button
              onClick={() => setShowConsole(false)}
              className="text-[11px] text-slate-500 hover:text-slate-300"
            >
              Close
            </button>
          </div>

          <div className="space-y-1 max-h-48 overflow-y-auto">
            {logs.length === 0 && !isRunning && (
              <div className="text-slate-500 italic">No output logged.</div>
            )}
            {logs.map((log) => {
              const isErr = log.type === 'error';
              const isWarn = log.type === 'warn';
              return (
                <div
                  key={log.id}
                  className={`py-0.5 leading-relaxed break-words ${
                    isErr ? 'text-rose-400' : isWarn ? 'text-amber-400' : 'text-slate-300'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-mono !bg-transparent !p-0 !m-0">
                    {log.content}
                  </pre>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
