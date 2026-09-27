import React, { useState, useEffect, useRef } from 'react';

const TIMER_MODES = {
  m15: { id: 'm15', label: '15 Minutes', minutes: 15, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  m30: { id: 'm30', label: '30 Minutes', minutes: 30, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  m45: { id: 'm45', label: '45 Minutes', minutes: 45, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  m60: { id: 'm60', label: '60 Minutes', minutes: 60, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  m90: { id: 'm90', label: '90 Minutes', minutes: 90, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' }
};

const FocusTimer = () => {
  const [activeMode, setActiveMode] = useState(TIMER_MODES.m45);
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.m45.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTimesUp, setShowTimesUp] = useState(false); // NEW: State for popup
  
  const menuRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setShowTimesUp(true); // NEW: Trigger the modal when time hits 0
      
      // Optional: Play a subtle notification sound
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      <div className="relative z-50 flex items-center h-10 md:h-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm hover:shadow transition-all group" ref={menuRef}>
        
        {/* Left Side: Play/Pause Button */}
        <button 
          onClick={toggleTimer} 
          className={`flex items-center gap-2 h-full pl-3 md:pl-4 pr-2.5 rounded-l-full transition-colors active:bg-slate-50 dark:active:bg-slate-800
            ${isActive ? activeMode.bg : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
        >
          {isActive ? (
            <div className="relative flex items-center justify-center w-4 h-4">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping ${activeMode.bg.split(' ')[0]}`} />
              <svg className={`w-4 h-4 relative ${activeMode.color}`} fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
            </div>
          ) : (
            <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
          
          <span className={`font-mono font-bold text-sm md:text-base tabular-nums transition-colors ${isActive ? activeMode.color : 'text-slate-600 dark:text-slate-300'}`}>
            {formatTime(timeLeft)}
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />

        {/* Right Side: Mode Selector Chevron */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className={`flex items-center justify-center h-full pl-2 pr-3 md:pr-4 rounded-r-full transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${isMenuOpen ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
        >
          <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Premium Glassmorphic Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-3 w-48 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-2xl animate-fade-in-up origin-top-right overflow-hidden flex flex-col p-1.5">
            <div className="px-3 pt-2 pb-1.5 mb-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Duration</span>
            </div>
            
            {Object.entries(TIMER_MODES).map(([key, mode]) => (
              <button 
                key={key}
                onClick={() => changeMode(key)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all text-sm font-semibold
                  ${activeMode.id === key 
                    ? `${mode.bg}${mode.color}` 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                <span>{mode.label}</span>
                <span className="text-xs font-bold opacity-60 tabular-nums">{mode.minutes}:00</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* NEW: Custom Time's Up Modal */}
      {showTimesUp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[24px] shadow-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center animate-fade-in-up">
            
            <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-5 border border-indigo-100 dark:border-indigo-800/50 shadow-inner">
              <svg className="w-8 h-8 text-indigo-500 animate-[wiggle_1s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Time's Up!</h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Your <span className="font-bold text-indigo-500">{activeMode.label}</span> focus session is complete. Great job! Take a moment to stretch and reset.
            </p>
            
            <button 
              onClick={() => {
                setShowTimesUp(false);
                setTimeLeft(activeMode.minutes * 60); // Reset timer for next session
              }}
              className="w-full py-3 px-4 bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-all active:scale-95"
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