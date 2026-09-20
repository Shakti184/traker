import React, { useState, useEffect } from 'react';

const TaskRow = React.memo(({ task, onToggle, onUpdateNote }) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState(task.notes || '');
  // Keep local state in sync if global state changes
  useEffect(() => {
    setNoteText(task.notes || '');
  }, [task.notes]);

  const handleToggleNote = (e) => {
    e.stopPropagation(); // Prevents the task from being marked completed when clicking the note button
    setIsNoteOpen(!isNoteOpen);
  };

  const handleSaveNote = () => {
    if (noteText !== task.notes) {
      onUpdateNote(task.id, noteText);
    }
  };

  return (
    <div className={`group relative flex flex-col p-5 my-3 rounded-xl border transition-all duration-300 overflow-hidden
        ${task.isCompleted 
          ? 'bg-slate-50 border-slate-200/60 dark:bg-slate-900/40 dark:border-slate-800/60' 
          : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md dark:bg-slate-800 dark:border-slate-700 dark:hover:border-blue-500'}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 dark:from-blue-900/10 transition-opacity duration-300 pointer-events-none" />

      {/* Main Clickable Row (Toggles Task) */}
      <div 
        onClick={() => onToggle(task.id)}
        className="flex items-start gap-4 cursor-pointer relative z-10"
      >
        {/* Custom Animated Checkbox */}
        <div className="relative flex-shrink-0 mt-1">
          <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 shadow-sm
            ${task.isCompleted 
              ? 'bg-blue-600 border-blue-600 scale-95 dark:bg-blue-500 dark:border-blue-500' 
              : 'bg-white border-slate-300 dark:bg-slate-900 dark:border-slate-600 group-hover:border-blue-400 dark:group-hover:border-blue-400'}
          `}>
            <svg className={`w-4 h-4 text-white transition-all duration-300 ${task.isCompleted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className={`flex flex-col gap-1.5 flex-1 transition-all duration-300 ${task.isCompleted ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex flex-wrap items-baseline gap-2 justify-between">
            <div className="flex items-baseline gap-2">
              <span className={`text-xs font-bold tracking-widest uppercase rounded-full px-2 py-0.5 
                ${task.isCompleted ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'}`}
              >
                {task.dayLabel}
              </span>
              <h3 className={`font-semibold text-slate-900 dark:text-slate-100 text-lg ${task.isCompleted ? 'line-through decoration-slate-400 dark:decoration-slate-500' : ''}`}>
                {task.topic}
              </h3>
            </div>
            
            {/* Note Toggle Button */}
            <button 
              onClick={handleToggleNote}
              className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${task.notes ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'}`}
            >
              {task.notes ? '📝 Edit Note' : '➕ Add Note'}
            </button>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-1 pr-12">
            {task.directive}
          </p>
        </div>
      </div>

      {/* Expandable Scratchpad Area */}
      {isNoteOpen && (
        <div 
          className="mt-4 pl-11 relative z-10 animate-fade-in-up"
          onClick={(e) => e.stopPropagation()} // Prevent clicking the textarea from checking the box
        >
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onBlur={handleSaveNote}
            placeholder="Jot down architectural constraints, edge cases, or STAR method talking points here..."
            className="w-full min-h-[120px] p-3 text-sm bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 custom-scrollbar resize-y transition-shadow"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              Autosaves when you click away
            </span>
            {task.notes && noteText === task.notes && (
              <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Saved
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default TaskRow;