import React from 'react';

const TaskRow = React.memo(({ task, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(task.id)}
      className={`group relative flex items-start gap-4 p-5 my-3 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
        ${task.isCompleted 
          ? 'bg-slate-50 border-slate-200/60 dark:bg-slate-900/40 dark:border-slate-800/60' 
          : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md dark:bg-slate-800 dark:border-slate-700 dark:hover:border-blue-500'}
      `}
    >
      {/* Subtle animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 dark:from-blue-900/10 transition-opacity duration-300 pointer-events-none" />

      {/* Custom Animated Checkbox */}
      <div className="relative flex-shrink-0 mt-1">
        <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 shadow-sm
          ${task.isCompleted 
            ? 'bg-blue-600 border-blue-600 scale-95 dark:bg-blue-500 dark:border-blue-500' 
            : 'bg-white border-slate-300 dark:bg-slate-900 dark:border-slate-600 group-hover:border-blue-400 dark:group-hover:border-blue-400'}
        `}>
          {/* SVG Checkmark */}
          <svg 
            className={`w-4 h-4 text-white transition-all duration-300 ${task.isCompleted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Text Content */}
      <div className={`flex flex-col gap-1.5 transition-all duration-300 ${task.isCompleted ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className={`text-xs font-bold tracking-widest uppercase rounded-full px-2 py-0.5 
            ${task.isCompleted 
              ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400' 
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'}`}
          >
            {task.dayLabel}
          </span>
          <h3 className={`font-semibold text-slate-900 dark:text-slate-100 text-lg ${task.isCompleted ? 'line-through decoration-slate-400 dark:decoration-slate-500' : ''}`}>
            {task.topic}
          </h3>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-1">
          {task.directive}
        </p>
      </div>
    </div>
  );
});

export default TaskRow;