import React, { useState } from 'react';
import RichNoteEditor from './RichNoteEditor';
import useGeminiStream from '../hooks/useGeminiStream';

const FocusWriteMode = ({ task, isOpen, onClose, onUpdateNote, onUpdateLinks }) => {
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isDirectiveCopied, setIsDirectiveCopied] = useState(false);
  const [aiPrompt, setAiPrompt] = useState(''); 

  const { isGenerating, cooldown, generateAIResponse } = useGeminiStream();

  if (!isOpen || !task) return null;

  const links = task.links || [];

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newLinkUrl.trim()) return;
    const formattedUrl = newLinkUrl.startsWith('http') ? newLinkUrl : `https://${newLinkUrl}`;
    onUpdateLinks(task.id, [...links, formattedUrl]);
    setNewLinkUrl('');
  };

  const handleRemoveLink = (indexToRemove) => {
    onUpdateLinks(task.id, links.filter((_, idx) => idx !== indexToRemove));
  };

  const getDomainLabel = (url) => {
    try { return new URL(url).hostname.replace('www.', ''); } catch { return "Link"; }
  };

  const handleCopyDirective = async () => {
    if (!task.directive) return;
    try {
      await navigator.clipboard.writeText(task.directive);
      setIsDirectiveCopied(true);
      setTimeout(() => setIsDirectiveCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy directive', err);
    }
  };

  const onTriggerAI = (e) => {
    if (e) e.preventDefault();
    generateAIResponse(task, aiPrompt, onUpdateNote, () => setAiPrompt(''));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-900/40 backdrop-blur-md transition-all duration-300">
      
      {/* Modal Container */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl h-full sm:h-[95vh] rounded-none sm:rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] sm:border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-[scale-in_0.25s_ease-out]">
        
        {/* =========================================================
            UNIFIED SCROLL CONTAINER (Header now scrolls away!)
        ========================================================= */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30 w-full max-w-full min-w-0">
          
          {/* HEADER (Now sits inside the scrollable view) */}
          <div className="relative flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200/60 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 sm:rounded-t-[32px] shrink-0">
            
            {/* Subtle Top Gradient Line */}
            <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 opacity-80" />

            <div className="flex items-center gap-4 min-w-0 pr-4 mt-1">
              {/* Header Icon */}
              <div className="hidden sm:flex shrink-0 items-center justify-center w-12 h-12 rounded-[16px] bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
                    <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.15em] text-indigo-700 dark:text-indigo-400 truncate">
                      Focus Write Mode
                    </span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold bg-slate-200/50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 border border-slate-200 dark:border-slate-700">
                    {task.dayLabel}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                  {task.topic}
                </h2>
              </div>
            </div>

            <button 
              onClick={onClose} 
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl md:rounded-[16px] border border-slate-200/80 bg-white text-slate-400 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 shadow-sm dark:border-slate-700/80 dark:bg-slate-800 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white active:scale-90"
              aria-label="Close Modal"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* MAIN SCROLLABLE CONTENT */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 md:gap-8 pb-10">
              
              {/* Focus Directive Card */}
              <div className="relative overflow-hidden rounded-[24px] border border-indigo-100/80 bg-gradient-to-br from-indigo-50/80 to-blue-50/40 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:to-blue-500/5 group shadow-sm transition-all hover:shadow-md">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-cyan-400" />
                
                <button 
                  onClick={handleCopyDirective}
                  className="absolute top-4 right-4 flex items-center justify-center p-2 rounded-[12px] bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-90 backdrop-blur-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 shadow-sm"
                  title="Copy Directive"
                >
                  {isDirectiveCopied ? (
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  )}
                </button>

                <div className="p-5 md:p-6 pl-6 md:pl-8 pr-14">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Focus Directive</span>
                  </div>
                  <blockquote className="text-slate-700 dark:text-slate-300 text-[15px] md:text-base leading-relaxed font-medium break-words">
                    {task.directive}
                  </blockquote>
                </div>
              </div>

              {/* Resources & Links Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-[10px] md:text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1">Resources & Links</h3>
                  <div className="h-px flex-1 bg-slate-200/80 dark:bg-slate-800/80" />
                </div>
                
                <form onSubmit={handleAddLink} className="flex flex-col sm:flex-row gap-2.5 mb-4 w-full max-w-full">
                  <input 
                    type="url" 
                    value={newLinkUrl} 
                    onChange={(e) => setNewLinkUrl(e.target.value)} 
                    placeholder="Paste an external URL here..." 
                    className="w-full sm:flex-1 px-4 py-3.5 text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[16px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 dark:text-slate-200 transition-all min-w-0 shadow-sm placeholder-slate-400 dark:placeholder-slate-600" 
                  />
                  <button type="submit" className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-bold rounded-[16px] hover:bg-slate-700 dark:hover:bg-white transition-colors shrink-0 shadow-sm active:scale-95">
                    Add Link
                  </button>
                </form>
                
                {links.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 w-full max-w-full min-w-0">
                    {links.map((link, idx) => (
                      <div key={idx} className="group/pill inline-flex items-center gap-2 p-1.5 pr-3.5 rounded-[14px] text-[13px] font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all max-w-full min-w-0 hover:border-indigo-200 dark:hover:border-indigo-500/30">
                        <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 truncate flex-1 min-w-0 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover/pill:bg-indigo-50 group-hover/pill:text-indigo-500 dark:group-hover/pill:bg-indigo-500/10 dark:group-hover/pill:text-indigo-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                          </span>
                          <span className="truncate text-slate-700 dark:text-slate-300">{getDomainLabel(link)}</span>
                        </a>
                        <button 
                          onClick={() => handleRemoveLink(idx)} 
                          className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors active:scale-90"
                          title="Remove Link"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Workspace & AI Editor Section */}
              <div className="flex flex-col flex-1 pb-10">
                <div className="flex items-center gap-3 w-full mb-4 mt-2">
                  <h3 className="text-[10px] md:text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1">Workspace & AI Assistant</h3>
                  <div className="h-px flex-1 bg-slate-200/80 dark:bg-slate-800/80" />
                </div>

                <form onSubmit={onTriggerAI} className="flex flex-col sm:flex-row gap-2.5 w-full mb-4">
                  <input 
                    type="text" 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder={task.notes ? "Ask AI to expand or type 'Next' for the next problem..." : "Add custom instructions..."}
                    className="w-full sm:flex-1 px-4 py-3.5 text-sm font-semibold bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/40 rounded-[16px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 text-slate-800 dark:text-slate-200 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm min-w-0"
                    disabled={isGenerating || cooldown > 0}
                  />
                  <button 
                    type="submit"
                    disabled={isGenerating || cooldown > 0}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[16px] text-[13px] font-bold text-white transition-all shadow-lg shrink-0 ${
                      isGenerating || cooldown > 0 
                        ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none opacity-80' 
                        : 'bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 hover:from-indigo-600 hover:via-blue-700 hover:to-cyan-600 active:scale-95 shadow-indigo-500/25'
                    }`}
                  >
                    {isGenerating ? (
                      <svg className="animate-spin -ml-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : cooldown > 0 ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ) : task.notes ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    )}
                    {isGenerating ? 'Generating...' : cooldown > 0 ? `Wait ${cooldown}s` : task.notes ? 'Ask AI' : 'Generate Notes'}
                  </button>
                </form>
                
                {/* Rich Editor Component */}
                <RichNoteEditor initialNote={task.notes} onSave={(text) => onUpdateNote(task.id, text)} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusWriteMode;