import React, { useState } from 'react';
import FocusNoteModal from './FocusNoteModal';

const TaskRow = React.memo(({ task, onToggle, onOpenFocusWrite, onEditTask, onDeleteTask }) => {
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const links = task.links || [];

  const handleRowClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onToggle(task.id);
  };

  const handleActionButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (task.isCompleted) {
      setIsReadModalOpen(true);
    } else {
      onOpenFocusWrite(task);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onEditTask) {
      onEditTask(task);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onDeleteTask && window.confirm("Are you sure you want to delete this custom task?")) {
      onDeleteTask(task.id);
    }
  };

  const getDomainLabel = (url) => {
    try { return new URL(url).hostname.replace('www.', ''); } 
    catch { return "Link"; }
  };

  const hasData = task.notes || links.length > 0;
  const formattedDayLabel = task.dayLabel.replace('-', '•');

  return (
    <>
      <div className={`group w-full max-w-full min-w-0 relative flex flex-col p-5 md:p-6 rounded-[24px] md:rounded-[32px] border transition-all duration-500 ease-out overflow-hidden
          ${task.isCompleted 
            ? 'bg-gradient-to-br from-slate-100/80 to-slate-50/50 border-slate-200/60 dark:from-slate-900/50 dark:to-slate-950/50 dark:border-slate-800/60 shadow-inner scale-[0.99]' 
            : 'bg-white border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_-10px_rgba(99,102,241,0.15)] hover:-translate-y-1 hover:border-indigo-300/80 dark:bg-slate-900/80 dark:border-slate-700/80 dark:hover:border-indigo-500/60'}
        `}
      >
        {!task.isCompleted && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        )}

        <div className="flex items-start gap-4 md:gap-6 relative z-10 w-full max-w-full min-w-0">
          
          <div onClick={handleRowClick} className="relative flex-shrink-0 mt-1 md:mt-1.5 cursor-pointer hover:scale-110 active:scale-90 transition-transform duration-300 z-20">
            <div className={`w-8 h-8 md:w-9 md:h-9 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ease-out shadow-sm
              ${task.isCompleted 
                ? 'bg-gradient-to-br from-indigo-500 to-blue-600 border-transparent shadow-[0_4px_16px_rgba(99,102,241,0.4)] scale-95' 
                : 'bg-slate-50 border-slate-300 dark:bg-slate-950 dark:border-slate-600 group-hover:border-indigo-400 dark:group-hover:border-indigo-400'}`}
            >
              <svg className={`w-4 h-4 md:w-5 md:h-5 text-white transition-all duration-500 ease-out ${task.isCompleted ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-45'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col flex-1 transition-all duration-300 min-w-0 max-w-full">
            <div className="transition-all duration-300 min-w-0">
              <div className="flex items-center flex-wrap gap-2.5 mb-2.5">
                {task.isCompleted ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
                    <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">Completed</span>
                  </div>
                ) : (
                  <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                )}
                
                <span className={`text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300 
                  ${task.isCompleted ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  {formattedDayLabel}
                </span>
              </div>
              
              <h3 className={`font-extrabold text-lg md:text-2xl leading-tight mb-2.5 break-words transition-colors duration-500
                ${task.isCompleted ? 'text-slate-600 dark:text-slate-300/80' : 'text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}
              >
                {task.topic}
              </h3>
              
              <p className={`text-sm md:text-base leading-relaxed pr-2 md:pr-4 mb-5 break-words transition-colors duration-500 font-medium
                ${task.isCompleted ? 'text-slate-400 dark:text-slate-500/80' : 'text-slate-600 dark:text-slate-300'}`}
              >
                {task.directive}
              </p>
            </div>

            {/* Actions Row */}
            <div className="flex flex-wrap items-center gap-3 w-full max-w-full relative z-20">
              <button 
                type="button"
                onClick={handleActionButtonClick}
                className={`font-bold rounded-xl transition-all duration-300 flex items-center gap-2 active:scale-95 whitespace-nowrap shrink-0 border cursor-pointer
                  ${task.isCompleted
                    ? 'bg-white/60 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800 shadow-sm text-xs md:text-sm px-4 py-2.5'
                    : 'bg-gradient-to-b from-indigo-500 to-blue-600 text-white border-indigo-400/50 hover:from-indigo-400 hover:to-blue-500 shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_24px_rgba(99,102,241,0.4)] text-xs md:text-sm px-5 py-2.5'
                  }`}
              >
                {task.isCompleted ? (
                  <>
                    <svg className="w-4 h-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    Review Notes
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    <span className="hidden md:inline">Focus</span> Write
                    {hasData && (
                      <span className="ml-1.5 flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                    )}
                  </>
                )}
              </button>

              {/* Resource Links */}
              {links.length > 0 && (
                <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                  {links.map((link, idx) => (
                    <a 
                      key={idx} href={link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} 
                      className={`group/link inline-flex items-center gap-1.5 px-3 py-2 md:py-2.5 rounded-xl text-xs font-semibold backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 truncate max-w-[140px] md:max-w-[200px] border
                        ${task.isCompleted
                          ? 'bg-transparent border-slate-200/60 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-400'
                          : 'bg-slate-50/80 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm'
                        }`}
                    >
                      <svg className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover/link:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span className="truncate">{getDomainLabel(link)}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Custom Task Controls (Edit & Delete) */}
              {task.isCustom && (
                <div className="flex items-center gap-1.5 ml-auto pl-3 md:pl-4 border-l border-slate-200 dark:border-slate-700/60 shrink-0 pointer-events-auto">
                  <button 
                    type="button"
                    onClick={handleEditClick}
                    className="flex items-center justify-center p-2.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all duration-300 active:scale-90 cursor-pointer"
                    title="Edit Task"
                  >
                    <svg className="w-4 h-4 md:w-4.5 md:h-4.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button 
                    type="button"
                    onClick={handleDeleteClick}
                    className="flex items-center justify-center p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all duration-300 active:scale-90 cursor-pointer"
                    title="Delete Task"
                  >
                    <svg className="w-4 h-4 md:w-4.5 md:h-4.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FocusNoteModal task={task} isOpen={isReadModalOpen} onClose={() => setIsReadModalOpen(false)} />
    </>
  );
});

export default TaskRow;