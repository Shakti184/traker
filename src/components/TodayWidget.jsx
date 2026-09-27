import React from 'react';

const TodayWidget = ({ tasks, activePhase, phasesData, onToggleTask, onOpenFocusWrite }) => {
  const currentPhase = phasesData.find(p => p.id === activePhase);
  const phaseTasks = tasks.filter(t => t.phaseId === activePhase);
  const upNextTask = phaseTasks.find(t => !t.isCompleted);

  if (!upNextTask) return null; // Hide widget if all tasks in phase are done

  const handleComplete = (e) => {
    e.stopPropagation(); // Prevents opening focus mode when clicking the complete button
    onToggleTask(upNextTask.id);
  };

  return (
    <div 
      onClick={() => onOpenFocusWrite(upNextTask)}
      className="group relative bg-gradient-to-br from-indigo-900 to-slate-900 dark:from-indigo-950 dark:to-slate-950 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-xl mb-8 overflow-hidden cursor-pointer transition-transform active:scale-[0.98] hover:shadow-indigo-900/20"
    >
      {/* Decorative background blur */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-start w-full">
        <div className="flex flex-wrap items-center justify-between w-full gap-3 mb-3 md:mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
              Up Next in {currentPhase?.title.split(':')[0]}
            </span>
          </div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white/10 text-white px-3 py-1 rounded-full backdrop-blur-sm">
            {upNextTask.dayLabel}
          </span>
        </div>

        <h3 className="text-xl md:text-3xl font-extrabold text-white mb-2 md:mb-3 tracking-tight">
          {upNextTask.topic}
        </h3>
        
        <p className="text-indigo-100/80 text-sm md:text-base leading-relaxed max-w-2xl mb-6 line-clamp-2 md:line-clamp-3">
          {upNextTask.directive}
        </p>

        <div className="flex flex-wrap gap-3 w-full">
          {/* Mark Complete Button */}
          <button 
            onClick={handleComplete}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            Mark Complete
          </button>
          
          {/* Focus Write Indicator (Desktop only, mobile implies tap anywhere) */}
          <div className="hidden md:flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm font-bold rounded-xl transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Tap to Focus Write
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayWidget;