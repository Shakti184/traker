import React, { useState } from 'react';

const SettingsModal = ({ isOpen, onClose, onConfirmReset, onExport, onTriggerImport, theme, onToggleTheme, needRefresh, onSafeUpdate }) => {
  const [showResetWarning, setShowResetWarning] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[24px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
              <div className="p-1.5 bg-slate-200/50 dark:bg-slate-800 rounded-lg">
                <svg className="w-4 h-4 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              Settings & Data
            </h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[75vh] custom-scrollbar">
            
            <div className="mb-8">
              <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">System Updates</h3>
              <div className={`p-4 rounded-2xl border transition-all duration-300 ${needRefresh ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50' : 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700'}`}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${needRefresh ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {needRefresh ? "A new version of SDE Tracker is available." : "App is running the latest version."}
                    </p>
                  </div>
                  
                  {needRefresh && (
                    <button 
                      onClick={onSafeUpdate}
                      className="w-full py-2.5 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(59,130,246,0.3)] transition-all active:scale-95 mt-1"
                    >
                      Install Update & Restore Data
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Appearance</h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Dark Mode</span>
                <button 
                  onClick={onToggleTheme} 
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${theme === 'dark' ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Data Management</h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={onExport} className="flex flex-col items-center justify-center gap-2.5 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all group hover:shadow-sm active:scale-95">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">Backup Data</span>
                </button>
                
                <button onClick={onTriggerImport} className="flex flex-col items-center justify-center gap-2.5 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all group hover:shadow-sm active:scale-95">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">Restore Data</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-extrabold text-red-400 uppercase tracking-widest mb-3">Danger Zone</h3>
              <button 
                onClick={() => setShowResetWarning(true)} 
                className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-all group hover:shadow-sm active:scale-95"
              >
                <span className="text-sm font-bold text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">Reset All Progress</span>
                <div className="p-1.5 bg-red-100 dark:bg-red-900/40 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-900/60 transition-colors">
                  <svg className="w-4 h-4 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Action Warning Modal (Reset only) */}
      {showResetWarning && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[24px] shadow-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center animate-fade-in-up">
            
            <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-5 border border-red-100 dark:border-red-800/50 shadow-inner">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Reset Progress?</h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              This action cannot be undone. All your checked tasks, custom study notes, and saved links will be permanently deleted.
            </p>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowResetWarning(false)}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-xl transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  onConfirmReset();
                  setShowResetWarning(false);
                  onClose();
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(239,68,68,0.3)] transition-all active:scale-95"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModal;