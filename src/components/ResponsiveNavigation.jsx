import React from 'react';

const ResponsiveNavigation = ({
  activePhase,
  setActivePhase,
  phases,

  // Generic defaults that can be overridden via props from App.jsx
  title = "Developer Roadmap",
  subtitle = "Interview Preparation",
  userName = "Guest User",
  userRole = "Software Engineer",
  userInitials = "DEV"
}) => {

  const renderIcon = (phaseId, isActive) => {
    const iconClass = `
      w-5 h-5
      transition-all duration-300
      ${isActive
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200'
      }
    `;

    switch (phaseId) {
      case 'phase1':
        return (
          <svg
            className={iconClass}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 20l4-16" />
            <path d="M18 8l4 4-4 4" />
            <path d="M6 16l-4-4 4-4" />
          </svg>
        );

      case 'phase2':
        return (
          <svg
            className={iconClass}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="8" rx="2" />
            <rect x="3" y="12" width="18" height="8" rx="2" />
            <path d="M17 8h.01" />
            <path d="M17 16h.01" />
          </svg>
        );

      case 'phase3':
        return (
          <svg
            className={iconClass}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.5 19H7a4 4 0 01-.9-7.9A5.5 5.5 0 0116.8 8a5 5 0 01.7 9.9V19z" />
          </svg>
        );

      case 'phase4':
        return (
          <svg
            className={iconClass}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" />
          </svg>
        );

      default:
        return (
          <svg
            className={iconClass}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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

      <aside
        className="
          hidden md:flex
          flex-col
          w-72
          h-screen
          fixed
          left-0
          top-0
          z-30

          bg-white/80
          dark:bg-slate-950/80

          backdrop-blur-2xl

          border-r
          border-slate-200/80
          dark:border-slate-800/80

          shadow-[8px_0_30px_-20px_rgba(15,23,42,0.25)]
          dark:shadow-[8px_0_30px_-20px_rgba(0,0,0,0.6)]
        "
      >

        {/* Subtle top accent */}
        <div className="
          absolute
          top-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-blue-500/50
          to-transparent
        " />

        {/* =====================================================
            PROFILE / BRAND HEADER
        ===================================================== */}

        <div className="p-5">

          {/* Brand */}
          <div className="
            flex
            items-center
            gap-3
            p-3
            rounded-2xl
            bg-slate-50/80
            dark:bg-slate-900/70
            border
            border-slate-200/70
            dark:border-slate-800
          ">

            <div className="
              relative
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              shrink-0

              bg-gradient-to-br
              from-blue-500
              via-indigo-500
              to-violet-600

              text-white
              shadow-lg
              shadow-blue-500/20
            ">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>

              <span className="
                absolute
                inset-0
                rounded-xl
                ring-1
                ring-inset
                ring-white/20
              " />
            </div>

            <div className="min-w-0">
              <h1 className="
                text-sm
                font-extrabold
                tracking-tight
                text-slate-900
                dark:text-white
                truncate
              ">
                {title}
              </h1>

              <p className="
                text-[10px]
                font-semibold
                text-slate-400
                dark:text-slate-500
                uppercase
                tracking-wider
                truncate
                mt-0.5
              ">
                {subtitle}
              </p>
            </div>

          </div>


          {/* User Profile */}
          <div className="
            mt-4
            flex
            items-center
            gap-3
            p-3
            rounded-2xl

            border
            border-slate-200/70
            dark:border-slate-800

            bg-white
            dark:bg-slate-900/70

            shadow-sm
          ">

            <div className="
              relative
              w-10
              h-10
              rounded-full
              shrink-0
              flex
              items-center
              justify-center

              bg-gradient-to-br
              from-blue-500
              to-indigo-600

              text-white
              text-xs
              font-extrabold

              shadow-md
              shadow-blue-500/20
            ">
              {userInitials}

              {/* Online indicator */}
              <span className="
                absolute
                right-0
                bottom-0
                w-2.5
                h-2.5
                rounded-full
                bg-emerald-500
                border-2
                border-white
                dark:border-slate-900
              " />
            </div>

            <div className="min-w-0 flex-1">
              <p className="
                text-sm
                font-bold
                text-slate-900
                dark:text-slate-100
                truncate
              ">
                {userName}
              </p>

              <p className="
                text-[11px]
                font-medium
                text-slate-400
                dark:text-slate-500
                truncate
                mt-0.5
              ">
                {userRole}
              </p>
            </div>

            <div className="
              w-7
              h-7
              rounded-lg
              flex
              items-center
              justify-center
              bg-slate-50
              dark:bg-slate-800
              text-slate-400
              dark:text-slate-500
            ">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

          </div>

        </div>


        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav className="
          flex-1
          overflow-y-auto
          px-4
          pb-5
          custom-scrollbar
        ">

          <div className="
            flex
            items-center
            justify-between
            px-2
            mb-3
          ">
            <span className="
              text-[10px]
              font-extrabold
              text-slate-400
              dark:text-slate-500
              uppercase
              tracking-[0.16em]
            ">
              Learning Tracks
            </span>

            <span className="
              text-[9px]
              font-bold
              px-2
              py-1
              rounded-full
              bg-slate-100
              dark:bg-slate-800
              text-slate-400
              dark:text-slate-500
            ">
              {phases.length}
            </span>
          </div>


          <div className="space-y-1.5">

            {phases.map((phase, index) => {

              const isActive = activePhase === phase.id;

              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Navigate to ${phase.title}`}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    w-full
                    p-2.5
                    rounded-2xl

                    transition-all
                    duration-300

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-500

                    active:scale-[0.985]

                    ${isActive
                      ? `
                        bg-blue-50/80
                        dark:bg-blue-950/30

                        border
                        border-blue-200/80
                        dark:border-blue-900/60

                        shadow-sm
                      `
                      : `
                        border
                        border-transparent

                        hover:bg-slate-50
                        dark:hover:bg-slate-900

                        hover:border-slate-200/70
                        dark:hover:border-slate-800
                      `
                    }
                  `}
                >

                  {/* Active indicator */}
                  <span
                    className={`
                      absolute
                      left-0
                      top-1/2
                      -translate-y-1/2
                      w-0.5
                      rounded-full
                      bg-blue-500
                      transition-all
                      duration-300
                      ${isActive
                        ? 'h-8 opacity-100'
                        : 'h-0 opacity-0'
                      }
                    `}
                  />

                  {/* Icon container */}
                  <div className={`
                    relative
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    shrink-0

                    transition-all
                    duration-300

                    ${isActive
                      ? `
                        bg-white
                        dark:bg-slate-900

                        shadow-sm

                        ring-1
                        ring-blue-100
                        dark:ring-blue-900/50
                      `
                      : `
                        bg-slate-50
                        dark:bg-slate-900/70

                        group-hover:bg-white
                        dark:group-hover:bg-slate-800
                      `
                    }
                  `}>
                    {renderIcon(phase.id, isActive)}

                    {/* Active glow */}
                    {isActive && (
                      <span className="
                        absolute
                        inset-0
                        rounded-xl
                        bg-blue-500/5
                        blur-md
                      " />
                    )}
                  </div>


                  {/* Text */}
                  <div className="text-left flex-1 min-w-0">

                    <div className="flex items-center gap-2">

                      <p className={`
                        text-sm
                        font-bold
                        truncate

                        ${isActive
                          ? 'text-blue-700 dark:text-blue-400'
                          : 'text-slate-700 dark:text-slate-300'
                        }
                      `}>
                        {phase.title.split(':')[0]}
                      </p>

                      {isActive && (
                        <span className="
                          shrink-0
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-blue-500
                          shadow-[0_0_7px_rgba(59,130,246,0.7)]
                        " />
                      )}

                    </div>

                    <p className="
                      text-[10px]
                      font-medium
                      text-slate-400
                      dark:text-slate-500
                      truncate
                      mt-0.5
                    ">
                      {phase.title.split(':')[1]?.trim() || phase.title}
                    </p>

                  </div>


                  {/* Phase number */}
                  <span className={`
                    hidden lg:flex
                    w-6
                    h-6
                    rounded-lg
                    items-center
                    justify-center
                    text-[9px]
                    font-extrabold

                    transition-colors

                    ${isActive
                      ? `
                        bg-blue-100
                        dark:bg-blue-900/40
                        text-blue-600
                        dark:text-blue-400
                      `
                      : `
                        bg-slate-100
                        dark:bg-slate-800
                        text-slate-400
                        dark:text-slate-500
                      `
                    }
                  `}>
                    {index + 1}
                  </span>

                </button>
              );
            })}

          </div>

        </nav>

      </aside>


      {/* =========================================================
          MOBILE BOTTOM NAVIGATION
      ========================================================= */}

      <nav className="
        md:hidden
        fixed
        bottom-0
        left-0
        w-full
        z-50

        bg-white/90
        dark:bg-slate-950/90

        backdrop-blur-2xl

        border-t
        border-slate-200/80
        dark:border-slate-800/80

        shadow-[0_-12px_35px_-20px_rgba(15,23,42,0.35)]
        dark:shadow-[0_-12px_35px_-20px_rgba(0,0,0,0.7)]

        pb-safe
      ">

        {/* Top highlight */}
        <div className="
          absolute
          top-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-blue-500/30
          to-transparent
        " />

        <div className="
          flex
          items-center
          justify-between
          px-3
          sm:px-5
          py-2.5
          max-w-md
          mx-auto
        ">

          {phases.map((phase) => {

            const isActive = activePhase === phase.id;

            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Navigate to ${phase.title}`}
                className="
                  group
                  relative
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  min-w-[58px]
                  px-2
                  py-1.5
                  rounded-xl

                  active:scale-95

                  transition-all
                  duration-200

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                "
              >

                {/* Active background */}
                <div className={`
                  absolute
                  inset-0
                  rounded-xl
                  transition-all
                  duration-300

                  ${isActive
                    ? `
                      bg-blue-50
                      dark:bg-blue-950/40
                      opacity-100
                    `
                    : `
                      opacity-0
                      group-hover:opacity-100
                      bg-slate-100
                      dark:bg-slate-900
                    `
                  }
                `} />


                {/* Icon */}
                <div className={`
                  relative
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  rounded-xl

                  transition-all
                  duration-300

                  ${isActive
                    ? `
                      bg-white
                      dark:bg-slate-900
                      shadow-sm
                      ring-1
                      ring-blue-100
                      dark:ring-blue-900/50
                    `
                    : ''
                  }
                `}>
                  {renderIcon(phase.id, isActive)}
                </div>


                {/* Label */}
                <span className={`
                  relative
                  text-[9px]
                  font-bold
                  transition-colors
                  duration-200

                  ${isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-400 dark:text-slate-500'
                  }
                `}>
                  Phase {phase.id.replace('phase', '')}
                </span>


                {/* Active indicator */}
                {isActive && (
                  <span className="
                    absolute
                    -bottom-2
                    left-1/2
                    -translate-x-1/2

                    w-5
                    h-0.5
                    rounded-full

                    bg-blue-500

                    shadow-[0_0_8px_rgba(59,130,246,0.8)]
                  " />
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

