import React from 'react';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md transition-all duration-300">

      {/* Modal Container */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[28px] md:rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] border border-slate-100 dark:border-slate-800 flex flex-col animate-[scale-in_0.25s_ease-out] overflow-hidden relative">

        {/* Decorative Top Gradient Line */}
        <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 opacity-80" />

        {/* Ambient Background Glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* =========================================================
            PREMIUM HEADER
        ========================================================= */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl shrink-0 z-10">
          <div className="flex items-center gap-3.5">
            <div className="flex shrink-0 items-center justify-center w-11 h-11 rounded-[14px] bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
              <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-white leading-tight tracking-tight">
                About Tracker
              </h2>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 mt-0.5">
                System Information
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-slate-200/80 bg-white text-slate-400 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 shadow-sm dark:border-slate-700/80 dark:bg-slate-800 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white active:scale-95"
          >
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* =========================================================
            SCROLLABLE CONTENT BODY
        ========================================================= */}
        <div className="relative px-6 py-8 overflow-y-auto custom-scrollbar max-h-[75vh] z-10">

          {/* Product Hero */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-[20px] bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 shadow-lg shadow-slate-900/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 pointer-events-none" />
              <svg className="h-10 w-10 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h4 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
              SDE-2 Blueprint
            </h4>

            <div className="flex items-center justify-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">System Active</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[9px] font-extrabold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                Version 1.0.0
              </span>
            </div>
          </div>

          {/* Target Use Case Card */}
          <div className="mb-6 rounded-[20px] border border-indigo-100 dark:border-indigo-500/20 bg-gradient-to-br from-indigo-50/50 to-blue-50/30 p-5 dark:from-indigo-500/5 dark:to-blue-500/5 shadow-sm">
            <div className="mb-2.5 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 shadow-sm">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                Target Use Case
              </span>
            </div>
            <p className="text-[13px] md:text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
              Designed exclusively for software engineers targeting <strong>SDE-2 and Senior Backend</strong> roles at top-tier product companies. This platform transforms scattered preparation into a unified, highly-focused execution roadmap.
            </p>
          </div>

          {/* How It Works Section */}
          <div className="mb-8">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-3 pl-2">
              How the System Works
            </h3>
            
            <div className="flex flex-col gap-3">
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5 p-4 rounded-[16px] bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 transition-all hover:border-indigo-200 dark:hover:border-indigo-500/30">
                <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-xl bg-white dark:bg-slate-900 shadow-sm text-blue-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">Curated Execution Tracks</h4>
                  <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Follow a systematic curriculum spanning DSA, System Design, Backend Architecture, and Cloud Infrastructure.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5 p-4 rounded-[16px] bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 transition-all hover:border-indigo-200 dark:hover:border-indigo-500/30">
                <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-xl bg-white dark:bg-slate-900 shadow-sm text-indigo-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">Deep Focus Workspaces</h4>
                  <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Utilize built-in Pomodoro timers and distraction-free "Focus Write" and "Read" modes to combat context-switching.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5 p-4 rounded-[16px] bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 transition-all hover:border-indigo-200 dark:hover:border-indigo-500/30">
                <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-xl bg-white dark:bg-slate-900 shadow-sm text-cyan-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">AI-Powered Engineering Notes</h4>
                  <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Instantly generate rich Markdown notes, Mermaid architecture diagrams, and LaTeX math formulas using the integrated Gemini AI.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-3.5 p-4 rounded-[16px] bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 transition-all hover:border-indigo-200 dark:hover:border-indigo-500/30">
                <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-xl bg-white dark:bg-slate-900 shadow-sm text-emerald-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">100% Local & Secure</h4>
                  <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">No databases. No tracking. Your progress, custom tasks, notes, and API keys are stored securely in your browser's local storage.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(99,102,241,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            Return to Dashboard
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-6-6l6 6-6 6" /></svg>
          </button>

        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800/80 dark:bg-slate-900/50 z-10 shrink-0">
          <p className="text-center text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Built for focused preparation
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutModal;