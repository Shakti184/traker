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
      return "Link";
    }
  };

  return (
    // OPTIMIZATION: p-0 on mobile for true edge-to-edge reading space
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-8 bg-slate-900/95 sm:bg-slate-900/80 backdrop-blur-md transition-opacity">
      
      {/* OPTIMIZATION: rounded-none on mobile to maximize screen real estate */}
      <div className="bg-white dark:bg-slate-950 w-full max-w-4xl h-full sm:h-[95vh] rounded-none sm:rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden sm:border border-slate-200 dark:border-slate-800 animate-fade-in-up">
        
        {/* Header Navigation - Tighter padding */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {task.dayLabel}
              </span>
              <span className="text-[9px] md:text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Phase {task.phaseId.replace('phase', '')}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
              {task.topic}
            </h2>
          </div>
          
          <button 
            onClick={onClose} 
            className="p-2.5 bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors active:scale-95 shrink-0"
            title="Close reading view"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Reading Body - Strict overflow rules to prevent horizontal stretching */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar bg-white dark:bg-slate-950 w-full max-w-full min-w-0 break-words [overflow-wrap:anywhere]">
          <div className="max-w-3xl mx-auto w-full max-w-full min-w-0">
            
            <blockquote className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-6 md:mb-8 leading-relaxed border-l-4 border-blue-500 pl-4 italic break-words">
              {task.directive}
            </blockquote>

            {links.length > 0 && (
              <div className="mb-6 md:mb-8">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Saved Resources</h3>
                <div className="flex flex-wrap gap-2">
                  {links.map((link, idx) => (
                    <a key={idx} href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shadow-sm max-w-full min-w-0">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span className="truncate flex-1 min-w-0">{getDomainLabel(link)}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-xs md:text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Study Notes & Architectures</h3>
            
            {task.notes ? (
              <div className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed w-full max-w-full min-w-0">
                
                {/* BUG FIX: Removed className from ReactMarkdown, wrapped it in a strict container instead */}
                <div className="w-full max-w-full overflow-x-hidden min-w-0">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // BUG FIX: Removed 'inline' from destructuring, as it breaks in v9
                      code({node, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <div className="w-full max-w-full rounded-lg my-3 border border-slate-200 dark:border-slate-700 bg-[#1E1E1E]">
                            <SyntaxHighlighter 
                              style={vscDarkPlus} 
                              language={match[1]} 
                              PreTag="div" 
                              wrapLongLines={true} // Forces long lines to wrap
                              customStyle={{ margin: 0, padding: '0.75rem', background: 'transparent', fontSize: '0.85rem' }} 
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className="bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-xs md:text-sm font-mono border border-slate-200 dark:border-slate-700 break-all whitespace-pre-wrap" {...props}>
                            {children}
                          </code>
                        )
                      },
                      a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 font-semibold hover:underline break-all" target="_blank" rel="noreferrer" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2 space-y-1.5 marker:text-slate-400" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2 space-y-1.5 font-semibold marker:text-slate-400" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-xl md:text-2xl font-extrabold mt-6 mb-3 break-words text-slate-900 dark:text-white" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-lg md:text-xl font-bold mt-5 mb-2 break-words border-b border-slate-100 dark:border-slate-800 pb-1.5 text-slate-800 dark:text-slate-100" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-base md:text-lg font-bold mt-4 mb-1.5 break-words text-slate-700 dark:text-slate-200" {...props} />,
                      p: ({node, ...props}) => <p className="mb-3 leading-relaxed break-words" {...props} />
                    }}
                  >
                    {task.notes}
                  </ReactMarkdown>
                </div>

              </div>
            ) : (
              <div className="py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center bg-slate-50 dark:bg-slate-900/50">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No notes were saved during this study session.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusNoteModal;