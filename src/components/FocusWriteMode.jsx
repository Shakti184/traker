import React, { useState } from 'react';
import RichNoteEditor from './RichNoteEditor';

const FocusWriteMode = ({ task, isOpen, onClose, onUpdateNote, onUpdateLinks }) => {
  const [newLinkUrl, setNewLinkUrl] = useState('');

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
    try { 
      return new URL(url).hostname.replace('www.', ''); 
    } catch { 
      return "Link"; 
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 md:p-8 bg-slate-900/95 sm:bg-slate-900/90 backdrop-blur-md transition-opacity animate-fade-in">
      <div className="relative bg-white dark:bg-slate-950 w-full max-w-5xl h-full sm:h-[95vh] rounded-none sm:rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden sm:border border-slate-200/80 dark:border-slate-800 animate-fade-in-up">
        
        {/* Premium top accent */}
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

        {/* Header */}
        <div className="relative flex items-center justify-between p-4 md:px-6 md:py-5 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shrink-0">
          
          <div className="flex items-center gap-3 min-w-0 pr-4">
            
            {/* Topic icon */}
            <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shrink-0" />
                  Focus Write Mode
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                <span className="text-[9px] md:text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                  {task.dayLabel}
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
            title="Close editor"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar bg-slate-50/50 dark:bg-slate-950 w-full max-w-full min-w-0">
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 md:gap-8">
            
            {/* Directive */}
            <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-violet-50/40 dark:border-indigo-900/30 dark:from-indigo-950/30 dark:to-violet-950/10">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-violet-500" />
              <div className="p-4 md:p-5 pl-5 md:pl-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400">
                    Focus Directive
                  </span>
                </div>
                <blockquote className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed italic break-words">
                  {task.directive}
                </blockquote>
              </div>
            </div>

            {/* Links Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-[10px] md:text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.16em]">
                  Resources & References
                </h3>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>
              
              <form onSubmit={handleAddLink} className="flex gap-2 mb-4 w-full max-w-full group">
                <input 
                  type="url" 
                  value={newLinkUrl} 
                  onChange={(e) => setNewLinkUrl(e.target.value)} 
                  placeholder="Paste external URL here..." 
                  className="flex-1 px-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-800 dark:text-slate-200 transition-all min-w-0 shadow-sm" 
                />
                <button type="submit" className="px-5 py-2.5 bg-slate-800 dark:bg-slate-700 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors shrink-0 shadow-sm active:scale-95">
                  Add Link
                </button>
              </form>
              
              {links.length > 0 && (
                <div className="flex flex-wrap gap-2 w-full max-w-full min-w-0">
                  {links.map((link, idx) => (
                    <div key={idx} className="group/pill inline-flex items-center gap-1.5 px-1.5 py-1.5 pr-3 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all max-w-full min-w-0">
                      <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 truncate flex-1 min-w-0 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                        </span>
                        <span className="truncate text-slate-700 dark:text-slate-300">{getDomainLabel(link)}</span>
                      </a>
                      <button 
                        onClick={() => handleRemoveLink(idx)} 
                        className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors"
                        title="Remove link"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Editor Section */}
            <div className="flex flex-col flex-1 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-[10px] md:text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.16em]">
                  Workspace
                </h3>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>
              <RichNoteEditor initialNote={task.notes} onSave={(text) => onUpdateNote(task.id, text)} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusWriteMode;