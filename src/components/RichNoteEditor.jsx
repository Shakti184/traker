import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

// Import our newly separated components and utilities
import {
  markdownSanitizeSchema,
  MarkdownErrorBoundary,
  CodeBlock,
  MermaidChart,
  ImageWithFallback,
  safeString,
  isSafeUrl,
  convertKebabToCamel,
  SvgElement,
  normalizeLanguage
} from './MarkdownComponents';

const RichNoteEditor = ({ initialNote, onSave }) => {
  const [mode, setMode] = useState('write');
  const [text, setText] = useState(initialNote || '');

  useEffect(() => {
    setText(initialNote || '');
  }, [initialNote]);

  const handleBlur = () => {
    if (text !== initialNote) onSave(text);
  };

  return (
    <div className="relative w-full max-w-full min-w-0 overflow-hidden rounded-[24px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm transition-all duration-300 focus-within:border-indigo-300 dark:focus-within:border-indigo-800 focus-within:shadow-[0_8px_30px_-12px_rgba(99,102,241,0.2)]">
      
      {/* =========================================================
          PREMIUM TOOLBAR
      ========================================================= */}
      <div className="relative flex items-center justify-between px-3 py-2.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md w-full min-w-0">
        
        {/* Subtle Top Glow */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center shrink-0 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-indigo-500 dark:text-indigo-400 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5V4.5a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0120 4.5v15a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 19.5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8M8 15h5" />
            </svg>
          </div>
          
          {/* iOS-Style Segmented Control */}
          <div className="flex items-center p-1 rounded-[14px] bg-slate-200/50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shrink-0">
            <button 
              onClick={(e) => { e.stopPropagation(); setMode('write'); }} 
              className={`group relative flex items-center justify-center gap-2 px-4 py-1.5 rounded-[10px] text-xs font-bold transition-all duration-300 focus:outline-none active:scale-[0.97]
                ${mode === 'write' 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-600' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              Write
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setMode('preview'); }} 
              className={`group relative flex items-center justify-center gap-2 px-4 py-1.5 rounded-[10px] text-xs font-bold transition-all duration-300 focus:outline-none active:scale-[0.97]
                ${mode === 'preview' 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-600' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" /><circle cx="12" cy="12" r="2.5" /></svg>
              Preview
            </button>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80">
          <span className="relative flex h-2 w-2">
            {mode === 'write' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${mode === 'write' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
          </span>
          {mode === 'write' ? 'Editing' : 'Preview'}
        </div>
      </div>

      {/* =========================================================
          EDITOR & PREVIEW BODY
      ========================================================= */}
      <div className="relative bg-white/50 dark:bg-slate-950/50 min-h-[300px] flex flex-col w-full max-w-full min-w-0" onClick={(e) => e.stopPropagation()}>
        {mode === 'write' ? (
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            placeholder="Write architecture notes... (Supports Markdown, Mermaid, LaTeX, and SVGs)"
            className="flex-1 w-full max-w-full min-h-[300px] p-5 md:p-6 pb-20 md:pb-6 text-[14px] md:text-sm font-mono bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none resize-y text-slate-700 dark:text-slate-300 placeholder:text-slate-400/80 dark:placeholder:text-slate-600 custom-scrollbar leading-relaxed break-words"
          />
          
        ) : (
          
          <div className="flex-1 p-5 md:p-8 pb-20 md:pb-8 min-h-[300px] text-sm text-slate-800 dark:text-slate-200 overflow-x-hidden overflow-y-auto custom-scrollbar animate-[fade-in_0.2s_ease-out] w-full max-w-full min-w-0 break-words [overflow-wrap:anywhere]">
            <div className="max-w-3xl mx-auto w-full px-1">
              <MarkdownErrorBoundary>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[
                    rehypeRaw,
                    [rehypeSanitize, markdownSanitizeSchema],
                    rehypeKatex,
                  ]}
                  components={{
                    
                    // SMART CODE RENDERER
                    code({ inline, className, children, ...props }) {
                      const rawCode = safeString(Array.isArray(children) ? children.join('') : children);
                      const match = /language-([^\s]+)/i.exec(className || '');
                      const language = normalizeLanguage(match?.[1] || 'text');
                      const isInline = typeof inline !== 'undefined' ? inline : !match && !rawCode.includes('\n');

                      if (!isInline && language === 'mermaid') {
                        return <MermaidChart chart={rawCode.replace(/\n$/, '')} />;
                      }
                      if (!isInline) {
                        return <CodeBlock language={language} code={rawCode} {...props} />;
                      }
                      return (
                        <code className="break-all whitespace-pre-wrap rounded-[6px] border border-slate-200/80 bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] font-semibold text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-indigo-400" {...props}>
                          {children}
                        </code>
                      );
                    },

                    // SVG AND RAW HTML FIXES
                    svg: ({ node, className, ...props }) => (
                      <svg className={`my-4 h-auto max-w-full text-slate-800 dark:text-slate-200 ${className || ''}`} {...convertKebabToCamel(props)} />
                    ),
                    text: SvgElement('text'),
                    rect: SvgElement('rect'),
                    polygon: SvgElement('polygon'),
                    line: SvgElement('line'),
                    path: SvgElement('path'),
                    circle: SvgElement('circle'),
                    ellipse: SvgElement('ellipse'),
                    g: SvgElement('g'),
                    tspan: SvgElement('tspan'),

                    // -------------------------------------------------------------
                    // HIGH-END TYPOGRAPHY & LAYOUT STYLING
                    // -------------------------------------------------------------
                    
                    // Tables
                    table({ children, ...props }) { return <div className="my-8 w-full max-w-full overflow-x-auto rounded-[16px] border border-slate-200 dark:border-slate-700 shadow-sm custom-scrollbar"><table className="w-full min-w-[500px] border-collapse text-left text-sm" {...props}>{children}</table></div>; },
                    thead({ children, ...props }) { return <thead className="border-b-2 border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80" {...props}>{children}</thead>; },
                    th({ children, ...props }) { return <th className="whitespace-nowrap border-r border-slate-200 px-4 py-3 font-extrabold text-slate-800 uppercase tracking-wide text-[11px] last:border-r-0 dark:border-slate-700 dark:text-slate-300" {...props}>{children}</th>; },
                    td({ children, ...props }) { return <td className="min-w-[150px] border-b border-r border-slate-200 px-4 py-3.5 align-top last:border-r-0 dark:border-slate-700" {...props}>{children}</td>; },
                    tr({ children, ...props }) { return <tr className="even:bg-slate-50/40 last:[&>td]:border-b-0 dark:even:bg-slate-800/30 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60" {...props}>{children}</tr>; },
                    
                    // Media & Links
                    img({ alt, src, title, ...props }) {
                      const safeSrc = isSafeUrl(src, { allowDataImage: true }) ? src : '';
                      if (!safeSrc) return <span className="my-6 flex w-full flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400"><span className="font-bold">Image unavailable</span>{alt ? <span className="mt-1 break-words opacity-75">{alt}</span> : null}</span>;
                      return <ImageWithFallback src={safeSrc} alt={alt} title={title} {...props} />;
                    },
                    a({ href, title, children, ...props }) {
                      const safeHref = isSafeUrl(href);
                      if (!safeHref) return <span className="break-words text-slate-500 dark:text-slate-400" title="Unsafe link">{children}</span>;
                      return <a href={safeHref} title={title} target={/^(?:https?:)?\/\//i.test(safeHref) ? '_blank' : undefined} rel={/^(?:https?:)?\/\//i.test(safeHref) ? 'noopener noreferrer' : undefined} referrerPolicy="no-referrer" className="break-all font-bold text-indigo-600 underline decoration-indigo-300 underline-offset-4 hover:text-indigo-700 transition-colors dark:text-indigo-400 dark:decoration-indigo-700 dark:hover:text-indigo-300" {...props}>{children}</a>;
                    },
                    
                    // Lists & Checkboxes
                    input({ type, checked, disabled, ...props }) {
                      if (type === 'checkbox') return <input type="checkbox" checked={Boolean(checked)} disabled={disabled ?? true} readOnly className="mr-3 h-4 w-4 rounded-md border-slate-300 align-[-2px] accent-indigo-600 dark:border-slate-600 dark:bg-slate-800 shadow-sm" {...props} />;
                      return <input type={type} {...props} />;
                    },
                    ul({ children, ...props }) { return <ul className="my-5 list-disc space-y-2 pl-6 marker:text-indigo-400 dark:marker:text-indigo-500" {...props}>{children}</ul>; },
                    ol({ children, ...props }) { return <ol className="my-5 list-decimal space-y-2 pl-6 font-medium marker:text-indigo-500 dark:marker:text-indigo-400" {...props}>{children}</ol>; },
                    
                    // Typography
                    h1({ children, ...props }) { return <h1 className="mt-8 mb-5 break-words border-b border-slate-200/80 pb-3 text-2xl font-black tracking-tight text-slate-900 dark:border-slate-800 dark:text-white md:text-3xl" {...props}>{children}</h1>; },
                    h2({ children, ...props }) { return <h2 className="mt-8 mb-4 break-words border-b border-slate-100 pb-2 text-xl font-extrabold tracking-tight text-slate-800 dark:border-slate-800 dark:text-slate-50 md:text-2xl" {...props}>{children}</h2>; },
                    h3({ children, ...props }) { return <h3 className="mt-6 mb-3 break-words text-lg font-bold text-slate-800 dark:text-slate-200 md:text-xl" {...props}>{children}</h3>; },
                    h4({ children, ...props }) { return <h4 className="mt-5 mb-2 break-words text-base font-bold text-slate-700 dark:text-slate-300 md:text-lg" {...props}>{children}</h4>; },
                    p({ children, ...props }) { return <p className="mb-4 break-words leading-relaxed text-slate-700 dark:text-slate-300" {...props}>{children}</p>; },
                    blockquote({ children, ...props }) { return <blockquote className="my-6 break-words border-l-4 border-indigo-400 bg-indigo-50/50 px-5 py-3.5 text-slate-700 dark:border-indigo-600 dark:bg-indigo-900/10 dark:text-slate-300 rounded-r-xl italic shadow-sm" {...props}>{children}</blockquote>; },
                    hr(props) { return <hr className="my-8 border-slate-200 dark:border-slate-800" {...props} />; },
                    pre({ children, ...props }) { return <pre className="my-6 max-w-full overflow-x-auto rounded-[20px] shadow-sm" {...props}>{children}</pre>; },
                    strong({ children, ...props }) { return <strong className="font-extrabold text-slate-900 dark:text-white" {...props}>{children}</strong>; },
                    
                  }}
                >
                  {text || '*No notes saved.*'}
                </ReactMarkdown>
              </MarkdownErrorBoundary>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default RichNoteEditor;