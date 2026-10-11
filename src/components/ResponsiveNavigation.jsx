import React from 'react';

const ResponsiveNavigation = ({
  activePhase,
  setActivePhase,
  phases,
  title = "Developer Roadmap",
  subtitle = "Interview Preparation",
  userName = "Guest User",
  userRole = "Software Engineer",
  userInitials = "DEV"
}) => {

  const renderIcon = (phaseId, isActive) => {
    const iconClass = `w-5 h-5 transition-all duration-500 ease-out
      ${isActive 
        ? 'text-indigo-600 dark:text-indigo-400 scale-110' 
        : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
      }`;

    switch (phaseId) {
      case 'phase1':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 20l4-16" />
            <path d="M18 8l4 4-4 4" />
            <path d="M6 16l-4-4 4-4" />
          </svg>
        );
      case 'phase2':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="8" rx="2" />
            <rect x="3" y="12" width="18" height="8" rx="2" />
            <path d="M17 8h.01" />
            <path d="M17 16h.01" />
          </svg>
        );
      case 'phase3':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H7a4 4 0 01-.9-7.9A5.5 5.5 0 0116.8 8a5 5 0 01.7 9.9V19z" />
          </svg>
        );
      case 'phase4':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 11H5" />
            <path d="M19 11a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2" />
            <path d="M19 11V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2" />
            <path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
          </svg>
        );
    }
  };

  return (
    <>
      {/* =========================================================
          DESKTOP SIDEBAR
      ========================================================= */}
      <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-3xl border-r border-slate-200/80 dark:border-slate-800/80 shadow-[12px_0_40px_-24px_rgba(0,0,0,0.1)] dark:shadow-[12px_0_40px_-24px_rgba(0,0,0,0.5)] transition-colors duration-500">

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

        {/* =====================================================
            PROFILE / BRAND HEADER
        ===================================================== */}
        <div className="p-6 relative z-10">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3.5 mb-8">
            <div className="relative w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
              <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-[15px] font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
                {title}
              </h1>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] truncate mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Premium User Profile Card */}
          <div className="group cursor-pointer flex items-center gap-3.5 p-3.5 rounded-[20px] border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/40 hover:-translate-y-0.5">
            <div className="relative w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-cyan-500 text-white text-xs font-extrabold shadow-inner overflow-hidden">
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              <span className="relative z-10">{userInitials}</span>
              {/* Online indicator */}
              <span className="absolute right-0 bottom-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900 z-20" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {userName}
              </p>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate mt-0.5 uppercase tracking-wide">
                {userRole}
              </p>
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 dark:group-hover:bg-indigo-500/20 transition-colors shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        </div>

        {/* =====================================================
            NAVIGATION LIST
        ===================================================== */}
        <nav className="flex-1 overflow-y-auto px-4 pb-6 custom-scrollbar">
          <div className="flex items-center justify-between px-3 mb-4 mt-2">
            <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
              Learning Tracks
            </span>
            <span className="text-[9px] font-extrabold px-2 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              {phases.length}
            </span>
          </div>

          <div className="space-y-2">
            {phases.map((phase, index) => {
              const isActive = activePhase === phase.id;

              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  className={`group relative flex items-center gap-3.5 w-full p-3 rounded-[16px] transition-all duration-300 ease-out focus:outline-none
                    ${isActive
                      ? 'bg-white dark:bg-slate-900 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] border border-slate-200/80 dark:border-slate-700/80 scale-[1.02]'
                      : 'border border-transparent hover:bg-slate-200/40 dark:hover:bg-slate-800/40 hover:border-slate-300/50 dark:hover:border-slate-700/50 hover:translate-x-1'
                    }`}
                >
                  {/* Left Active Glow Bar */}
                  <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-indigo-500 transition-all duration-300 shadow-[0_0_10px_rgba(99,102,241,0.6)]
                      ${isActive ? 'h-8 opacity-100' : 'h-0 opacity-0'}`}
                  />

                  {/* Icon Container */}
                  <div className={`relative w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 transition-all duration-300
                    ${isActive
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-500/30'
                      : 'bg-slate-100 dark:bg-slate-800/80 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:shadow-sm group-hover:ring-1 group-hover:ring-slate-200 dark:group-hover:ring-slate-700'
                    }`}
                  >
                    {renderIcon(phase.id, isActive)}
                  </div>

                  {/* Text */}
                  <div className="text-left flex-1 min-w-0">
                    <p className={`text-[13px] font-extrabold truncate transition-colors duration-300
                      ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}
                    >
                      {phase.title.split(':')[0]}
                    </p>
                    <p className={`text-[10px] font-semibold truncate mt-0.5 transition-colors duration-300
                      ${isActive ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}
                    >
                      {phase.title.split(':')[1]?.trim() || phase.title}
                    </p>
                  </div>

                  {/* Phase Number Badge */}
                  <span className={`hidden xl:flex w-6 h-6 rounded-lg items-center justify-center text-[10px] font-extrabold transition-colors duration-300 shrink-0
                    ${isActive
                      ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                      : 'bg-slate-200/50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                    }`}
                  >
                    {index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* =========================================================
          MOBILE BOTTOM NAVIGATION (Floating Pill Design)
      ========================================================= */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-between px-2 py-2 max-w-md mx-auto bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] rounded-[24px]">
          
          {phases.map((phase) => {
            const isActive = activePhase === phase.id;

            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className="group relative flex flex-col items-center justify-center min-w-[64px] h-[60px] rounded-[18px] transition-all duration-300 active:scale-90 focus:outline-none"
              >
                {/* Active Background Bubble */}
                <div className={`absolute inset-0 rounded-[18px] transition-all duration-300 ease-out
                  ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10 scale-100 opacity-100' : 'bg-transparent scale-50 opacity-0 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 group-hover:scale-100 group-hover:opacity-100'}`} 
                />

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center mb-1">
                  {renderIcon(phase.id, isActive)}
                </div>

                {/* Label */}
                <span className={`relative z-10 text-[9px] font-extrabold tracking-wide transition-colors duration-300
                  ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}
                >
                  P{phase.id.replace('phase', '')}
                </span>

                {/* Active Underline Dot */}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default ResponsiveNavigation;