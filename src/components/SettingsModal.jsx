import React, { useState, useEffect } from 'react';

const SettingsModal = ({ isOpen, onClose, onConfirmReset, onExport, onTriggerImport, theme, onToggleTheme, needRefresh, onSafeUpdate }) => {
  const [showResetWarning, setShowResetWarning] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);

  // Load the API key from local storage when the modal opens
  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem('gemini_api_key');
      if (storedKey) {
        setApiKey(storedKey);
      }
      setShowResetWarning(false);
      setIsKeySaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    setIsKeySaved(true);
    setTimeout(() => setIsKeySaved(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md transition-all duration-300">
        
        {/* Main Settings Container */}
        <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] border border-slate-100 dark:border-slate-800 flex flex-col animate-[scale-in_0.25s_ease-out] overflow-hidden">
          
          {/* =========================================================
              PREMIUM HEADER
          ========================================================= */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-4">
              <div className="flex shrink-0 items-center justify-center w-12 h-12 rounded-[16px] bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 dark:text-white leading-tight tracking-tight">
                  Settings
                </h2>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mt-0.5">
                  App Preferences
                </p>
              </div>
            </div>
            
            <button 
              onClick={onClose} 
              className="group p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* =========================================================
              SETTINGS BODY
          ========================================================= */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[75vh] custom-scrollbar flex flex-col gap-6">
            
            {/* System Updates */}
            {needRefresh && (
              <div className="animate-fade-in">
                <h3 className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2.5 pl-2">
                  System Updates
                </h3>
                <div className="p-5 rounded-[20px] bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-800 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
                      </div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        A new version is available.
                      </p>
                    </div>
                    <button 
                      onClick={onSafeUpdate}
                      className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white text-sm font-bold rounded-xl shadow-[0_8px_20px_-6px_rgba(99,102,241,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                    >
                      Install Update & Restore Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance */}
            <div>
              <h3 className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2.5 pl-2">
                Appearance
              </h3>
              <div className="flex items-center justify-between p-5 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 rounded-[20px] transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-slate-500 dark:text-slate-400">
                    {theme === 'dark' ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    )}
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Dark Mode</span>
                </div>
                
                {/* Premium iOS-style Toggle */}
                <button 
                  onClick={onToggleTheme} 
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${theme === 'dark' ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-md ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* AI Configuration Section - OVERFLOW FIX APPLIED HERE */}
            <div>
              <h3 className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2.5 pl-2">
                AI Intelligence
              </h3>
              <div className="p-5 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 rounded-[20px] transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-emerald-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Gemini API Key</p>
                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">Required for smart study notes</p>
                  </div>
                </div>
                
                {/* FIXED FLEXBOX OVERFLOW */}
                <div className="flex items-center gap-2 w-full">
                  <input 
                    type="password" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..." 
                    className="flex-1 min-w-0 px-4 py-3.5 text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:ring-indigo-500/20 text-slate-900 dark:text-white transition-all shadow-sm"
                  />
                  <button 
                    onClick={handleSaveApiKey}
                    className={`shrink-0 px-5 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center
                      ${isKeySaved 
                        ? 'bg-emerald-500 text-white shadow-[0_4px_16px_rgba(16,185,129,0.4)]' 
                        : 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-white shadow-md'
                      }`}
                  >
                    {isKeySaved ? 'Saved!' : 'Save'}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-semibold leading-relaxed">
                  Your key is securely encrypted in local storage and never sent to our servers.
                </p>
              </div>
            </div>

            {/* Data Management */}
            <div>
              <h3 className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2.5 pl-2">
                Data Management
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={onExport} className="flex flex-col items-center justify-center gap-3 p-5 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 rounded-[20px] hover:border-indigo-300 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group hover:shadow-md hover:-translate-y-1 active:scale-95">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-[14px] shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors">
                    <svg className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Backup Data</span>
                </button>
                
                <button onClick={onTriggerImport} className="flex flex-col items-center justify-center gap-3 p-5 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 rounded-[20px] hover:border-indigo-300 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group hover:shadow-md hover:-translate-y-1 active:scale-95">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-[14px] shadow-sm group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors">
                    <svg className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                  <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Restore Data</span>
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-2">
              <h3 className="text-[10px] md:text-[11px] font-extrabold text-red-500/80 dark:text-red-400/80 uppercase tracking-[0.2em] mb-2.5 pl-2">
                Danger Zone
              </h3>
              <button 
                onClick={() => setShowResetWarning(true)} 
                className="w-full flex items-center justify-between p-5 bg-red-50/50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-[20px] hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-300 dark:hover:border-red-500/30 transition-all duration-300 group hover:shadow-sm active:scale-95"
              >
                <span className="text-sm font-bold text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
                  Reset All Progress
                </span>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-[12px] shadow-sm group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
                  <svg className="w-5 h-5 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================
          PRE-ACTION WARNING MODAL (Z-Index 110 to sit above Settings)
      ========================================================= */}
      {showResetWarning && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-lg animate-[fade-in_0.2s_ease-out]">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 p-8 flex flex-col items-center text-center animate-[scale-in_0.2s_ease-out]">
            
            <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6 border border-red-100 dark:border-red-500/20 shadow-inner">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
              Reset Progress?
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-semibold">
              This action cannot be undone. All your checked tasks, custom study notes, and saved links will be permanently deleted.
            </p>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowResetWarning(false)}
                className="flex-1 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-xl transition-all duration-300 active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  onConfirmReset();
                  setShowResetWarning(false);
                  onClose();
                }}
                className="flex-[1.5] py-3.5 px-4 bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-bold rounded-xl shadow-[0_8px_20px_-6px_rgba(239,68,68,0.5)] transition-all duration-300 active:scale-95"
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