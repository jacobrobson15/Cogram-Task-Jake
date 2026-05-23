'use client';

import type { EmailItem, HandledGroup, TabId } from '@/types';
import { HANDLED_GROUPS } from '@/lib/mockData';

function riskColor(risk: string): string {
  if (/safety|claim|owner|cost/i.test(risk)) return 'text-blue-600';
  if (/ambig|no context|thread|low/i.test(risk)) return 'text-black/55';
  return 'text-black/45';
}

function actionColor(action: string): string {
  if (/deferred|held|blocked|no reply/i.test(action)) return 'text-blue-600';
  if (/drafted/i.test(action)) return 'text-black/55';
  if (/flagged/i.test(action)) return 'text-black/55';
  return 'text-black/45';
}

interface QueueListProps {
  tab: TabId;
  items: EmailItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function QueueList({ tab, items, selectedId, onSelect }: QueueListProps) {
  if (tab === 'handled') {
    return (
      <div
        className="overflow-y-auto"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.2) transparent' }}
      >
        <div className="px-4 pt-4 pb-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-1">Handled safely</div>
          <div className="text-[13px] text-black/65 leading-relaxed">
            52 emails filed or acknowledged with no human action needed.
          </div>
        </div>
        {HANDLED_GROUPS.map((g: HandledGroup) => (
          <div
            key={g.label}
            className="px-4 py-3 border-t border-black/[0.06] flex items-baseline justify-between"
          >
            <div className="min-w-0">
              <div className="text-[13px] text-black/80 truncate">{g.label}</div>
              <div className="text-[12px] text-black/45 truncate">{g.note}</div>
            </div>
            <span className="font-mono text-[14px] tabular-nums text-black/70 shrink-0 ml-3">{g.count}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="overflow-y-auto"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.2) transparent' }}
    >
      {items.map((item) => {
        const active = item.id === selectedId;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full text-left border-b border-black/[0.06] transition-colors duration-150 relative ${
              active ? 'bg-blue-50/40' : 'hover:bg-black/[0.04]'
            }`}
          >
            {active && (
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600" />
            )}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className={`font-mono text-[10px] uppercase tracking-widest truncate ${riskColor(item.risk)}`}>
                  {item.risk}
                </span>
                <span className="font-mono text-[10px] text-black/40 shrink-0">{item.age}</span>
              </div>
              <div
                className={`text-[13px] leading-snug mb-1 line-clamp-2 ${
                  active ? 'font-semibold text-black' : 'text-black/80'
                }`}
              >
                {item.subj}
              </div>
              <div className="text-[12px] text-black/50 truncate mb-1.5">{item.from}</div>
              <div className="flex items-center justify-between gap-2">
                <span className={`font-mono text-[10px] uppercase tracking-widest ${actionColor(item.action)}`}>
                  {item.action}
                </span>
                <span className="font-mono text-[10px] text-black/40 tabular-nums">{item.confidence}%</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
