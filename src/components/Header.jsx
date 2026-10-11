import React, { useState, useRef, useEffect } from 'react';
import FocusTimer from './FocusTimer';
import { Icons } from './Icons'; 

// Premium Circular Progress Ring
const CircularProgress = ({ progress, isActive, isCompleted, size = 32 }) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 absolute inset-0" width={size} height={size}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={isActive ? 'text-white/30' : 'text-slate-200 dark:text-slate-800'}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
            ${isActive ? 'text-white' : (isCompleted ? 'text-emerald-500' : 'text-indigo-500')}`}
        />
      </svg>
      <span className={`text-[9px] font-extrabold tabular-nums tracking-tighter ${isActive ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
        {isCompleted ? (
          <Icons.Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3.5} />
        ) : (
          `${Math.round(progress)}%`
        )}
      </span>
    </div>
  );
};

const Header = ({
  activePhase,
  setActivePhase,
  phasesData,
  overallProgress,
  phaseProgress,
  onOpenSettings,
  onOpenAbout,
  isScrolled,
  tasks = [] 
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
    <>
      {/* =========================================================
          DYNAMIC ISLAND (Sticky Top Bar)
      ========================================================= */}
      <div className="sticky top-0 z-40 w-full pt-2 md:pt-4 px-3 md:px-6 pointer-events-none pb-2">
        <div 
          className={`mx-auto w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-auto flex items-center justify-between
            ${isScrolled
              ? 'max-w-4xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] rounded-[24px] md:rounded-[32px] px-3 md:px-5 py-2'
              : 'max-w-5xl bg-transparent px-2 md:px-4 py-2'
            }`}
        >
          {/* Brand & Scrolled Title Area */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 transition-all duration-500 relative overflow-hidden
                ${isScrolled ? 'w-8 h-8 rounded-xl' : 'w-12 h-12'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
              <svg className={`transition-all duration-500 ${isScrolled ? 'w-4 h-4' : 'w-6 h-6'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            <div className={`flex flex-col justify-center transition-all duration-500 ease-out overflow-hidden
              ${isScrolled ? 'opacity-100 flex-1 min-w-0 ml-1' : 'opacity-0 w-0 ml-0'}`}
            >
              <div className="flex items-center justify-between gap-3 mr-2 md:mr-6">
                <h3 className="text-[12px] md:text-sm font-extrabold text-slate-800 dark:text-slate-100 truncate">
                  {currentPhase?.title.split(':')[0]}
                </h3>
                <span className="text-[10px] md:text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums shrink-0">
                  {Math.round(phaseProgress[activePhase] || 0)}%
                </span>
              </div>
              <div className="h-1 w-full max-w-[180px] md:max-w-xs bg-slate-200/80 dark:bg-slate-700/80 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${phaseProgress[activePhase] || 0}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className={`transition-transform duration-500 origin-right ${isScrolled ? 'scale-[0.85] md:scale-95' : 'scale-100'}`}>
              <FocusTimer />
            </div>

            {/* FIXED MENU BUTTON (Proper Hamburger + Elegant Active State) */}
            <div className={`relative z-50 transition-all duration-300 ${isScrolled ? 'hidden sm:block' : 'block'}`} ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`group flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-[18px] border transition-all duration-300 active:scale-90
                  ${isMenuOpen
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-400 shadow-inner'
                    : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:border-indigo-300 hover:text-indigo-600 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400 shadow-sm'
                  }`}
              >
                {isMenuOpen ? (
                  <svg className="w-5 h-5 animate-[scale-in_0.2s_ease-out]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 animate-[scale-in_0.2s_ease-out]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              {/* ENHANCED DROPDOWN (Vibrant Colors & Snappier Animation) */}
              {isMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-64 p-2 rounded-[24px] border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] animate-[scale-in_0.2s_ease-out] origin-top-right">
                  <button onClick={() => { onOpenSettings(); setIsMenuOpen(false); }} className="group flex items-center gap-4 px-3 py-3 w-full rounded-[16px] text-left transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/80">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-500/20 transition-colors">
                      <Icons.Settings className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800 dark:text-slate-100">Settings & Data</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Preferences & backups</p>
                    </div>
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-slate-800/60 mx-4 my-1" />
                  <button onClick={() => { onOpenAbout(); setIsMenuOpen(false); }} className="group flex items-center gap-4 px-3 py-3 w-full rounded-[16px] text-left transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/80">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100 group-hover:text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400 dark:group-hover:bg-cyan-500/20 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800 dark:text-slate-100">About Tracker</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Version & info</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          HERO DASHBOARD
      ========================================================= */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-1 mb-5 relative z-10">
        
        {/* Title Area */}
        <div className="mb-5 md:mb-8 mt-4 md:mt-0">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2 md:mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400">
              {currentPhase?.title}
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg font-medium max-w-2xl leading-relaxed pr-4">
            {currentPhase?.subtitle}
          </p>
        </div>

        {/* Swipeable Phase Cards: ENHANCED COLOR GRADING */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 md:gap-4 mb-6 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-5 md:overflow-visible md:snap-none md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {phasesData.map(phase => {
            const isActive = activePhase === phase.id;
            const prog = Math.round(phaseProgress[phase.id] || 0);
            const isCompleted = prog === 100;
            
            // Calculate Tasks
            const phaseTasks = tasks.filter(t => t.phaseId === phase.id);
            const totalCount = phaseTasks.length;
            const completedCount = phaseTasks.filter(t => t.isCompleted).length;
            
            const PhaseIcon = Icons[phase.id.charAt(0).toUpperCase() + phase.id.slice(1)] || Icons.Phase1;

            return (
              <div
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`shrink-0 w-[58vw] sm:w-[38vw] md:w-auto md:min-w-[160px] snap-center group relative flex flex-col justify-between p-4 md:p-4.5 rounded-[20px] md:rounded-[24px] border transition-all duration-300 cursor-pointer overflow-hidden min-h-[110px] md:min-h-[120px]
                  ${isActive
                    ? 'bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 border-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_24px_-8px_rgba(79,70,229,0.5)] scale-[1.02] ring-2 ring-indigo-500/20 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950'
                    : 'bg-white/90 dark:bg-slate-800/80 backdrop-blur-md border-slate-200/80 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:-translate-y-1'
                  }`}
              >
                {/* Internal Glow for Active Card */}
                {isActive && <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 blur-2xl rounded-full pointer-events-none" />}

                {/* Top Row: Icon (Left) & Circular Progress (Right) */}
                <div className="flex justify-between items-start mb-3 relative z-10 w-full">
                  <div className={`p-2 rounded-[12px] transition-colors duration-300 border border-transparent
                    ${isActive 
                      ? 'bg-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] border-white/10' 
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                    }`}
                  >
                    <PhaseIcon className="w-5 h-5 md:w-5 md:h-5" strokeWidth={2} />
                  </div>
                  
                  <CircularProgress progress={prog} isActive={isActive} isCompleted={isCompleted} size={34} />
                </div>

                {/* Bottom Row: Phase Name (Left) & Fraction (Right) */}
                <div className="relative z-10 mt-auto w-full">
                  <span className={`block text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.15em] mb-1 transition-colors
                    ${isActive ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'}`}
                  >
                    {phase.title.split(':')[0]}
                  </span>
                  
                  <div className="flex items-end justify-between gap-2 w-full">
                    <span className={`block text-sm md:text-[15px] font-bold truncate transition-colors leading-none
                      ${isActive ? 'text-white' : 'text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}
                    >
                      {phase.title.split(':')[1]?.trim() || 'Phase'}
                    </span>

                    <span className={`flex items-center gap-0.5 text-[10px] md:text-[11px] font-bold tabular-nums tracking-wide transition-colors leading-none pb-[1px]
                      ${isActive ? 'text-indigo-100/90' : 'text-slate-400 dark:text-slate-500'}`}
                    >
                      {completedCount}
                      <span className="opacity-50 text-[9px] font-black">/</span>
                      {totalCount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Journey Bar */}
        <div className="flex items-center gap-4 px-1 md:px-2">
          <span className="text-[10px] md:text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">
            Total Journey
          </span>
          <div className="relative h-1.5 md:h-2 w-full bg-slate-200/80 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner flex-1">
            <div
              className="relative h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${overallProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] rounded-full" />
            </div>
          </div>
          <span className="text-xs md:text-sm font-extrabold text-slate-700 dark:text-slate-200 tabular-nums w-8 text-right">
            {Math.round(overallProgress)}%
          </span>
        </div>

      </div>
    </>
  );
};

export default Header;