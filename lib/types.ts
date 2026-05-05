export type ModuleId =
  | 'home' | 'finance' | 'sales' | 'procurement'
  | 'inventory' | 'manufacturing' | 'hr' | 'projects' | 'reports';

export interface Order {
  id: string;
  customer: string;
  contact: string;
  date: string;
  due: string;
  status: string;
  total: number;
  items: number;
  owner: string;
}

export interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  uom: string;
  onHand: number;
  allocated: number;
  available: number;
  reorder: number;
  cost: number;
  price: number;
  status: string;
}

export interface Kpi {
  label: string;
  value: string;
  delta: string;
  deltaTone: 'up' | 'down';
  sub: string;
}

export interface RevenuePoint {
  m: string;
  actual: number;
  plan: number;
}

export interface ActivityItem {
  time: string;
  who: string;
  what: string;
  target: string;
  detail: string;
}

export interface Task {
  id: number;
  label: string;
  due: string;
  priority: 'high' | 'med' | 'low';
}

export interface Module {
  id: ModuleId;
  label: string;
  icon: string;
}
