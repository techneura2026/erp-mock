'use client';

import { useState, useEffect } from 'react';
import Icon from './Icon';
import { StatusPill, Empty } from './atoms';
import type { InventoryItem } from '@/lib/types';

const FILTERS = ['All', 'In stock', 'Low', 'Critical', 'Out'];
const CATEGORIES = ['Assemblies', 'Hardware', 'Consumables', 'Packaging', 'Raw materials', 'Fasteners', 'Electronics', 'Chemicals'];

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

interface NewItemModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (item: InventoryItem) => void;
}

function NewItemModal({ open, onClose, onCreate }: NewItemModalProps) {
  const [sku,      setSku]      = useState('');
  const [name,     setName]     = useState('');
  const [category, setCategory] = useState('');
  const [uom,      setUom]      = useState('ea');
  const [onHand,   setOnHand]   = useState(0);
  const [reorder,  setReorder]  = useState(0);
  const [cost,     setCost]     = useState(0);
  const [price,    setPrice]    = useState(0);
  const [touched,  setTouched]  = useState(false);

  useEffect(() => {
    if (open) {
      setSku(''); setName(''); setCategory(''); setUom('ea');
      setOnHand(0); setReorder(0); setCost(0); setPrice(0); setTouched(false);
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
    sku:      !sku.trim()      ? 'SKU is required'      : '',
    name:     !name.trim()     ? 'Name is required'     : '',
    category: !category        ? 'Category is required' : '',
  };
  const valid = !errs.sku && !errs.name && !errs.category;
  const margin = cost > 0 && price > cost ? ((price - cost) / price * 100).toFixed(1) + '%' : '—';

  const submit = () => {
    setTouched(true);
    if (!valid) return;
    const available = Math.max(0, onHand);
    const status =
      available === 0           ? 'Out'      :
      available < reorder * 0.5 ? 'Critical' :
      available < reorder       ? 'Low'      : 'In stock';
    onCreate({ sku: sku.trim(), name: name.trim(), category, uom, onHand, allocated: 0, available, reorder, cost, price, status });
  };

  return (
    <>
      <div className="t-scrim t-scrim-modal" onClick={onClose} />
      <div className="t-modal" role="dialog" aria-label="Add inventory item">
        <div className="t-modal-hd">
          <div>
            <div className="t-modal-eyebrow">New record</div>
            <div className="t-modal-title">Add inventory item</div>
          </div>
          <button type="button" className="t-icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="x" size={16} />
          </button>
        </div>

        <div className="t-modal-body">
          <div className="t-form-grid">
            <FormField label="SKU" required error={touched ? errs.sku : undefined}>
              <input className="t-input" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g. WX-100-08" />
            </FormField>
            <FormField label="Item name" required error={touched ? errs.name : undefined}>
              <input className="t-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Widget Assembly, 8mm" />
            </FormField>
            <FormField label="Category" required error={touched ? errs.category : undefined}>
              <select className="t-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select category…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Unit of measure">
              <select className="t-input" value={uom} onChange={(e) => setUom(e.target.value)}>
                <option>ea</option>
                <option>m</option>
                <option>L</option>
                <option>box</option>
                <option>kg</option>
              </select>
            </FormField>
            <FormField label="On-hand quantity">
              <input type="number" min="0" className="t-input t-input-num"
                value={onHand} onChange={(e) => setOnHand(Math.max(0, Number(e.target.value)))} />
            </FormField>
            <FormField label="Reorder point">
              <input type="number" min="0" className="t-input t-input-num"
                value={reorder} onChange={(e) => setReorder(Math.max(0, Number(e.target.value)))} />
            </FormField>
            <FormField label="Cost price">
              <input type="number" min="0" step="0.01" className="t-input t-input-num"
                value={cost} onChange={(e) => setCost(Math.max(0, Number(e.target.value)))} />
            </FormField>
            <FormField label="Selling price">
              <input type="number" min="0" step="0.01" className="t-input t-input-num"
                value={price} onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))} />
            </FormField>
          </div>
        </div>

        <div className="t-modal-foot">
          <div className="t-modal-summary">
            <span>Margin</span>
            <span className="t-mono">{margin}</span>
          </div>
          <div className="t-modal-actions">
            <button type="button" className="t-btn t-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="button" className="t-btn t-btn-primary" onClick={submit}>Add item</button>
          </div>
        </div>
      </div>
    </>
  );
}

interface InventoryProps {
  items: InventoryItem[];
  showNew: boolean;
  onCloseNew: () => void;
  onCreate: (item: InventoryItem) => void;
}

export default function Inventory({ items, showNew, onCloseNew, onCreate }: InventoryProps) {
  const [query,  setQuery]  = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = items.filter((it) => {
    if (filter !== 'All' && it.status !== filter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return it.sku.toLowerCase().includes(q) || it.name.toLowerCase().includes(q) || it.category.toLowerCase().includes(q);
    }
    return true;
  });

  const counts: Record<string, number> = { All: items.length };
  FILTERS.slice(1).forEach((s) => { counts[s] = items.filter((i) => i.status === s).length; });

  const totalValue = items.reduce((a, i) => a + i.onHand * i.cost, 0);

  return (
    <div className="t-sales">
      <div className="t-stat-strip">
        <div><span className="t-stat-label">SKUs tracked</span><span className="t-stat-value">{items.length}</span></div>
        <div><span className="t-stat-label">Inventory value</span><span className="t-stat-value t-mono">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
        <div><span className="t-stat-label">Low / critical</span><span className="t-stat-value">{(counts['Low'] || 0) + (counts['Critical'] || 0) + (counts['Out'] || 0)}</span></div>
        <div><span className="t-stat-label">Warehouses</span><span className="t-stat-value">3</span></div>
      </div>

      <div className="t-toolbar">
        <div className="t-chips">
          {FILTERS.map((s) => (
            <button type="button" key={s} className={'t-chip ' + (filter === s ? 'is-on' : '')} onClick={() => setFilter(s)}>
              {s} <span className="t-chip-count">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="t-toolbar-right">
          <div className="t-input-wrap">
            <Icon name="search" size={14} />
            <input placeholder="Search SKU, name, category…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button type="button" className="t-btn t-btn-ghost"><Icon name="filter" size={13} /> Filters</button>
          <button type="button" className="t-btn t-btn-ghost"><Icon name="download" size={13} /> Export</button>
        </div>
      </div>

      <div className="t-table-wrap">
        <table className="t-table">
          <thead>
            <tr>
              <th>SKU</th><th>Item</th><th>Category</th>
              <th className="t-num">On hand</th><th className="t-num">Allocated</th><th className="t-num">Available</th>
              <th>Stock level</th><th className="t-num">Cost</th><th className="t-num">Price</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => {
              const ratio = it.reorder > 0 ? Math.min(1.4, it.available / it.reorder) : 1;
              const tone  = (it.status === 'Critical' || it.status === 'Out') ? 'crit' : it.status === 'Low' ? 'warn' : 'ok';
              return (
                <tr key={it.sku}>
                  <td className="t-mono">{it.sku}</td>
                  <td>
                    <div className="t-cell-primary">{it.name}</div>
                    <div className="t-cell-sub">UoM · {it.uom}</div>
                  </td>
                  <td className="t-cell-sub">{it.category}</td>
                  <td className="t-num">{it.onHand.toLocaleString()}</td>
                  <td className="t-num t-cell-sub">{it.allocated.toLocaleString()}</td>
                  <td className="t-num"><b>{it.available.toLocaleString()}</b></td>
                  <td>
                    <div className={'t-stockbar t-stockbar-' + tone}>
                      <div style={{ width: Math.min(100, ratio * 70) + '%' }} />
                      <span className="t-stockbar-thresh" style={{ left: '70%' }} />
                    </div>
                    <div className="t-cell-sub t-mono" style={{ marginTop: 3 }}>reorder @ {it.reorder}</div>
                  </td>
                  <td className="t-num t-mono t-cell-sub">${it.cost.toFixed(2)}</td>
                  <td className="t-num t-mono">${it.price.toFixed(2)}</td>
                  <td><StatusPill status={it.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <Empty title="No items match" sub="Try a different filter or search." />}
      </div>

      <NewItemModal open={showNew} onClose={onCloseNew} onCreate={onCreate} />
    </div>
  );
}
