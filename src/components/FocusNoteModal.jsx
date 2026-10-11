import React, { useEffect, useMemo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

// Import our shared Markdown logic and components
import {
  markdownSanitizeSchema,
  MarkdownErrorBoundary,
  CodeBlock,
  MermaidChart,
  ImageWithFallback,
  safeString,
  isSafeUrl,
  getDomainLabel,
  getPhaseLabel,
  convertKebabToCamel,
  SvgElement,
  normalizeLanguage
} from './MarkdownComponents';

const FocusNoteModal = ({ task, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const normalizedTask = useMemo(() => {
    if (!task || typeof task !== 'object') return null;
    const rawLinks = Array.isArray(task.links) ? task.links : [];
    return {
      ...task,
      dayLabel: safeString(task.dayLabel, 'Study Session'),
      topic: safeString(task.topic, 'Study Notes'),
      phaseId: safeString(task.phaseId),
      directive: safeString(task.directive),
      notes: safeString(task.notes),
      links: rawLinks.filter((link) => typeof link === 'string' && link.trim()).map((link) => link.trim()),
    };
  }, [task]);

  const links = normalizedTask?.links || [];

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen || !normalizedTask) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen, normalizedTask]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen || !normalizedTask) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose?.(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); };
  }, [isOpen, normalizedTask, onClose]);

  // Auto-focus close button for accessibility
  useEffect(() => {
    if (!isOpen || !normalizedTask) return;
    const frame = window.requestAnimationFrame(() => { closeButtonRef.current?.focus(); });
    return () => { window.cancelAnimationFrame(frame); };
  }, [isOpen, normalizedTask]);

  if (!isOpen || !normalizedTask) return null;

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) onClose?.();
  };

  const handleSafeResourceOpen = (event, url) => {
    if (!isSafeUrl(url)) event.preventDefault();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-900/40 backdrop-blur-md transition-all duration-300" 
      role="presentation" 
      onMouseDown={handleBackdropMouseDown}
    >
      {/* Modal Container */}
      <div 
        ref={modalRef} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="focus-note-modal-title" 
        className="bg-white dark:bg-slate-900 w-full max-w-5xl h-full sm:h-[95vh] rounded-none sm:rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] sm:border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-[scale-in_0.25s_ease-out]" 
        onMouseDown={(event) => event.stopPropagation()}
      >
        
        {/* =========================================================
            UNIFIED SCROLL CONTAINER (Header now scrolls away!)
        ========================================================= */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30 w-full max-w-full min-w-0 [overflow-wrap:anywhere]">
          
          {/* HEADER (Now sits inside the scrollable view) */}
          <div className="relative flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200/60 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 sm:rounded-t-[32px] shrink-0">
            
            {/* Subtle Top Gradient Line */}
            <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-80" />

            <div className="flex items-center gap-4 min-w-0 pr-4 mt-1">
              {/* Header Icon (Book for Read Mode) */}
              <div className="hidden sm:flex shrink-0 items-center justify-center w-12 h-12 rounded-[16px] bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.15em] text-blue-700 dark:text-blue-400 truncate">
                      Reading Mode
                    </span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold bg-slate-200/50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 border border-slate-200 dark:border-slate-700">
                    {normalizedTask.dayLabel}
                  </span>
                </div>
                <h2 id="focus-note-modal-title" className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                  {normalizedTask.topic}
                </h2>
              </div>
            </div>

            <button 
              ref={closeButtonRef}
              onClick={() => onClose?.()} 
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl md:rounded-[16px] border border-slate-200/80 bg-white text-slate-400 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 shadow-sm dark:border-slate-700/80 dark:bg-slate-800 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white active:scale-90"
              aria-label="Close reading view"
              title="Close reading view"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* =========================================================
              MAIN CONTENT BODY
          ========================================================= */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 md:gap-8 pb-10">
              
              {/* Focus Directive Card */}
              {normalizedTask.directive && (
                <div className="relative overflow-hidden rounded-[24px] border border-blue-100/80 bg-gradient-to-br from-blue-50/80 to-indigo-50/40 dark:border-blue-500/20 dark:from-blue-500/10 dark:to-indigo-500/5 shadow-sm transition-all hover:shadow-md">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-500" />
                  <div className="p-5 md:p-6 pl-6 md:pl-8">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-white dark:bg-slate-900 shadow-sm text-blue-600 dark:text-blue-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Focus Directive</span>
                    </div>
                    <blockquote className="text-slate-700 dark:text-slate-300 text-[15px] md:text-base leading-relaxed font-medium break-words italic">
                      {normalizedTask.directive}
                    </blockquote>
                  </div>
                </div>
              )}

              {/* Saved Resources Section */}
              {links.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-[10px] md:text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1">Saved Resources</h3>
                    <div className="h-px flex-1 bg-slate-200/80 dark:bg-slate-800/80" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5 w-full max-w-full min-w-0">
                    {links.map((link, idx) => {
                      if (!isSafeUrl(link)) return null;
                      return (
                        <a 
                          key={`${link}-${idx}`} 
                          href={link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          referrerPolicy="no-referrer" 
                          onClick={(event) => handleSafeResourceOpen(event, link)} 
                          className="group inline-flex items-center gap-2.5 p-1.5 pr-4 rounded-[14px] text-[13px] font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all max-w-full min-w-0 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 active:scale-95" 
                          title={link} 
                          aria-label={`Open resource ${getDomainLabel(link)}`}
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400 transition-colors">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                          </span>
                          <span className="truncate text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{getDomainLabel(link)}</span>
                          <svg className="h-3.5 w-3.5 shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notes & Markdown Section */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 w-full mb-4 mt-2">
                  <h3 className="text-[10px] md:text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1">Study Notes & Architecture</h3>
                  <div className="h-px flex-1 bg-slate-200/80 dark:bg-slate-800/80" />
                </div>

                {normalizedTask.notes ? (
                  <div className="min-w-0 w-full max-w-full overflow-x-hidden">
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
                          // HIGH-END TYPOGRAPHY & LAYOUT STYLING (Same as FocusWriteMode)
                          // -------------------------------------------------------------
                          table({ children, ...props }) { return <div className="my-8 w-full max-w-full overflow-x-auto rounded-[16px] border border-slate-200 dark:border-slate-700 shadow-sm custom-scrollbar"><table className="w-full min-w-[500px] border-collapse text-left text-sm" {...props}>{children}</table></div>; },
                          thead({ children, ...props }) { return <thead className="border-b-2 border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80" {...props}>{children}</thead>; },
                          th({ children, ...props }) { return <th className="whitespace-nowrap border-r border-slate-200 px-4 py-3 font-extrabold text-slate-800 uppercase tracking-wide text-[11px] last:border-r-0 dark:border-slate-700 dark:text-slate-300" {...props}>{children}</th>; },
                          td({ children, ...props }) { return <td className="min-w-[150px] border-b border-r border-slate-200 px-4 py-3.5 align-top last:border-r-0 dark:border-slate-700" {...props}>{children}</td>; },
                          tr({ children, ...props }) { return <tr className="even:bg-slate-50/40 last:[&>td]:border-b-0 dark:even:bg-slate-800/30 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60" {...props}>{children}</tr>; },
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
                          input({ type, checked, disabled, ...props }) {
                            if (type === 'checkbox') return <input type="checkbox" checked={Boolean(checked)} disabled={disabled ?? true} readOnly className="mr-3 h-4 w-4 rounded-md border-slate-300 align-[-2px] accent-indigo-600 dark:border-slate-600 dark:bg-slate-800 shadow-sm" {...props} />;
                            return <input type={type} {...props} />;
                          },
                          ul({ children, ...props }) { return <ul className="my-5 list-disc space-y-2 pl-6 marker:text-indigo-400 dark:marker:text-indigo-500" {...props}>{children}</ul>; },
                          ol({ children, ...props }) { return <ol className="my-5 list-decimal space-y-2 pl-6 font-medium marker:text-indigo-500 dark:marker:text-indigo-400" {...props}>{children}</ol>; },
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
                        {normalizedTask.notes}
                      </ReactMarkdown>
                    </MarkdownErrorBoundary>
                  </div>
                ) : (
                  <div className="rounded-[24px] border-2 border-dashed border-slate-200 bg-white/50 px-5 py-16 text-center dark:border-slate-800 dark:bg-slate-900/30">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] bg-slate-100 text-slate-400 dark:bg-slate-800 shadow-inner">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300">No notes were saved during this study session.</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-slate-500">Your study notes and AI generated content will appear here.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FocusNoteModal;