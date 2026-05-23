'use client';

import { useState } from 'react';
import type { EmailItem, TabId } from '@/types';
import { ITEM_META, ACTIONS_BY_KIND } from '@/lib/mockData';

interface ActionBarProps {
  tab: TabId;
  item: EmailItem | null;
}

export default function ActionBar({ tab, item }: ActionBarProps) {
  const [reverted, setReverted] = useState(false);

  // Reset reverted state when item changes
  const itemKey = item?.id ?? 'none';

  if (tab === 'handled' || !item) return null;

  const kind = ITEM_META[item.id]?.kind ?? 'drafted';
  const actions = ACTIONS_BY_KIND[kind];

  return (
    <div className="shrink-0 border-t border-black/[0.06] bg-white">
      <div className="px-6 py-3 flex flex-wrap items-center gap-2">
        <button className="whitespace-nowrap border border-blue-600 text-blue-600 bg-white px-4 py-2 rounded text-[12px] font-mono tracking-wide font-medium hover:bg-blue-50 transition-colors duration-150">
          {actions.primary}
        </button>
        {actions.secondary.map((label) => (
          <button
            key={label}
            className="whitespace-nowrap border border-black/10 rounded px-3.5 py-2 text-[12px] text-black/70 hover:bg-black/[0.04] font-mono tracking-wide transition-colors duration-150"
          >
            {label}
          </button>
        ))}

        <div className="flex-1" />

        {reverted ? (
          <div
            key={`reverted-${itemKey}`}
            className="border border-red-600/30 bg-red-50/40 rounded px-3.5 py-2 text-[12px] text-red-600 font-mono tracking-wide flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m5 12 5 5 9-11" />
            </svg>
            Reverted · audit trail preserved
          </div>
        ) : (
          <button
            key={`wrong-${itemKey}`}
            onClick={() => setReverted(true)}
            className="whitespace-nowrap border border-black/10 rounded px-3.5 py-2 text-[12px] text-black/55 hover:text-red-600 hover:border-red-600/40 font-mono tracking-wide transition-colors duration-150 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M3 7v6a4 4 0 0 0 4 4h11" />
              <path d="m14 13 4 4-4 4" />
            </svg>
            Mark wrong call
          </button>
        )}
      </div>
    </div>
  );
}
