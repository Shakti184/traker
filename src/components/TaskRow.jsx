import React, { useState } from 'react';
import FocusNoteModal from './FocusNoteModal';

const TaskRow = React.memo(({ task, onToggle, onOpenFocusWrite }) => {
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const links = task.links || [];

  const handleRowClick = () => {
    onToggle(task.id);
  };

  const handleActionButtonClick = (e) => {
    e.stopPropagation();
    if (task.isCompleted) {
      setIsReadModalOpen(true);
    } else {
      onOpenFocusWrite(task);
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
      <div className={`group w-full max-w-full min-w-0 relative flex flex-col p-4 md:p-5 my-3 rounded-[24px] border transition-all duration-500 overflow-hidden
          ${task.isCompleted 
            ? 'bg-slate-50/50 border-slate-200/50 dark:bg-slate-900/30 dark:border-slate-800/50' 
            : 'bg-white border-slate-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-indigo-300/60 dark:bg-slate-900/60 dark:border-slate-700/60 dark:hover:border-indigo-500/50 dark:hover:shadow-[0_8px_30px_-10px_rgba(99,102,241,0.15)]'}
        `}
      >
        {!task.isCompleted && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 dark:from-indigo-900/10 dark:to-blue-900/10 transition-opacity duration-500 pointer-events-none" />
        )}

        <div onClick={handleRowClick} className="flex items-start gap-3 md:gap-5 cursor-pointer relative z-10 w-full max-w-full min-w-0">
          
          <div className="relative flex-shrink-0 mt-1 md:mt-1.5">
            <div className={`w-7 h-7 md:w-8 md:h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ease-out
              ${task.isCompleted 
                ? 'bg-gradient-to-br from-indigo-500 to-blue-600 border-transparent shadow-[0_0_12px_rgba(99,102,241,0.4)] scale-95' 
                : 'bg-slate-50 border-slate-200 shadow-inner dark:bg-slate-950 dark:border-slate-700 group-hover:border-indigo-400 dark:group-hover:border-indigo-500'}`}
            >
              <svg className={`w-4 h-4 md:w-5 md:h-5 text-white transition-all duration-500 ease-out ${task.isCompleted ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-12'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col flex-1 transition-all duration-300 min-w-0 max-w-full">
            
            <div className={`transition-all duration-300 ${task.isCompleted ? 'opacity-60' : 'opacity-100'} min-w-0`}>
              <div className="flex items-center gap-2 mb-1.5">
                {!task.isCompleted && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />}
                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                  {formattedDayLabel}
                </span>
              </div>
              
              <h3 className={`font-extrabold text-slate-900 dark:text-white text-lg md:text-xl leading-snug mb-2 break-words transition-colors
                ${task.isCompleted ? 'line-through decoration-slate-400 dark:decoration-slate-600 text-slate-500 dark:text-slate-400' : 'group-hover:text-indigo-900 dark:group-hover:text-indigo-50'}`}
              >
                {task.topic}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-[15px] leading-relaxed pr-2 md:pr-4 mb-4 break-words">
                {task.directive}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 w-full max-w-full">
              <button 
                onClick={handleActionButtonClick}
                className={`font-bold rounded-xl transition-all duration-300 flex items-center gap-2 active:scale-95 whitespace-nowrap shrink-0 border
                  ${task.isCompleted
                    ? 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm text-xs md:text-sm px-4 py-2 md:py-2.5'
                    : 'bg-gradient-to-b from-indigo-500 to-blue-600 text-white border-indigo-400/50 hover:from-indigo-400 hover:to-blue-500 shadow-[0_4px_12px_rgba(99,102,241,0.3)] text-xs md:text-sm px-4 py-2 md:py-2.5'
                  }`}
              >
                {task.isCompleted ? (
                  <>
                    <svg className="w-4 h-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    Review Notes
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
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

              {links.length > 0 && (
                <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                  {links.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()} 
                      className={`group/link inline-flex items-center gap-1.5 px-3 py-2 md:py-2.5 rounded-xl text-xs font-semibold backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 truncate max-w-[140px] md:max-w-[200px] border
                        ${task.isCompleted
                          ? 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          : 'bg-slate-50/80 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm'
                        }`}
                    >
                      <svg className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover/link:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span className="truncate">{getDomainLabel(link)}</span>
                    </a>
                  ))}
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