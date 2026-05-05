'use client';

import Icon from './Icon';

export function StatusPill({ status }: { status: string }) {
  const cls = 't-pill t-pill-' + status.toLowerCase().replace(/\s+/g, '-');
  return <span className={cls}>{status}</span>;
}

export function Empty({ icon = 'circle', title, sub }: { icon?: string; title: string; sub?: string }) {
  return (
    <div className="t-empty">
      <div className="t-empty-mark"><Icon name={icon} size={22} /></div>
      <div className="t-empty-title">{title}</div>
      {sub && <div className="t-empty-sub">{sub}</div>}
    </div>
  );
}

export function PlaceholderImage({ label, height = 180 }: { label: string; height?: number }) {
  return (
    <div className="t-ph" style={{ height }}>
      <span className="t-ph-label">{label}</span>
    </div>
  );
}
