import React from 'react';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl dark:border-slate-700/60 dark:bg-slate-950">

        {/* Top gradient accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 py-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">

          <div className="flex items-center gap-3">

            {/* Info icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                About Tracker
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Product information
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
        <div className="relative px-6 py-7">

          {/* Product Icon */}
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/20">

            <svg
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.7}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Product Name */}
          <div className="text-center">

            <h4 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              SDE-2 Blueprint
            </h4>

            <div className="mt-2 flex items-center justify-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Version 1.0
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Active
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60">

            <div className="mb-3 flex items-center gap-2">

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                What is this?
              </span>
            </div>

            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              A 16-week intensive study architecture designed to help
              backend engineers transition into product-based SDE-2 roles.
              Track your preparation, organize study material, and practice
              with structured mock interviews.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="mt-4 grid grid-cols-3 gap-2">

            <div className="rounded-xl border border-slate-200 bg-white px-2 py-3 text-center dark:border-slate-800 dark:bg-slate-900">
              <svg
                className="mx-auto mb-1.5 h-4 w-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                16 Weeks
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-2 py-3 text-center dark:border-slate-800 dark:bg-slate-900">
              <svg
                className="mx-auto mb-1.5 h-4 w-4 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 6h16M4 12h16M4 18h10"
                />
              </svg>

              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                Study Space
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-2 py-3 text-center dark:border-slate-800 dark:bg-slate-900">
              <svg
                className="mx-auto mb-1.5 h-4 w-4 text-violet-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                Mock Interviews
              </span>
            </div>

          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-blue-500/25 active:translate-y-0"
          >
            Done

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
                d="M5 12h14m-6-6l6 6-6 6"
              />
            </svg>
          </button>

        </div>

        {/* Footer */}
        <div className="border-t border-slate-200/80 bg-slate-50/70 px-6 py-3 dark:border-slate-800 dark:bg-slate-900/50">
          <p className="text-center text-[10px] font-medium tracking-wide text-slate-400">
            SDE-2 Blueprint • Built for focused preparation
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutModal;

