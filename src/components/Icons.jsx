import React from 'react';

export const Icons = {
  // ------------------------------------------------------------------------
  // PHASE ICONS (Curriculum Tracks)
  // ------------------------------------------------------------------------
  
  // Phase 1: DSA & Coding (Brackets)
  Phase1: ({ className = "w-6 h-6", strokeWidth = 1.8, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 20l4-16" />
      <path d="M18 8l4 4-4 4" />
      <path d="M6 16l-4-4 4-4" />
    </svg>
  ),

  // Phase 2: Backend (Server Racks)
  Phase2: ({ className = "w-6 h-6", strokeWidth = 1.8, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="8" rx="2" />
      <rect x="3" y="12" width="18" height="8" rx="2" />
      <path d="M17 8h.01" />
      <path d="M17 16h.01" />
    </svg>
  ),

  // Phase 3: Cloud (Cloud Network)
  Phase3: ({ className = "w-6 h-6", strokeWidth = 1.8, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.5 19H7a4 4 0 01-.9-7.9A5.5 5.5 0 0116.8 8a5 5 0 01.7 9.9V19z" />
    </svg>
  ),

  // Phase 4: AI / High Performance (Lightning)
  Phase4: ({ className = "w-6 h-6", strokeWidth = 1.8, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" />
    </svg>
  ),

  // Phase 5: System Design / Architecture (Database Cylinders)
  Phase5: ({ className = "w-6 h-6", strokeWidth = 1.8, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 7v10c0 2 3.5 3.5 8 3.5s8-1.5 8-3.5V7" />
      <path d="M4 7c0 2 3.5 3.5 8 3.5s8-1.5 8-3.5" />
      <path d="M4 7c0-2 3.5-3.5 8-3.5s8 1.5 8 3.5" />
      <path d="M4 12c0 2 3.5 3.5 8 3.5s8-1.5 8-3.5" />
    </svg>
  ),

  // ------------------------------------------------------------------------
  // UI CONTROLS & ACTIONS
  // ------------------------------------------------------------------------

  Settings: ({ className = "w-5 h-5", strokeWidth = 1.8, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
      <path d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.03 1.56V20h-2.4v-.2a1.7 1.7 0 00-1.03-1.56 1.7 1.7 0 00-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 008.46 15a1.7 1.7 0 00-1.56-1.03H6.7v-2.4h.2A1.7 1.7 0 008.46 10a1.7 1.7 0 00-.34-1.88l-.06-.06 1.7-1.7.06.06a1.7 1.7 0 001.88.34 1.7 1.7 0 001.03-1.56V5h2.4v.2a1.7 1.7 0 001.03 1.56 1.7 1.7 0 001.88-.34l.06-.06 1.7 1.7-.06.06A1.7 1.7 0 0019.4 10a1.7 1.7 0 001.56 1.03h.2v2.4h-.2A1.7 1.7 0 0019.4 15z" />
    </svg>
  ),

  Check: ({ className = "w-4 h-4", strokeWidth = 3, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),

  Plus: ({ className = "w-6 h-6", strokeWidth = 2.5, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 4v16m8-8H4" />
    </svg>
  ),

  Close: ({ className = "w-5 h-5", strokeWidth = 2.5, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),

  Edit: ({ className = "w-4 h-4", strokeWidth = 2.5, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),

  Trash: ({ className = "w-4 h-4", strokeWidth = 2.5, ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
};