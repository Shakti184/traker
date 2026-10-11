import React, { useState, useEffect, useRef } from 'react';

const TIMER_MODES = {
  m15: { id: 'm15', label: '15 Minutes', minutes: 15, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  m30: { id: 'm30', label: '30 Minutes', minutes: 30, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  m45: { id: 'm45', label: '45 Minutes', minutes: 45, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
  m60: { id: 'm60', label: '60 Minutes', minutes: 60, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10' },
  m90: { id: 'm90', label: '90 Minutes', minutes: 90, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10' }
};

const FocusTimer = () => {
  const [activeMode, setActiveMode] = useState(TIMER_MODES.m45);
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.m45.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTimesUp, setShowTimesUp] = useState(false);
  
  const menuRef = useRef(null);

  // Timer Countdown Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setShowTimesUp(true);
      
      // Play a subtle notification sound
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.volume = 0.5;
        audio.play();
      } catch (e) {
        console.log("Audio play blocked by browser policies.");
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Click outside listener for dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const toggleTimer = () => setIsActive(!isActive);

  const changeMode = (modeKey) => {
    const selectedMode = TIMER_MODES[modeKey];
    setActiveMode(selectedMode);
    setTimeLeft(selectedMode.minutes * 60);
    setIsActive(false);
    setIsMenuOpen(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <>
      <div 
        className={`relative z-50 flex items-center h-10 md:h-11 rounded-[18px] transition-all duration-300 group border
          ${isActive 
            ? `bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm ${activeMode.color.split(' ')[0].replace('text', 'shadow')}/10` 
            : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm'
          }`} 
        ref={menuRef}
      >
        
        {/* Left Side: Play/Pause Button */}
        <button 
          onClick={toggleTimer} 
          className={`flex items-center gap-2.5 h-full pl-3 md:pl-4 pr-3 rounded-l-[18px] transition-all duration-300 active:scale-[0.98]
            ${isActive 
              ? `${activeMode.bg} border-r border-transparent` 
              : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
        >
          {isActive ? (
            <div className="relative flex items-center justify-center w-4 h-4">
              {/* Pulse Ring */}
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${activeMode.bg.split(' ')[0].replace('/10', '')}`} />
              <svg className={`w-3.5 h-3.5 relative ${activeMode.color}`} fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
            </div>
          ) : (
            <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
          
          <span className={`font-mono font-bold text-sm md:text-base tabular-nums transition-colors tracking-tight
            ${isActive ? activeMode.color : 'text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}
          >
            {formatTime(timeLeft)}
          </span>
        </button>

        {/* Divider */}
        <div className={`w-px h-5 transition-colors duration-300 ${isActive ? 'bg-transparent' : 'bg-slate-200/80 dark:bg-slate-700'}`} />

        {/* Right Side: Mode Selector Chevron */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className={`flex items-center justify-center h-full pl-2 pr-3 md:pr-4 rounded-r-[18px] transition-all duration-300
            ${isMenuOpen ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'}`}
        >
          <svg className={`w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Premium Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-[calc(100%+8px)] w-56 p-2 rounded-[24px] border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)] animate-[scale-in_0.2s_ease-out] origin-top-right flex flex-col">
            <div className="px-3 pt-2 pb-1.5 mb-1.5 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Select Duration</span>
            </div>
            
            {Object.entries(TIMER_MODES).map(([key, mode]) => {
              const isSelected = activeMode.id === key;
              return (
                <button 
                  key={key}
                  onClick={() => changeMode(key)}
                  className={`group flex items-center justify-between w-full px-3.5 py-2.5 rounded-[16px] transition-all duration-200 text-[13px] font-bold mb-1 last:mb-0
                    ${isSelected 
                      ? `${mode.bg}${mode.color}` 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />}
                    {mode.label}
                  </span>
                  <span className={`text-[11px] tabular-nums transition-opacity ${isSelected ? 'opacity-80' : 'opacity-50 group-hover:opacity-80'}`}>
                    {mode.minutes}:00
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================
          TIME's UP MODAL (Sits atop everything)
      ========================================================= */}
      {showTimesUp && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md transition-all duration-300 animate-[fade-in_0.2s_ease-out]">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] border border-slate-100 dark:border-slate-800 p-8 flex flex-col items-center text-center animate-[scale-in_0.2s_ease-out]">
            
            {/* Celebration Icon */}
            <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
              <svg className="w-8 h-8 relative z-10 animate-[wiggle_1s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
              Time's Up!
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium">
              Your <span className={`font-extrabold ${activeMode.color}`}>{activeMode.label}</span> focus session is complete. Great job! Take a moment to stretch and reset.
            </p>
            
            <button 
              onClick={() => {
                setShowTimesUp(false);
                setTimeLeft(activeMode.minutes * 60); // Reset timer for next session
              }}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-[16px] shadow-md transition-all duration-300 active:scale-95"
            >
              Close & Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FocusTimer;