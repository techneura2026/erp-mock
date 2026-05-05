'use client';

import { useState, useMemo, useEffect } from 'react';
import Icon from './Icon';
import { StatusPill, Empty } from './atoms';
import type { Order, InventoryItem } from '@/lib/types';

const STATUSES = ['All', 'Open', 'Picking', 'Shipped', 'Invoiced', 'On hold', 'Cancelled'];

type SortKey = keyof Order;

function SortHead({
  label, k, sortKey, dir, onClick, num,
}: {
  label: string; k: SortKey; sortKey: SortKey; dir: 'asc' | 'desc'; onClick: (k: SortKey) => void; num?: boolean;
}) {
  const active = sortKey === k;
  return (
    <th className={(num ? 't-num ' : '') + 't-th-sortable'} onClick={() => onClick(k)}>
      <span className="t-th-inner">
        {label}
        <span className={'t-sort ' + (active ? 'is-on ' : '') + (active && dir === 'asc' ? 'is-asc' : '')}>
          <Icon name={active && dir === 'asc' ? 'arrow-up' : 'arrow-down'} size={11} stroke={2} />
        </span>
      </span>
    </th>
  );
}

function Field({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="t-field">
      <div className="t-field-label">{label}</div>
      <div className="t-field-value">{value}</div>
      {sub && <div className="t-field-sub">{sub}</div>}
    </div>
  );
}

function OrderDrawer({ order, onClose, onUpdateStatus }: {
  order: Order; onClose: () => void; onUpdateStatus: (s: string) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const lines = [
    { sku: 'WX-100-04', name: 'Widget Assembly, 4mm', qty: 200, price: 12.40 },
    { sku: 'BR-220-SS', name: 'Stainless Bracket, M-series', qty: 1500, price: 3.40 },
    { sku: 'PK-CR-12', name: 'Corrugated Carton, 12in', qty: 800, price: 1.10 },
    { sku: 'FN-M6-25', name: 'Hex Bolt, M6 × 25mm (box)', qty: 12, price: 8.80 },
  ];
  const subtotal = lines.reduce((a, l) => a + l.qty * l.price, 0);
  const tax = subtotal * 0.08;
  const shipping = 245;
  const total = subtotal + tax + shipping;

  type Action = { label: string; to: string; primary: boolean; disabled?: boolean };
  const nextActions: Action[] = ({
    'Open':     [{ label: 'Allocate & pick', to: 'Picking', primary: true }, { label: 'Cancel', to: 'Cancelled', primary: false }],
    'Picking':  [{ label: 'Mark shipped', to: 'Shipped', primary: true }, { label: 'Hold', to: 'On hold', primary: false }],
    'Shipped':  [{ label: 'Generate invoice', to: 'Invoiced', primary: true }],
    'Invoiced': [{ label: 'Done', to: 'Invoiced', primary: true, disabled: true }],
    'On hold':  [{ label: 'Resume', to: 'Open', primary: true }, { label: 'Cancel', to: 'Cancelled', primary: false }],
    'Cancelled':[{ label: 'Reopen', to: 'Open', primary: true }],
  } as Record<string, Action[]>)[order.status] || [];

  return (
    <>
      <div className="t-scrim" onClick={onClose} />
      <aside className="t-drawer" role="dialog" aria-label={'Order ' + order.id}>
        <div className="t-drawer-hd">
          <div>
            <div className="t-drawer-eyebrow">Sales order</div>
            <div className="t-drawer-title t-mono">{order.id}</div>
          </div>
          <button className="t-icon-btn" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
        </div>

        <div className="t-drawer-status">
          <StatusPill status={order.status} />
          <span className="t-drawer-meta">Created {order.date} · Due {order.due}</span>
        </div>

        <div className="t-drawer-grid">
          <Field label="Customer" value={order.customer} sub={order.contact} />
          <Field label="Owner" value={order.owner} />
          <Field label="Payment terms" value="Net 30" />
          <Field label="Ship via" value="Standard ground" />
          <Field label="PO ref" value="—" />
          <Field label="Warehouse" value="WH-Central" />
        </div>

        <div className="t-drawer-section">
          <div className="t-section-hd"><span>Line items</span><span className="t-cell-sub">{lines.length} items</span></div>
          <table className="t-table t-table-compact">
            <thead><tr><th>SKU</th><th>Description</th><th className="t-num">Qty</th><th className="t-num">Price</th><th className="t-num">Subtotal</th></tr></thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.sku}>
                  <td className="t-mono">{l.sku}</td>
                  <td>{l.name}</td>
                  <td className="t-num">{l.qty.toLocaleString()}</td>
                  <td className="t-num t-mono">${l.price.toFixed(2)}</td>
                  <td className="t-num t-mono">${(l.qty * l.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="t-drawer-totals">
          <div><span>Subtotal</span><span className="t-mono">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
          <div><span>Tax (8%)</span><span className="t-mono">${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
          <div><span>Shipping</span><span className="t-mono">${shipping.toFixed(2)}</span></div>
          <div className="is-total"><span>Total</span><span className="t-mono">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
        </div>

        <div className="t-drawer-foot">
          {nextActions.map((a, i) => (
            <button
              key={i}
              className={'t-btn ' + (a.primary ? 't-btn-primary' : 't-btn-ghost')}
              disabled={a.disabled}
              onClick={() => onUpdateStatus(a.to)}
            >
              {a.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

interface NewOrderModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: { customer: string; contact: string; due: string; total: number; items: number }) => void;
  customers: string[];
  inventoryItems: InventoryItem[];
  contactMap: Record<string, string>;
}

function FormField({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <label className={'t-form-field ' + (error ? 'has-error' : '')}>
      <span className="t-form-label">
        {label}{required && <span className="t-req">*</span>}
      </span>
      {children}
      {error && <span className="t-error">{error}</span>}
    </label>
  );
}

function NewOrderModal({ open, onClose, onCreate, customers, inventoryItems, contactMap }: NewOrderModalProps) {
  const [customer, setCustomer] = useState('');
  const [contact, setContact] = useState('');
  const [due, setDue] = useState('');
  const [warehouse, setWarehouse] = useState('WH-Central');
  const [terms, setTerms] = useState('Net 30');
  const [lines, setLines] = useState([{ sku: '', qty: 1, price: 0 }]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setCustomer(''); setContact(''); setDue('');
      setLines([{ sku: '', qty: 1, price: 0 }]);
      setTouched(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const errs = {
    customer: !customer ? 'Customer is required' : '',
    due: !due ? 'Due date is required' : '',
    lines: lines.some((l) => !l.sku || l.qty <= 0) ? 'Every line needs an SKU and quantity' : '',
  };
  const valid = !errs.customer && !errs.due && !errs.lines;
  const subtotal = lines.reduce((a, l) => a + (Number(l.qty) || 0) * (Number(l.price) || 0), 0);

  const updateLine = (i: number, key: string, val: string | number) => {
    setLines((prev) => prev.map((l, idx) => idx === i ? { ...l, [key]: val } : l));
  };
  const addLine = () => setLines((prev) => [...prev, { sku: '', qty: 1, price: 0 }]);
  const removeLine = (i: number) => setLines((prev) => prev.filter((_, idx) => idx !== i));

  const submit = () => {
    setTouched(true);
    if (!valid) return;
    onCreate({
      customer, contact, due,
      total: subtotal * 1.08 + 245,
      items: lines.reduce((a, l) => a + (Number(l.qty) || 0), 0),
    });
  };

  return (
    <>
      <div className="t-scrim t-scrim-modal" onClick={onClose} />
      <div className="t-modal" role="dialog" aria-label="New sales order">
        <div className="t-modal-hd">
          <div>
            <div className="t-modal-eyebrow">New record</div>
            <div className="t-modal-title">Create sales order</div>
          </div>
          <button className="t-icon-btn" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
        </div>

        <div className="t-modal-body">
          <div className="t-form-grid">
            <FormField label="Customer" required error={touched ? errs.customer : undefined}>
              <select className="t-input" value={customer}
                onChange={(e) => { setCustomer(e.target.value); setContact(contactMap[e.target.value] || ''); }}>
                <option value="">Select customer…</option>
                {customers.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Contact">
              <input className="t-input" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Auto-filled from customer" />
            </FormField>
            <FormField label="Due date" required error={touched ? errs.due : undefined}>
              <input className="t-input" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
            </FormField>
            <FormField label="Warehouse">
              <select className="t-input" value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
                <option>WH-Central</option><option>WH-East</option><option>WH-West</option>
              </select>
            </FormField>
            <FormField label="Payment terms">
              <select className="t-input" value={terms} onChange={(e) => setTerms(e.target.value)}>
                <option>Net 15</option><option>Net 30</option><option>Net 45</option><option>Due on receipt</option>
              </select>
            </FormField>
            <FormField label="Owner">
              <select className="t-input" defaultValue="K. Reyes">
                <option>K. Reyes</option><option>J. Park</option><option>D. Whitfield</option>
              </select>
            </FormField>
          </div>

          <div className="t-form-section">
            <div className="t-section-hd">
              <span>Line items</span>
              {touched && errs.lines && <span className="t-error">{errs.lines}</span>}
            </div>
            <table className="t-table t-table-compact">
              <thead><tr><th>SKU</th><th>Description</th><th className="t-num">Qty</th><th className="t-num">Price</th><th className="t-num">Subtotal</th><th></th></tr></thead>
              <tbody>
                {lines.map((l, i) => {
                  const item = inventoryItems.find((it) => it.sku === l.sku);
                  return (
                    <tr key={i}>
                      <td>
                        <select className="t-input t-input-sm" value={l.sku}
                          onChange={(e) => {
                            const sku = e.target.value;
                            const it = inventoryItems.find((x) => x.sku === sku);
                            updateLine(i, 'sku', sku);
                            if (it) updateLine(i, 'price', it.price);
                          }}>
                          <option value="">Select…</option>
                          {inventoryItems.map((it) => <option key={it.sku} value={it.sku}>{it.sku}</option>)}
                        </select>
                      </td>
                      <td className="t-cell-sub">{item ? item.name : <span style={{ opacity: .4 }}>—</span>}</td>
                      <td className="t-num">
                        <input type="number" min="1" className="t-input t-input-sm t-input-num"
                          value={l.qty} onChange={(e) => updateLine(i, 'qty', Number(e.target.value))} />
                      </td>
                      <td className="t-num">
                        <input type="number" min="0" step="0.01" className="t-input t-input-sm t-input-num"
                          value={l.price} onChange={(e) => updateLine(i, 'price', Number(e.target.value))} />
                      </td>
                      <td className="t-num t-mono">${((Number(l.qty) || 0) * (Number(l.price) || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td>
                        <button className="t-icon-btn" onClick={() => removeLine(i)} disabled={lines.length === 1} aria-label="Remove">
                          <Icon name="x" size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="t-btn t-btn-ghost t-btn-sm" onClick={addLine}><Icon name="plus" size={12} /> Add line</button>
          </div>
        </div>

        <div className="t-modal-foot">
          <div className="t-modal-summary">
            <span>Subtotal</span>
            <span className="t-mono">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="t-modal-actions">
            <button className="t-btn t-btn-ghost" onClick={onClose}>Cancel</button>
            <button className="t-btn t-btn-primary" onClick={submit}>Create order</button>
          </div>
        </div>
      </div>
    </>
  );
}

interface SalesProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: string) => void;
  onShowNew: () => void;
  showNew: boolean;
  onCloseNew: () => void;
  onCreate: (data: { customer: string; contact: string; due: string; total: number; items: number }) => void;
  customers: string[];
  inventoryItems: InventoryItem[];
  contactMap: Record<string, string>;
}

export default function Sales({
  orders, onUpdateStatus, showNew, onCloseNew, onCreate, customers, inventoryItems, contactMap,
}: SalesProps) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let r = orders;
    if (filter !== 'All') r = r.filter((o) => o.status === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter((o) =>
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.contact.toLowerCase().includes(q)
      );
    }
    r = [...r].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return r;
  }, [orders, filter, query, sortKey, sortDir]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: orders.length };
    STATUSES.slice(1).forEach((s) => { m[s] = orders.filter((o) => o.status === s).length; });
    return m;
  }, [orders]);

  const totals = useMemo(() => ({
    count: filtered.length,
    sum: filtered.reduce((a, o) => a + o.total, 0),
    items: filtered.reduce((a, o) => a + o.items, 0),
  }), [filtered]);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(k); setSortDir('desc'); }
  };

  const selected = orders.find((o) => o.id === selectedId);

  return (
    <div className="t-sales">
      <div className="t-toolbar">
        <div className="t-chips">
          {STATUSES.map((s) => (
            <button key={s} className={'t-chip ' + (filter === s ? 'is-on' : '')} onClick={() => setFilter(s)}>
              {s} <span className="t-chip-count">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="t-toolbar-right">
          <div className="t-input-wrap">
            <Icon name="search" size={14} />
            <input placeholder="Search SO, customer…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button className="t-btn t-btn-ghost"><Icon name="filter" size={13} /> Filters</button>
          <button className="t-btn t-btn-ghost"><Icon name="download" size={13} /> Export</button>
        </div>
      </div>

      <div className="t-table-wrap">
        <table className="t-table">
          <thead>
            <tr>
              <th className="t-th-check"><input type="checkbox" /></th>
              <SortHead label="Order" k="id" sortKey={sortKey} dir={sortDir} onClick={toggleSort} />
              <SortHead label="Customer" k="customer" sortKey={sortKey} dir={sortDir} onClick={toggleSort} />
              <SortHead label="Date" k="date" sortKey={sortKey} dir={sortDir} onClick={toggleSort} />
              <SortHead label="Due" k="due" sortKey={sortKey} dir={sortDir} onClick={toggleSort} />
              <th>Status</th>
              <th>Owner</th>
              <SortHead label="Items" k="items" sortKey={sortKey} dir={sortDir} onClick={toggleSort} num />
              <SortHead label="Total" k="total" sortKey={sortKey} dir={sortDir} onClick={toggleSort} num />
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}
                className={selectedId === o.id ? 'is-selected' : ''}
                onClick={() => setSelectedId(o.id)}>
                <td className="t-th-check" onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                <td className="t-mono">{o.id}</td>
                <td>
                  <div className="t-cell-primary">{o.customer}</div>
                  <div className="t-cell-sub">{o.contact}</div>
                </td>
                <td className="t-mono t-cell-sub">{o.date}</td>
                <td className="t-mono t-cell-sub">{o.due}</td>
                <td><StatusPill status={o.status} /></td>
                <td className="t-cell-sub">{o.owner}</td>
                <td className="t-num">{o.items}</td>
                <td className="t-num t-mono">${o.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td>
                  <button className="t-icon-btn t-row-more" onClick={(e) => e.stopPropagation()}>
                    <Icon name="more" size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <Empty title="No orders match" sub="Try clearing filters or search." />}
      </div>

      <div className="t-table-foot">
        <span>{totals.count} orders</span>
        <span>·</span>
        <span>{totals.items} line items</span>
        <span>·</span>
        <span className="t-mono">${totals.sum.toLocaleString(undefined, { minimumFractionDigits: 2 })} total</span>
      </div>

      {selected && (
        <OrderDrawer
          order={selected}
          onClose={() => setSelectedId(null)}
          onUpdateStatus={(s) => onUpdateStatus(selected.id, s)}
        />
      )}

      <NewOrderModal
        open={showNew}
        onClose={onCloseNew}
        onCreate={onCreate}
        customers={customers}
        inventoryItems={inventoryItems}
        contactMap={contactMap}
      />
    </div>
  );
}
