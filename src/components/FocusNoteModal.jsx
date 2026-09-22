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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-md transition-opacity">
      {/* Fullscreen-style Card */}
      <div className="bg-white dark:bg-slate-950 w-full max-w-4xl h-full md:h-[90vh] rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 animate-fade-in-up">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between p-5 md:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {task.dayLabel}
              </span>
              <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Phase {task.phaseId.replace('phase', '')}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {task.topic}
            </h2>
          </div>
          
          <button 
            onClick={onClose} 
            className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors active:scale-95"
            title="Close reading view"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Reading Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-10 custom-scrollbar bg-white dark:bg-slate-950">
          <div className="max-w-3xl mx-auto">
            
            {/* Directive Quote Block */}
            <blockquote className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed border-l-4 border-blue-500 pl-5 italic">
              {task.directive}
            </blockquote>

            {/* External Links Section */}
            {links.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Saved Resources</h3>
                <div className="flex flex-wrap gap-3">
                  {links.map((link, idx) => (
                    <a key={idx} href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shadow-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      {getDomainLabel(link)}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Rendered Notes Section */}
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">Study Notes & Architectures</h3>
            
            {task.notes ? (
              <div className="text-slate-800 dark:text-slate-200 text-base md:text-lg leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" className="rounded-xl shadow-lg text-sm md:text-base my-6 border border-slate-800" {...props}>
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-md text-sm font-mono border border-slate-200 dark:border-slate-700" {...props}>
                          {children}
                        </code>
                      )
                    },
                    a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 font-semibold hover:underline" target="_blank" rel="noreferrer" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 space-y-2 marker:text-slate-400" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 space-y-2 marker:text-slate-400 font-semibold" {...props} />,
                    h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold mt-10 mb-4 text-slate-900 dark:text-white" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-slate-700 dark:text-slate-200" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-extrabold text-slate-900 dark:text-white" {...props} />,
                  }}
                >
                  {task.notes}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center bg-slate-50 dark:bg-slate-900/50">
                <p className="text-slate-500 dark:text-slate-400 font-medium">No notes were saved during this study session.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusNoteModal;