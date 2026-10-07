import React, { useState, useEffect, useRef, useCallback, Component, useId } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// -----------------------------------------------------------------------------
// Constants & Helpers
// -----------------------------------------------------------------------------

const LANGUAGE_ALIASES = {
  js: 'javascript', jsx: 'javascript', mjs: 'javascript',
  ts: 'typescript', tsx: 'typescript', py: 'python', rb: 'ruby',
  sh: 'bash', shell: 'bash', zsh: 'bash', ps: 'powershell', ps1: 'powershell',
  yml: 'yaml', md: 'markdown', txt: 'text', plaintext: 'text', plain: 'text',
  html: 'html', xml: 'xml', cs: 'csharp', 'c++': 'cpp', kt: 'kotlin', kts: 'kotlin',
  rs: 'rust', gql: 'graphql', dockerfile: 'docker', mermaid: 'mermaid',
};

const SUPPORTED_HIGHLIGHT_LANGUAGES = new Set([
  'bash', 'c', 'cpp', 'csharp', 'css', 'diff', 'docker', 'go', 'graphql',
  'html', 'java', 'javascript', 'json', 'kotlin', 'markdown', 'php',
  'powershell', 'python', 'ruby', 'rust', 'scss', 'shell', 'sql', 'swift',
  'text', 'typescript', 'xml', 'yaml','mermaid',
]);

const normalizeLanguage = (language) => {
  const normalized = String(language || '').trim().toLowerCase();
  if (!normalized) return 'text';
  const aliased = LANGUAGE_ALIASES[normalized] || normalized;
  return SUPPORTED_HIGHLIGHT_LANGUAGES.has(aliased) ? aliased : 'text';
};

const safeString = (value, fallback = '') => (typeof value === 'string' ? value : fallback);

const isSafeUrl = (value, { allowDataImage = false } = {}) => {
  if (typeof value !== 'string') return false;
  const raw = value.trim();
  if (!raw) return false;
  if (raw.startsWith('#')) return true;
  if (allowDataImage && /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);/i.test(raw)) return true;
  try {
    const url = new URL(raw, 'https://example.invalid');
    if (['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) return true;
    return false;
  } catch {
    return false;
  }
};

// -----------------------------------------------------------------------------
// SVG Kebab-to-CamelCase Interceptor (FIXES REACT ERRORS)
// -----------------------------------------------------------------------------

const convertKebabToCamel = (props) => {
  const newProps = {};
  Object.keys(props).forEach((key) => {
    // Prevent React warnings by removing markdown-specific props from DOM nodes
    if (key === 'node' || key === 'index' || key === 'siblingCount') return;
    
    // Explicit override for viewBox
    if (key === 'viewbox') {
      newProps['viewBox'] = props[key];
    } else if (key.includes('-')) {
      // Auto-convert standard kebab-case (e.g. stroke-width -> strokeWidth)
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      newProps[camelKey] = props[key];
    } else {
      newProps[key] = props[key];
    }
  });
  return newProps;
};

// Helper component for all SVG shapes
const SvgElement = (Tag) => ({ node, ...props }) => <Tag {...convertKebabToCamel(props)} />;

// -----------------------------------------------------------------------------
// Sanitization
// -----------------------------------------------------------------------------

const svgAttributes = [
  'viewBox', 'viewbox', 'width', 'height', 'x', 'y', 'x1', 'y1', 'x2', 'y2',
  'cx', 'cy', 'r', 'rx', 'ry', 'fill', 'stroke', 'strokeWidth', 'stroke-width',
  'strokeLinecap', 'strokeLinejoin', 'points', 'd', 'textAnchor', 'text-anchor',
  'fontSize', 'font-size', 'fontFamily', 'font-family', 'fontWeight', 'font-weight',
  'transform', 'opacity', 'xmlns'
];

const markdownSanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'svg', 'g', 'path', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'rect', 
    'defs', 'linearGradient', 'radialGradient', 'stop', 'clipPath', 'mask', 'symbol', 
    'use', 'marker', 'pattern', 'text', 'tspan',
  ],
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className'],
    svg: svgAttributes, g: svgAttributes, path: svgAttributes, circle: svgAttributes,
    ellipse: svgAttributes, line: svgAttributes, polyline: svgAttributes,
    polygon: svgAttributes, rect: svgAttributes, text: svgAttributes, tspan: svgAttributes,
  },
  protocols: {
    ...defaultSchema.protocols,
    href: [...(defaultSchema.protocols?.href || []), 'http', 'https', 'mailto', 'tel'],
    src: [...(defaultSchema.protocols?.src || []), 'http', 'https', 'data'],
  },
};

// -----------------------------------------------------------------------------
// Error Boundary & Utilities
// -----------------------------------------------------------------------------

class MarkdownErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error) { console.error('Markdown preview failed:', error); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-300">
          <p className="font-bold">Unable to render this note.</p>
          <p className="mt-1">The content has an element that could not be rendered safely.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const MermaidChart = ({ chart }) => {
  const chartId = useId().replace(/:/g, '');
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const renderChart = async () => {
      const source = safeString(chart).trim();
      if (!containerRef.current) return;
      if (!source) { setError('Empty Mermaid diagram.'); return; }
      setError(null);
      try {
        mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'strict', suppressErrorRendering: true });
        const { svg } = await mermaid.render(`mermaid-${chartId}`, source);
        if (active && containerRef.current) containerRef.current.innerHTML = svg;
      } catch (err) {
        console.error('Mermaid rendering failed:', err);
        if (active) setError(err instanceof Error ? err.message : 'Invalid Mermaid diagram.');
      }
    };
    renderChart();
    return () => { active = false; if (containerRef.current) containerRef.current.innerHTML = ''; };
  }, [chart, chartId]);

  if (error) {
    return (
      <div className="my-6 overflow-hidden rounded-xl border border-red-900/60 bg-slate-950 shadow-lg">
        <div className="border-b border-red-900/50 bg-red-950/40 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-red-300">Mermaid rendering failed</div>
        <pre className="m-0 p-4 text-xs leading-6 text-red-200 overflow-x-auto">{safeString(chart)}</pre>
      </div>
    );
  }
  return <div ref={containerRef} className="my-6 w-full max-w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-inner [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:max-w-full" role="img" aria-label="Mermaid diagram" />;
};

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) { console.error('Failed to copy', err); }
  }, [code]);
  const label = language === 'text' ? 'CODE' : language;

  return (
    <div className="group my-4 w-full max-w-full overflow-hidden rounded-xl border border-slate-700/80 bg-[#111827] shadow-lg shadow-slate-900/10">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-[#181818] px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-400/70" />
          <span className="ml-1 truncate text-[9px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
        </div>
        <button type="button" onClick={handleCopy} className="shrink-0 rounded-md border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/60">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="min-w-0 overflow-x-auto">
        <SyntaxHighlighter style={vscDarkPlus} language={language} PreTag="div" wrapLongLines={true} customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.85rem', lineHeight: '1.6', minWidth: 'max-content' }}>
          {safeString(code).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const ImageWithFallback = ({ src, alt, title, ...props }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="my-6 flex w-full flex-col items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
        <span className="font-semibold">Image unavailable</span>
        {alt && <span className="mt-1 max-w-full break-words">{alt}</span>}
      </span>
    );
  }
  return (
    <span className="my-6 flex w-full flex-col items-center">
      <img className="h-auto max-w-full rounded-xl border border-slate-200 object-contain shadow-md dark:border-slate-800" src={src} alt={alt || 'Study note image'} title={title} loading="lazy" decoding="async" onError={() => setFailed(true)} {...props} />
      {alt && <span className="mt-2 text-[11px] font-medium tracking-wide text-slate-400">{alt}</span>}
    </span>
  );
};

// -----------------------------------------------------------------------------
// Rich Note Editor Component
// -----------------------------------------------------------------------------

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
    <div className="relative w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.35)] dark:shadow-[0_8px_30px_-18px_rgba(0,0,0,0.7)] transition-all duration-300 focus-within:border-blue-300 dark:focus-within:border-blue-900 focus-within:shadow-[0_12px_35px_-18px_rgba(59,130,246,0.35)]">
      
      {/* TOOLBAR */}
      <div className="relative flex items-center justify-between px-3 py-2 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 backdrop-blur-xl w-full min-w-0">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="flex items-center gap-2 min-w-0">
          <div className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center shrink-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5V4.5a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0120 4.5v15a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 19.5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8M8 15h5" />
            </svg>
          </div>
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 shrink-0">
            <button onClick={(e) => { e.stopPropagation(); setMode('write'); }} className={`group relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.97] ${mode === 'write' ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/50'}`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              Write
            </button>
            <button onClick={(e) => { e.stopPropagation(); setMode('preview'); }} className={`group relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.97] ${mode === 'preview' ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/50'}`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" /><circle cx="12" cy="12" r="2.5" /></svg>
              Preview
            </button>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-white/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
          <span className={`w-1.5 h-1.5 rounded-full ${mode === 'write' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
          {mode === 'write' ? 'Editing' : 'Preview'}
        </div>
      </div>

      {/* EDITOR BODY */}
      <div className="relative bg-white dark:bg-slate-950 min-h-[250px] flex flex-col w-full max-w-full min-w-0" onClick={(e) => e.stopPropagation()}>
        {mode === 'write' ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            placeholder="Write architecture notes... (Supports Markdown, Mermaid, LaTeX, and SVGs)"
            className="flex-1 w-full max-w-full min-h-[250px] p-4 md:p-5 pb-20 md:pb-5 text-[14px] md:text-sm font-mono bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none resize-y text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 custom-scrollbar leading-7 break-words"
          />
        ) : (
          <div className="flex-1 p-4 md:p-5 pb-20 md:pb-5 min-h-[250px] text-sm text-slate-800 dark:text-slate-200 overflow-x-hidden overflow-y-auto custom-scrollbar animate-fade-in-up w-full max-w-full min-w-0 break-words [overflow-wrap:anywhere]">
            <div className="max-w-3xl mx-auto w-full rounded-xl px-1">
              <MarkdownErrorBoundary>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[
                    rehypeRaw,
                    [rehypeSanitize, markdownSanitizeSchema],
                    rehypeKatex,
                  ]}
                  components={{
                    // SMART CODE RENDERER
                    code({ inline, className, children, ...props }) {
                      const rawCode = safeString(Array.isArray(children) ? children.join('') : children);
                      const match = /language-([^\s]+)/i.exec(className || '');
                      const language = normalizeLanguage(match?.[1] || 'text');
                      const isInline = typeof inline !== 'undefined' ? inline : !match && !rawCode.includes('\n');

                      if (!isInline && language === 'mermaid') {
                        return <MermaidChart chart={rawCode.replace(/\n$/, '')} />;
                      }
                      if (!isInline) {
                        return <CodeBlock language={language} code={rawCode} {...props} />;
                      }
                      return (
                        <code className="break-all whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400 md:text-sm" {...props}>
                          {children}
                        </code>
                      );
                    },

                    // SVG AND RAW HTML FIXES
                    svg: ({ node, className, ...props }) => (
                      <svg className={`my-4 h-auto max-w-full text-slate-800 dark:text-slate-200 ${className || ''}`} {...convertKebabToCamel(props)} />
                    ),
                    text: SvgElement('text'),
                    rect: SvgElement('rect'),
                    polygon: SvgElement('polygon'),
                    line: SvgElement('line'),
                    path: SvgElement('path'),
                    circle: SvgElement('circle'),
                    ellipse: SvgElement('ellipse'),
                    g: SvgElement('g'),
                    tspan: SvgElement('tspan'),

                    // Layout and Typography
                    table({ children, ...props }) { return <div className="my-6 w-full max-w-full overflow-x-auto rounded-xl border border-slate-200 shadow-sm dark:border-slate-700"><table className="w-full min-w-[500px] border-collapse text-left" {...props}>{children}</table></div>; },
                    thead({ children, ...props }) { return <thead className="border-b-2 border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80" {...props}>{children}</thead>; },
                    th({ children, ...props }) { return <th className="whitespace-nowrap border-r border-slate-200 px-4 py-3.5 font-extrabold text-slate-800 last:border-r-0 dark:border-slate-700 dark:text-slate-200" {...props}>{children}</th>; },
                    td({ children, ...props }) { return <td className="min-w-[150px] border-b border-r border-slate-200 px-4 py-3 align-top last:border-r-0 dark:border-slate-700" {...props}>{children}</td>; },
                    tr({ children, ...props }) { return <tr className="even:bg-slate-50/50 last:[&>td]:border-b-0 dark:even:bg-slate-900/30" {...props}>{children}</tr>; },
                    img({ alt, src, title, ...props }) {
                      const safeSrc = isSafeUrl(src, { allowDataImage: true }) ? src : '';
                      if (!safeSrc) return <span className="my-6 flex w-full flex-col items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400"><span className="font-semibold">Image unavailable</span>{alt ? <span className="mt-1 break-words">{alt}</span> : null}</span>;
                      return <ImageWithFallback src={safeSrc} alt={alt} title={title} {...props} />;
                    },
                    a({ href, title, children, ...props }) {
                      const safeHref = isSafeUrl(href);
                      if (!safeHref) return <span className="break-words text-slate-500 dark:text-slate-400" title="Unsafe link">{children}</span>;
                      return <a href={safeHref} title={title} target={/^(?:https?:)?\/\//i.test(safeHref) ? '_blank' : undefined} rel={/^(?:https?:)?\/\//i.test(safeHref) ? 'noopener noreferrer' : undefined} referrerPolicy="no-referrer" className="break-all font-semibold text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:decoration-blue-700 dark:hover:text-blue-300" {...props}>{children}</a>;
                    },
                    input({ type, checked, disabled, ...props }) {
                      if (type === 'checkbox') return <input type="checkbox" checked={Boolean(checked)} disabled={disabled ?? true} readOnly className="mr-2 h-4 w-4 rounded border-slate-300 align-[-2px] accent-blue-600 dark:border-slate-700" {...props} />;
                      return <input type={type} {...props} />;
                    },
                    ul({ children, ...props }) { return <ul className="my-3 list-disc space-y-1.5 pl-5 marker:text-blue-400 dark:marker:text-blue-500" {...props}>{children}</ul>; },
                    ol({ children, ...props }) { return <ol className="my-3 list-decimal space-y-1.5 pl-5 font-medium marker:text-blue-500 dark:marker:text-blue-400" {...props}>{children}</ol>; },
                    h1({ children, ...props }) { return <h1 className="mt-6 mb-3 break-words border-b border-slate-200 pb-2 text-xl font-extrabold tracking-tight text-slate-900 dark:border-slate-800 dark:text-white md:text-2xl" {...props}>{children}</h1>; },
                    h2({ children, ...props }) { return <h2 className="mt-5 mb-2 break-words border-b border-slate-100 pb-1.5 text-lg font-bold tracking-tight text-slate-800 dark:border-slate-800 dark:text-slate-100 md:text-xl" {...props}>{children}</h2>; },
                    h3({ children, ...props }) { return <h3 className="mt-4 mb-2 break-words text-base font-bold text-slate-700 dark:text-slate-200 md:text-lg" {...props}>{children}</h3>; },
                    h4({ children, ...props }) { return <h4 className="mt-4 mb-2 break-words text-sm font-bold text-slate-700 dark:text-slate-200 md:text-base" {...props}>{children}</h4>; },
                    p({ children, ...props }) { return <p className="mb-3 break-words leading-7 text-slate-700 dark:text-slate-300" {...props}>{children}</p>; },
                    blockquote({ children, ...props }) { return <blockquote className="my-4 break-words border-l-4 border-blue-300 bg-blue-50/60 px-4 py-2 text-slate-600 dark:border-blue-800 dark:bg-blue-950/20 dark:text-slate-300" {...props}>{children}</blockquote>; },
                    hr(props) { return <hr className="my-6 border-slate-200 dark:border-slate-800" {...props} />; },
                    pre({ children, ...props }) { return <pre className="my-4 max-w-full overflow-x-auto rounded-xl" {...props}>{children}</pre>; },
                    strong({ children, ...props }) { return <strong className="font-extrabold text-slate-900 dark:text-white" {...props}>{children}</strong>; },
                  }}
                >
                  {text || '*No notes saved.*'}
                </ReactMarkdown>
              </MarkdownErrorBoundary>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RichNoteEditor;
