import React, { useState, useRef, useEffect } from 'react';
import FocusTimer from './FocusTimer';

const Header = ({
  activePhase,
  setActivePhase,
  phasesData,
  overallProgress,
  phaseProgress,
  onOpenSettings,
  onOpenAbout,
  isScrolled
}) => {
  const currentPhase = phasesData.find(p => p.id === activePhase);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500
        bg-white/85 dark:bg-slate-950/85
        backdrop-blur-2xl
        px-4 md:px-8
        border-b
        ${
          isScrolled
            ? 'border-slate-200/70 dark:border-slate-800/70 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.25)] dark:shadow-[0_12px_40px_-18px_rgba(0,0,0,0.7)] py-3'
            : 'border-transparent py-4 md:py-6'
        }`}
    >

      <div className="max-w-4xl mx-auto w-full">

        {/* =========================================================
            TOP BAR
        ========================================================= */}

        <div className="flex items-center justify-between gap-4">

          {/* Brand / Current Phase */}
          <div className="flex items-center gap-3 min-w-0 flex-1">

            {/* Premium Logo */}
            <div
              className={`hidden sm:flex shrink-0 items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600
                text-white
                shadow-lg shadow-indigo-500/20
                transition-all duration-500
                ${isScrolled ? 'w-9 h-9' : 'w-11 h-11'}`}
            >
              <svg
                className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <div className="flex-1 min-w-0">

              {/* Phase Meta */}
              <div className="flex items-center gap-2 mb-0.5">

                <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 truncate">
                  {currentPhase?.title.split(':')[0] || 'SDE'}
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />

              </div>

              {/* Main Title */}
              <h2 className="text-lg md:text-2xl font-extrabold tracking-tight truncate">

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
                  {currentPhase?.title || 'SDE Blueprint'}
                </span>

              </h2>

              {/* Compact Progress */}
              <div
                className={`grid transition-all duration-500 ease-out
                  ${
                    isScrolled
                      ? 'grid-rows-[1fr] opacity-100 mt-1.5'
                      : 'grid-rows-[0fr] opacity-0 mt-0'
                  }`}
              >
                <div className="overflow-hidden flex items-center gap-2.5 w-full max-w-sm">

                  <div className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">

                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${phaseProgress[activePhase] || 0}%`
                      }}
                    />

                  </div>

                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                    {Math.round(phaseProgress[activePhase] || 0)}%
                  </span>

                </div>
              </div>

            </div>
          </div>

          {/* =========================================================
              RIGHT CONTROLS
          ========================================================= */}

          <div className="flex items-center gap-2 md:gap-3 shrink-0">

            {/* Timer */}
            <div className="relative">
              <FocusTimer />
            </div>

            {/* Menu */}
            <div className="relative z-50" ref={menuRef}>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  group
                  flex items-center justify-center
                  w-10 h-10 md:w-11 md:h-11
                  rounded-xl md:rounded-2xl
                  border
                  transition-all duration-200
                  active:scale-95
                  ${
                    isMenuOpen
                      ? 'bg-slate-100 border-slate-300 text-slate-900 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 dark:hover:text-blue-400'
                  }
                `}
                aria-label="Open menu"
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isMenuOpen ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.3}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>

              {/* =====================================================
                  PREMIUM DROPDOWN
              ===================================================== */}

              {isMenuOpen && (
                <div
                  className="
                    absolute right-0 top-full mt-3
                    w-56
                    overflow-hidden
                    rounded-2xl
                    border border-slate-200/80
                    dark:border-slate-800/80
                    bg-white/95 dark:bg-slate-950/95
                    backdrop-blur-2xl
                    shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)]
                    dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]
                    animate-fade-in-up
                    origin-top-right
                  "
                >

                  {/* Settings */}
                  <button
                    onClick={() => {
                      onOpenSettings();
                      setIsMenuOpen(false);
                    }}
                    className="
                      group flex items-center gap-3
                      px-4 py-3.5
                      text-slate-700 dark:text-slate-200
                      hover:bg-slate-50 dark:hover:bg-slate-900
                      transition-all
                      text-left w-full
                    "
                  >

                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-400 transition-colors">

                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31.826-2.37-2.37a1.724 1.724 0 001.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-2.37 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                    </div>

                    <div className="flex-1">

                      <p className="text-xs font-bold">
                        Settings & Data
                      </p>

                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Preferences & backups
                      </p>

                    </div>

                    <svg
                      className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors"
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

                  <div className="h-px bg-slate-100 dark:bg-slate-800 mx-3" />

                  {/* About */}
                  <button
                    onClick={() => {
                      onOpenAbout();
                      setIsMenuOpen(false);
                    }}
                    className="
                      group flex items-center gap-3
                      px-4 py-3.5
                      text-slate-700 dark:text-slate-200
                      hover:bg-slate-50 dark:hover:bg-slate-900
                      transition-all
                      text-left w-full
                    "
                  >

                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400 transition-colors">

                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                    </div>

                    <div className="flex-1">

                      <p className="text-xs font-bold">
                        About Tracker
                      </p>

                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Version & information
                      </p>

                    </div>

                    <svg
                      className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-500 transition-colors"
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

                </div>
              )}

            </div>
          </div>

        </div>

        {/* =========================================================
            FULL DASHBOARD STATE
        ========================================================= */}

        <div
          className={`grid transition-all duration-500 ease-out ${
            isScrolled
              ? 'grid-rows-[0fr] opacity-0'
              : 'grid-rows-[1fr] opacity-100'
          }`}
        >
          <div className="overflow-hidden">

            {/* Subtitle */}
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium truncate mt-2 mb-7">
              {currentPhase?.subtitle}
            </p>

            {/* =====================================================
                OVERALL PROGRESS
            ===================================================== */}

            <div className="mb-7">

              <div className="flex justify-between items-end mb-2.5">

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.16em]">
                    Overall Progress
                  </span>

                </div>

                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 tabular-nums">
                  {Math.round(overallProgress)}%
                </span>

              </div>

              <div className="relative h-2.5 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden ring-1 ring-slate-200/70 dark:ring-slate-700/50 shadow-inner">

                <div
                  className="relative h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_14px_rgba(99,102,241,0.35)]"
                  style={{
                    width: `${overallProgress}%`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulse rounded-full" />
                </div>

              </div>

            </div>

            {/* =====================================================
                PHASE CARDS
            ===================================================== */}

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 md:gap-3 mb-1">

              {phasesData.map(phase => {

                const isActive = activePhase === phase.id;
                const prog = Math.round(phaseProgress[phase.id] || 0);

                return (
                  <div
                    key={phase.id}
                    onClick={() => setActivePhase(phase.id)}
                    className={`
                      group relative
                      p-3 md:p-3.5
                      rounded-2xl
                      border
                      transition-all duration-300
                      cursor-pointer
                      overflow-hidden
                      ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-50 via-indigo-50/70 to-white border-blue-200/80 shadow-lg shadow-blue-500/5 dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-slate-900 dark:border-blue-800/50'
                          : 'bg-white/70 border-slate-200/70 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900/40 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:border-slate-700'
                      }
                    `}
                  >

                    {/* Active Glow */}
                    {isActive && (
                      <>
                        <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-2xl pointer-events-none" />

                        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
                      </>
                    )}

                    {/* Card Header */}
                    <div className="relative z-10 flex justify-between items-center mb-2.5">

                      <span
                        className={`
                          text-[9px] md:text-[10px]
                          font-extrabold
                          uppercase
                          tracking-[0.12em]
                          truncate
                          pr-1
                          transition-colors
                          ${
                            isActive
                              ? 'text-blue-700 dark:text-blue-400'
                              : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                          }
                        `}
                      >
                        {phase.title.split(':')[0]}
                      </span>

                      <span
                        className={`
                          text-[10px]
                          font-extrabold
                          tabular-nums
                          transition-colors
                          ${
                            isActive
                              ? 'text-blue-700 dark:text-blue-400'
                              : 'text-slate-400 dark:text-slate-500'
                          }
                        `}
                      >
                        {prog}%
                      </span>

                    </div>

                    {/* Progress */}
                    <div className="relative z-10 h-1.5 w-full bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">

                      <div
                        className={`
                          h-full rounded-full
                          transition-all duration-700 ease-out
                          ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_8px_rgba(99,102,241,0.35)]'
                              : 'bg-slate-300 dark:bg-slate-600'
                          }
                        `}
                        style={{
                          width: `${prog}%`
                        }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;

