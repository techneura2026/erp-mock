'use client';

import { useState, useEffect } from 'react';
import Icon from './Icon';

// ─────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────

function MetricCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="t-card t-metric">
      <div className="t-kpi-label">{label}</div>
      <div className="t-kpi-value">{value}</div>
      <div className="t-kpi-sub">{sub}</div>
    </div>
  );
}

function Pill({ status }: { status: string }) {
  return (
    <span className={'t-pill t-pill-' + status.toLowerCase().replace(/[\s/]+/g, '-')}>{status}</span>
  );
}

function FormField({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <label className={'t-form-field ' + (error ? 'has-error' : '')}>
      <span className="t-form-label">{label}{required && <span className="t-req">*</span>}</span>
      {children}
      {error && <span className="t-error">{error}</span>}
    </label>
  );
}

// ─────────────────────────────────────────────────────────────────
// Finance — General Ledger
// ─────────────────────────────────────────────────────────────────

const TRIAL_BALANCE = [
  { code: '1000', name: 'Cash & Equivalents',  type: 'Asset',     debit: 3420000, credit: 0        },
  { code: '1200', name: 'Accounts Receivable', type: 'Asset',     debit: 691800,  credit: 0        },
  { code: '1400', name: 'Inventory',           type: 'Asset',     debit: 284500,  credit: 0        },
  { code: '1600', name: 'Fixed Assets (net)',  type: 'Asset',     debit: 840000,  credit: 0        },
  { code: '2000', name: 'Accounts Payable',    type: 'Liability', debit: 0,       credit: 214500   },
  { code: '2400', name: 'Accrued Liabilities', type: 'Liability', debit: 0,       credit: 48200    },
  { code: '3000', name: 'Share Capital',       type: 'Equity',    debit: 0,       credit: 1000000  },
  { code: '3100', name: 'Retained Earnings',   type: 'Equity',    debit: 0,       credit: 2133600  },
  { code: '4000', name: 'Revenue',             type: 'Revenue',   debit: 0,       credit: 1840000  },
  { code: '5000', name: 'Cost of Goods Sold',  type: 'Expense',   debit: 1240000, credit: 0        },
  { code: '6000', name: 'Operating Expenses',  type: 'Expense',   debit: 380000,  credit: 0        },
  { code: '6100', name: 'Depreciation',        type: 'Expense',   debit: 12400,   credit: 0        },
];

const JOURNAL_ENTRIES = [
  { date: '2026-05-04', ref: 'JE-5021', desc: 'Revenue recognition — SO-10421',       debit: 48250,  credit: 48250  },
  { date: '2026-05-04', ref: 'JE-5020', desc: 'COGS — goods issued SO-10421',          debit: 22400,  credit: 22400  },
  { date: '2026-05-03', ref: 'JE-5019', desc: 'Vendor payment — Lanka Industrial Co.', debit: 14200,  credit: 14200  },
  { date: '2026-05-02', ref: 'JE-5018', desc: 'Payroll disbursement',                   debit: 84600,  credit: 84600  },
  { date: '2026-05-01', ref: 'JE-5017', desc: 'Month-end depreciation',                 debit: 12400,  credit: 12400  },
  { date: '2026-04-30', ref: 'JE-5016', desc: 'A/R receipt — Dilmah Beverages Co.',    debit: 9426,   credit: 9426   },
];

function GeneralLedger() {
  const [tab, setTab] = useState<'trial' | 'journals'>('trial');
  const totalDebit  = TRIAL_BALANCE.reduce((a, r) => a + r.debit,  0);
  const totalCredit = TRIAL_BALANCE.reduce((a, r) => a + r.credit, 0);

  return (
    <div className="t-card" style={{ overflow: 'hidden', padding: 0 }}>
      <div className="t-card-hd" style={{ padding: '18px 20px 12px' }}>
        <div>
          <div className="t-card-title">General ledger</div>
          <div className="t-card-sub">Period: May 2026 · Not yet closed</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="t-btn t-btn-ghost t-btn-sm">
            <Icon name="download" size={12} /> Export
          </button>
          <button type="button" className="t-btn t-btn-primary t-btn-sm">Close period</button>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border)', display: 'flex', padding: '0 20px' }}>
        <button type="button"
          className={'t-tab' + (tab === 'trial' ? ' is-on' : '')}
          onClick={() => setTab('trial')}>
          Trial balance
        </button>
        <button type="button"
          className={'t-tab' + (tab === 'journals' ? ' is-on' : '')}
          onClick={() => setTab('journals')}>
          Journal entries
        </button>
      </div>

      {tab === 'trial' ? (
        <table className="t-table">
          <thead>
            <tr>
              <th>Code</th><th>Account name</th><th>Type</th>
              <th className="t-num">Debit</th><th className="t-num">Credit</th>
            </tr>
          </thead>
          <tbody>
            {TRIAL_BALANCE.map((a) => (
              <tr key={a.code}>
                <td className="t-mono">{a.code}</td>
                <td><div className="t-cell-primary">{a.name}</div></td>
                <td><span className="t-cell-sub">{a.type}</span></td>
                <td className="t-num t-mono">{a.debit  ? '$' + a.debit.toLocaleString()  : '—'}</td>
                <td className="t-num t-mono">{a.credit ? '$' + a.credit.toLocaleString() : '—'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: 'var(--surface-alt)', fontWeight: 600 }}>
              <td colSpan={3} style={{ padding: '10px 14px', fontSize: 12, textAlign: 'right', color: 'var(--ink-2)' }}>
                Totals
              </td>
              <td className="t-num t-mono" style={{ padding: '10px 14px' }}>
                ${totalDebit.toLocaleString()}
              </td>
              <td className="t-num t-mono" style={{ padding: '10px 14px' }}>
                ${totalCredit.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <table className="t-table">
          <thead>
            <tr>
              <th>Date</th><th>Reference</th><th>Description</th>
              <th className="t-num">Debit</th><th className="t-num">Credit</th>
            </tr>
          </thead>
          <tbody>
            {JOURNAL_ENTRIES.map((j) => (
              <tr key={j.ref}>
                <td className="t-mono t-cell-sub">{j.date}</td>
                <td className="t-mono"><div className="t-cell-primary">{j.ref}</div></td>
                <td className="t-cell-sub">{j.desc}</td>
                <td className="t-num t-mono">${j.debit.toLocaleString()}</td>
                <td className="t-num t-mono">${j.credit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Finance — Bank Reconciliation
// ─────────────────────────────────────────────────────────────────

const TRANSACTIONS = [
  { id: 'TXN-001', date: '2026-05-04', desc: 'Receipt — Dilmah Beverages Co.',        amount:   9425.75, ref: 'INV-9981' },
  { id: 'TXN-002', date: '2026-05-03', desc: 'Payment — Lanka Industrial Co.',         amount: -14200.00, ref: 'PO-22418' },
  { id: 'TXN-003', date: '2026-05-02', desc: 'Payroll — May cycle 1',                  amount: -84600.00, ref: 'PR-042'   },
  { id: 'TXN-004', date: '2026-05-02', desc: 'Receipt — Hayleys Exports Ltd.',         amount:  48250.00, ref: 'SO-10413' },
  { id: 'TXN-005', date: '2026-05-01', desc: 'Office rent — May (Colombo 03)',         amount:  -8400.00, ref: 'LL-089'   },
  { id: 'TXN-006', date: '2026-04-30', desc: 'Receipt — Lanka Tiles (Pvt) Ltd.',       amount:  73900.00, ref: 'SO-10419' },
  { id: 'TXN-007', date: '2026-04-30', desc: 'Utilities — April statement',             amount:  -3240.00, ref: 'UTL-12'   },
];

function BankReconciliation() {
  const [matched, setMatched] = useState<Set<string>>(new Set());

  const toggle = (id: string) => setMatched((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const unmatched = TRANSACTIONS.filter((t) => !matched.has(t.id)).length;

  return (
    <div className="t-card">
      <div className="t-card-hd">
        <div>
          <div className="t-card-title">Bank reconciliation</div>
          <div className="t-card-sub">April 2026 · Bank of Ceylon ··4821</div>
        </div>
        <button type="button" className="t-btn t-btn-primary t-btn-sm" disabled={unmatched > 0}>
          Reconcile period
        </button>
      </div>

      <div className="t-recon-bar">
        <div>
          <div className="t-recon-label">Statement balance</div>
          <div className="t-recon-value t-mono">Rs. 21,135.75</div>
        </div>
        <div>
          <div className="t-recon-label">Unmatched items</div>
          <div className="t-recon-value" style={{ color: unmatched ? 'var(--warn)' : 'var(--ok)' }}>
            {unmatched}
          </div>
        </div>
        <div>
          <div className="t-recon-label">Matched</div>
          <div className="t-recon-value" style={{ color: 'var(--ok)' }}>{matched.size}</div>
        </div>
      </div>

      <table className="t-table">
        <thead>
          <tr>
            <th>Date</th><th>Description</th><th>Ref</th>
            <th className="t-num">Amount</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          {TRANSACTIONS.map((txn) => {
            const isMatched = matched.has(txn.id);
            return (
              <tr key={txn.id} className={isMatched ? 'is-selected' : ''}>
                <td className="t-mono t-cell-sub">{txn.date}</td>
                <td><div className="t-cell-primary">{txn.desc}</div></td>
                <td className="t-mono t-cell-sub">{txn.ref}</td>
                <td className="t-num t-mono" style={{ color: txn.amount >= 0 ? 'var(--ok)' : 'var(--crit)' }}>
                  {txn.amount >= 0 ? '+' : ''}${Math.abs(txn.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td>
                  <span className={'t-pill ' + (isMatched ? 't-pill-shipped' : 't-pill-open')}>
                    {isMatched ? 'Matched' : 'Unmatched'}
                  </span>
                </td>
                <td>
                  <button type="button" className="t-btn t-btn-sm" onClick={() => toggle(txn.id)}>
                    {isMatched ? 'Unmatch' : 'Match'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Finance stub
// ─────────────────────────────────────────────────────────────────

export function FinanceStub() {
  const aging = [
    { bucket: 'Current',    value: 412000, count: 38 },
    { bucket: '1–30 days',  value: 184000, count: 22 },
    { bucket: '31–60 days', value:  64000, count:  9 },
    { bucket: '61–90 days', value:  22000, count:  4 },
    { bucket: '90+ days',   value:   9800, count:  2 },
  ];
  const max = Math.max(...aging.map((a) => a.value));
  return (
    <div className="t-stub">
      <div className="t-grid-3">
        <MetricCard label="Cash position"   value="Rs. 1.05B" sub="4 accounts · LKR" />
        <MetricCard label="A/R outstanding" value="Rs. 211M"  sub="75 invoices" />
        <MetricCard label="A/P due 7 days"  value="Rs. 65.5M" sub="32 bills" />
      </div>
      <div className="t-card">
        <div className="t-card-hd">
          <div><div className="t-card-title">Receivables aging</div><div className="t-card-sub">By bucket, USD</div></div>
          <button type="button" className="t-link">Run report</button>
        </div>
        <div className="t-aging">
          {aging.map((a) => (
            <div className="t-aging-row" key={a.bucket}>
              <div className="t-aging-name">{a.bucket}</div>
              <div className="t-aging-bar"><div style={{ width: (a.value / max * 100) + '%' }} /></div>
              <div className="t-aging-val t-mono">${(a.value / 1000).toFixed(1)}K</div>
              <div className="t-aging-count">{a.count}</div>
            </div>
          ))}
        </div>
      </div>
      <GeneralLedger />
      <BankReconciliation />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Procurement — New PO modal
// ─────────────────────────────────────────────────────────────────

interface NewPOModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (po: { vendor: string; due: string; total: number; items: number }) => void;
}

function NewPOModal({ open, onClose, onSave }: NewPOModalProps) {
  const [vendor,  setVendor]  = useState('');
  const [due,     setDue]     = useState('');
  const [wh,      setWh]      = useState('WH-Colombo');
  const [terms,   setTerms]   = useState('Net 30');
  const [lines,   setLines]   = useState([{ desc: '', qty: 1, price: 0 }]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setVendor(''); setDue(''); setWh('WH-Colombo'); setTerms('Net 30');
      setLines([{ desc: '', qty: 1, price: 0 }]);
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
    vendor: !vendor.trim() ? 'Vendor is required' : '',
    due:    !due            ? 'Delivery date is required' : '',
    lines:  lines.some((l) => !l.desc.trim() || l.qty <= 0) ? 'Every line needs a description and quantity' : '',
  };
  const valid    = !errs.vendor && !errs.due && !errs.lines;
  const subtotal = lines.reduce((a, l) => a + (Number(l.qty) || 0) * (Number(l.price) || 0), 0);

  const updateLine = (i: number, key: string, val: string | number) =>
    setLines((prev) => prev.map((l, idx) => idx === i ? { ...l, [key]: val } : l));
  const addLine    = () => setLines((prev) => [...prev, { desc: '', qty: 1, price: 0 }]);
  const removeLine = (i: number) => setLines((prev) => prev.filter((_, idx) => idx !== i));

  const submit = () => {
    setTouched(true);
    if (!valid) return;
    onSave({
      vendor: vendor.trim(), due,
      total: subtotal,
      items: lines.reduce((a, l) => a + (Number(l.qty) || 0), 0),
    });
  };

  return (
    <>
      <div className="t-scrim t-scrim-modal" onClick={onClose} />
      <div className="t-modal" role="dialog" aria-label="New purchase order" style={{ width: 'min(820px,94vw)' }}>
        <div className="t-modal-hd">
          <div>
            <div className="t-modal-eyebrow">New record</div>
            <div className="t-modal-title">Create purchase order</div>
          </div>
          <button type="button" className="t-icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="x" size={16} />
          </button>
        </div>

        <div className="t-modal-body">
          <div className="t-form-grid">
            <FormField label="Vendor" required error={touched ? errs.vendor : undefined}>
              <input className="t-input" value={vendor} onChange={(e) => setVendor(e.target.value)}
                placeholder="e.g. Lanka Industrial Co." />
            </FormField>
            <FormField label="Delivery date" required error={touched ? errs.due : undefined}>
              <input className="t-input" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
            </FormField>
            <FormField label="Warehouse">
              <select className="t-input" value={wh} onChange={(e) => setWh(e.target.value)}>
                <option>WH-Colombo</option><option>WH-Kandy</option><option>WH-Galle</option>
              </select>
            </FormField>
            <FormField label="Payment terms">
              <select className="t-input" value={terms} onChange={(e) => setTerms(e.target.value)}>
                <option>Net 30</option><option>Net 45</option><option>Net 60</option><option>COD</option>
              </select>
            </FormField>
          </div>

          <div className="t-form-section">
            <div className="t-section-hd">
              <span>Line items</span>
              {touched && errs.lines && <span className="t-error">{errs.lines}</span>}
            </div>
            <table className="t-table t-table-compact">
              <thead>
                <tr>
                  <th>Description</th>
                  <th className="t-num">Qty</th>
                  <th className="t-num">Unit price</th>
                  <th className="t-num">Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l, i) => (
                  <tr key={i}>
                    <td>
                      <input className="t-input t-input-sm" value={l.desc}
                        onChange={(e) => updateLine(i, 'desc', e.target.value)}
                        placeholder="Item description…" />
                    </td>
                    <td className="t-num">
                      <input type="number" min="1" className="t-input t-input-sm t-input-num"
                        value={l.qty} onChange={(e) => updateLine(i, 'qty', Number(e.target.value))} />
                    </td>
                    <td className="t-num">
                      <input type="number" min="0" step="0.01" className="t-input t-input-sm t-input-num"
                        value={l.price} onChange={(e) => updateLine(i, 'price', Number(e.target.value))} />
                    </td>
                    <td className="t-num t-mono">
                      ${((Number(l.qty)||0)*(Number(l.price)||0)).toLocaleString(undefined,{minimumFractionDigits:2})}
                    </td>
                    <td>
                      <button type="button" className="t-icon-btn" onClick={() => removeLine(i)}
                        disabled={lines.length === 1} aria-label="Remove">
                        <Icon name="x" size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="t-btn t-btn-ghost t-btn-sm" onClick={addLine}>
              <Icon name="plus" size={12} /> Add line
            </button>
          </div>
        </div>

        <div className="t-modal-foot">
          <div className="t-modal-summary">
            <span>Total</span>
            <span className="t-mono">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="t-modal-actions">
            <button type="button" className="t-btn t-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="button" className="t-btn t-btn-primary" onClick={submit}>Create PO</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// Procurement — Purchase orders
// ─────────────────────────────────────────────────────────────────

const PO_STATUSES = ['All', 'Pending approval', 'Approved', 'Partial', 'Received', 'Cancelled'];

const POS = [
  { id: 'PO-22420', vendor: 'Ceylon Rubber Products Ltd.',      date: '2026-05-03', due: '2026-05-17', status: 'Pending approval', total: 42000,  items: 8 },
  { id: 'PO-22419', vendor: 'Kandy Electronic Supplies',         date: '2026-05-02', due: '2026-05-16', status: 'Approved',         total: 14200,  items: 3 },
  { id: 'PO-22418', vendor: 'Lanka Industrial Co.',              date: '2026-04-30', due: '2026-05-14', status: 'Received',         total: 14200,  items: 6 },
  { id: 'PO-22417', vendor: 'Colombo Packaging Solutions',       date: '2026-04-29', due: '2026-05-13', status: 'Approved',         total: 6800,   items: 2 },
  { id: 'PO-22416', vendor: 'Island Fasteners Pvt Ltd.',         date: '2026-04-28', due: '2026-05-12', status: 'Partial',          total: 9600,   items: 4 },
  { id: 'PO-22415', vendor: 'Precision Sensors Lanka',           date: '2026-04-27', due: '2026-05-11', status: 'Pending approval', total: 28400,  items: 5 },
  { id: 'PO-22414', vendor: 'Agro Chemicals Lanka (Pvt) Ltd.',   date: '2026-04-26', due: '2026-05-10', status: 'Received',         total: 7200,   items: 3 },
  { id: 'PO-22413', vendor: 'Southern Metal Trading',            date: '2026-04-25', due: '2026-05-09', status: 'Cancelled',        total: 0,      items: 0 },
];

function PurchaseOrders() {
  const [filter,  setFilter]  = useState('All');
  const [query,   setQuery]   = useState('');
  const [showNew, setShowNew] = useState(false);
  const [poList,  setPoList]  = useState(POS);

  const counts: Record<string, number> = { All: poList.length };
  PO_STATUSES.slice(1).forEach((s) => { counts[s] = poList.filter((p) => p.status === s).length; });

  const filtered = poList.filter((p) => {
    if (filter !== 'All' && p.status !== filter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return p.id.toLowerCase().includes(q) || p.vendor.toLowerCase().includes(q);
    }
    return true;
  });

  const totalCommitted = filtered.filter((p) => p.status !== 'Cancelled').reduce((a, p) => a + p.total, 0);

  const handleSavePO = (data: { vendor: string; due: string; total: number; items: number }) => {
    const maxNum = Math.max(...poList.map((p) => parseInt(p.id.replace('PO-', ''))));
    const today  = new Date().toISOString().slice(0, 10);
    setPoList((prev) => [{
      id: `PO-${maxNum + 1}`,
      vendor: data.vendor,
      date:   today,
      due:    data.due,
      status: 'Pending approval',
      total:  data.total,
      items:  data.items,
    }, ...prev]);
    setShowNew(false);
  };

  return (
    <>
    <div className="t-card" style={{ overflow: 'hidden', padding: 0 }}>
      <div className="t-card-hd" style={{ padding: '18px 20px 12px' }}>
        <div>
          <div className="t-card-title">Purchase orders</div>
          <div className="t-card-sub">{filtered.length} orders · ${totalCommitted.toLocaleString()} committed</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="t-input-wrap" style={{ width: 200 }}>
            <Icon name="search" size={14} />
            <input placeholder="Search PO, vendor…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button type="button" className="t-btn t-btn-primary t-btn-sm" onClick={() => setShowNew(true)}>
            <Icon name="plus" size={12} /> New PO
          </button>
        </div>
      </div>

      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {PO_STATUSES.map((s) => (
          <button type="button" key={s} className={'t-chip ' + (filter === s ? 'is-on' : '')} onClick={() => setFilter(s)}>
            {s} <span className="t-chip-count">{counts[s] ?? 0}</span>
          </button>
        ))}
      </div>

      <table className="t-table">
        <thead>
          <tr>
            <th>PO #</th><th>Vendor</th><th>Created</th><th>Due</th>
            <th>Status</th><th className="t-num">Items</th><th className="t-num">Total</th><th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((po) => (
            <tr key={po.id}>
              <td className="t-mono"><div className="t-cell-primary">{po.id}</div></td>
              <td><div className="t-cell-primary">{po.vendor}</div></td>
              <td className="t-mono t-cell-sub">{po.date}</td>
              <td className="t-mono t-cell-sub">{po.due}</td>
              <td><Pill status={po.status} /></td>
              <td className="t-num">{po.items}</td>
              <td className="t-num t-mono">
                {po.total > 0 ? '$' + po.total.toLocaleString() : '—'}
              </td>
              <td>
                <button type="button" className="t-icon-btn t-row-more">
                  <Icon name="more" size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && (
        <div className="t-empty">
          <div className="t-empty-mark"><Icon name="procurement" size={22} /></div>
          <div className="t-empty-title">No purchase orders match</div>
          <div className="t-empty-sub">Try a different filter or search.</div>
        </div>
      )}
    </div>
    <NewPOModal open={showNew} onClose={() => setShowNew(false)} onSave={handleSavePO} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// Procurement stub
// ─────────────────────────────────────────────────────────────────

export function ProcurementStub() {
  return (
    <div className="t-stub">
      <div className="t-grid-3">
        <MetricCard label="Open POs"          value="68"    sub="$412K committed" />
        <MetricCard label="Awaiting approval" value="4"     sub="2 over $25K" />
        <MetricCard label="On-time delivery"  value="91.4%" sub="30-day rolling" />
      </div>
      <PurchaseOrders />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Manufacturing — Production schedule
// ─────────────────────────────────────────────────────────────────

const WORK_ORDERS = [
  { id: 'WO-3348', product: 'Rubber Gasket, 40mm (RB-100-40)',                   qty: 500,  start: 'May 4',  end: 'May 7',  progress: 0.40, status: 'In progress', center: 'Line A' },
  { id: 'WO-3347', product: 'Tea Processing Sub-Assembly, Type 2 (AS-TEP-2)',    qty: 20,   start: 'May 4',  end: 'May 11', progress: 0.10, status: 'In progress', center: 'Line B' },
  { id: 'WO-3346', product: 'Rubber Gasket, 60mm (RB-100-60)',                   qty: 800,  start: 'May 2',  end: 'May 6',  progress: 0.85, status: 'In progress', center: 'Line A' },
  { id: 'WO-3345', product: 'Ceramic Tile Bracket, Type A (BR-CER-01)',          qty: 2000, start: 'May 1',  end: 'May 5',  progress: 1.00, status: 'Complete',    center: 'Press'  },
  { id: 'WO-3344', product: 'Rubber Gasket, 40mm (RB-100-40)',                   qty: 500,  start: 'Apr 28', end: 'May 2',  progress: 1.00, status: 'Complete',    center: 'Line A' },
  { id: 'WO-3343', product: 'Coconut Carbon Filter, Grade A (FL-CCB-A)',         qty: 100,  start: 'May 5',  end: 'May 9',  progress: 0,    status: 'Planned',     center: 'Assembly' },
  { id: 'WO-3342', product: 'Linear Motor, 45W (EL-LM-45)',                      qty: 30,   start: 'May 7',  end: 'May 14', progress: 0,    status: 'Planned',     center: 'Line B' },
];

function ProductionSchedule() {
  const [filter, setFilter] = useState('All');
  const statusOpts = ['All', 'In progress', 'Planned', 'Complete'];
  const filtered = filter === 'All' ? WORK_ORDERS : WORK_ORDERS.filter((w) => w.status === filter);

  return (
    <div className="t-card">
      <div className="t-card-hd">
        <div>
          <div className="t-card-title">Production schedule</div>
          <div className="t-card-sub">{WORK_ORDERS.filter((w) => w.status === 'In progress').length} active · {WORK_ORDERS.filter((w) => w.status === 'Planned').length} planned</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {statusOpts.map((s) => (
            <button type="button" key={s}
              className={'t-chip ' + (filter === s ? 'is-on' : '')}
              style={{ height: 26, fontSize: 11.5 }}
              onClick={() => setFilter(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 600 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 100px 90px 90px 90px',
            gap: 12, padding: '6px 0',
            borderBottom: '1px solid var(--border)',
            fontSize: 10.5,
            color: 'var(--ink-3)',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            <div>WO #</div><div>Product</div><div>Center</div>
            <div>Schedule</div><div>Progress</div><div>Status</div>
          </div>
          {filtered.map((wo) => {
            const barClass = wo.status === 'Complete' ? 'is-done' : wo.progress < 0.25 && wo.status === 'In progress' ? 'is-warn' : '';
            return (
              <div key={wo.id} className="t-wo-row">
                <div className="t-mono t-cell-primary">{wo.id}</div>
                <div>
                  <div className="t-cell-primary" style={{ fontSize: 12 }}>{wo.product}</div>
                </div>
                <div className="t-cell-sub" style={{ fontSize: 11.5 }}>{wo.center}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{wo.start} → {wo.end}</div>
                <div>
                  <div className="t-wo-bar-wrap">
                    <div className={'t-wo-bar ' + barClass} style={{ width: (wo.progress * 100) + '%' }} />
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                    {Math.round(wo.progress * 100)}%
                  </div>
                </div>
                <div><Pill status={wo.status} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Manufacturing — Bill of Materials
// ─────────────────────────────────────────────────────────────────

const BOM = [
  { level: 0, sku: 'AS-TEP-2',  name: 'Tea Processing Sub-Assembly, Type 2', qtyPer: null, uom: 'ea', totalReq: 20  },
  { level: 1, sku: 'TEP-CORE',  name: 'Tea Processing Core Assembly',         qtyPer: 1,    uom: 'ea', totalReq: 20  },
  { level: 2, sku: 'MT-CU-08',  name: 'Copper Tubing, 8mm × 3m',             qtyPer: 0.5,  uom: 'm',  totalReq: 10  },
  { level: 2, sku: 'FL-CCB-A',  name: 'Coconut Carbon Filter, Grade A',       qtyPer: 2,    uom: 'ea', totalReq: 40  },
  { level: 2, sku: 'CH-RBX-A',  name: 'Natural Rubber Compound, Grade A',     qtyPer: 0.1,  uom: 'L',  totalReq: 2   },
  { level: 1, sku: 'BR-CER-01', name: 'Ceramic Tile Bracket, Type A',         qtyPer: 4,    uom: 'ea', totalReq: 80  },
  { level: 1, sku: 'FN-SS-M6',  name: 'Stainless Bolt, M6 × 25mm',           qtyPer: 8,    uom: 'box',totalReq: 160 },
  { level: 1, sku: 'PK-PP-12',  name: 'Polypropylene Sack, 12kg',             qtyPer: 1,    uom: 'ea', totalReq: 20  },
];

const INDENT = ['', '└─ ', '  └─ '];

function BillOfMaterials() {
  return (
    <div className="t-card">
      <div className="t-card-hd">
        <div>
          <div className="t-card-title">Bill of Materials</div>
          <div className="t-card-sub">AS-TEP-2 · Tea Processing Sub-Assembly, Type 2 · WO-3347 (qty 20)</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="t-btn t-btn-ghost t-btn-sm">
            <Icon name="download" size={12} /> Export
          </button>
          <button type="button" className="t-btn t-btn-ghost t-btn-sm">Explosion view</button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 560 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '28px 90px 1fr 70px 50px 80px',
            gap: 10, padding: '6px 0',
            borderBottom: '1px solid var(--border)',
            fontSize: 10.5,
            color: 'var(--ink-3)',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            <div>Lv</div><div>SKU</div><div>Component</div>
            <div className="t-num">Qty / parent</div><div>UoM</div><div className="t-num">Total req.</div>
          </div>
          {BOM.map((row, i) => (
            <div key={i} className="t-bom-row">
              <div className="t-bom-lv">{row.level}</div>
              <div className="t-mono" style={{ fontSize: 11.5, color: 'var(--ink-2)' }}>{row.sku}</div>
              <div>
                <span style={{ color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                  {INDENT[row.level]}
                </span>
                <span className={row.level === 0 ? 't-cell-primary' : 't-cell-sub'} style={{ fontWeight: row.level === 0 ? 600 : 400 }}>
                  {row.name}
                </span>
              </div>
              <div className="t-num t-mono" style={{ fontSize: 12, color: 'var(--ink-2)' }}>
                {row.qtyPer != null ? row.qtyPer : '—'}
              </div>
              <div className="t-cell-sub" style={{ fontSize: 11.5 }}>{row.uom}</div>
              <div className="t-num t-mono" style={{ fontSize: 12, fontWeight: row.level === 0 ? 600 : 400 }}>
                {row.totalReq}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Manufacturing stub
// ─────────────────────────────────────────────────────────────────

export function ManufacturingStub() {
  return (
    <div className="t-stub">
      <div className="t-grid-3">
        <MetricCard label="Open work orders" value="22"    sub="14 on schedule" />
        <MetricCard label="OEE"              value="78.4%" sub="this week" />
        <MetricCard label="Scrap rate"       value="1.2%"  sub="↓ 0.3pp vs last wk" />
      </div>
      <ProductionSchedule />
      <BillOfMaterials />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HR stub
// ─────────────────────────────────────────────────────────────────

const TEAM_DATA = [
  { name: 'K. Perera',         role: 'Sales Manager',        dept: 'Sales',           status: 'Active' },
  { name: 'J. Fernando',       role: 'Account Executive',    dept: 'Sales',           status: 'Active' },
  { name: 'D. Wickramasinghe', role: 'Account Executive',    dept: 'Sales',           status: 'PTO'    },
  { name: 'B. Pathirana',      role: 'Sales Executive',      dept: 'Sales',           status: 'Active' },
  { name: 'M. Jayawardena',    role: 'Senior Accountant',    dept: 'Finance',         status: 'Active' },
  { name: 'S. Rajapaksa',      role: 'CFO',                  dept: 'Finance',         status: 'Active' },
  { name: 'T. Gunasekara',     role: 'Junior Accountant',    dept: 'Finance',         status: 'Active' },
  { name: 'R. de Silva',       role: 'Warehouse Lead',       dept: 'Operations',      status: 'Active' },
  { name: 'L. Bandara',        role: 'Production Planner',   dept: 'Operations',      status: 'Active' },
  { name: 'P. Senanayake',     role: 'Operations Manager',   dept: 'Operations',      status: 'Active' },
  { name: 'A. Karunaratne',    role: 'QA Engineer',          dept: 'Manufacturing',   status: 'Active' },
  { name: 'H. Dissanayake',    role: 'Machine Operator',     dept: 'Manufacturing',   status: 'PTO'    },
  { name: 'N. Wijesinghe',     role: 'HR Manager',           dept: 'People',          status: 'Active' },
  { name: 'C. Athukorala',     role: 'Recruiter',            dept: 'People',          status: 'Active' },
  { name: 'V. Mendis',         role: 'IT Support',           dept: 'IT',              status: 'Active' },
  { name: 'I. Samaraweera',    role: 'DevOps Engineer',      dept: 'IT',              status: 'Active' },
  { name: 'G. Ranasinghe',     role: 'Procurement Officer',  dept: 'Procurement',     status: 'Active' },
  { name: 'E. Weerasinghe',    role: 'Logistics Coordinator',dept: 'Operations',      status: 'Active' },
];

const TEAM_PAGE_SIZE = 6;

function TeamDirectory() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(TEAM_DATA.length / TEAM_PAGE_SIZE);
  const start   = page * TEAM_PAGE_SIZE;
  const visible = TEAM_DATA.slice(start, start + TEAM_PAGE_SIZE);

  return (
    <div className="t-card">
      <div className="t-card-hd">
        <div className="t-card-title">Team directory</div>
        <span className="t-card-sub">
          Showing {start + 1}–{Math.min(start + TEAM_PAGE_SIZE, TEAM_DATA.length)} of {TEAM_DATA.length}
        </span>
      </div>
      <table className="t-table">
        <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Status</th></tr></thead>
        <tbody>
          {visible.map((t) => (
            <tr key={t.name}>
              <td><div className="t-cell-primary">{t.name}</div></td>
              <td className="t-cell-sub">{t.role}</td>
              <td className="t-cell-sub">{t.dept}</td>
              <td><Pill status={t.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="t-pager">
        <button type="button" className="t-btn t-btn-ghost t-btn-sm"
          onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
          ← Prev
        </button>
        <span className="t-pager-info">Page {page + 1} of {totalPages}</span>
        <button type="button" className="t-btn t-btn-ghost t-btn-sm"
          onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1}>
          Next →
        </button>
      </div>
    </div>
  );
}

export function HRStub() {
  return (
    <div className="t-stub">
      <div className="t-grid-3">
        <MetricCard label="Headcount"          value="248"     sub="+6 this quarter" />
        <MetricCard label="Open requisitions"  value="11"      sub="3 in late stage" />
        <MetricCard label="Avg tenure"         value="4.8 yrs" sub="Across all depts" />
      </div>
      <TeamDirectory />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Projects stub (unchanged)
// ─────────────────────────────────────────────────────────────────

export function ProjectsStub() {
  const projects = [
    { name: 'John Keells renewal — Phase 2', client: 'John Keells Trading',     progress: 0.62, due: 'Jun 14', status: 'On track' },
    { name: 'Hayleys WMS rollout',           client: 'Hayleys Exports Ltd.',     progress: 0.34, due: 'Aug 02', status: 'On track' },
    { name: 'Lanka Tiles integration',       client: 'Lanka Tiles (Pvt) Ltd.',   progress: 0.88, due: 'May 20', status: 'At risk'  },
    { name: 'Q3 capacity expansion',         client: 'Internal',                  progress: 0.12, due: 'Sep 30', status: 'On track' },
  ];
  return (
    <div className="t-stub">
      <div className="t-grid-3">
        <MetricCard label="Active projects"      value="14"    sub="3 closing this month" />
        <MetricCard label="Billable utilization" value="74%"   sub="target 78%" />
        <MetricCard label="Margin (rolling)"     value="32.1%" sub="+1.4pp vs Q1" />
      </div>
      <div className="t-card">
        <div className="t-card-hd"><div className="t-card-title">Active projects</div></div>
        <ul className="t-projects">
          {projects.map((p) => (
            <li key={p.name}>
              <div>
                <div className="t-cell-primary">{p.name}</div>
                <div className="t-cell-sub">{p.client} · due {p.due}</div>
              </div>
              <div className="t-proj-bar"><div style={{ width: (p.progress * 100) + '%' }} /></div>
              <div className="t-proj-pct t-mono">{Math.round(p.progress * 100)}%</div>
              <Pill status={p.status} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Reports — New report modal
// ─────────────────────────────────────────────────────────────────

const REPORT_CATEGORIES = ['Finance', 'Sales', 'Inventory', 'Procurement', 'Manufacturing', 'People', 'Projects'];

interface NewReportModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, category: string) => void;
}

function NewReportModal({ open, onClose, onSave }: NewReportModalProps) {
  const [name,     setName]     = useState('');
  const [category, setCategory] = useState('Finance');
  const [type,     setType]     = useState('table');
  const [period,   setPeriod]   = useState('month');
  const [touched,  setTouched]  = useState(false);

  useEffect(() => {
    if (open) { setName(''); setCategory('Finance'); setType('table'); setPeriod('month'); setTouched(false); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const nameErr = touched && !name.trim() ? 'Report name is required' : '';

  const submit = () => {
    setTouched(true);
    if (!name.trim()) return;
    onSave(name.trim(), category);
  };

  return (
    <>
      <div className="t-scrim t-scrim-modal" onClick={onClose} />
      <div className="t-modal" role="dialog" aria-label="New report" style={{ width: 'min(540px,94vw)' }}>
        <div className="t-modal-hd">
          <div>
            <div className="t-modal-eyebrow">New record</div>
            <div className="t-modal-title">Create report</div>
          </div>
          <button type="button" className="t-icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="x" size={16} />
          </button>
        </div>

        <div className="t-modal-body">
          <div className="t-form-grid">
            <FormField label="Report name" required error={nameErr} >
              <input className="t-input" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Monthly Revenue by Region" style={{ gridColumn: '1 / -1' }} />
            </FormField>
            <FormField label="Category">
              <select className="t-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {REPORT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Report type">
              <select className="t-input" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="table">Table / grid</option>
                <option value="chart">Chart</option>
                <option value="pivot">Pivot table</option>
                <option value="summary">Summary card</option>
              </select>
            </FormField>
            <FormField label="Default period">
              <select className="t-input" value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="quarter">This quarter</option>
                <option value="year">This year</option>
                <option value="custom">Custom range</option>
              </select>
            </FormField>
            <FormField label="Visibility">
              <select className="t-input" defaultValue="team">
                <option value="private">Private</option>
                <option value="team">Team</option>
                <option value="org">Organisation</option>
              </select>
            </FormField>
          </div>
        </div>

        <div className="t-modal-foot">
          <div className="t-modal-summary" style={{ color: 'var(--ink-3)' }}>
            Saved to · {category}
          </div>
          <div className="t-modal-actions">
            <button type="button" className="t-btn t-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="button" className="t-btn t-btn-primary" onClick={submit}>Create report</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// Reports stub
// ─────────────────────────────────────────────────────────────────

export function ReportsStub() {
  const [showNew,  setShowNew]  = useState(false);
  const [reports,  setReports]  = useState([
    { name: 'P&L Statement',                    cat: 'Finance',       run: 'Today 8:14am' },
    { name: 'Cash Flow Forecast (13-week)',      cat: 'Finance',       run: 'Yesterday'    },
    { name: 'Top 50 Customers by Revenue',      cat: 'Sales',         run: 'May 1'        },
    { name: 'Inventory Turnover by Category',   cat: 'Inventory',     run: 'May 1'        },
    { name: 'Supplier On-Time Delivery',        cat: 'Procurement',   run: 'Apr 30'       },
    { name: 'Production Yield by Line',         cat: 'Manufacturing', run: 'Apr 30'       },
    { name: 'Headcount & Attrition',            cat: 'People',        run: 'Apr 28'       },
    { name: 'Project Margin by Manager',        cat: 'Projects',      run: 'Apr 27'       },
  ]);

  const handleSave = (name: string, category: string) => {
    setReports((prev) => [{ name, cat: category, run: 'Just now' }, ...prev]);
    setShowNew(false);
  };

  return (
    <div className="t-stub">
      <div className="t-card">
        <div className="t-card-hd">
          <div>
            <div className="t-card-title">Saved reports</div>
            <div className="t-card-sub">Library · {reports.length} reports</div>
          </div>
          <button type="button" className="t-btn t-btn-primary t-btn-sm" onClick={() => setShowNew(true)}>
            <Icon name="plus" size={12} /> New report
          </button>
        </div>
        <div className="t-report-grid">
          {reports.map((r) => (
            <div key={r.name} className="t-report-card">
              <div className="t-report-eyebrow">{r.cat}</div>
              <div className="t-report-name">{r.name}</div>
              <div className="t-report-meta">Last run · {r.run}</div>
              <div className="t-report-foot">
                <button type="button" className="t-link">Open</button>
                <button type="button" className="t-link">Schedule</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewReportModal open={showNew} onClose={() => setShowNew(false)} onSave={handleSave} />
    </div>
  );
}
