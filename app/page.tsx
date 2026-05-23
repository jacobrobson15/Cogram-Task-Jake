'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import AgentHandoverPane from '@/components/AgentHandoverPane';
import ReviewWorkspace from '@/components/ReviewWorkspace';
import type { TabId } from '@/types';
import { ITEMS } from '@/lib/mockData';

const MIN_LEFT = 320;
const MIN_RIGHT = 440;
const DEFAULT_LEFT = 380;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>('review');
  const [selectedId, setSelectedId] = useState<string | null>(ITEMS.review[0]?.id ?? null);
  const [leftWidth, setLeftWidth] = useState(DEFAULT_LEFT);

  const splitRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const clampWidth = useCallback((w: number): number => {
    if (!splitRef.current) return w;
    const totalW = splitRef.current.getBoundingClientRect().width;
    const splitterW = 16; // w-4
    const max = totalW - MIN_RIGHT - splitterW;
    return Math.max(MIN_LEFT, Math.min(max, w));
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingRef.current || !splitRef.current) return;
      const rect = splitRef.current.getBoundingClientRect();
      const paddingLeft = 16; // p-4 = 1rem = 16px
      const x = e.clientX - rect.left - paddingLeft;
      setLeftWidth(clampWidth(x));
    },
    [clampWidth]
  );

  const onMouseUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const onSplitterMouseDown = useCallback(
    (e: React.MouseEvent) => {
      draggingRef.current = true;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    },
    [onMouseMove, onMouseUp]
  );

  const onSplitterKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 48 : 16;
      if (e.key === 'ArrowRight') {
        setLeftWidth((w) => clampWidth(w + step));
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft') {
        setLeftWidth((w) => clampWidth(w - step));
        e.preventDefault();
      }
    },
    [clampWidth]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    if (tab !== 'handled') {
      const items = ITEMS[tab] ?? [];
      setSelectedId(items[0]?.id ?? null);
    } else {
      setSelectedId(null);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#F5F5F5]">
      <Header />

      {/* Two-pane split body */}
      <div ref={splitRef} className="flex-1 min-h-0 flex p-4 gap-0">

        {/* Left: Agent handover */}
        <div style={{ flex: `0 0 ${leftWidth}px`, minWidth: 0 }}>
          <AgentHandoverPane />
        </div>

        {/* Splitter */}
        <div
          className="shrink-0 w-4 flex items-center justify-center cursor-col-resize group"
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panes"
          tabIndex={0}
          onMouseDown={onSplitterMouseDown}
          onKeyDown={onSplitterKeyDown}
        >
          <div className="w-px h-10 bg-black/[0.12] rounded transition-colors group-hover:bg-blue-600/50" />
        </div>

        {/* Right: Review workspace */}
        <div className="flex-1 min-w-0">
          <ReviewWorkspace
            activeTab={activeTab}
            selectedId={selectedId}
            onTabChange={handleTabChange}
            onSelect={setSelectedId}
          />
        </div>
      </div>
    </div>
  );
}
