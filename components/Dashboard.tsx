'use client';

import { useState } from 'react';
import Icon from './Icon';
import type { Kpi, RevenuePoint, ActivityItem, Task } from '@/lib/types';

function KpiCard({ kpi }: { kpi: Kpi }) {
  const up = kpi.deltaTone === 'up';
  return (
    <div className="t-kpi">
      <div className="t-kpi-label">{kpi.label}</div>
      <div className="t-kpi-value">{kpi.value}</div>
      <div className="t-kpi-foot">
        <span className={'t-delta ' + (up ? 'is-up' : 'is-down')}>
          <Icon name={up ? 'arrow-up' : 'arrow-down'} size={11} stroke={2} />
          {kpi.delta}
        </span>
        <span className="t-kpi-sub">{kpi.sub}</span>
      </div>
    </div>
  );
}

function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const W = 720, H = 240, P = { l: 36, r: 16, t: 16, b: 28 };
  const max = Math.max(...data.flatMap((d) => [d.actual, d.plan])) * 1.1;
  const xStep = (W - P.l - P.r) / (data.length - 1);
  const yScale = (v: number) => P.t + (H - P.t - P.b) * (1 - v / max);
  const path = (key: keyof RevenuePoint) =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${P.l + i * xStep} ${yScale(d[key] as number)}`).join(' ');
  const area =
    data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${P.l + i * xStep} ${yScale(d.actual)}`).join(' ') +
    ` L ${P.l + (data.length - 1) * xStep} ${H - P.b} L ${P.l} ${H - P.b} Z`;

  const yTicks = 4;
  const tickVals = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((max / yTicks) * i));

  return (
    <div className="t-card t-chart-card">
      <div className="t-card-hd">
        <div>
          <div className="t-card-title">Revenue · trailing 12 months</div>
          <div className="t-card-sub">Actual vs. plan, in $K</div>
        </div>
        <div className="t-legend">
          <span className="t-legend-item"><i className="dot dot-actual" /> Actual</span>
          <span className="t-legend-item"><i className="dot dot-plan" /> Plan</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="t-chart">
        {tickVals.map((v) => (
          <g key={v}>
            <line x1={P.l} x2={W - P.r} y1={yScale(v)} y2={yScale(v)} className="t-grid-line" />
            <text x={P.l - 8} y={yScale(v) + 3} textAnchor="end" className="t-axis">{v}</text>
          </g>
        ))}
        <path d={area} className="t-area" />
        <path d={path('plan')} className="t-line t-line-plan" />
        <path d={path('actual')} className="t-line t-line-actual" />
        {data.map((d, i) => (
          <text key={d.m} x={P.l + i * xStep} y={H - 8} textAnchor="middle" className="t-axis">{d.m}</text>
        ))}
        <circle
          cx={P.l + (data.length - 1) * xStep}
          cy={yScale(data[data.length - 1].actual)}
          r="4"
          className="t-dot"
        />
      </svg>
    </div>
  );
}

function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="t-card">
      <div className="t-card-hd">
        <div className="t-card-title">Activity</div>
        <button className="t-link">View all</button>
      </div>
      <ul className="t-activity">
        {items.map((a, i) => (
          <li key={i}>
            <div className="t-activity-time">{a.time}</div>
            <div className="t-activity-body">
              <div>
                <span className="t-activity-who">{a.who}</span>{' '}
                <span className="t-activity-what">{a.what}</span>{' '}
                <span className="t-activity-target">{a.target}</span>
              </div>
              <div className="t-activity-detail">{a.detail}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TasksCard({ items }: { items: Task[] }) {
  const [doneIds, setDoneIds] = useState<Set<number>>(new Set());
  const toggle = (id: number) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  return (
    <div className="t-card">
      <div className="t-card-hd">
        <div className="t-card-title">My tasks · today</div>
        <span className="t-card-sub">{items.length - doneIds.size} open</span>
      </div>
      <ul className="t-tasks">
        {items.map((t) => {
          const done = doneIds.has(t.id);
          return (
            <li key={t.id} className={done ? 'is-done' : ''}>
              <button type="button" className="t-check" onClick={() => toggle(t.id)} aria-label="Toggle task complete">
                {done && <Icon name="check" size={11} stroke={2.4} />}
              </button>
              <div className="t-task-body">
                <div className="t-task-label">{t.label}</div>
                <div className="t-task-meta">
                  <span className={'t-prio t-prio-' + t.priority}>{t.priority}</span>
                  <span>·</span>
                  <span>{t.due}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PipelineCard() {
  const stages = [
    { name: 'Qualifying', count: 28, value: 412 },
    { name: 'Proposal',   count: 19, value: 624 },
    { name: 'Negotiation',count: 11, value: 380 },
    { name: 'Closing',    count: 6,  value: 245 },
  ];
  const max = Math.max(...stages.map((s) => s.value));
  return (
    <div className="t-card">
      <div className="t-card-hd">
        <div className="t-card-title">Sales pipeline</div>
        <div className="t-card-sub">$1.66M · 64 deals</div>
      </div>
      <div className="t-pipeline">
        {stages.map((s) => (
          <div className="t-pipe-row" key={s.name}>
            <div className="t-pipe-name">{s.name}</div>
            <div className="t-pipe-bar"><div style={{ width: (s.value / max * 100) + '%' }} /></div>
            <div className="t-pipe-meta"><span>{s.count}</span><span>${s.value}K</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DashboardProps {
  kpis: Kpi[];
  revenueSeries: RevenuePoint[];
  activity: ActivityItem[];
  tasks: Task[];
}

export default function Dashboard({ kpis, revenueSeries, activity, tasks }: DashboardProps) {
  return (
    <div className="t-dash">
      <div className="t-kpi-row">
        {kpis.map((k) => <KpiCard key={k.label} kpi={k} />)}
      </div>
      <div className="t-grid-2">
        <RevenueChart data={revenueSeries} />
        <TasksCard items={tasks} />
      </div>
      <div className="t-grid-2">
        <PipelineCard />
        <ActivityFeed items={activity} />
      </div>
    </div>
  );
}
