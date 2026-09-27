import React from 'react';

const SettingsModal = ({
  isOpen,
  onClose,
  onConfirmReset,
  onExport,
  onTriggerImport,
  theme,
  onToggleTheme,
  needRefresh,
  onSafeUpdate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl dark:border-slate-700/60 dark:bg-slate-950">

        {/* Top gradient glow */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">

          <div className="flex items-center gap-3">

            {/* Icon */}
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 001.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Settings
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage your app preferences & data
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="group flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400 transition-all hover:border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[72vh] overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">

          {/* ================= SYSTEM UPDATES ================= */}
          <section className="mb-7">

            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                System
              </h3>

              {needRefresh && (
                <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                  Update available
                </span>
              )}
            </div>

            <div
              className={`relative overflow-hidden rounded-2xl border p-4 transition-all ${
                needRefresh
                  ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/60 dark:border-blue-500/20 dark:from-blue-500/10 dark:to-indigo-500/5'
                  : 'border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/60'
              }`}
            >

              {needRefresh && (
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-400/10 blur-2xl" />
              )}

              <div className="relative flex items-center gap-3">

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    needRefresh
                      ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                      : 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                  }`}
                >
                  {needRefresh ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h5M20 20v-5h-5M5.64 18.36A9 9 0 1118.36 5.64L20 4"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {needRefresh
                      ? 'A new version is available'
                      : 'You are up to date'}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {needRefresh
                      ? 'Update the app while keeping your existing data.'
                      : 'SDE Tracker is running the latest version.'}
                  </p>
                </div>
              </div>

              {needRefresh && (
                <button
                  onClick={onSafeUpdate}
                  className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-blue-500/25 active:translate-y-0"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h5M20 20v-5h-5M5.64 18.36A9 9 0 1118.36 5.64L20 4"
                    />
                  </svg>

                  Install Update

                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </section>

          {/* ================= APPEARANCE ================= */}
          <section className="mb-7">

            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Appearance
            </h3>

            <div className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {theme === 'dark' ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
                      <path
                        strokeLinecap="round"
                        strokeWidth="1.8"
                        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                      />
                    </svg>
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Dark Mode
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {theme === 'dark'
                      ? 'Easier on the eyes at night'
                      : 'Use the light appearance'}
                  </p>
                </div>
              </div>

              {/* Premium Toggle */}
              <button
                onClick={onToggleTheme}
                aria-label="Toggle dark mode"
                className={`relative h-7 w-12 shrink-0 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-4 ${
                  theme === 'dark'
                    ? 'bg-blue-600 focus:ring-blue-500/20'
                    : 'bg-slate-200 focus:ring-slate-300/40 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
                    theme === 'dark'
                      ? 'translate-x-5'
                      : 'translate-x-0'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                </span>
              </button>
            </div>
          </section>

          {/* ================= DATA MANAGEMENT ================= */}
          <section className="mb-7">

            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Data Management
            </h3>

            <div className="grid grid-cols-2 gap-3">

              {/* Backup */}
              <button
                onClick={onExport}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-500/20">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>

                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Backup Data
                </p>

                <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  Download a copy of your progress
                </p>

                <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  Export
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              {/* Restore */}
              <button
                onClick={onTriggerImport}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-500/20">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>

                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Restore Data
                </p>

                <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  Import a previous backup
                </p>

                <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  Import
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </section>

          {/* ================= DANGER ZONE ================= */}
          <section>

            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-red-400">
              Danger Zone
            </h3>

            <button
              onClick={() => {
                if (
                  window.confirm(
                    'Are you entirely sure? This will permanently delete all your progress, notes, and links.'
                  )
                ) {
                  onConfirmReset();
                  onClose();
                }
              }}
              className="group flex w-full items-center justify-between rounded-2xl border border-red-200/80 bg-red-50/60 p-4 text-left transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg hover:shadow-red-500/5 dark:border-red-900/30 dark:bg-red-950/20 dark:hover:border-red-800/50 dark:hover:bg-red-950/30"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-bold text-red-600 dark:text-red-400">
                    Reset All Progress
                  </p>

                  <p className="mt-0.5 text-xs text-red-500/70 dark:text-red-400/60">
                    Permanently delete all saved data
                  </p>
                </div>
              </div>

              <svg
                className="h-5 w-5 text-red-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-red-500 dark:text-red-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200/80 bg-slate-50/70 px-6 py-3 dark:border-slate-800 dark:bg-slate-900/50">
          <p className="text-center text-[10px] font-medium tracking-wide text-slate-400">
            SDE Tracker • Your progress stays yours
          </p>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;

