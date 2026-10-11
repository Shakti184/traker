import React, { useState, useEffect, useRef } from 'react';

const AddTaskModal = ({ isOpen, onClose, onAddTask, phasesData, defaultPhase }) => {
  const [topic, setTopic] = useState('');
  const [directive, setDirective] = useState('');
  const [phaseId, setPhaseId] = useState('');
  const [dayLabel, setDayLabel] = useState('Custom Task');
  
  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicking outside to close the custom dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTopic('');
      setDirective('');
      setPhaseId(defaultPhase || (phasesData[0]?.id || ''));
      setDayLabel('Custom Task');
      setIsDropdownOpen(false);
    }
  }, [isOpen, defaultPhase, phasesData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim() || !directive.trim()) return;

    const newTask = {
      id: `custom_${Date.now()}`,
      phaseId,
      dayLabel: dayLabel.trim() || 'Custom',
      topic: topic.trim(),
      directive: directive.trim(),
      isCompleted: false,
      notes: '',
      links: [],
      isCustom: true // CRITICAL: Tells the app not to delete this during system updates
    };

    onAddTask(newTask);
  };

  const selectedPhase = phasesData.find(p => p.id === phaseId);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md transition-all duration-300">
      
      {/* Modal Container */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[28px] md:rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] border border-slate-100 dark:border-slate-800 flex flex-col animate-[scale-in_0.25s_ease-out]">
        
        {/* =========================================================
            PREMIUM HEADER
        ========================================================= */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 rounded-t-[28px] md:rounded-t-[32px]">
          <div className="flex items-center gap-3.5">
            <div className="flex shrink-0 items-center justify-center w-11 h-11 rounded-[14px] bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
              <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-white leading-tight tracking-tight">
                Create Custom Task
              </h2>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 mt-0.5">
                Add to your workspace
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="group p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-all active:scale-90"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* =========================================================
            FORM BODY
        ========================================================= */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6 overflow-y-auto max-h-[75vh] custom-scrollbar rounded-b-[28px] md:rounded-b-[32px] relative">
          
          {/* Topic Field */}
          <div>
            <label className="block text-[10px] md:text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">
              Task Topic
            </label>
            <input 
              type="text" 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)} 
              placeholder="e.g. Design a Rate Limiter" 
              autoFocus
              className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[16px] text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:ring-indigo-500/20 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
              required
            />
          </div>

          {/* Directive Field */}
          <div>
            <label className="block text-[10px] md:text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">
              Focus Directive
            </label>
            <textarea 
              value={directive} 
              onChange={(e) => setDirective(e.target.value)} 
              placeholder="What specifically do you need to learn or solve?" 
              rows={3}
              className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[16px] text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:ring-indigo-500/20 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm resize-none custom-scrollbar"
              required
            />
          </div>

          {/* Grid Layout for Custom Dropdown & Label */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 md:pb-0">
            
            {/* Custom Premium Dropdown Component */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-[10px] md:text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">
                Phase Assignment
              </label>
              
              {/* Dropdown Trigger */}
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border rounded-[16px] text-sm font-semibold text-slate-900 dark:text-white transition-all duration-300 shadow-sm cursor-pointer flex justify-between items-center select-none
                  ${isDropdownOpen 
                    ? 'border-indigo-500 ring-4 ring-indigo-500/10 dark:ring-indigo-500/20' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
              >
                <span className="truncate">
                  {selectedPhase?.title || 'Select Phase'}
                </span>
                <svg 
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Dropdown Menu List */}
              <div 
                className={`absolute z-[200] top-[calc(100%+8px)] left-0 w-full p-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 rounded-[20px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-200 origin-top
                  ${isDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
              >
                {phasesData.map(p => {
                  const isSelected = phaseId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setPhaseId(p.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 mb-1 last:mb-0
                        ${isSelected 
                          ? 'bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    >
                      <span className="truncate pr-4">{p.title}</span>
                      {isSelected && (
                        <svg className="w-4 h-4 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badge Input */}
            <div>
              <label className="block text-[10px] md:text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] mb-2 pl-1">
                Badge Label
              </label>
              <input 
                type="text" 
                value={dayLabel} 
                onChange={(e) => setDayLabel(e.target.value)} 
                placeholder="e.g. Side Quest" 
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[16px] text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:ring-indigo-500/20 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
              />
            </div>
          </div>

          {/* =========================================================
              ACTION BUTTONS
          ========================================================= */}
          <div className="mt-4 flex gap-3 md:gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-xl transition-all duration-300 active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-[2] py-3.5 px-4 bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 hover:from-indigo-600 hover:via-blue-700 hover:to-cyan-600 text-white text-sm font-bold rounded-xl shadow-[0_8px_20px_-6px_rgba(99,102,241,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              Add Custom Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;