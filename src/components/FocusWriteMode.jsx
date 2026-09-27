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
    try { return new URL(url).hostname.replace('www.', ''); } catch { return "Link"; }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 md:p-8 bg-slate-900/95 sm:bg-slate-900/90 backdrop-blur-md transition-opacity animate-fade-in">
      <div className="bg-white dark:bg-slate-950 w-full max-w-5xl h-full sm:h-[95vh] rounded-none sm:rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden sm:border border-slate-200 dark:border-slate-800 animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                Focus Mode
              </span>
              <span className="text-[9px] md:text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {task.dayLabel}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
              {task.topic}
            </h2>
          </div>
          <button onClick={onClose} className="p-2.5 bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors active:scale-95 shrink-0">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar bg-white dark:bg-slate-950 w-full max-w-full min-w-0">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 md:gap-8">
            
            {/* Directive */}
            <blockquote className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed border-l-4 border-indigo-500 pl-4 bg-indigo-50/50 dark:bg-indigo-900/10 py-3 rounded-r-lg break-words">
              {task.directive}
            </blockquote>

            {/* Links Section */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Resources & References</h3>
              <form onSubmit={handleAddLink} className="flex gap-2 mb-3 w-full max-w-full">
                <input type="url" value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} placeholder="Paste external URL here..." className="flex-1 px-3 py-2 text-base md:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-800 dark:text-slate-200 transition-all min-w-0" />
                <button type="submit" className="px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white text-sm font-bold rounded-xl hover:bg-slate-700 transition-colors shrink-0">Add Link</button>
              </form>
              
              {links.length > 0 && (
                <div className="flex flex-wrap gap-2 w-full max-w-full min-w-0">
                  {links.map((link, idx) => (
                    <div key={idx} className="group/pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-indigo-400 max-w-full min-w-0">
                      <a href={link} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 truncate flex-1 min-w-0">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        <span className="truncate">{getDomainLabel(link)}</span>
                      </a>
                      <button onClick={() => handleRemoveLink(idx)} className="ml-1.5 text-slate-300 hover:text-red-500 transition-colors shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Editor Section */}
            <div className="flex flex-col flex-1 pb-10">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">Study Space</h3>
              <RichNoteEditor initialNote={task.notes} onSave={(text) => onUpdateNote(task.id, text)} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusWriteMode;