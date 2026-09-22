import React from 'react';

const TodayWidget = ({ tasks, onToggleTask, activePhase, phasesData }) => {
  // 1. Filter tasks to ONLY look at the phase tab you currently have open
  const currentPhaseTasks = tasks.filter(task => task.phaseId === activePhase);
  
  // 2. Find the first uncompleted task WITHIN this specific phase
  const nextTask = currentPhaseTasks.find(task => !task.isCompleted);
  
  // 3. Get the title of the current phase for the UI
  const phaseInfo = phasesData.find(p => p.id === activePhase);
  const phaseShortName = phaseInfo ? phaseInfo.title.split(':')[0] : 'Current Phase';

  // State: The user has finished 100% of the tasks in this specific phase!
  if (!nextTask) {
    return (
      <div className="mx-4 md:mx-8 mt-2 mb-6 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-emerald-200 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-900/20 shadow-sm flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-extrabold text-emerald-800 dark:text-emerald-400 mb-1">
            🎉 {phaseShortName} Complete!
          </h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-500/80">
            You have mastered all architectures and executions for this track. Select another phase from the menu to continue your prep.
          </p>
        </div>
        <div className="hidden md:flex w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
      </div>
    );
  }

  // State: Normal - Show the next task for the active phase
  return (
    <div className="mx-4 md:mx-8 mt-2 mb-6 p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden transform transition-all border border-transparent dark:border-indigo-500/30 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-slate-900 dark:to-indigo-950/80 shadow-blue-500/30 dark:shadow-indigo-900/20">
      
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 dark:bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-900/20 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
        
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex justify-between md:justify-start md:gap-4 items-center">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 dark:bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white dark:bg-indigo-500"></span>
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-100 dark:text-indigo-300">
                Up Next in {phaseShortName}
              </span>
            </div>
            <span className="text-[10px] font-bold text-white dark:text-indigo-200 bg-white/20 dark:bg-indigo-900/50 px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-white/10 dark:border-indigo-700/50">
              {nextTask.dayLabel}
            </span>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight mb-1.5 md:mb-2">
              {nextTask.topic}
            </h3>
            <p className="text-sm md:text-base text-blue-100 dark:text-slate-300 leading-relaxed md:max-w-xl line-clamp-2">
              {nextTask.directive}
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto md:min-w-[200px] flex-shrink-0 mt-2 md:mt-0">
          <button
            onClick={() => onToggleTask(nextTask.id)}
            className="w-full py-3.5 md:py-4 px-6 bg-white dark:bg-indigo-600 hover:bg-blue-50 dark:hover:bg-indigo-500 text-blue-700 dark:text-white text-sm md:text-base font-bold rounded-xl md:rounded-2xl transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 shadow-lg shadow-black/10 dark:shadow-indigo-900/50"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Mark Complete
          </button>
        </div>

      </div>
    </div>
  );
};

export default TodayWidget;