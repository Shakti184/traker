import React from 'react';
import TaskRow from './TaskRow';

// 1. MUST ACCEPT THE PROPS HERE:
const TaskList = ({ tasks, activePhase, onToggleTask, onOpenFocusWrite, onEditTask, onDeleteTask }) => {
  const phaseTasks = tasks.filter(t => t.phaseId === activePhase);

  if (phaseTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-2 border-dashed border-slate-200 dark:border-slate-800/70 rounded-[24px] md:rounded-[32px] transition-all duration-500 shadow-sm">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No tasks found for this phase.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-full min-w-0">
      <div className="flex flex-col gap-3 md:gap-4 w-full">
        {phaseTasks.map(task => (
          <TaskRow 
            key={task.id} 
            task={task} 
            onToggle={onToggleTask} 
            onOpenFocusWrite={onOpenFocusWrite}
            onEditTask={onEditTask}     // 2. MUST PASS IT TO TASK ROW HERE
            onDeleteTask={onDeleteTask} // 3. MUST PASS IT TO TASK ROW HERE
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;