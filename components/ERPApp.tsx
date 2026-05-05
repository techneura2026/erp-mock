'use client';

import { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Dashboard from './Dashboard';
import Sales from './Sales';
import Inventory from './Inventory';
import Icon from './Icon';
import { FinanceStub, ProcurementStub, ManufacturingStub, HRStub, ProjectsStub, ReportsStub } from './Stubs';
import { ORDERS, ITEMS, KPIS, REVENUE_SERIES, ACTIVITY, TASKS, CUSTOMERS, CONTACT_MAP, MODULES } from '@/lib/data';
import type { ModuleId, Order, InventoryItem } from '@/lib/types';

type Toast = { kind: 'success' | 'info'; msg: string } | null;

const MODULE_META: Record<ModuleId, { title: string; crumb: string[]; primary: string | null }> = {
  home:          { title: 'Good morning, Kira',   crumb: ['Workspace', 'Home'],        primary: null          },
  sales:         { title: 'Sales orders',          crumb: ['Sales & CRM', 'Orders'],    primary: 'New order'   },
  inventory:     { title: 'Inventory items',       crumb: ['Inventory', 'Items'],       primary: 'New item'    },
  finance:       { title: 'Finance overview',      crumb: ['Finance', 'Overview'],      primary: null          },
  procurement:   { title: 'Procurement',           crumb: ['Procurement', 'Overview'],  primary: null          },
  manufacturing: { title: 'Manufacturing',         crumb: ['Manufacturing', 'Overview'],primary: null          },
  hr:            { title: 'People',                crumb: ['People', 'Directory'],      primary: null          },
  projects:      { title: 'Projects',              crumb: ['Projects', 'Active'],       primary: null          },
  reports:       { title: 'Reports & analytics',   crumb: ['Reports'],                  primary: null          },
};

export default function ERPApp() {
  const [active,      setActive]      = useState<ModuleId>('home');
  const [orders,      setOrders]      = useState<Order[]>(ORDERS);
  const [items,       setItems]       = useState<InventoryItem[]>(ITEMS);
  const [showNew,     setShowNew]     = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const [toast,       setToast]       = useState<Toast>(null);
  const [theme,       setTheme]       = useState('light');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  // Scroll content area to top on module switch
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [active]);

  const handleCreate = (data: { customer: string; contact: string; due: string; total: number; items: number }) => {
    const nextNum = Math.max(...orders.map((o) => parseInt(o.id.replace('SO-', ''), 10))) + 1;
    const newOrder: Order = {
      id: 'SO-' + nextNum,
      customer: data.customer,
      contact: data.contact || '—',
      date: new Date().toISOString().slice(0, 10),
      due: data.due,
      status: 'Open',
      total: data.total,
      items: data.items,
      owner: 'K. Reyes',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setShowNew(false);
    setActive('sales');
    setToast({ kind: 'success', msg: `Order ${newOrder.id} created for ${newOrder.customer}` });
  };

  const handleStatusUpdate = (id: string, status: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    setToast({ kind: 'info', msg: `${id} → ${status}` });
  };

  const handleCreateItem = (item: InventoryItem) => {
    setItems((prev) => [item, ...prev]);
    setShowNewItem(false);
    setToast({ kind: 'success', msg: `Item ${item.sku} — "${item.name}" added to inventory` });
  };

  const meta = MODULE_META[active];

  const onPrimary = () => {
    if (active === 'sales')     setShowNew(true);
    if (active === 'inventory') setShowNewItem(true);
  };

  return (
    <div className="t-app">
      <Sidebar active={active} onNav={setActive} modules={MODULES} />
      <div className="t-main">
        <Topbar
          title={meta.title}
          breadcrumb={meta.crumb}
          primaryLabel={meta.primary}
          onPrimary={onPrimary}
          theme={theme}
          onSetTheme={setTheme}
        />
        <div className="t-content" ref={contentRef}>
          {active === 'home'          && <Dashboard kpis={KPIS} revenueSeries={REVENUE_SERIES} activity={ACTIVITY} tasks={TASKS} />}
          {active === 'sales'         && (
            <Sales
              orders={orders}
              onUpdateStatus={handleStatusUpdate}
              showNew={showNew}
              onShowNew={() => setShowNew(true)}
              onCloseNew={() => setShowNew(false)}
              onCreate={handleCreate}
              customers={CUSTOMERS}
              inventoryItems={items}
              contactMap={CONTACT_MAP}
            />
          )}
          {active === 'inventory'     && (
            <Inventory
              items={items}
              showNew={showNewItem}
              onCloseNew={() => setShowNewItem(false)}
              onCreate={handleCreateItem}
            />
          )}
          {active === 'finance'       && <FinanceStub />}
          {active === 'procurement'   && <ProcurementStub />}
          {active === 'manufacturing' && <ManufacturingStub />}
          {active === 'hr'            && <HRStub />}
          {active === 'projects'      && <ProjectsStub />}
          {active === 'reports'       && <ReportsStub />}
        </div>
      </div>

      {toast && (
        <div className={'t-toast t-toast-' + toast.kind}>
          <Icon name={toast.kind === 'success' ? 'check' : 'circle'} size={14} stroke={2.2} />
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
