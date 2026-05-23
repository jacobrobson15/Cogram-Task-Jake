'use client';

import type { TabId, EmailItem } from '@/types';
import { ITEMS } from '@/lib/mockData';
import QueueList from './QueueList';
import DetailPane from './DetailPane';
import ActionBar from './ActionBar';

const TABS: { id: TabId; label: string; count: number }[] = [
  { id: 'review', label: 'Needs review', count: 18 },
  { id: 'sensitive', label: 'Sensitive deferred', count: 7 },
  { id: 'lowconf', label: 'Low confidence', count: 3 },
  { id: 'handled', label: 'Handled safely', count: 52 },
];

interface ReviewWorkspaceProps {
  activeTab: TabId;
  selectedId: string | null;
  onTabChange: (tab: TabId) => void;
  onSelect: (id: string) => void;
}

export default function ReviewWorkspace({
  activeTab,
  selectedId,
  onTabChange,
  onSelect,
}: ReviewWorkspaceProps) {
  const items: EmailItem[] = activeTab === 'handled' ? [] : (ITEMS[activeTab] ?? []);
  const selectedItem = items.find((i) => i.id === selectedId) ?? items[0] ?? null;

  return (
    <section className="min-w-0 bg-white border border-black/[0.1] rounded flex flex-col h-full">

      {/* Pane header */}
      <div className="shrink-0 h-11 px-5 flex items-center justify-between border-b border-black/[0.06]">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-black">Review queue</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">
            28 items · 5 min est.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="h-7 w-7 rounded text-black/50 hover:bg-black/[0.04] hover:text-black flex items-center justify-center transition-colors"
            title="More"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="1.4" />
              <circle cx="12" cy="12" r="1.4" />
              <circle cx="19" cy="12" r="1.4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="shrink-0 px-5 border-b border-black/[0.06] flex items-center gap-6">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2.5 font-mono text-[11px] tracking-wide border-b-2 -mb-px transition-colors ${
                active
                  ? 'text-blue-600 border-blue-600'
                  : 'text-black/50 border-transparent hover:text-black'
              }`}
            >
              {tab.label}{' '}
              <span className="text-black/35 font-normal ml-1">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* Two-column work area */}
      <div className="flex-1 min-h-0 flex">
        {/* Queue list */}
        <div className="w-[200px] shrink-0 border-r border-black/[0.06] flex flex-col min-h-0">
          <QueueList
            tab={activeTab}
            items={items}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        </div>

        {/* Detail column */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          <DetailPane tab={activeTab} item={selectedItem} />
          <ActionBar tab={activeTab} item={selectedItem} />
        </div>
      </div>
    </section>
  );
}
