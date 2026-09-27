import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

import ResponsiveNavigation from './components/ResponsiveNavigation';
import Header from './components/Header';
import TaskList from './components/TaskList';
import SettingsModal from './components/SettingsModal';
import AboutModal from './components/AboutModal';
import TodayWidget from './components/TodayWidget';
import useLocalStorage from './hooks/useLocalStorage';
import FocusWriteMode from './components/FocusWriteMode';
import useTheme from './hooks/useTheme';
import { phasesData, generateTrackerData } from './data/scheduleData';

const App = () => {
  const [activePhase, setActivePhase] = useState('phase1');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [focusWriteTask, setFocusWriteTask] = useState(null);
  const [tasks, setTasks] = useLocalStorage('sde-tracker-tasks', generateTrackerData());
  const [sysNotification, setSysNotification] = useState(null);
  const [theme, toggleTheme] = useTheme();
  const fileInputRef = useRef(null);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered');
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  // SMART MERGE FUNCTION: Combines new app code with saved user progress
  const mergeUserDataWithFreshCurriculum = (userBackup) => {
    const freshCurriculum = generateTrackerData();
    const mergedTasks = freshCurriculum.map(freshTask => {
      const savedTask = userBackup.find(t => t.id === freshTask.id);
      if (savedTask) {
        return {
          ...freshTask,
          isCompleted: savedTask.isCompleted || false,
          notes: savedTask.notes || '',
          links: savedTask.links || []
        };
      }
      return freshTask; 
    });

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
          setTasks(mergeUserDataWithFreshCurriculum(parsedBackup));
          sessionStorage.removeItem('sde_temp_backup'); 
          setSysNotification({ type: 'success', title: 'Update Complete', message: 'App updated successfully! New tasks added and your progress is safe.' });
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

    const completed = tasks.filter((t) => t.isCompleted).length;
    return (completed / tasks.length) * 100;
  }, [tasks]);

  const phaseProgress = useMemo(() => {
    if (!tasks || tasks.length === 0) return {};

    const progressMap = {};

    phasesData.forEach((phase) => {
      const phaseTasks = tasks.filter((t) => t.phaseId === phase.id);
      const completed = phaseTasks.filter((t) => t.isCompleted).length;

      progressMap[phase.id] =
        phaseTasks.length > 0 ? (completed / phaseTasks.length) * 100 : 0;
    });

    return progressMap;
  }, [tasks]);

  const handleToggleTask = (taskId) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );

  const handleUpdateNote = (taskId, noteText) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, notes: noteText } : task
      )
    );

  const handleUpdateLinks = (taskId, linksArray) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, links: linksArray } : task
      )
    );

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

    // Trigger Success Modal
    setSysNotification({
      type: 'success',
      title: 'Backup Saved!',
      message: 'Your study progress, custom notes, and links have been successfully downloaded to your device.'
    });
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
        if (Array.isArray(importedTasks) && importedTasks.length > 0 && importedTasks[0].hasOwnProperty('phaseId')) {
          setTasks(mergeUserDataWithFreshCurriculum(importedTasks));
          setIsSettingsOpen(false); // Close settings menu
          
          // Trigger Success Modal
          setSysNotification({
            type: 'success',
            title: 'Data Restored!',
            message: 'Your progress has been successfully restored and synced with the latest curriculum.'
          });
        } else {
          setSysNotification({ type: 'error', title: 'Invalid File', message: 'The selected backup file is not in a valid format.' });
        }
      } catch (err) {
        setSysNotification({ type: 'error', title: 'Parse Error', message: 'Failed to read the backup file. Ensure it is a valid JSON document.' });
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 40);
  };

  return (
    <div className="relative flex h-screen w-full max-w-[100vw] overflow-hidden bg-slate-50 font-sans text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900">
      {/* Premium ambient background — visual only */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-400/5 blur-3xl dark:bg-cyan-500/5" />
      </div>

      <div className="relative z-10 flex h-full w-full min-w-0">
        <ResponsiveNavigation
          activePhase={activePhase}
          setActivePhase={setActivePhase}
          phases={phasesData}
        />

        <main className="relative flex h-screen min-w-0 flex-1 flex-col overflow-hidden md:ml-72">
          {/* Soft content-shell edge for desktop */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-px bg-slate-200/70 dark:bg-slate-800/70 md:block" />

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

          <div
            onScroll={handleScroll}
            className="custom-scrollbar relative flex-1 overflow-x-hidden overflow-y-auto px-3 pb-24 pt-3 sm:px-5 md:px-8 md:pb-8 lg:px-10"
          >
            <div className="mx-auto w-full max-w-4xl">
              <div className="space-y-5 sm:space-y-6">
                <TodayWidget
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                  activePhase={activePhase}
                  phasesData={phasesData}
                  onOpenFocusWrite={(task) => setFocusWriteTask(task)}
                />

                <TaskList
                  tasks={tasks}
                  activePhase={activePhase}
                  onToggleTask={handleToggleTask}
                  onUpdateNote={handleUpdateNote}
                  onUpdateLinks={handleUpdateLinks}
                  onOpenFocusWrite={(task) => setFocusWriteTask(task)}
                />
              </div>
            </div>
          </div>

          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleImportData}
            className="hidden"
          />
        </main>
        
      </div>
      <FocusWriteMode 
        task={focusWriteTask} 
        isOpen={!!focusWriteTask} 
        onClose={() => setFocusWriteTask(null)} 
        onUpdateNote={handleUpdateNote} 
        onUpdateLinks={handleUpdateLinks} 
      />
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

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
      {/* NEW: Global System Notification Modal */}
      {sysNotification && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[24px] shadow-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center animate-fade-in-up">
            
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 border shadow-inner ${sysNotification.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/50' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/50'}`}>
              {sysNotification.type === 'error' ? (
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              ) : (
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              )}
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{sysNotification.title}</h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              {sysNotification.message}
            </p>
            
            <button 
              onClick={() => setSysNotification(null)}
              className={`w-full py-3 px-4 text-white text-sm font-bold rounded-xl shadow-lg transition-all active:scale-95 ${sysNotification.type === 'error' ? 'bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/30' : 'bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/30'}`}
            >
              {sysNotification.type === 'error' ? 'Got it' : 'Awesome'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
