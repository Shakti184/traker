import React, { useState, useMemo, useRef, useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

import ResponsiveNavigation from "./components/ResponsiveNavigation";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import SettingsModal from "./components/SettingsModal";
import AboutModal from "./components/AboutModal";
import TodayWidget from "./components/TodayWidget";
import FocusWriteMode from "./components/FocusWriteMode";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";

import useIndexedDB from "./hooks/useIndexedDB";
import useTheme from "./hooks/useTheme";
import { phasesData, generateTrackerData } from "./data/scheduleData";

const App = () => {
  const [activePhase, setActivePhase] = useState("phase1");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [focusWriteTask, setFocusWriteTask] = useState(null);
  const [sysNotification, setSysNotification] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks, isDbLoaded] = useIndexedDB(
    "sde-tracker-tasks",
    generateTrackerData(),
  );

  const [theme, toggleTheme] = useTheme();
  const fileInputRef = useRef(null);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered");
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  useEffect(() => {
    const handlePopState = (e) => {
      setFocusWriteTask(null);
      setIsSettingsOpen(false);
      setIsAboutOpen(false);
      setIsAddTaskOpen(false);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleOpenFocusWrite = (task) => {
    window.history.pushState({ modal: "focusWrite" }, "");
    setFocusWriteTask(task);
  };
  const handleCloseFocusWrite = () => {
    if (window.history.state?.modal) window.history.back();
    else setFocusWriteTask(null);
  };

  const handleOpenSettings = () => {
    window.history.pushState({ modal: "settings" }, "");
    setIsSettingsOpen(true);
  };
  const handleCloseSettings = () => {
    if (window.history.state?.modal) window.history.back();
    else setIsSettingsOpen(false);
  };

  const handleOpenAbout = () => {
    window.history.pushState({ modal: "about" }, "");
    setIsAboutOpen(true);
  };
  const handleCloseAbout = () => {
    if (window.history.state?.modal) window.history.back();
    else setIsAboutOpen(false);
  };

  const handleOpenAddTask = () => {
    window.history.pushState({ modal: "addTask" }, "");
    setIsAddTaskOpen(true);
  };
  const handleCloseAddTask = () => {
    if (window.history.state?.modal) window.history.back();
    else setIsAddTaskOpen(false);
  };

  const handleAddNewTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    handleCloseAddTask();
    setSysNotification({
      type: "success",
      title: "Task Created!",
      message: `"${newTask.topic}" has been added to your workspace.`,
    });
  };
  // Add these two handlers
  const handleEditTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
    setEditingTask(null);
    setSysNotification({
      type: "success",
      title: "Task Updated",
      message: "Your custom task has been updated successfully.",
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setSysNotification({
      type: "success",
      title: "Task Deleted",
      message: "The custom task has been permanently removed.",
    });
  };

  const mergeUserDataWithFreshCurriculum = (userBackup) => {
    const freshCurriculum = generateTrackerData();
    const mergedTasks = freshCurriculum.map((freshTask) => {
      const savedTask = userBackup.find((t) => t.id === freshTask.id);
      if (savedTask) {
        return {
          ...freshTask,
          isCompleted: savedTask.isCompleted || false,
          notes: savedTask.notes || "",
          links: savedTask.links || [],
        };
      }
      return freshTask;
    });

    const orphanedTasks = userBackup.filter(
      (savedTask) =>
        (savedTask.isCustom ||
          savedTask.isCompleted ||
          savedTask.notes ||
          (savedTask.links && savedTask.links.length > 0)) &&
        !freshCurriculum.some((fresh) => fresh.id === savedTask.id),
    );

    return [...mergedTasks, ...orphanedTasks];
  };

  useEffect(() => {
    const tempBackup = sessionStorage.getItem("sde_temp_backup");
    if (tempBackup && isDbLoaded) {
      try {
        const parsedBackup = JSON.parse(tempBackup);
        if (Array.isArray(parsedBackup) && parsedBackup.length > 0) {
          setTasks(mergeUserDataWithFreshCurriculum(parsedBackup));
          sessionStorage.removeItem("sde_temp_backup");
          setSysNotification({
            type: "success",
            title: "Update Complete",
            message:
              "App updated successfully! New tasks added and your progress is safe.",
          });
        }
      } catch (e) {
        console.error("Failed to restore backup after update.");
      }
    }
  }, [setTasks, isDbLoaded]);

  const handleSafeUpdate = () => {
    if (tasks && tasks.length > 0) {
      sessionStorage.setItem("sde_temp_backup", JSON.stringify(tasks));
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
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  const handleUpdateNote = (taskId, noteText) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, notes: noteText } : task,
      ),
    );
    setFocusWriteTask((prev) =>
      prev && prev.id === taskId ? { ...prev, notes: noteText } : prev,
    );
  };
  const handleUpdateLinks = (taskId, linksArray) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, links: linksArray } : task,
      ),
    );
    setFocusWriteTask((prev) =>
      prev && prev.id === taskId ? { ...prev, links: linksArray } : prev,
    );
  };

  const handleReset = () => setTasks(generateTrackerData());

  const handleExportData = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SDE_Transition_Backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setSysNotification({
      type: "success",
      title: "Backup Saved!",
      message:
        "Your study progress, custom notes, and links have been successfully downloaded.",
    });
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
        if (
          Array.isArray(importedTasks) &&
          importedTasks.length > 0 &&
          importedTasks[0].hasOwnProperty("phaseId")
        ) {
          setTasks(mergeUserDataWithFreshCurriculum(importedTasks));
          handleCloseSettings();
          setSysNotification({
            type: "success",
            title: "Data Restored!",
            message: "Your progress has been successfully restored and synced.",
          });
        } else {
          setSysNotification({
            type: "error",
            title: "Invalid File",
            message: "The selected backup file is not in a valid format.",
          });
        }
      } catch (err) {
        setSysNotification({
          type: "error",
          title: "Parse Error",
          message: "Failed to read the backup file.",
        });
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  // Scroll triggers the island shrink
  const handleScroll = (e) => setIsScrolled(e.target.scrollTop > 45);

  if (!isDbLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-r-2 border-cyan-500 animate-[spin_1.5s_reverse_infinite]"></div>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase animate-pulse">
            Initializing Workspace
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full max-w-[100vw] overflow-hidden bg-slate-50 font-sans text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100 selection:bg-indigo-200 dark:selection:bg-indigo-900/50">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[50vmin] w-[50vmin] rounded-full bg-blue-400/20 blur-[100px] dark:bg-blue-600/10 transition-transform duration-1000 ease-in-out" />
        <div className="absolute right-[0%] top-[20%] h-[40vmin] w-[40vmin] rounded-full bg-indigo-400/20 blur-[100px] dark:bg-indigo-600/10" />
        <div className="absolute -bottom-[10%] left-[20%] h-[50vmin] w-[50vmin] rounded-full bg-cyan-400/20 blur-[120px] dark:bg-cyan-600/10" />
      </div>

      <div className="relative z-10 flex h-full w-full min-w-0">
        <ResponsiveNavigation
          activePhase={activePhase}
          setActivePhase={setActivePhase}
          phases={phasesData}
        />

        <main className="relative flex h-screen min-w-0 flex-1 flex-col overflow-hidden md:ml-72">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-px bg-gradient-to-b from-transparent via-slate-200/80 to-transparent dark:via-slate-800/80 md:block" />

          {/* SINGLE UNIFIED SCROLL CONTAINER (Fixes all scroll issues!) */}
          <div
            onScroll={handleScroll}
            className="custom-scrollbar relative flex-1 w-full overflow-x-hidden overflow-y-auto scroll-smooth pb-28"
          >
            <Header
              activePhase={activePhase}
              setActivePhase={setActivePhase}
              phasesData={phasesData}
              overallProgress={overallProgress}
              phaseProgress={phaseProgress}
              onOpenSettings={handleOpenSettings}
              onOpenAbout={handleOpenAbout}
              isScrolled={isScrolled}
              tasks={tasks}
            />

            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-10 lg:px-12 mt-2 md:mt-6">
              <div className="space-y-6 sm:space-y-8">
                <TodayWidget
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                  activePhase={activePhase}
                  phasesData={phasesData}
                  onOpenFocusWrite={handleOpenFocusWrite}
                />
                <TaskList
                  tasks={tasks}
                  activePhase={activePhase}
                  onToggleTask={handleToggleTask}
                  onUpdateNote={handleUpdateNote}
                  onUpdateLinks={handleUpdateLinks}
                  onOpenFocusWrite={handleOpenFocusWrite}
                  onEditTask={setEditingTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAddTaskOpen(true)} // Note: Make sure this matches your actual state toggle function!
            className="fixed z-40 flex items-center justify-center rounded-full text-white transition-all duration-300 active:scale-90 hover:scale-110 hover:shadow-lg
    w-14 h-14 md:w-16 md:h-16
    bottom-[100px] right-4     /* MOBILE: Floats above the bottom nav bar */
    md:bottom-10 md:right-10   /* DESKTOP: Sits neatly in the corner */
    bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 shadow-[0_8px_24px_-6px_rgba(99,102,241,0.6)]"
            aria-label="Add Custom Task"
            title="Add Custom Task"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

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
        onClose={handleCloseFocusWrite}
        onUpdateNote={handleUpdateNote}
        onUpdateLinks={handleUpdateLinks}
      />
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={handleCloseAddTask}
        onAddTask={handleAddNewTask}
        phasesData={phasesData}
        defaultPhase={activePhase}
      />
      <EditTaskModal
        isOpen={!!editingTask}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onUpdateTask={handleEditTask}
        phasesData={phasesData}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        onConfirmReset={handleReset}
        onExport={handleExportData}
        onTriggerImport={() => fileInputRef.current?.click()}
        theme={theme}
        onToggleTheme={toggleTheme}
        needRefresh={needRefresh}
        onSafeUpdate={handleSafeUpdate}
      />
      <AboutModal isOpen={isAboutOpen} onClose={handleCloseAbout} />

      {sysNotification && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[24px] shadow-2xl shadow-black/20 border border-slate-100 dark:border-slate-800 p-6 flex flex-col items-center text-center animate-[scale-in_0.3s_ease-out]">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 border shadow-sm ${sysNotification.type === "error" ? "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/50" : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/50"}`}
            >
              {sysNotification.type === "error" ? (
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              {sysNotification.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              {sysNotification.message}
            </p>
            <button
              onClick={() => setSysNotification(null)}
              className={`w-full py-3.5 px-4 text-white text-sm font-semibold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${sysNotification.type === "error" ? "bg-gradient-to-b from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 shadow-red-500/25" : "bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-emerald-500/25"}`}
            >
              {sysNotification.type === "error" ? "Got it" : "Awesome"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
