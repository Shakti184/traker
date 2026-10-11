import React, { useState, useRef, useEffect, useCallback, Component, useId } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { defaultSchema } from 'rehype-sanitize';

// -----------------------------------------------------------------------------
// Constants & Language Settings
// -----------------------------------------------------------------------------

export const LANGUAGE_ALIASES = {
  js: 'javascript', jsx: 'javascript', mjs: 'javascript',
  ts: 'typescript', tsx: 'typescript', py: 'python', rb: 'ruby',
  sh: 'bash', shell: 'bash', zsh: 'bash', ps: 'powershell', ps1: 'powershell',
  yml: 'yaml', md: 'markdown', txt: 'text', plaintext: 'text', plain: 'text',
  html: 'html', xml: 'xml', cs: 'csharp', 'c++': 'cpp', kt: 'kotlin', kts: 'kotlin',
  rs: 'rust', gql: 'graphql', dockerfile: 'docker', mermaid: 'mermaid',
};

export const SUPPORTED_HIGHLIGHT_LANGUAGES = new Set([
  'bash', 'c', 'cpp', 'csharp', 'css', 'diff', 'docker', 'go', 'graphql',
  'html', 'java', 'javascript', 'json', 'kotlin', 'markdown', 'php',
  'powershell', 'python', 'ruby', 'rust', 'scss', 'shell', 'sql', 'swift',
  'text', 'typescript', 'xml', 'yaml', 'mermaid',
]);

export const normalizeLanguage = (language) => {
  const normalized = String(language || '').trim().toLowerCase();
  if (!normalized) return 'text';
  const aliased = LANGUAGE_ALIASES[normalized] || normalized;
  return SUPPORTED_HIGHLIGHT_LANGUAGES.has(aliased) ? aliased : 'text';
};

export const safeString = (value, fallback = '') => (typeof value === 'string' ? value : fallback);

// -----------------------------------------------------------------------------
// Formatting Helpers
// -----------------------------------------------------------------------------

export const getPhaseLabel = (phaseId) => {
  const value = safeString(phaseId);
  if (!value) return 'Phase';
  const match = value.match(/^phase[-_\s]*(\d+)$/i);
  return match ? `Phase ${match[1]}` : value;
};

export const isSafeUrl = (value, { allowDataImage = false } = {}) => {
  if (typeof value !== 'string') return false;
  const raw = value.trim();
  if (!raw) return false;
  if (raw.startsWith('#')) return true;
  if (allowDataImage && /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);/i.test(raw)) return true;
  try {
    const url = new URL(raw, typeof window !== 'undefined' ? window.location.origin : 'https://example.invalid');
    if (['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) return true;
    return false;
  } catch {
    return false;
  }
};

export const getDomainLabel = (value) => {
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
// SVG Fixes for React Kebab-Case Errors
// -----------------------------------------------------------------------------

export const convertKebabToCamel = (props) => {
  const newProps = {};
  Object.keys(props).forEach((key) => {
    if (key === 'node' || key === 'index' || key === 'siblingCount') return;
    
    if (key === 'viewbox') {
      newProps['viewBox'] = props[key];
    } else if (key.includes('-')) {
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      newProps[camelKey] = props[key];
    } else {
      newProps[key] = props[key];
    }
  });
  return newProps;
};

export const SvgElement = (Tag) => ({ node, ...props }) => <Tag {...convertKebabToCamel(props)} />;

// -----------------------------------------------------------------------------
// Security Sanitize Schema for rehype
// -----------------------------------------------------------------------------

const svgAttributes = [
  'viewBox', 'viewbox', 'width', 'height', 'x', 'y', 'x1', 'y1', 'x2', 'y2',
  'cx', 'cy', 'r', 'rx', 'ry', 'fill', 'stroke', 'strokeWidth', 'stroke-width',
  'strokeLinecap', 'strokeLinejoin', 'points', 'd', 'textAnchor', 'text-anchor',
  'fontSize', 'font-size', 'fontFamily', 'font-family', 'fontWeight', 'font-weight',
  'transform', 'opacity', 'xmlns'
];

export const markdownSanitizeSchema = {
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
// UI Components
// -----------------------------------------------------------------------------

// Generic Lightbox Modal for zooming into images and charts
const LightboxModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    // Lock scrolling on the body
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex flex-col bg-slate-950/95 backdrop-blur-2xl animate-[fade-in_0.2s_ease-out]" 
      onClick={onClose}
    >
      <div className="absolute top-0 right-0 w-full flex justify-end p-4 sm:p-6 shrink-0 z-10 pointer-events-none">
        <button
          onClick={onClose}
          className="pointer-events-auto p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-[14px] backdrop-blur-md transition-all active:scale-90 border border-white/10 shadow-lg"
          title="Close (Esc)"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      {/* Scrollable area for panning large diagrams */}
      <div 
        className="flex-1 overflow-auto custom-scrollbar flex items-center justify-center p-4 sm:p-8" 
      >
        <div onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};


export class MarkdownErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error) { console.error('Markdown preview failed:', error); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="my-6 rounded-[20px] border border-red-200 bg-red-50/80 p-5 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <p className="font-extrabold tracking-tight text-base">Unable to render section</p>
          </div>
          <p className="mt-2 text-red-700/80 dark:text-red-400/80 pl-11">The saved Markdown is still available, but an embedded element could not be rendered safely.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export const MermaidChart = ({ chart }) => {
  const chartId = useId().replace(/:/g, '');
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    let active = true;
    const renderChart = async () => {
      const source = safeString(chart).trim();
      if (!containerRef.current) return;
      if (!source) { setError('Empty Mermaid diagram.'); return; }
      setError(null);
      try {
        mermaid.initialize({ 
          startOnLoad: false, 
          theme: 'dark',
          themeVariables: {
            background: 'transparent',
            fontFamily: 'inherit',
            primaryTextColor: '#f8fafc',
            lineColor: '#cbd5e1',
            textColor: '#f8fafc',
          },
          htmlLabels: false,
          class: { htmlLabels: false },
          flowchart: { htmlLabels: false },
          sequence: { showSequenceNumbers: true },
          securityLevel: 'strict', 
          suppressErrorRendering: true 
        });
        
        const { svg } = await mermaid.render(`mermaid-${chartId}`, source);
        if (active && containerRef.current) {
          containerRef.current.innerHTML = svg;
          // Capture the rendered SVG immediately so it's ready for zooming
          setSvgContent(svg);
        }
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
      <div className="my-8 overflow-hidden rounded-[24px] border border-red-900/60 bg-slate-950 shadow-lg">
        <div className="border-b border-red-900/50 bg-red-950/40 px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-widest text-red-400">Mermaid Rendering Failed</div>
        <pre className="m-0 p-5 text-[13px] font-mono leading-relaxed text-red-200 overflow-x-auto custom-scrollbar">{safeString(chart)}</pre>
      </div>
    );
  }
  
  return (
    <>
      <div 
        className="group relative my-8 w-full max-w-full cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]" 
        onClick={() => setIsZoomed(true)}
      >
        <div 
          ref={containerRef} 
          className="w-full overflow-x-auto rounded-[24px] border border-slate-700/80 bg-slate-900 p-6 shadow-inner [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:max-w-full [&_text]:!fill-slate-50 [&_path]:!stroke-indigo-300 [&_line]:!stroke-slate-500 custom-scrollbar pointer-events-none" 
          role="img" 
          aria-label="Mermaid diagram" 
        />
        
        {/* Floating Zoom Hint Overlay */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white/10 text-white px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/20 flex items-center gap-2 text-xs font-bold shadow-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
            Expand Diagram
          </div>
        </div>
      </div>

      <LightboxModal isOpen={isZoomed} onClose={() => setIsZoomed(false)}>
        {/* Rendered SVG gets injected here. We force it to grow big so panning is possible */}
        <div
          className="animate-[scale-in_0.2s_ease-out] w-full flex justify-center [&>svg]:max-w-none [&>svg]:w-auto [&>svg]:h-auto [&>svg]:min-w-[80vw] lg:[&>svg]:min-w-[1000px] [&_text]:!fill-slate-50 [&_path]:!stroke-indigo-300 [&_line]:!stroke-slate-500"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </LightboxModal>
    </>
  );
};

export const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    const value = safeString(code);
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) { console.error('Failed to copy code:', error); }
  }, [code]);
  
  const label = language === 'text' ? 'CODE' : language;

  return (
    <div className="group my-8 w-full max-w-full overflow-hidden rounded-[20px] border border-slate-700/80 bg-[#0d1117] shadow-lg">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#161b22] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex gap-1.5 mr-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="truncate text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{label}</span>
        </div>
        <button 
          type="button" 
          onClick={handleCopy} 
          className={`shrink-0 rounded-[10px] px-3.5 py-1.5 text-[11px] font-bold transition-all duration-300 focus:outline-none active:scale-95
            ${copied 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
              : 'border border-slate-600/60 bg-slate-700/40 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-500'
            }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="min-w-0 overflow-x-auto custom-scrollbar">
        <SyntaxHighlighter 
          style={vscDarkPlus} 
          language={language} 
          PreTag="div" 
          wrapLongLines={true} 
          customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent', fontSize: '13.5px', lineHeight: '1.6', minWidth: 'max-content' }}
        >
          {safeString(code).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export const ImageWithFallback = ({ src, alt, title, ...props }) => {
  const [failed, setFailed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (failed) {
    return (
      <span className="my-8 flex w-full flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-400">
        <svg className="w-8 h-8 mb-2 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        <span className="font-bold">Image failed to load</span>
        {alt && <span className="mt-1 max-w-full break-words text-xs opacity-75">{alt}</span>}
      </span>
    );
  }
  return (
    <>
      <span 
        className="my-8 flex w-full flex-col items-center group relative cursor-zoom-in" 
        onClick={() => setIsZoomed(true)}
      >
        <img 
          className="h-auto max-w-full rounded-[20px] border border-slate-200/80 object-contain shadow-lg dark:border-slate-800 transition-transform duration-300 group-hover:scale-[1.01]" 
          src={src} alt={alt || 'Study note image'} title={title} loading="lazy" decoding="async" onError={() => setFailed(true)} {...props} 
        />
        
        {/* Floating Zoom Hint Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-slate-900/60 text-white px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 flex items-center gap-2 text-sm font-bold shadow-2xl">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
            Expand Image
          </div>
        </div>

        {alt && <span className="mt-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">{alt}</span>}
      </span>

      <LightboxModal isOpen={isZoomed} onClose={() => setIsZoomed(false)}>
        <img 
          src={src} 
          alt={alt} 
          className="max-w-[95vw] max-h-[90vh] md:max-w-none md:max-h-[150vh] object-contain rounded-[16px] shadow-[0_0_80px_rgba(0,0,0,0.5)] animate-[scale-in_0.2s_ease-out]" 
        />
      </LightboxModal>
    </>
  );
};