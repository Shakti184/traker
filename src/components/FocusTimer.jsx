import React, { useState, useEffect, useRef } from 'react';

const FocusTimer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0); 
  const timerRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timerRef.current && !timerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((time) => time - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      alert("⏳ Time is up! Drop your keyboard and review your architecture.");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = (minutes) => {
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setTotalTime(seconds);
    setIsActive(true);
  };

  const toggleTimer = () => { if (timeLeft > 0) setIsActive(!isActive); };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setTotalTime(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="relative z-50" ref={timerRef}>
      
      {/* Header Pill Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full border transition-all active:scale-95 ${
          isActive 
            ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/30' 
            : 'bg-slate-100/50 hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-blue-900/30 border-transparent dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {/* Only show time text if timer is running or paused with time left */}
        {timeLeft > 0 && (
          <span className="font-mono font-bold text-sm">{formatTime(timeLeft)}</span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isExpanded && (
        <div className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl animate-fade-in-up origin-top-right">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mock Timer</span>
          </div>

          {!isActive && timeLeft === 0 ? (
            <div className="space-y-2">
              <button onClick={() => startTimer(45)} className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">HLD Session</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">45 Min</span>
              </button>
              <button onClick={() => startTimer(90)} className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Machine Coding</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">90 Min</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-4xl font-mono font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                {formatTime(timeLeft)}
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-5">
                <div className="h-full bg-blue-500 transition-all duration-1000 linear" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="flex gap-2 w-full">
                <button onClick={toggleTimer} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 ${isActive ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'}`}>
                  {isActive ? 'Pause' : 'Resume'}
                </button>
                <button onClick={resetTimer} className="flex-1 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all active:scale-95">
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FocusTimer;