import React, { useState } from 'react';
import RichNoteEditor from './RichNoteEditor';
import FocusNoteModal from './FocusNoteModal';

const TaskRow = React.memo(({ task, onToggle, onUpdateNote, onUpdateLinks }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  
  const links = task.links || [];

  const handleRowClick = () => {
    onToggle(task.id);
    if (!task.isCompleted && isExpanded) setIsExpanded(false);
  };

  const handleActionButtonClick = (e) => {
    e.stopPropagation();
    if (task.isCompleted) setIsReadModalOpen(true);
    else setIsExpanded(!isExpanded);
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newLinkUrl.trim()) return;
    const formattedUrl = newLinkUrl.startsWith('http') ? newLinkUrl : `https://${newLinkUrl}`;
    onUpdateLinks(task.id, [...links, formattedUrl]);
    setNewLinkUrl('');
  };

  const handleRemoveLink = (e, indexToRemove) => {
    e.stopPropagation();
    onUpdateLinks(task.id, links.filter((_, idx) => idx !== indexToRemove));
  };

  const getDomainLabel = (url) => {
    try { return new URL(url).hostname.replace('www.', ''); } 
    catch { return "Link"; }
  };

  const hasData = task.notes || links.length > 0;
  const formattedDayLabel = task.dayLabel.replace('-', '•');

  return (
    <>
      <div className={`group w-full max-w-full min-w-0 relative flex flex-col p-4 md:p-6 my-3 rounded-2xl border transition-all duration-300 overflow-hidden
          ${task.isCompleted 
            ? 'bg-slate-50 border-slate-200/50 dark:bg-slate-900/40 dark:border-slate-800/50' 
            : 'bg-white border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md dark:bg-slate-800 dark:border-slate-700/80 dark:hover:border-blue-500/50'}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 dark:from-blue-900/10 transition-opacity duration-500 pointer-events-none" />

        <div onClick={handleRowClick} className="flex items-start gap-3 md:gap-5 cursor-pointer relative z-10 w-full max-w-full min-w-0">
          
          <div className="relative flex-shrink-0 mt-1 md:mt-1.5">
            <div className={`w-7 h-7 md:w-8 md:h-8 rounded-[10px] border-2 flex items-center justify-center transition-all duration-300 shadow-sm
              ${task.isCompleted 
                ? 'bg-blue-600 border-blue-600 scale-95 dark:bg-blue-500 dark:border-blue-500' 
                : 'bg-white border-slate-300 dark:bg-slate-900 dark:border-slate-600 group-hover:border-blue-400 dark:group-hover:border-blue-400'}`}
            >
              <svg className={`w-4 h-4 md:w-5 md:h-5 text-white transition-all duration-300 ${task.isCompleted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col flex-1 transition-all duration-300 min-w-0 max-w-full">
            
            <div className={`transition-all duration-300 ${task.isCompleted ? 'opacity-50' : 'opacity-100'} min-w-0`}>
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1.5 block">
                {formattedDayLabel}
              </span>
              
              <h3 className={`font-extrabold text-slate-900 dark:text-slate-100 text-lg md:text-xl leading-tight mb-2.5 break-words
                ${task.isCompleted ? 'line-through decoration-slate-400 dark:decoration-slate-500' : ''}`}
              >
                {task.topic}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed pr-2 md:pr-4 mb-4 break-words">
                {task.directive}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1 w-full max-w-full">
              <button 
                onClick={handleActionButtonClick}
                className={`font-bold rounded-lg transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap shrink-0
                  ${task.isCompleted
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 text-sm md:text-base px-4 py-2 md:py-2.5 dark:bg-indigo-500 dark:hover:bg-indigo-400' 
                    : hasData 
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:hover:bg-amber-900/60 text-xs md:text-sm px-3.5 py-2'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-xs md:text-sm px-3.5 py-2'
                  }`}
              >
                {task.isCompleted ? (
                  <>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    Review Notes
                  </>
                ) : isExpanded ? (
                  <>Collapse <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg></>
                ) : (
                  <>Study Space {hasData ? '📌' : '➕'}</>
                )}
              </button>

              {/* FIX: Changed these from <span> to actual <a> links so they are clickable even when row is collapsed/completed */}
              {!isExpanded && links.length > 0 && (
                <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                  {links.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()} // FIX: Prevents the click from checking/unchecking the box
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 truncate max-w-[140px] md:max-w-xs
                        ${task.isCompleted
                          ? 'bg-indigo-50 border border-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-800/50 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
                          : 'bg-white border border-slate-200 text-slate-600 dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                    >
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span className="truncate">{getDomainLabel(link)}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {isExpanded && !task.isCompleted && (
          <div className="mt-5 relative z-10 border-t border-slate-100 dark:border-slate-800 pt-5 w-full max-w-full min-w-0">
            <div className="mb-4 animate-fade-in-up w-full max-w-full min-w-0" onClick={e => e.stopPropagation()}>
              <form onSubmit={handleAddLink} className="flex gap-2 mb-3 w-full max-w-full">
                <input 
                  type="url" 
                  value={newLinkUrl} 
                  onChange={(e) => setNewLinkUrl(e.target.value)} 
                  placeholder="Paste external URL..." 
                  className="flex-1 px-3 py-2.5 text-base md:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-slate-800 dark:text-slate-200 transition-all min-w-0"
                />
                <button type="submit" className="px-4 py-2.5 bg-slate-800 dark:bg-slate-700 text-white text-sm font-bold rounded-xl hover:bg-slate-700 transition-colors shrink-0">
                  Add Link
                </button>
              </form>
              
              {links.length > 0 && (
                <div className="flex flex-wrap gap-2 w-full max-w-full min-w-0">
                  {links.map((link, idx) => (
                    <div key={idx} className="group/pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-blue-400 max-w-full min-w-0">
                      <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 truncate flex-1 min-w-0">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        <span className="truncate">{getDomainLabel(link)}</span>
                      </a>
                      <button onClick={(e) => handleRemoveLink(e, idx)} className="ml-1.5 text-slate-300 hover:text-red-500 transition-colors shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <RichNoteEditor initialNote={task.notes} onSave={(text) => onUpdateNote(task.id, text)} />
          </div>
        )}
      </div>

      <FocusNoteModal task={task} isOpen={isReadModalOpen} onClose={() => setIsReadModalOpen(false)} />
    </>
  );
});

export default TaskRow;