import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const RichNoteEditor = ({ initialNote, onSave }) => {
  const [mode, setMode] = useState('write'); 
  const [text, setText] = useState(initialNote || '');

  useEffect(() => {
    setText(initialNote || '');
  }, [initialNote]);

  const handleBlur = () => {
    if (text !== initialNote) {
      onSave(text);
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col bg-white dark:bg-slate-950 shadow-sm animate-fade-in-up w-full max-w-full min-w-0 overflow-hidden">
      
      {/* Segmented Control Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 w-full min-w-0">
        <div className="flex items-center bg-slate-200/50 dark:bg-slate-800 p-1 rounded-lg shrink-0">
          <button 
            onClick={(e) => { e.stopPropagation(); setMode('write'); }} 
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
              mode === 'write' 
                ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Write
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setMode('preview'); }} 
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
              mode === 'preview' 
                ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Preview
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative bg-white dark:bg-slate-950 min-h-[300px] flex flex-col w-full max-w-full min-w-0" onClick={(e) => e.stopPropagation()}>
        {mode === 'write' ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            placeholder="Write architecture notes here..."
            className="flex-1 w-full max-w-full min-h-[300px] p-4 md:p-5 text-base md:text-sm font-mono bg-transparent border-none focus:ring-0 resize-y text-slate-700 dark:text-slate-300 custom-scrollbar outline-none leading-relaxed break-words"
          />
        ) : (
          // FIX: Moved 'w-full max-w-full overflow-hidden' up to this parent container
          <div className="flex-1 p-4 md:p-5 min-h-[300px] text-base md:text-sm text-slate-800 dark:text-slate-200 overflow-x-hidden overflow-y-auto custom-scrollbar animate-fade-in-up w-full max-w-full min-w-0 break-words [overflow-wrap:anywhere]">
            
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              // FIX: Removed the className prop from here completely
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="w-full max-w-full overflow-x-auto rounded-lg my-4 border border-slate-200 dark:border-slate-700 bg-[#1E1E1E]">
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ margin: 0, background: 'transparent', maxWidth: '100%', overflowX: 'auto', minWidth: 0 }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-md text-xs md:text-sm font-mono border border-slate-200 dark:border-slate-700 break-all whitespace-pre-wrap" {...props}>
                      {children}
                    </code>
                  )
                },
                a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 font-semibold hover:underline break-all" target="_blank" rel="noreferrer" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 my-3 space-y-1 marker:text-slate-400" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-3 space-y-1 font-semibold marker:text-slate-400" {...props} />,
                h1: ({node, ...props}) => <h1 className="text-xl font-extrabold mt-5 mb-3 text-slate-900 dark:text-white break-words" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-4 mb-2 text-slate-800 dark:text-slate-100 break-words" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-base font-bold mt-3 mb-1 text-slate-700 dark:text-slate-200 break-words" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed break-words" {...props} />
              }}
            >
              {text || '*No notes saved yet. Switch to write mode to start typing!*'}
            </ReactMarkdown>

          </div>
        )}
      </div>
    </div>
  );
};

export default RichNoteEditor;