import React, { useState, useMemo, useRef } from 'react';
import ResponsiveNavigation from './components/ResponsiveNavigation';
import Header from './components/Header';
import TaskList from './components/TaskList';
import SettingsModal from './components/SettingsModal';
import TodayWidget from './components/TodayWidget';
import useTheme from './hooks/useTheme';
import useLocalStorage from './hooks/useLocalStorage';
import { phasesData, generateTrackerData } from './data/scheduleData';

const App = () => {
  const [activePhase, setActivePhase] = useState('phase1');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tasks, setTasks] = useLocalStorage('sde-tracker-tasks', generateTrackerData());
  const [theme, toggleTheme] = useTheme();
  // Hidden file input reference for uploading backups
  const fileInputRef = useRef(null);

  const overallProgress = useMemo(() => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.isCompleted).length;
    return (completed / tasks.length) * 100;
  }, [tasks]);

  const phaseProgress = useMemo(() => {
    if (!tasks || tasks.length === 0) return {};
    const progressMap = {};
    phasesData.forEach(phase => {
      const phaseTasks = tasks.filter(t => t.phaseId === phase.id);
      const completed = phaseTasks.filter(t => t.isCompleted).length;
      progressMap[phase.id] = phaseTasks.length > 0 ? (completed / phaseTasks.length) * 100 : 0;
    });
    return progressMap;
  }, [tasks]);

  const handleToggleTask = (taskId) => setTasks(prev => prev.map(task => task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task));
  const handleUpdateNote = (taskId, noteText) => setTasks(prev => prev.map(task => task.id === taskId ? { ...task, notes: noteText } : task));
  const handleReset = () => setTasks(generateTrackerData());

  // NEW: Export Data Logic
  const handleExportData = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SDE_Transition_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // NEW: Import Data Logic
  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
        // Basic validation to ensure the uploaded JSON matches our schema
        if (Array.isArray(importedTasks) && importedTasks.length > 0 && importedTasks[0].hasOwnProperty('phaseId')) {
          setTasks(importedTasks);
          setIsSettingsOpen(false);
          alert("Progress successfully restored!");
        } else {
          alert("Invalid backup file format.");
        }
      } catch (err) {
        alert("Failed to parse the backup file. Ensure it is a valid JSON.");
      }
      // Reset the input so the same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900">
      <ResponsiveNavigation activePhase={activePhase} setActivePhase={setActivePhase} phases={phasesData} />

      <main className="flex-1 md:ml-72 flex flex-col min-h-screen relative">
        <Header activePhase={activePhase} phasesData={phasesData} overallProgress={overallProgress} phaseProgress={phaseProgress} />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <TodayWidget tasks={tasks} onToggleTask={handleToggleTask} />
          <TaskList tasks={tasks} activePhase={activePhase} onToggleTask={handleToggleTask} onUpdateNote={handleUpdateNote} />
        </div>

        {/* Floating Settings Button */}
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 p-3.5 bg-white dark:bg-slate-800 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 transition-all active:scale-95 z-40 focus:outline-none"
          title="Settings & Data Management"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Hidden File Input for Restore */}
        <input type="file" accept=".json" ref={fileInputRef} onChange={handleImportData} className="hidden" />
      </main>

      {/* NEW: Replaced ResetModal with SettingsModal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onConfirmReset={handleReset} 
        onExport={handleExportData}
        onTriggerImport={() => fileInputRef.current?.click()}
        theme={theme}             /* NEW: Pass theme state */
        onToggleTheme={toggleTheme} /* NEW: Pass toggle function */
      />
    </div>
  );
};

export default App;