import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  Globe,
  Maximize2
} from 'lucide-react';
import { ConsoleLogEntry } from '../../types/course';

interface HtmlSandboxPreviewProps {
  htmlContent: string;
  sourcePath: string;
  onConsoleLog?: (log: ConsoleLogEntry) => void;
  className?: string;
}

export const HtmlSandboxPreview: React.FC<HtmlSandboxPreviewProps> = ({
  htmlContent,
  sourcePath,
  onConsoleLog,
  className = '',
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Compute base directory for relative assets like script.js or style.css
  const lastSlashIndex = sourcePath.lastIndexOf('/');
  const dirPath = lastSlashIndex !== -1 ? sourcePath.substring(0, lastSlashIndex) : '';
  const baseHref = `/content/javascript/${dirPath}/`;

  // Listen for console logs forwarded by the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'LEARNX_IFRAME_LOG') {
        const payload = event.data.payload;
        if (onConsoleLog) {
          onConsoleLog({
            id: `iframe-log-${Date.now()}-${Math.random()}`,
            type: payload.type || 'log',
            content: payload.content || '',
            timestamp: Date.now(),
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onConsoleLog]);

  // Construct complete HTML document with injected console interceptor and <base> tag
  const consoleInterceptor = `
    <script>
      (function() {
        const _log = console.log;
        const _info = console.info;
        const _warn = console.warn;
        const _error = console.error;
        const _table = console.table;
        const _time = console.time;
        const _timeEnd = console.timeEnd;
        const timers = {};

        function send(type, args) {
          try {
            const formatted = args.map(a => {
              if (typeof a === 'object' && a !== null) {
                try { return JSON.stringify(a, null, 2); } catch(e) { return String(a); }
              }
              return String(a);
            }).join(' ');

            window.parent.postMessage({
              type: 'LEARNX_IFRAME_LOG',
              payload: { type: type, content: formatted }
            }, '*');
          } catch(e) {}
        }

        console.log = function(...args) { _log.apply(console, args); send('log', args); };
        console.info = function(...args) { _info.apply(console, args); send('info', args); };
        console.warn = function(...args) { _warn.apply(console, args); send('warn', args); };
        console.error = function(...args) { _error.apply(console, args); send('error', args); };
        console.table = function(...args) { _table.apply(console, args); send('table', args); };
        console.time = function(lbl) { timers[lbl] = performance.now(); if (_time) _time.apply(console, arguments); };
        console.timeEnd = function(lbl) {
          const dur = timers[lbl] ? (performance.now() - timers[lbl]).toFixed(2) : '0';
          if (_timeEnd) _timeEnd.apply(console, arguments);
          send('info', [lbl + ': ' + dur + 'ms']);
        };

        window.onerror = function(msg, url, line) {
          send('error', [msg + (line ? ' (Line ' + line + ')' : '')]);
        };
      })();
    </script>
  `;

  const baseTag = `<base href="${baseHref}">`;

  // Inject baseTag and consoleInterceptor into <head> or at the beginning of document
  let finalHtml = htmlContent;
  if (finalHtml.includes('<head>')) {
    finalHtml = finalHtml.replace('<head>', `<head>${baseTag}${consoleInterceptor}`);
  } else if (finalHtml.includes('<html>')) {
    finalHtml = finalHtml.replace('<html>', `<html><head>${baseTag}${consoleInterceptor}</head>`);
  } else {
    finalHtml = `<head>${baseTag}${consoleInterceptor}</head>${finalHtml}`;
  }

  // Device width styles
  const getContainerWidth = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const directUrl = `/content/javascript/${sourcePath}`;

  return (
    <div className={`flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl ${className}`}>
      {/* Browser Simulation Chrome Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        {/* Navigation & Address */}
        <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
          <div className="flex items-center space-x-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <button
            onClick={handleRefresh}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
            title="Reload sandbox preview"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Simulated URL bar */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[11px] flex-1 max-w-md truncate">
            <Globe className="w-3 h-3 text-indigo-400 flex-shrink-0" />
            <span className="text-slate-500">http://localhost:3000/</span>
            <span className="text-slate-200 truncate">{sourcePath.split('/').pop()}</span>
          </div>
        </div>

        {/* Device Viewport Selector & Open in New Tab */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Device Toggles */}
          <div className="hidden sm:flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`p-1.5 rounded text-xs transition ${
                deviceView === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Desktop View (100%)"
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              className={`p-1.5 rounded text-xs transition ${
                deviceView === 'tablet'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`p-1.5 rounded text-xs transition ${
                deviceView === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Open Direct in Tab */}
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center space-x-1.5 border border-slate-700 transition"
            title="Open project in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">New Tab</span>
          </a>
        </div>
      </div>

      {/* Sandboxed Interactive Frame Area */}
      <div className="flex-1 bg-slate-900/60 p-2 sm:p-4 flex items-center justify-center overflow-auto min-h-0">
        <div className={`h-full transition-all duration-300 rounded-lg overflow-hidden border border-slate-800/80 shadow-2xl bg-white ${getContainerWidth()}`}>
          <iframe
            key={refreshKey}
            ref={iframeRef}
            srcDoc={finalHtml}
            title="Interactive Mini-Project Sandbox"
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-forms allow-modals allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};
