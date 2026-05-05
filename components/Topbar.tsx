'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

const THEMES = [
  { id: 'light', label: 'Light', bg: '#fbfaf6', border: '#16433a' },
  { id: 'dark',  label: 'Dark',  bg: '#14161a', border: '#5fb5a0' },
  { id: 'ocean', label: 'Ocean', bg: '#f0f6fc', border: '#1b4a82' },
  { id: 'dusk',  label: 'Dusk',  bg: '#f7f4fc', border: '#4a1e88' },
];

interface TopbarProps {
  title: string;
  breadcrumb: string[];
  primaryLabel?: string | null;
  onPrimary?: () => void;
  theme: string;
  onSetTheme: (t: string) => void;
}

export default function Topbar({ title, breadcrumb, primaryLabel, onPrimary, theme, onSetTheme }: TopbarProps) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPicker) return;
    const handler = (e: MouseEvent) => {
      if (!pickerRef.current?.contains(e.target as Node)) setShowPicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showPicker]);

  return (
    <header className="t-topbar">
      <div className="t-topbar-left">
        <div className="t-breadcrumb">
          {breadcrumb.map((b, i) => (
            <span key={i} style={{ display: 'contents' }}>
              <span className={i === breadcrumb.length - 1 ? 't-crumb is-leaf' : 't-crumb'}>{b}</span>
              {i < breadcrumb.length - 1 && <Icon name="chevron-right" size={12} />}
            </span>
          ))}
        </div>
        <h1 className="t-page-title">{title}</h1>
      </div>

      <div className="t-topbar-right">
        <div className="t-search">
          <Icon name="search" size={15} />
          <input placeholder="Search orders, items, customers…" />
          <span className="t-kbd">⌘K</span>
        </div>

        <button type="button" className="t-icon-btn t-bell" aria-label="Notifications">
          <Icon name="bell" size={17} />
          <span className="t-bell-dot" />
        </button>

        {/* Theme picker */}
        <div ref={pickerRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="t-icon-btn"
            aria-label="Change theme"
            title="Change theme"
            onClick={() => setShowPicker((v) => !v)}
          >
            <Icon name="theme" size={16} />
          </button>

          {showPicker && (
            <div className="t-theme-menu" role="menu">
              {THEMES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  role="menuitem"
                  className={'t-theme-opt' + (theme === t.id ? ' is-on' : '')}
                  onClick={() => { onSetTheme(t.id); setShowPicker(false); }}
                >
                  <span
                    className="t-theme-dot"
                    style={{ background: t.bg, borderColor: t.border }}
                  />
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {primaryLabel && (
          <button type="button" className="t-btn t-btn-primary" onClick={onPrimary}>
            <Icon name="plus" size={14} />
            <span>{primaryLabel}</span>
          </button>
        )}
        <div className="t-avatar" title="Kamal Perera">KP</div>
      </div>
    </header>
  );
}
