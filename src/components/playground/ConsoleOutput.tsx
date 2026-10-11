import React, { useRef, useEffect } from 'react';
import { Terminal, Trash2, Copy, Check, Clock, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { ConsoleLogEntry } from '../../types/course';

interface ConsoleOutputProps {
  logs: ConsoleLogEntry[];
  onClear: () => void;
  durationMs?: number;
  isRunning?: boolean;
  statusText?: string;
  className?: string;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  logs,
  onClear,
  durationMs,
  isRunning = false,
  statusText,
  className = '',
}) => {
  const [copied, setCopied] = React.useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCopyLogs = async () => {
    try {
      const text = logs.map(l => `[${l.type.toUpperCase()}] ${l.content}`).join('\n');
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className={`flex flex-col h-full bg-[#0d1117] font-mono text-xs overflow-hidden ${className || 'border border-slate-800 rounded-xl'}`}>
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">Execution Console</span>
          {durationMs !== undefined && (
            <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-800 text-[11px] text-slate-400">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{durationMs}ms</span>
            </span>
          )}
          {isRunning && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 animate-pulse text-[11px]">
              Executing...
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {logs.length > 0 && (
            <button
              onClick={handleCopyLogs}
              className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Copy output"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}

          <button
            onClick={onClear}
            className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-300 transition"
            title="Clear console"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Logs View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 select-text">
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12 text-center">
            <Terminal className="w-8 h-8 mb-2 opacity-40 text-slate-400" />
            <p className="text-slate-400 font-medium">Console is idle</p>
            <p className="text-[11px] text-slate-600 mt-1">
              Press "Run Code" or hit <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-400">Ctrl + Enter</kbd> to execute
            </p>
          </div>
        ) : (
          logs.map((log) => {
            let icon = null;
            let textClass = 'text-slate-300';
            let bgClass = 'bg-transparent';

            if (log.type === 'warn') {
              icon = <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />;
              textClass = 'text-amber-300';
              bgClass = 'bg-amber-950/20 border-l-2 border-amber-500 pl-2';
            } else if (log.type === 'error') {
              icon = <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />;
              textClass = 'text-rose-300';
              bgClass = 'bg-rose-950/25 border-l-2 border-rose-500 pl-2';
            } else if (log.type === 'info') {
              icon = <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />;
              textClass = 'text-cyan-300';
              bgClass = 'bg-cyan-950/20 border-l-2 border-cyan-500 pl-2';
            } else if (log.type === 'table') {
              textClass = 'text-indigo-200';
              bgClass = 'bg-indigo-950/20 border-l-2 border-indigo-500 pl-2';
            }

            return (
              <div
                key={log.id}
                className={`py-1 flex items-start space-x-2 leading-relaxed font-mono ${textClass} ${bgClass}`}
              >
                {icon}
                <pre className="whitespace-pre-wrap font-mono flex-1 break-words">
                  {log.content}
                </pre>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Footer Info */}
      <div className="px-4 py-1.5 bg-slate-900/80 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Logged entries: {logs.length}</span>
        <span className="text-slate-500 font-sans">LearnX Isolated Web Worker Runtime</span>
      </div>
    </div>
  );
};
