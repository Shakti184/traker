import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const FocusNoteModal = ({ task, isOpen, onClose }) => {
  if (!isOpen || !task) return null;

  const links = task.links || [];

  const getDomainLabel = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'Link';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-8 bg-slate-950/90 sm:bg-slate-950/80 backdrop-blur-md transition-opacity">

      <div className="relative bg-white dark:bg-slate-950 w-full max-w-5xl h-full sm:h-[95vh] rounded-none sm:rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden sm:border border-slate-200/80 dark:border-slate-800 animate-fade-in-up">

        {/* Premium top accent */}
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

        {/* Header */}
        <div className="relative flex items-center justify-between p-4 md:px-6 md:py-5 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shrink-0">

          <div className="flex items-center gap-3 min-w-0 pr-4">

            {/* Topic icon */}
            <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">

                <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400 truncate">
                  {task.dayLabel}
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />

                <span className="text-[9px] md:text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                  Phase {task.phaseId.replace('phase', '')}
                </span>
              </div>

              <h2 className="text-lg md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                {task.topic}
              </h2>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="group flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white active:scale-95"
            title="Close reading view"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Reading Body */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar bg-slate-50/50 dark:bg-slate-950 w-full max-w-full min-w-0 break-words [overflow-wrap:anywhere]">

          <div className="max-w-3xl mx-auto w-full max-w-full min-w-0">

            {/* Directive */}
            <div className="relative mb-7 md:mb-9 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-indigo-50/40 dark:border-blue-900/30 dark:from-blue-950/30 dark:to-indigo-950/10">

              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500" />

              <div className="p-4 md:p-5 pl-5 md:pl-6">

                <div className="flex items-center gap-2 mb-2">

                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400">
                    Focus Directive
                  </span>
                </div>

                <blockquote className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed italic break-words">
                  {task.directive}
                </blockquote>
              </div>
            </div>

            {/* Saved Resources */}
            {links.length > 0 && (
              <div className="mb-7 md:mb-9">

                <div className="flex items-center gap-3 mb-3">

                  <h3 className="text-[10px] md:text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.16em]">
                    Saved Resources
                  </h3>

                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="flex flex-wrap gap-2">

                  {links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-white text-blue-700 dark:bg-slate-900 dark:text-blue-400 border border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-700/50 dark:hover:bg-blue-950/30 transition-all duration-200 shadow-sm hover:shadow-md max-w-full min-w-0"
                    >

                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </span>

                      <span className="truncate flex-1 min-w-0">
                        {getDomainLabel(link)}
                      </span>

                      <svg
                        className="w-3 h-3 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  ))}

                </div>
              </div>
            )}

            {/* Notes Heading */}
            <div className="flex items-center gap-3 mb-5">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <h3 className="text-xs md:text-sm font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">
                Study Notes & Architectures
              </h3>

              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Markdown */}
            {task.notes ? (

              <div className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed w-full max-w-full min-w-0">

                <div className="w-full max-w-full overflow-x-hidden min-w-0">

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');

                        return match ? (
                          <div className="relative w-full max-w-full rounded-2xl my-4 overflow-hidden border border-slate-700/70 bg-[#1E1E1E] shadow-lg">

                            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#181818]">

                              <div className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                              </div>

                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                                {match[1]}
                              </span>
                            </div>

                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              wrapLongLines={true}
                              customStyle={{
                                margin: 0,
                                padding: '1rem',
                                background: 'transparent',
                                fontSize: '0.85rem',
                                lineHeight: '1.6',
                              }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>

                          </div>
                        ) : (
                          <code
                            className="bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-md text-xs md:text-sm font-mono border border-slate-200 dark:border-slate-700 break-all whitespace-pre-wrap"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },

                      a: ({ node, ...props }) => (
                        <a
                          className="text-blue-600 dark:text-blue-400 font-semibold hover:text-indigo-600 dark:hover:text-indigo-300 hover:underline break-all transition-colors"
                          target="_blank"
                          rel="noreferrer"
                          {...props}
                        />
                      ),

                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc pl-5 my-3 space-y-2 marker:text-blue-400"
                          {...props}
                        />
                      ),

                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal pl-5 my-3 space-y-2 marker:text-blue-500"
                          {...props}
                        />
                      ),

                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-xl md:text-2xl font-extrabold mt-8 mb-4 break-words text-slate-900 dark:text-white tracking-tight"
                          {...props}
                        />
                      ),

                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-lg md:text-xl font-bold mt-7 mb-3 break-words border-b border-slate-200 dark:border-slate-800 pb-2 text-slate-800 dark:text-slate-100 tracking-tight"
                          {...props}
                        />
                      ),

                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-base md:text-lg font-bold mt-6 mb-2 break-words text-slate-700 dark:text-slate-200"
                          {...props}
                        />
                      ),

                      p: ({ node, ...props }) => (
                        <p
                          className="mb-4 leading-7 break-words"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {task.notes}
                  </ReactMarkdown>

                </div>
              </div>

            ) : (

              /* Empty State */
              <div className="py-12 px-5 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-center bg-white dark:bg-slate-900/50">

                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
                  No notes were saved during this study session.
                </p>

                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  Your study notes will appear here.
                </p>

              </div>
            )}

          </div>
        </div>

        {/* Bottom reading indicator */}
        <div className="hidden sm:flex items-center justify-center border-t border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 py-2 shrink-0">
          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Focus Reading Mode
          </div>
        </div>

      </div>
    </div>
  );
};

export default FocusNoteModal;

