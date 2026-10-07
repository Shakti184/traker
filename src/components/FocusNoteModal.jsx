import React, {
  Component,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

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

const getPhaseLabel = (phaseId) => {
  const value = safeString(phaseId);
  if (!value) return 'Phase';
  const match = value.match(/^phase[-_\s]*(\d+)$/i);
  return match ? `Phase ${match[1]}` : value;
};

// -----------------------------------------------------------------------------
// URL / Link Safety
// -----------------------------------------------------------------------------

const isSafeUrl = (value, { allowDataImage = false } = {}) => {
  if (typeof value !== 'string') return false;
  const raw = value.trim();
  if (!raw) return false;
  if (raw.startsWith('#')) return true;
  if (allowDataImage && /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);/i.test(raw)) return true;
  try {
    const url = new URL(raw, typeof window !== 'undefined' ? window.location.origin : 'https://example.invalid');
    if (url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:' || url.protocol === 'tel:') return true;
    return false;
  } catch {
    return false;
  }
};

const getDomainLabel = (value) => {
  if (!isSafeUrl(value)) return 'Link';
  try {
    const url = new URL(value, 'https://example.invalid');
    if (url.protocol === 'mailto:') return 'Email';
    if (url.protocol === 'tel:') return 'Phone';
    if (url.hostname) return url.hostname.replace(/^www\./i, '');
    return 'Link';
  } catch {
    return 'Link';
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
    
    // Explicit override for viewBox (HTML parses it lowercase, React strictly wants camelCase)
    if (key === 'viewbox') {
      newProps['viewBox'] = props[key];
    } else if (key.includes('-')) {
      // Auto-convert standard kebab-case (e.g. stroke-width -> strokeWidth, font-size -> fontSize)
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
          <p className="mt-1">The saved Markdown is still available, but one of the embedded elements could not be rendered safely.</p>
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
      const renderId = `mermaid-${chartId}`;
      try {
        mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'strict', suppressErrorRendering: true });
        const { svg } = await mermaid.render(renderId, source);
        if (active && containerRef.current) containerRef.current.innerHTML = svg;
      } catch (renderError) {
        console.error('Mermaid rendering failed:', renderError);
        if (active) setError(renderError instanceof Error ? renderError.message : 'Invalid Mermaid diagram.');
      }
    };
    renderChart();
    return () => { active = false; if (containerRef.current) containerRef.current.innerHTML = ''; };
  }, [chart, chartId]);

  if (error) {
    return (
      <div className="my-6 overflow-hidden rounded-xl border border-red-900/60 bg-slate-950 shadow-lg">
        <div className="border-b border-red-900/50 bg-red-950/40 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-red-300">Mermaid rendering failed</div>
        <div className="overflow-x-auto"><pre className="m-0 p-4 text-xs leading-6 text-red-200">{safeString(chart)}</pre></div>
      </div>
    );
  }

  return <div ref={containerRef} className="my-6 w-full max-w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-inner [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:max-w-full" role="img" aria-label="Mermaid diagram" />;
};

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    const value = safeString(code);
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) { console.error('Failed to copy code:', error); }
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
        {alt ? <span className="mt-1 max-w-full break-words">{alt}</span> : null}
      </span>
    );
  }
  return (
    <span className="my-6 flex w-full flex-col items-center">
      <img className="h-auto max-w-full rounded-xl border border-slate-200 object-contain shadow-md dark:border-slate-800" src={src} alt={alt || 'Study note image'} title={title} loading="lazy" decoding="async" onError={() => setFailed(true)} {...props} />
      {alt ? <span className="mt-2 text-[11px] font-medium tracking-wide text-slate-400">{alt}</span> : null}
    </span>
  );
};

// -----------------------------------------------------------------------------
// Focus Note Modal
// -----------------------------------------------------------------------------

const FocusNoteModal = ({ task, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const normalizedTask = useMemo(() => {
    if (!task || typeof task !== 'object') return null;
    const rawLinks = Array.isArray(task.links) ? task.links : [];
    return {
      ...task,
      dayLabel: safeString(task.dayLabel, 'Study Session'),
      topic: safeString(task.topic, 'Study Notes'),
      phaseId: safeString(task.phaseId),
      directive: safeString(task.directive),
      notes: safeString(task.notes),
      links: rawLinks.filter((link) => typeof link === 'string' && link.trim()).map((link) => link.trim()),
    };
  }, [task]);

  const links = normalizedTask?.links || [];

  useEffect(() => {
    if (!isOpen || !normalizedTask) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen, normalizedTask]);

  useEffect(() => {
    if (!isOpen || !normalizedTask) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose?.(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); };
  }, [isOpen, normalizedTask, onClose]);

  useEffect(() => {
    if (!isOpen || !normalizedTask) return;
    const frame = window.requestAnimationFrame(() => { closeButtonRef.current?.focus(); });
    return () => { window.cancelAnimationFrame(frame); };
  }, [isOpen, normalizedTask]);

  if (!isOpen || !normalizedTask) return null;

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) onClose?.();
  };

  const handleSafeResourceOpen = (event, url) => {
    if (!isSafeUrl(url)) event.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-0 backdrop-blur-md transition-opacity sm:p-4 md:p-8" role="presentation" onMouseDown={handleBackdropMouseDown}>
      <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="focus-note-modal-title" className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-none border-slate-200/80 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:h-[95vh] sm:rounded-2xl sm:border md:rounded-3xl" onMouseDown={(event) => event.stopPropagation()}>
        
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

        {/* Header */}
        <div className="relative flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/95 p-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 md:px-6 md:py-5">
          <div className="flex min-w-0 items-center gap-3 pr-4">
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 sm:flex">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div className="min-w-0">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400 md:text-xs">{normalizedTask.dayLabel}</span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400 md:text-[10px]">{getPhaseLabel(normalizedTask.phaseId)}</span>
              </div>
              <h2 id="focus-note-modal-title" className="truncate text-lg font-extrabold tracking-tight text-slate-900 dark:text-white md:text-2xl" title={normalizedTask.topic}>{normalizedTask.topic}</h2>
            </div>
          </div>
          <button ref={closeButtonRef} type="button" onClick={() => onClose?.()} className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400 transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white md:h-11 md:w-11 md:rounded-2xl" title="Close reading view" aria-label="Close reading view">
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Reading Body */}
        <div className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto break-words bg-slate-50/50 p-4 [overflow-wrap:anywhere] custom-scrollbar dark:bg-slate-950 sm:p-6 md:p-8">
          <div className="mx-auto w-full min-w-0 max-w-3xl">
            
            {/* Directive */}
            {normalizedTask.directive ? (
              <div className="relative mb-7 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-indigo-50/40 dark:border-blue-900/30 dark:from-blue-950/30 dark:to-indigo-950/10 md:mb-9">
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500" />
                <div className="p-4 pl-5 md:p-5 md:pl-6">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400">Focus Directive</span>
                  </div>
                  <blockquote className="break-words text-sm italic leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">{normalizedTask.directive}</blockquote>
                </div>
              </div>
            ) : null}

            {/* Saved Resources */}
            {links.length > 0 && (
              <div className="mb-7 md:mb-9">
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500 md:text-xs">Saved Resources</h3>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {links.map((link, idx) => {
                    if (!isSafeUrl(link)) return null;
                    return (
                      <a key={`${link}-${idx}`} href={link} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" onClick={(event) => handleSafeResourceOpen(event, link)} className="group inline-flex min-w-0 max-w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-blue-400 dark:hover:border-blue-700/50 dark:hover:bg-blue-950/30" title={link} aria-label={`Open resource ${getDomainLabel(link)}`}>
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                        </span>
                        <span className="min-w-0 flex-1 truncate">{getDomainLabel(link)}</span>
                        <svg className="h-3 w-3 shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notes heading */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 md:text-sm">Study Notes & Architectures</h3>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Markdown */}
            {normalizedTask.notes ? (
              <div className="min-w-0 w-full max-w-full text-sm leading-relaxed text-slate-800 dark:text-slate-200 md:text-base">
                <div className="min-w-0 w-full max-w-full overflow-x-hidden">
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
                      {normalizedTask.notes}
                    </ReactMarkdown>
                  </MarkdownErrorBoundary>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No notes were saved during this study session.</p>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Your study notes will appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom reading indicator */}
        <div className="hidden shrink-0 items-center justify-center border-t border-slate-200/70 bg-white/80 py-2 dark:border-slate-800 dark:bg-slate-950/80 sm:flex">
          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Focus Reading Mode
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusNoteModal;
