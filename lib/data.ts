import type { Order, InventoryItem, Kpi, RevenuePoint, ActivityItem, Task, Module } from './types';

export const ORDERS: Order[] = [
  { id: 'SO-10421', customer: 'Northwind Logistics', contact: 'M. Tanaka', date: '2026-05-02', due: '2026-05-09', status: 'Open', total: 48250.00, items: 14, owner: 'K. Reyes' },
  { id: 'SO-10420', customer: 'Helios Manufacturing', contact: 'P. Okafor', date: '2026-05-02', due: '2026-05-12', status: 'Picking', total: 12380.50, items: 6, owner: 'K. Reyes' },
  { id: 'SO-10419', customer: 'Brightline Retail Co.', contact: 'S. Müller', date: '2026-05-01', due: '2026-05-08', status: 'Shipped', total: 73900.00, items: 22, owner: 'J. Park' },
  { id: 'SO-10418', customer: 'Cobalt Components Ltd.', contact: 'A. Singh', date: '2026-05-01', due: '2026-05-15', status: 'Invoiced', total: 9425.75, items: 3, owner: 'J. Park' },
  { id: 'SO-10417', customer: 'Meridian Wholesale', contact: 'L. Andersen', date: '2026-04-30', due: '2026-05-07', status: 'Open', total: 21100.00, items: 9, owner: 'D. Whitfield' },
  { id: 'SO-10416', customer: 'Atlas Industrial Supply', contact: 'R. Costa', date: '2026-04-30', due: '2026-05-14', status: 'Picking', total: 5600.00, items: 4, owner: 'K. Reyes' },
  { id: 'SO-10415', customer: 'Vantage Distribution', contact: 'E. Brennan', date: '2026-04-29', due: '2026-05-06', status: 'Shipped', total: 38275.20, items: 18, owner: 'D. Whitfield' },
  { id: 'SO-10414', customer: 'Polaris Equipment', contact: 'T. Nguyen', date: '2026-04-29', due: '2026-05-13', status: 'On hold', total: 17400.00, items: 7, owner: 'J. Park' },
  { id: 'SO-10413', customer: 'Northwind Logistics', contact: 'M. Tanaka', date: '2026-04-28', due: '2026-05-05', status: 'Invoiced', total: 4250.00, items: 2, owner: 'K. Reyes' },
  { id: 'SO-10412', customer: 'Greenway Bottling', contact: 'F. Costa', date: '2026-04-28', due: '2026-05-12', status: 'Shipped', total: 92000.00, items: 31, owner: 'D. Whitfield' },
  { id: 'SO-10411', customer: 'Sentinel Components', contact: 'B. Hayes', date: '2026-04-27', due: '2026-05-04', status: 'Cancelled', total: 0.00, items: 0, owner: 'J. Park' },
  { id: 'SO-10410', customer: 'Coastal Hardware', contact: 'N. Reddy', date: '2026-04-27', due: '2026-05-11', status: 'Open', total: 14820.00, items: 11, owner: 'K. Reyes' },
];

export const ITEMS: InventoryItem[] = [
  { sku: 'WX-100-04', name: 'Widget Assembly, 4mm', category: 'Assemblies', uom: 'ea', onHand: 1240, allocated: 312, available: 928, reorder: 400, cost: 4.85, price: 12.40, status: 'In stock' },
  { sku: 'WX-100-06', name: 'Widget Assembly, 6mm', category: 'Assemblies', uom: 'ea', onHand: 188, allocated: 60, available: 128, reorder: 250, cost: 5.10, price: 13.20, status: 'Low' },
  { sku: 'BR-220-SS', name: 'Stainless Bracket, M-series', category: 'Hardware', uom: 'ea', onHand: 4820, allocated: 100, available: 4720, reorder: 1200, cost: 1.10, price: 3.40, status: 'In stock' },
  { sku: 'FL-009-A', name: 'Filter Cartridge, A-grade', category: 'Consumables', uom: 'ea', onHand: 36, allocated: 24, available: 12, reorder: 80, cost: 18.20, price: 49.00, status: 'Critical' },
  { sku: 'PK-CR-12', name: 'Corrugated Carton, 12in', category: 'Packaging', uom: 'ea', onHand: 9220, allocated: 600, available: 8620, reorder: 2000, cost: 0.42, price: 1.10, status: 'In stock' },
  { sku: 'MT-CU-08', name: 'Copper Tubing, 8mm × 3m', category: 'Raw materials', uom: 'm', onHand: 540, allocated: 80, available: 460, reorder: 200, cost: 6.40, price: 14.80, status: 'In stock' },
  { sku: 'AS-HVAC-2', name: 'HVAC Sub-Assembly, Type 2', category: 'Assemblies', uom: 'ea', onHand: 22, allocated: 18, available: 4, reorder: 30, cost: 142.00, price: 389.00, status: 'Critical' },
  { sku: 'FN-M6-25', name: 'Hex Bolt, M6 × 25mm', category: 'Fasteners', uom: 'box', onHand: 312, allocated: 12, available: 300, reorder: 80, cost: 3.20, price: 8.80, status: 'In stock' },
  { sku: 'EL-LM-45', name: 'Linear Motor, 45W', category: 'Electronics', uom: 'ea', onHand: 0, allocated: 0, available: 0, reorder: 20, cost: 88.00, price: 240.00, status: 'Out' },
  { sku: 'CH-PNT-W', name: 'Industrial Paint, Warm White', category: 'Chemicals', uom: 'L', onHand: 1240, allocated: 200, available: 1040, reorder: 400, cost: 7.80, price: 18.40, status: 'In stock' },
];

export const KPIS: Kpi[] = [
  { label: 'Revenue, MTD', value: '$1.84M', delta: '+12.4%', deltaTone: 'up', sub: 'vs. Apr 2026' },
  { label: 'Open orders', value: '184', delta: '+8', deltaTone: 'up', sub: '$2.41M backlog' },
  { label: 'On-time ship rate', value: '94.2%', delta: '−1.1pp', deltaTone: 'down', sub: '30-day rolling' },
  { label: 'Inventory turns', value: '6.8×', delta: '+0.3', deltaTone: 'up', sub: 'annualized' },
];

export const REVENUE_SERIES: RevenuePoint[] = [
  { m: 'Jun', actual: 1180, plan: 1100 },
  { m: 'Jul', actual: 1260, plan: 1140 },
  { m: 'Aug', actual: 1340, plan: 1180 },
  { m: 'Sep', actual: 1290, plan: 1220 },
  { m: 'Oct', actual: 1410, plan: 1280 },
  { m: 'Nov', actual: 1520, plan: 1340 },
  { m: 'Dec', actual: 1680, plan: 1420 },
  { m: 'Jan', actual: 1480, plan: 1380 },
  { m: 'Feb', actual: 1560, plan: 1420 },
  { m: 'Mar', actual: 1720, plan: 1500 },
  { m: 'Apr', actual: 1640, plan: 1540 },
  { m: 'May', actual: 1840, plan: 1600 },
];

export const ACTIVITY: ActivityItem[] = [
  { time: '9:42 AM', who: 'K. Reyes', what: 'approved', target: 'PO-22418', detail: 'Atlas Industrial Supply · $14,200' },
  { time: '9:18 AM', who: 'System', what: 'low-stock alert', target: 'FL-009-A', detail: 'Available: 12 / Reorder: 80' },
  { time: '8:54 AM', who: 'J. Park', what: 'shipped', target: 'SO-10419', detail: 'Brightline Retail Co. · 22 items' },
  { time: '8:30 AM', who: 'D. Whitfield', what: 'created', target: 'SO-10421', detail: 'Northwind Logistics · $48,250' },
  { time: 'Yesterday', who: 'M. Hossain', what: 'posted invoice', target: 'INV-9981', detail: 'Cobalt Components · $9,425.75' },
  { time: 'Yesterday', who: 'System', what: 'production complete', target: 'WO-3344', detail: 'WX-100-04 · 500 units' },
];

export const TASKS: Task[] = [
  { id: 1, label: 'Review 4 POs awaiting approval', due: 'Today', priority: 'high' },
  { id: 2, label: 'Reconcile bank statement — April', due: 'Today', priority: 'high' },
  { id: 3, label: 'Approve timesheets (12 employees)', due: 'Tomorrow', priority: 'med' },
  { id: 4, label: 'Q2 forecast review with finance', due: 'Thu', priority: 'med' },
  { id: 5, label: 'Sign off on Helios renewal terms', due: 'Fri', priority: 'low' },
];

export const CUSTOMERS = [
  'Northwind Logistics', 'Helios Manufacturing', 'Brightline Retail Co.',
  'Cobalt Components Ltd.', 'Meridian Wholesale', 'Atlas Industrial Supply',
  'Vantage Distribution', 'Polaris Equipment', 'Greenway Bottling',
  'Sentinel Components', 'Coastal Hardware',
];

export const CONTACT_MAP: Record<string, string> = {
  'Northwind Logistics': 'M. Tanaka',
  'Helios Manufacturing': 'P. Okafor',
  'Brightline Retail Co.': 'S. Müller',
  'Cobalt Components Ltd.': 'A. Singh',
  'Meridian Wholesale': 'L. Andersen',
  'Atlas Industrial Supply': 'R. Costa',
  'Vantage Distribution': 'E. Brennan',
  'Polaris Equipment': 'T. Nguyen',
  'Greenway Bottling': 'F. Costa',
  'Sentinel Components': 'B. Hayes',
  'Coastal Hardware': 'N. Reddy',
};

export const MODULES: Module[] = [
  { id: 'home',          label: 'Home',          icon: 'home' },
  { id: 'finance',       label: 'Finance',        icon: 'finance' },
  { id: 'sales',         label: 'Sales & CRM',    icon: 'sales' },
  { id: 'procurement',   label: 'Procurement',    icon: 'procurement' },
  { id: 'inventory',     label: 'Inventory',      icon: 'inventory' },
  { id: 'manufacturing', label: 'Manufacturing',  icon: 'manufacturing' },
  { id: 'hr',            label: 'People',         icon: 'hr' },
  { id: 'projects',      label: 'Projects',       icon: 'projects' },
  { id: 'reports',       label: 'Reports',        icon: 'reports' },
];
