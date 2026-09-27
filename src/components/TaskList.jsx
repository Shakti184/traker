import React from 'react';
import TaskRow from './TaskRow';

// 1. ADDED: onOpenFocusWrite to the destructured props
const TaskList = ({ tasks, activePhase, onToggleTask, onOpenFocusWrite }) => {
  const phaseTasks = tasks.filter(t => t.phaseId === activePhase);

  if (phaseTasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No tasks found for this phase.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-full min-w-0">
      {phaseTasks.map(task => (
        <TaskRow 
          key={task.id} 
          task={task} 
          onToggle={onToggleTask} 
          // 2. ADDED: Pass the function down to the individual row
          onOpenFocusWrite={onOpenFocusWrite} 
        />
      ))}
    </div>
  );
};

export default TaskList;