import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { useTheme } from '../../context/ThemeContext';

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  onRun?: () => void;
  readOnly?: boolean;
  minHeight?: string;
  maxHeight?: string;
  height?: string;
  fontSize?: number;
  className?: string;
  language?: 'javascript' | 'html' | 'css' | 'json';
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  onRun,
  readOnly = false,
  minHeight = '300px',
  maxHeight,
  height = '100%',
  fontSize = 14,
  className = '',
  language = 'javascript',
}) => {
  const { theme } = useTheme();

  const getLanguageExtensions = () => {
    switch (language) {
      case 'html':
        return [html()];
      case 'css':
        return [css()];
      case 'json':
        return [json()];
      case 'javascript':
      default:
        return [javascript({ jsx: true, typescript: false })];
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] font-mono shadow-inner ${className}`}
      onKeyDown={(e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          if (onRun) onRun();
        }
      }}
    >
      <div className="flex-1 w-full h-full min-h-0 overflow-auto">
        <CodeMirror
          value={value}
          height={height}
          minHeight={minHeight}
          maxHeight={maxHeight}
          theme={oneDark}
          extensions={getLanguageExtensions()}
          onChange={onChange}
          readOnly={readOnly}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          style={{
            fontSize: `${fontSize}px`,
          }}
        />
      </div>
    </div>
  );
};
