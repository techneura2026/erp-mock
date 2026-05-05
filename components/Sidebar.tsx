'use client';

import Icon from './Icon';
import type { ModuleId, Module } from '@/lib/types';

interface SidebarProps {
  active: ModuleId;
  onNav: (id: ModuleId) => void;
  modules: Module[];
}

export default function Sidebar({ active, onNav, modules }: SidebarProps) {
  return (
    <aside className="t-sidebar">
      <div className="t-sidebar-brand">
        <span className="t-logo"><Icon name="logo" size={18} /></span>
        <div className="t-brand-text">
          <div className="t-brand-name">Techneura</div>
          <div className="t-brand-sub">ERP · v4.2</div>
        </div>
      </div>

      <nav className="t-nav">
        {modules.map((m) => (
          <button
            key={m.id}
            type="button"
            className={'t-nav-item ' + (active === m.id ? 'is-active' : '')}
            onClick={() => onNav(m.id)}
          >
            <span className="t-nav-icon"><Icon name={m.icon} size={17} /></span>
            <span className="t-nav-label">{m.label}</span>
          </button>
        ))}
      </nav>

      <div className="t-sidebar-foot">
        <div className="t-org">
          <div className="t-org-mark">C</div>
          <div className="t-org-meta">
            <div className="t-org-name">Ceylon Industrial Group</div>
            <div className="t-org-sub">FY 2026 · LKR</div>
          </div>
          <button className="t-icon-btn" aria-label="Switch org">
            <Icon name="chevron-down" size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
