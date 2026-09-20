import React from 'react';
import TaskRow from './TaskRow';

const TaskList = ({ tasks, activePhase, onToggleTask }) => {
  // Filter tasks to only show the ones belonging to the currently selected phase
  const currentTasks = tasks.filter(task => task.phaseId === activePhase);

  if (!currentTasks || currentTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No tasks found</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
          It looks like the curriculum for this phase hasn't been loaded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6 pb-28 md:pb-12 max-w-3xl mx-auto w-full transition-opacity duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
          Daily Execution Plan
        </h3>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          {currentTasks.length} Days
        </span>
      </div>
      
      <div className="space-y-1">
        {currentTasks.map((task) => (
          <TaskRow 
            key={task.id} 
            task={task} 
            onToggle={onToggleTask} 
          />
        ))}
      </div>
      
      {/* End of phase indicator */}
      <div className="mt-10 mb-6 flex items-center justify-center gap-4 opacity-50">
        <div className="h-px bg-slate-300 dark:bg-slate-700 w-12" />
        <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">End of Phase</span>
        <div className="h-px bg-slate-300 dark:bg-slate-700 w-12" />
      </div>
    </div>
  );
};

export default TaskList;