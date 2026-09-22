import React, { useState, useMemo, useRef } from 'react';
import ResponsiveNavigation from './components/ResponsiveNavigation';
import Header from './components/Header';
import TaskList from './components/TaskList';
import SettingsModal from './components/SettingsModal';
import AboutModal from './components/AboutModal'; // NEW
import TodayWidget from './components/TodayWidget';
import useLocalStorage from './hooks/useLocalStorage';
import useTheme from './hooks/useTheme';
import { phasesData, generateTrackerData } from './data/scheduleData';

const App = () => {
  const [activePhase, setActivePhase] = useState('phase1');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false); // NEW
  const [tasks, setTasks] = useLocalStorage('sde-tracker-tasks', generateTrackerData());
  const [theme, toggleTheme] = useTheme(); 
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
  const handleUpdateLinks = (taskId, linksArray) => setTasks(prev => prev.map(task => task.id === taskId ? { ...task, links: linksArray } : task));
  const handleReset = () => setTasks(generateTrackerData());

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

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
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
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300">
      <ResponsiveNavigation activePhase={activePhase} setActivePhase={setActivePhase} phases={phasesData} />

      <main className="flex-1 md:ml-72 flex flex-col min-h-screen relative">
        {/* NEW: Pass open functions to Header */}
        <Header 
          activePhase={activePhase} 
          phasesData={phasesData} 
          overallProgress={overallProgress} 
          phaseProgress={phaseProgress}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
        />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <TodayWidget 
            tasks={tasks} 
            onToggleTask={handleToggleTask} 
            activePhase={activePhase}
            phasesData={phasesData}
          />
          <TaskList tasks={tasks} activePhase={activePhase} onToggleTask={handleToggleTask} onUpdateNote={handleUpdateNote} onUpdateLinks={handleUpdateLinks} />
        </div>

        <input type="file" accept=".json" ref={fileInputRef} onChange={handleImportData} className="hidden" />
      </main>


      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onConfirmReset={handleReset} 
        onExport={handleExportData}
        onTriggerImport={() => fileInputRef.current?.click()}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* NEW: Mount the About Modal */}
      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
    </div>
  );
};

export default App;