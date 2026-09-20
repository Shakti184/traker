import React, { useState, useMemo } from 'react';
import ResponsiveNavigation from './components/ResponsiveNavigation';
import Header from './components/Header';
import TaskList from './components/TaskList';
import ResetModal from './components/ResetModal';
import useLocalStorage from './hooks/useLocalStorage';
import { phasesData, generateTrackerData } from './data/scheduleData';

const App = () => {
  const [activePhase, setActivePhase] = useState('phase1');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Initialize tasks from local storage or generate fresh ones
  const [tasks, setTasks] = useLocalStorage('sde-tracker-tasks', generateTrackerData());

  // Automatically calculate progress percentage based on completed tasks
  const overallProgress = useMemo(() => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.isCompleted).length;
    return (completed / tasks.length) * 100;
  }, [tasks]);

  // Toggle individual task completion
  const handleToggleTask = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // Wipe data and restart the 16-week plan
  const handleReset = () => {
    setTasks(generateTrackerData());
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900">
      
      <ResponsiveNavigation 
        activePhase={activePhase} 
        setActivePhase={setActivePhase} 
        phases={phasesData} 
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen relative">
        <Header 
          activePhase={activePhase} 
          phasesData={phasesData} 
          overallProgress={overallProgress} 
        />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <TaskList 
            tasks={tasks} 
            activePhase={activePhase} 
            onToggleTask={handleToggleTask} 
          />
        </div>

        {/* Floating Reset Button */}
        <button 
          onClick={() => setIsResetModalOpen(true)}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 p-3 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-slate-700 transition-all active:scale-95 z-40 focus:outline-none"
          title="Reset Progress"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </main>

      <ResetModal 
        isOpen={isResetModalOpen} 
        onClose={() => setIsResetModalOpen(false)} 
        onConfirm={handleReset} 
      />
    </div>
  );
};

export default App;