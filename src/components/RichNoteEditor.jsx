import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const RichNoteEditor = ({ initialNote, onSave }) => {
  const [mode, setMode] = useState('write'); 
  const [text, setText] = useState(initialNote || '');

  useEffect(() => { setText(initialNote || ''); }, [initialNote]);
  const handleBlur = () => { if (text !== initialNote) onSave(text); };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col bg-white dark:bg-slate-950 shadow-sm w-full max-w-full min-w-0 overflow-hidden">
      
      {/* REDUCED PADDING: px-2 py-1.5 */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 w-full min-w-0">
        <div className="flex items-center bg-slate-200/50 dark:bg-slate-800 p-0.5 rounded-lg shrink-0">
          <button onClick={(e) => { e.stopPropagation(); setMode('write'); }} className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all ${mode === 'write' ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300' : 'text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'}`}>Write</button>
          <button onClick={(e) => { e.stopPropagation(); setMode('preview'); }} className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all ${mode === 'preview' ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300' : 'text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'}`}>Preview</button>
        </div>
      </div>

      <div className="relative bg-white dark:bg-slate-950 min-h-[250px] flex flex-col w-full max-w-full min-w-0" onClick={(e) => e.stopPropagation()}>
        {mode === 'write' ? (
          // REDUCED PADDING: p-3 md:p-4 instead of p-5
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            placeholder="Write architecture notes..."
            className="flex-1 w-full max-w-full min-h-[250px] p-3 md:p-4 pb-20 md:pb-4 text-base md:text-sm font-mono bg-transparent border-none focus:ring-0 resize-y text-slate-700 dark:text-slate-300 custom-scrollbar outline-none leading-relaxed break-words"
          />
        ) : (
          <div className="flex-1 p-3 md:p-4 pb-20 md:pb-4 min-h-[250px] text-sm text-slate-800 dark:text-slate-200 overflow-x-hidden overflow-y-auto custom-scrollbar animate-fade-in-up w-full max-w-full min-w-0 break-words [overflow-wrap:anywhere]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="w-full max-w-full rounded-lg my-3 border border-slate-200 dark:border-slate-700 bg-[#1E1E1E]">
                      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" wrapLongLines={true} customStyle={{ margin: 0, padding: '0.75rem', background: 'transparent', fontSize: '0.85rem' }} {...props}>
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : <code className="bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-1 py-0.5 rounded text-xs font-mono border border-slate-200 break-all whitespace-pre-wrap" {...props}>{children}</code>
                },
                a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 font-semibold hover:underline break-all" target="_blank" rel="noreferrer" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2 space-y-1 marker:text-slate-400" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2 space-y-1 font-semibold marker:text-slate-400" {...props} />,
                h1: ({node, ...props}) => <h1 className="text-lg font-extrabold mt-4 mb-2 break-words" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-base font-bold mt-3 mb-1 break-words" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-sm font-bold mt-2 mb-1 break-words" {...props} />,
                p: ({node, ...props}) => <p className="mb-3 leading-relaxed break-words" {...props} />
              }}
            >
              {text || '*No notes saved.*'}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default RichNoteEditor;