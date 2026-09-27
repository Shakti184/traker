import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react'; 

import ResponsiveNavigation from './components/ResponsiveNavigation';
import Header from './components/Header';
import TaskList from './components/TaskList';
import SettingsModal from './components/SettingsModal';
import AboutModal from './components/AboutModal';
import TodayWidget from './components/TodayWidget';
import useLocalStorage from './hooks/useLocalStorage';
import useTheme from './hooks/useTheme';
import { phasesData, generateTrackerData } from './data/scheduleData';

const App = () => {
  const [activePhase, setActivePhase] = useState('phase1');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); 
  
  const [tasks, setTasks] = useLocalStorage('sde-tracker-tasks', generateTrackerData());
  const [theme, toggleTheme] = useTheme(); 
  const fileInputRef = useRef(null);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) { console.log('SW Registered'); },
    onRegisterError(error) { console.log('SW registration error', error); }
  });

  // SMART MERGE FUNCTION: Combines new app code with saved user progress
  const mergeUserDataWithFreshCurriculum = (userBackup) => {
    const freshCurriculum = generateTrackerData();
    
    // 1. Map user progress onto the fresh curriculum
    const mergedTasks = freshCurriculum.map(freshTask => {
      const savedTask = userBackup.find(t => t.id === freshTask.id);
      if (savedTask) {
        return {
          ...freshTask, // Keeps fresh topic, directive, and phaseId from your code updates
          isCompleted: savedTask.isCompleted || false, // Injects user's saved progress
          notes: savedTask.notes || '',
          links: savedTask.links || []
        };
      }
      return freshTask; // If it's a brand new task added in the update, it just passes through
    });

    // 2. Orphan Handler: Prevent data loss if you remove a task from the code that the user wrote notes on
    const orphanedTasks = userBackup.filter(savedTask => 
      (savedTask.isCompleted || savedTask.notes || (savedTask.links && savedTask.links.length > 0)) &&
      !freshCurriculum.some(fresh => fresh.id === savedTask.id)
    );

    return [...mergedTasks, ...orphanedTasks];
  };

  // Automatic Backup Restoration on Boot
  useEffect(() => {
    const tempBackup = sessionStorage.getItem('sde_temp_backup');
    if (tempBackup) {
      try {
        const parsedBackup = JSON.parse(tempBackup);
        if (Array.isArray(parsedBackup) && parsedBackup.length > 0) {
          
          // Apply the smart merge before setting state
          const smartlyMergedData = mergeUserDataWithFreshCurriculum(parsedBackup);
          setTasks(smartlyMergedData);
          
          sessionStorage.removeItem('sde_temp_backup'); 
          setTimeout(() => alert("App updated successfully! New tasks added and your progress is safe."), 500);
        }
      } catch (e) {
        console.error("Failed to restore backup after update.");
      }
    }
  }, [setTasks]);

  const handleSafeUpdate = () => {
    const currentData = localStorage.getItem('sde-tracker-tasks');
    if (currentData) {
      sessionStorage.setItem('sde_temp_backup', currentData);
    }
    updateServiceWorker(true);
  };

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
          
          // Apply the smart merge to manually imported JSON files as well
          const smartlyMergedData = mergeUserDataWithFreshCurriculum(importedTasks);
          setTasks(smartlyMergedData);
          
          setIsSettingsOpen(false);
          alert("Progress successfully restored and synced with the latest curriculum!");
        } else alert("Invalid backup file format.");
      } catch (err) {
        alert("Failed to parse the backup file. Ensure it is a valid JSON.");
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 40);
  };

  return (
    <div className="flex h-screen w-full max-w-[100vw] overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300">
      <ResponsiveNavigation activePhase={activePhase} setActivePhase={setActivePhase} phases={phasesData} />

      <main className="flex-1 md:ml-72 flex flex-col h-screen relative w-full max-w-full min-w-0 overflow-hidden">
        
        <Header 
          activePhase={activePhase} 
          setActivePhase={setActivePhase}
          phasesData={phasesData} 
          overallProgress={overallProgress}
          phaseProgress={phaseProgress}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          isScrolled={isScrolled} 
        />
        
        <div onScroll={handleScroll} className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar w-full min-w-0 pb-24 md:pb-6 relative pt-2">
          <div className="max-w-3xl mx-auto w-full">
            <TodayWidget tasks={tasks} onToggleTask={handleToggleTask} activePhase={activePhase} phasesData={phasesData} />
            <TaskList tasks={tasks} activePhase={activePhase} onToggleTask={handleToggleTask} onUpdateNote={handleUpdateNote} onUpdateLinks={handleUpdateLinks} />
          </div>
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
        needRefresh={needRefresh}
        onSafeUpdate={handleSafeUpdate}
      />
      
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default App;