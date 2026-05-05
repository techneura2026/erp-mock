'use client';

interface IconProps {
  name: string;
  size?: number;
  stroke?: number;
}

export default function Icon({ name, size = 18, stroke = 1.6 }: IconProps) {
  const s = size, sw = stroke;
  const common = {
    width: s, height: s, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: sw,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'home':
      return <svg {...common}><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>;
    case 'finance':
      return <svg {...common}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/></svg>;
    case 'sales':
      return <svg {...common}><path d="M3 7h2l2 11h12l2-8H7"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>;
    case 'procurement':
      return <svg {...common}><path d="M5 7h14l-1.5 11h-11z"/><path d="M9 7V5a3 3 0 016 0v2"/></svg>;
    case 'inventory':
      return <svg {...common}><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>;
    case 'manufacturing':
      return <svg {...common}><path d="M4 20V11l5 3V11l5 3V11l5 3v6z"/><path d="M4 20h16"/></svg>;
    case 'hr':
      return <svg {...common}><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.2"/><path d="M15 20c0-2.5 1.6-4.5 4-4.5"/></svg>;
    case 'projects':
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10h10M7 14h6"/></svg>;
    case 'reports':
      return <svg {...common}><path d="M4 20V8M10 20V4M16 20v-8M22 20H2"/></svg>;
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>;
    case 'bell':
      return <svg {...common}><path d="M6 16V11a6 6 0 1112 0v5l1.5 2H4.5z"/><path d="M10 21h4"/></svg>;
    case 'plus':
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'chevron-right':
      return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>;
    case 'chevron-down':
      return <svg {...common}><path d="M6 9l6 6 6-6"/></svg>;
    case 'x':
      return <svg {...common}><path d="M6 6l12 12M6 18L18 6"/></svg>;
    case 'filter':
      return <svg {...common}><path d="M4 5h16l-6 8v6l-4-2v-4z"/></svg>;
    case 'download':
      return <svg {...common}><path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/></svg>;
    case 'more':
      return <svg {...common}><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/></svg>;
    case 'arrow-up':
      return <svg {...common}><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
    case 'arrow-down':
      return <svg {...common}><path d="M12 5v14M5 12l7 7 7-7"/></svg>;
    case 'check':
      return <svg {...common}><path d="M5 12l5 5 9-11"/></svg>;
    case 'circle':
      return <svg {...common}><circle cx="12" cy="12" r="8"/></svg>;
    case 'settings':
      return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>;
    case 'logo':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path d="M4 18 L12 4 L20 18 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M9 12 L15 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8"/></svg>;
  }
}
