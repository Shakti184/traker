import React, { useState } from 'react';

// NEW: Added theme and onToggleTheme props
const SettingsModal = ({ isOpen, onClose, onConfirmReset, onExport, onTriggerImport, theme, onToggleTheme }) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setShowConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Data & Settings
          </h3>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-4">
          
          {/* NEW: Action: Toggle Theme */}
          <button 
            onClick={onToggleTheme}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group active:scale-[0.98]"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Appearance</span>
              <span className="text-xs text-slate-500">Currently in {theme} mode.</span>
            </div>
            {theme === 'dark' ? (
              <svg className="w-6 h-6 text-yellow-400 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-6 h-6 text-slate-600 group-hover:-rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          {/* Action: Export Backup */}
          <button onClick={onExport} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group active:scale-[0.98]">
            <div className="flex flex-col items-start">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Backup Progress</span>
              <span className="text-xs text-slate-500">Download your data as a JSON file.</span>
            </div>
            <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>

          {/* Action: Import Backup */}
          <button onClick={onTriggerImport} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group active:scale-[0.98]">
            <div className="flex flex-col items-start">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Restore Backup</span>
              <span className="text-xs text-slate-500">Upload a previous JSON backup.</span>
            </div>
            <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          </button>

          <hr className="border-slate-200 dark:border-slate-800 my-4" />

          {/* Action: Reset Danger Zone */}
          {!showConfirmReset ? (
            <button onClick={() => setShowConfirmReset(true)} className="w-full text-left p-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
              Wipe all progress...
            </button>
          ) : (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 p-4 rounded-xl animate-fade-in-up">
              <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-3 text-center">
                Are you absolutely sure? This cannot be undone unless you have a backup.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setShowConfirmReset(false)} className="flex-1 py-2 rounded-lg font-semibold text-slate-700 bg-white dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 active:scale-95 transition-all">Cancel</button>
                <button onClick={() => { onConfirmReset(); handleClose(); }} className="flex-1 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all">Yes, Reset</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;