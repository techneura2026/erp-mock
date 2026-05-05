import type { Order, InventoryItem, Kpi, RevenuePoint, ActivityItem, Task, Module } from './types';

export const ORDERS: Order[] = [
  { id: 'SO-10421', customer: 'Hayleys Exports Ltd.', contact: 'N. Jayawardena', date: '2026-05-02', due: '2026-05-09', status: 'Open', total: 48250.00, items: 14, owner: 'K. Perera' },
  { id: 'SO-10420', customer: 'John Keells Trading', contact: 'S. Perera', date: '2026-05-02', due: '2026-05-12', status: 'Picking', total: 12380.50, items: 6, owner: 'K. Perera' },
  { id: 'SO-10419', customer: 'Lanka Tiles (Pvt) Ltd.', contact: 'M. de Silva', date: '2026-05-01', due: '2026-05-08', status: 'Shipped', total: 73900.00, items: 22, owner: 'J. Fernando' },
  { id: 'SO-10418', customer: 'Dilmah Beverages Co.', contact: 'R. Wickramasinghe', date: '2026-05-01', due: '2026-05-15', status: 'Invoiced', total: 9425.75, items: 3, owner: 'J. Fernando' },
  { id: 'SO-10417', customer: 'Brandix Lanka Ltd.', contact: 'P. Fernando', date: '2026-04-30', due: '2026-05-07', status: 'Open', total: 21100.00, items: 9, owner: 'D. Wickramasinghe' },
  { id: 'SO-10416', customer: 'CBL Foods Ltd.', contact: 'A. Rajapaksa', date: '2026-04-30', due: '2026-05-14', status: 'Picking', total: 5600.00, items: 4, owner: 'K. Perera' },
  { id: 'SO-10415', customer: 'Cargills Ceylon PLC', contact: 'T. Gunawardena', date: '2026-04-29', due: '2026-05-06', status: 'Shipped', total: 38275.20, items: 18, owner: 'D. Wickramasinghe' },
  { id: 'SO-10414', customer: 'Aitken Spence PLC', contact: 'E. Seneviratne', date: '2026-04-29', due: '2026-05-13', status: 'On hold', total: 17400.00, items: 7, owner: 'J. Fernando' },
  { id: 'SO-10413', customer: 'Hayleys Exports Ltd.', contact: 'N. Jayawardena', date: '2026-04-28', due: '2026-05-05', status: 'Invoiced', total: 4250.00, items: 2, owner: 'K. Perera' },
  { id: 'SO-10412', customer: 'Nestle Lanka Ltd.', contact: 'F. Bandara', date: '2026-04-28', due: '2026-05-12', status: 'Shipped', total: 92000.00, items: 31, owner: 'D. Wickramasinghe' },
  { id: 'SO-10411', customer: 'LAUGFS Holdings', contact: 'B. Thilakarathne', date: '2026-04-27', due: '2026-05-04', status: 'Cancelled', total: 0.00, items: 0, owner: 'J. Fernando' },
  { id: 'SO-10410', customer: 'Keells Food Products', contact: 'N. Senanayake', date: '2026-04-27', due: '2026-05-11', status: 'Open', total: 14820.00, items: 11, owner: 'K. Perera' },
];

export const ITEMS: InventoryItem[] = [
  { sku: 'RB-100-40', name: 'Rubber Gasket, 40mm', category: 'Assemblies', uom: 'ea', onHand: 1240, allocated: 312, available: 928, reorder: 400, cost: 4.85, price: 12.40, status: 'In stock' },
  { sku: 'RB-100-60', name: 'Rubber Gasket, 60mm', category: 'Assemblies', uom: 'ea', onHand: 188, allocated: 60, available: 128, reorder: 250, cost: 5.10, price: 13.20, status: 'Low' },
  { sku: 'BR-CER-01', name: 'Ceramic Tile Bracket, Type A', category: 'Hardware', uom: 'ea', onHand: 4820, allocated: 100, available: 4720, reorder: 1200, cost: 1.10, price: 3.40, status: 'In stock' },
  { sku: 'FL-CCB-A', name: 'Coconut Carbon Filter, Grade A', category: 'Consumables', uom: 'ea', onHand: 36, allocated: 24, available: 12, reorder: 80, cost: 18.20, price: 49.00, status: 'Critical' },
  { sku: 'PK-PP-12', name: 'Polypropylene Sack, 12kg', category: 'Packaging', uom: 'ea', onHand: 9220, allocated: 600, available: 8620, reorder: 2000, cost: 0.42, price: 1.10, status: 'In stock' },
  { sku: 'MT-CU-08', name: 'Copper Tubing, 8mm × 3m', category: 'Raw materials', uom: 'm', onHand: 540, allocated: 80, available: 460, reorder: 200, cost: 6.40, price: 14.80, status: 'In stock' },
  { sku: 'AS-TEP-2', name: 'Tea Processing Sub-Assembly, Type 2', category: 'Assemblies', uom: 'ea', onHand: 22, allocated: 18, available: 4, reorder: 30, cost: 142.00, price: 389.00, status: 'Critical' },
  { sku: 'FN-SS-M6', name: 'Stainless Bolt, M6 × 25mm', category: 'Fasteners', uom: 'box', onHand: 312, allocated: 12, available: 300, reorder: 80, cost: 3.20, price: 8.80, status: 'In stock' },
  { sku: 'EL-LM-45', name: 'Linear Motor, 45W', category: 'Electronics', uom: 'ea', onHand: 0, allocated: 0, available: 0, reorder: 20, cost: 88.00, price: 240.00, status: 'Out' },
  { sku: 'CH-RBX-A', name: 'Natural Rubber Compound, Grade A', category: 'Chemicals', uom: 'L', onHand: 1240, allocated: 200, available: 1040, reorder: 400, cost: 7.80, price: 18.40, status: 'In stock' },
];

export const KPIS: Kpi[] = [
  { label: 'Revenue, MTD', value: 'Rs. 562M', delta: '+12.4%', deltaTone: 'up', sub: 'vs. Apr 2026' },
  { label: 'Open orders', value: '184', delta: '+8', deltaTone: 'up', sub: 'Rs. 738M backlog' },
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
  { time: '9:42 AM', who: 'K. Perera', what: 'approved', target: 'PO-22418', detail: 'Lanka Industrial Co. · Rs. 4,332,000' },
  { time: '9:18 AM', who: 'System', what: 'low-stock alert', target: 'FL-CCB-A', detail: 'Available: 12 / Reorder: 80' },
  { time: '8:54 AM', who: 'J. Fernando', what: 'shipped', target: 'SO-10419', detail: 'Lanka Tiles (Pvt) Ltd. · 22 items' },
  { time: '8:30 AM', who: 'D. Wickramasinghe', what: 'created', target: 'SO-10421', detail: 'Hayleys Exports Ltd. · Rs. 14,730,250' },
  { time: 'Yesterday', who: 'M. Jayawardena', what: 'posted invoice', target: 'INV-9981', detail: 'Dilmah Beverages Co. · Rs. 2,875,013' },
  { time: 'Yesterday', who: 'System', what: 'production complete', target: 'WO-3344', detail: 'RB-100-40 · 500 units' },
];

export const TASKS: Task[] = [
  { id: 1, label: 'Review 4 POs awaiting approval', due: 'Today', priority: 'high' },
  { id: 2, label: 'Reconcile bank statement — April', due: 'Today', priority: 'high' },
  { id: 3, label: 'Approve timesheets (12 employees)', due: 'Tomorrow', priority: 'med' },
  { id: 4, label: 'Q2 forecast review with finance', due: 'Thu', priority: 'med' },
  { id: 5, label: 'Sign off on John Keells renewal terms', due: 'Fri', priority: 'low' },
];

export const CUSTOMERS = [
  'Hayleys Exports Ltd.', 'John Keells Trading', 'Lanka Tiles (Pvt) Ltd.',
  'Dilmah Beverages Co.', 'Brandix Lanka Ltd.', 'CBL Foods Ltd.',
  'Cargills Ceylon PLC', 'Aitken Spence PLC', 'Nestle Lanka Ltd.',
  'LAUGFS Holdings', 'Keells Food Products',
];

export const CONTACT_MAP: Record<string, string> = {
  'Hayleys Exports Ltd.': 'N. Jayawardena',
  'John Keells Trading': 'S. Perera',
  'Lanka Tiles (Pvt) Ltd.': 'M. de Silva',
  'Dilmah Beverages Co.': 'R. Wickramasinghe',
  'Brandix Lanka Ltd.': 'P. Fernando',
  'CBL Foods Ltd.': 'A. Rajapaksa',
  'Cargills Ceylon PLC': 'T. Gunawardena',
  'Aitken Spence PLC': 'E. Seneviratne',
  'Nestle Lanka Ltd.': 'F. Bandara',
  'LAUGFS Holdings': 'B. Thilakarathne',
  'Keells Food Products': 'N. Senanayake',
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
