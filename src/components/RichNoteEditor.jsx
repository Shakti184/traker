import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
const RichNoteEditor = ({ initialNote, onSave }) => {
  const [mode, setMode] = useState('write');
  const [text, setText] = useState(initialNote || '');
  useEffect(() => {
    setText(initialNote || '');
  }, [initialNote]);
  const handleBlur = () => {
    if (text !== initialNote) onSave(text);
  };
  return (
    <div
      className="
        relative
        w-full
        max-w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/80
        dark:border-slate-800
        bg-white
        dark:bg-slate-950
        shadow-[0_8px_30px_-18px_rgba(15,23,42,0.35)]
        dark:shadow-[0_8px_30px_-18px_rgba(0,0,0,0.7)]
        transition-all
        duration-300
        focus-within:border-blue-300
        dark:focus-within:border-blue-900
        focus-within:shadow-[0_12px_35px_-18px_rgba(59,130,246,0.35)]
      "
    >
      {/* =========================================================
          EDITOR TOOLBAR
      ========================================================= */}
      <div
        className="
          relative
          flex
          items-center
          justify-between

          px-3
          py-2

          border-b
          border-slate-200/70
          dark:border-slate-800

          bg-slate-50/80
          dark:bg-slate-900/70

          backdrop-blur-xl

          w-full
          min-w-0
        "
      >

        {/* Subtle toolbar accent */}
        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-blue-500/30
            to-transparent
          "
        />

        <div className="flex items-center gap-2 min-w-0">

          {/* Editor icon */}
          <div
            className="
              hidden
              sm:flex
              w-8
              h-8
              rounded-lg
              items-center
              justify-center
              shrink-0

              bg-white
              dark:bg-slate-800

              border
              border-slate-200
              dark:border-slate-700

              text-slate-500
              dark:text-slate-400

              shadow-sm
            "
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 19.5V4.5a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0120 4.5v15a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 19.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7h8M8 11h8M8 15h5"
              />
            </svg>
          </div>

          {/* Mode switcher */}
          <div
            className="
              flex
              items-center
              gap-0.5

              p-1

              rounded-xl

              bg-slate-200/60
              dark:bg-slate-800

              border
              border-slate-200/60
              dark:border-slate-700

              shrink-0
            "
          >

            <button
              onClick={(e) => {
                e.stopPropagation();
                setMode('write');
              }}
              className={`
                group
                relative

                flex
                items-center
                justify-center
                gap-1.5

                px-3
                py-1.5

                rounded-lg

                text-[11px]
                font-bold

                transition-all
                duration-200

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-500

                active:scale-[0.97]

                ${mode === 'write'
                  ? `
                    bg-white
                    dark:bg-slate-700

                    text-blue-700
                    dark:text-blue-300

                    shadow-sm
                    ring-1
                    ring-slate-200/70
                    dark:ring-slate-600
                  `
                  : `
                    text-slate-500
                    dark:text-slate-400

                    hover:text-slate-700
                    dark:hover:text-slate-200

                    hover:bg-white/60
                    dark:hover:bg-slate-700/50
                  `
                }
              `}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20h9"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                />
              </svg>

              Write
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setMode('preview');
              }}
              className={`
                group
                relative

                flex
                items-center
                justify-center
                gap-1.5

                px-3
                py-1.5

                rounded-lg

                text-[11px]
                font-bold

                transition-all
                duration-200

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-500

                active:scale-[0.97]

                ${mode === 'preview'
                  ? `
                    bg-white
                    dark:bg-slate-700

                    text-blue-700
                    dark:text-blue-300

                    shadow-sm
                    ring-1
                    ring-slate-200/70
                    dark:ring-slate-600
                  `
                  : `
                    text-slate-500
                    dark:text-slate-400

                    hover:text-slate-700
                    dark:hover:text-slate-200

                    hover:bg-white/60
                    dark:hover:bg-slate-700/50
                  `
                }
              `}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                />
                <circle cx="12" cy="12" r="2.5" />
              </svg>

              Preview
            </button>

          </div>

        </div>


        {/* Current mode indicator */}
        <div
          className="
            hidden
            sm:flex
            items-center
            gap-1.5

            px-2.5
            py-1.5

            rounded-lg

            text-[9px]
            font-extrabold
            uppercase
            tracking-wider

            text-slate-400
            dark:text-slate-500

            bg-white/60
            dark:bg-slate-800/60

            border
            border-slate-200/60
            dark:border-slate-700
          "
        >
          <span
            className={`
              w-1.5
              h-1.5
              rounded-full

              ${mode === 'write'
                ? 'bg-blue-500'
                : 'bg-emerald-500'
              }
            `}
          />

          {mode === 'write' ? 'Editing' : 'Preview'}
        </div>

      </div>


      {/* =========================================================
          EDITOR BODY
      ========================================================= */}

      <div
        className="
          relative
          bg-white
          dark:bg-slate-950

          min-h-[250px]

          flex
          flex-col

          w-full
          max-w-full
          min-w-0
        "
        onClick={(e) => e.stopPropagation()}
      >

        {mode === 'write' ? (

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            placeholder="Write architecture notes..."
            className="
              flex-1
              w-full
              max-w-full
              min-h-[250px]

              p-4
              md:p-5
              pb-20
              md:pb-5

              text-[14px]
              md:text-sm

              font-mono

              bg-transparent

              border-none
              outline-none
              ring-0

              focus:ring-0
              focus:outline-none

              resize-y

              text-slate-700
              dark:text-slate-300

              placeholder:text-slate-400
              dark:placeholder:text-slate-600

              custom-scrollbar

              leading-7

              break-words
            "
          />

        ) : (

          <div
            className="
              flex-1

              p-4
              md:p-5
              pb-20
              md:pb-5

              min-h-[250px]

              text-sm
              text-slate-800
              dark:text-slate-200

              overflow-x-hidden
              overflow-y-auto

              custom-scrollbar

              animate-fade-in-up

              w-full
              max-w-full
              min-w-0

              break-words
              [overflow-wrap:anywhere]
            "
          >

            {/* Reading surface */}
            <div
              className="
                max-w-3xl
                mx-auto
                w-full

                rounded-xl

                px-1
              "
            >

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{

                  code({ node, inline, className, children, ...props }) {

                    const match = /language-(\w+)/.exec(className || '');

                    return !inline && match ? (

                      <div
                        className="
                          group

                          w-full
                          max-w-full

                          rounded-xl

                          my-4

                          overflow-hidden

                          border
                          border-slate-700/80

                          bg-[#111827]

                          shadow-lg
                          shadow-slate-900/10
                        "
                      >

                        {/* Code header */}
                        <div
                          className="
                            flex
                            items-center
                            justify-between

                            px-3
                            py-2

                            border-b
                            border-white/5

                            bg-white/[0.03]
                          "
                        >

                          <div className="flex items-center gap-1.5">

                            <span className="w-2 h-2 rounded-full bg-red-400/80" />
                            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />

                          </div>

                          <span
                            className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-wider
                              text-slate-500
                            "
                          >
                            {match[1]}
                          </span>

                        </div>

                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          wrapLongLines={true}
                          customStyle={{
                            margin: 0,
                            padding: '1rem',
                            background: 'transparent',
                            fontSize: '0.82rem',
                            lineHeight: '1.7'
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>

                      </div>

                    ) : (

                      <code
                        className="
                          bg-blue-50
                          dark:bg-slate-800

                          text-blue-700
                          dark:text-blue-300

                          px-1.5
                          py-0.5

                          rounded-md

                          text-xs
                          font-mono

                          border
                          border-blue-100
                          dark:border-slate-700

                          break-all
                          whitespace-pre-wrap
                        "
                        {...props}
                      >
                        {children}
                      </code>

                    );
                  },

                  a: ({ node, ...props }) => (
                    <a
                      className="
                        text-blue-600
                        dark:text-blue-400

                        font-semibold

                        decoration-blue-300
                        dark:decoration-blue-700

                        underline-offset-2

                        hover:underline

                        break-all
                      "
                      target="_blank"
                      rel="noreferrer"
                      {...props}
                    />
                  ),

                  ul: ({ node, ...props }) => (
                    <ul
                      className="
                        list-disc
                        pl-5
                        my-3
                        space-y-1.5

                        marker:text-blue-400
                        dark:marker:text-blue-500
                      "
                      {...props}
                    />
                  ),

                  ol: ({ node, ...props }) => (
                    <ol
                      className="
                        list-decimal
                        pl-5
                        my-3
                        space-y-1.5

                        font-medium

                        marker:text-blue-500
                        dark:marker:text-blue-400
                      "
                      {...props}
                    />
                  ),

                  h1: ({ node, ...props }) => (
                    <h1
                      className="
                        text-xl
                        md:text-2xl

                        font-extrabold

                        tracking-tight

                        mt-6
                        mb-3

                        pb-2

                        border-b
                        border-slate-200
                        dark:border-slate-800

                        text-slate-900
                        dark:text-white

                        break-words
                      "
                      {...props}
                    />
                  ),

                  h2: ({ node, ...props }) => (
                    <h2
                      className="
                        text-lg
                        md:text-xl

                        font-bold

                        tracking-tight

                        mt-5
                        mb-2

                        pb-1.5

                        border-b
                        border-slate-100
                        dark:border-slate-800

                        text-slate-800
                        dark:text-slate-100

                        break-words
                      "
                      {...props}
                    />
                  ),

                  h3: ({ node, ...props }) => (
                    <h3
                      className="
                        text-base
                        md:text-lg

                        font-bold

                        mt-4
                        mb-2

                        text-slate-700
                        dark:text-slate-200

                        break-words
                      "
                      {...props}
                    />
                  ),

                  p: ({ node, ...props }) => (
                    <p
                      className="
                        mb-3

                        leading-7

                        text-slate-700
                        dark:text-slate-300

                        break-words
                      "
                      {...props}
                    />
                  )

                }}
              >
                {text || '*No notes saved.*'}
              </ReactMarkdown>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default RichNoteEditor;

