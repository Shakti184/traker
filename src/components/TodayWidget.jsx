import React from 'react';

const TodayWidget = ({ tasks, onToggleTask }) => {
  // Scan the entire 16-week array to find the very first task that is NOT completed
  const nextTask = tasks.find(task => !task.isCompleted);

  // If the user has finished all 112 days, hide the widget
  if (!nextTask) return null;

  return (
    <div className="mx-4 md:mx-8 mt-2 mb-6 p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden transform transition-all border border-transparent dark:border-indigo-500/30 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-slate-900 dark:to-indigo-950/80 shadow-blue-500/30 dark:shadow-indigo-900/20">
      
      {/* Decorative ambient background glows */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 dark:bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-900/20 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
        
        {/* Left Column: Task Details */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex justify-between md:justify-start md:gap-4 items-center">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 dark:bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white dark:bg-indigo-500"></span>
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-100 dark:text-indigo-300">
                Up Next • {nextTask.dayLabel}
              </span>
            </div>
            <span className="text-[10px] font-bold text-white dark:text-indigo-200 bg-white/20 dark:bg-indigo-900/50 px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-white/10 dark:border-indigo-700/50">
              Phase {nextTask.phaseId.replace('phase', '')}
            </span>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight mb-1.5 md:mb-2">
              {nextTask.topic}
            </h3>
            <p className="text-sm md:text-base text-blue-100 dark:text-slate-300 leading-relaxed md:max-w-xl">
              {nextTask.directive}
            </p>
          </div>
        </div>

        {/* Right Column: CTA Button */}
        <div className="w-full md:w-auto md:min-w-[200px] flex-shrink-0 mt-2 md:mt-0">
          <button
            onClick={() => onToggleTask(nextTask.id)}
            className="w-full py-3.5 md:py-4 px-6 bg-white dark:bg-indigo-600 hover:bg-blue-50 dark:hover:bg-indigo-500 text-blue-700 dark:text-white text-sm md:text-base font-bold rounded-xl md:rounded-2xl transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 shadow-lg shadow-black/10 dark:shadow-indigo-900/50"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Mark as Completed
          </button>
        </div>

      </div>
    </div>
  );
};

export default TodayWidget;