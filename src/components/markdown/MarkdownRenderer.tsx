import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
  sourcePath?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, sourcePath }) => {
  return (
    <div className="markdown-body max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const value = String(children).replace(/\n$/, '');

            if (!inline && match) {
              return (
                <CodeBlock
                  language={match[1]}
                  value={value}
                  sourcePath={sourcePath}
                />
              );
            }

            if (!inline && !match && value.includes('\n')) {
              return (
                <CodeBlock
                  language="text"
                  value={value}
                  sourcePath={sourcePath}
                />
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h1({ children }) {
            const id = String(children)
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-');
            return <h1 id={id}>{children}</h1>;
          },
          h2({ children }) {
            const id = String(children)
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-');
            return <h2 id={id}>{children}</h2>;
          },
          h3({ children }) {
            const id = String(children)
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-');
            return <h3 id={id}>{children}</h3>;
          },
          a({ href, children, ...props }) {
            // Local markdown link navigation
            const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4 transition"
                {...props}
              >
                {children}
              </a>
            );
          },
          img({ src, alt }) {
            // Resolve relative images against public/content/javascript/
            let resolvedSrc = src;
            if (src && !src.startsWith('http') && !src.startsWith('/') && sourcePath) {
              const baseDir = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
              resolvedSrc = `/content/javascript/${baseDir}/${src}`;
            }
            return (
              <img
                src={resolvedSrc}
                alt={alt || ''}
                className="rounded-xl border border-slate-700/60 shadow-lg my-4 max-w-full h-auto"
                loading="lazy"
              />
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4 rounded-xl border border-slate-800 shadow-md">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">{children}</table>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
