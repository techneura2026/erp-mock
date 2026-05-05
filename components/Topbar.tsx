'use client';

import Icon from './Icon';

interface TopbarProps {
  title: string;
  breadcrumb: string[];
  primaryLabel?: string | null;
  onPrimary?: () => void;
  dark: boolean;
  onToggleDark: () => void;
}

export default function Topbar({ title, breadcrumb, primaryLabel, onPrimary, dark, onToggleDark }: TopbarProps) {
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
        <button className="t-icon-btn t-bell" aria-label="Notifications">
          <Icon name="bell" size={17} />
          <span className="t-bell-dot" />
        </button>
        <button
          className="t-icon-btn"
          aria-label="Toggle dark mode"
          onClick={onToggleDark}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? (
            <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </button>
        {primaryLabel && (
          <button className="t-btn t-btn-primary" onClick={onPrimary}>
            <Icon name="plus" size={14} />
            <span>{primaryLabel}</span>
          </button>
        )}
        <div className="t-avatar" title="K. Reyes">KR</div>
      </div>
    </header>
  );
}
