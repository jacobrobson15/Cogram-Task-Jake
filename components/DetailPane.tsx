'use client';

import type { EmailItem, TabId } from '@/types';
import { ITEM_META, HANDLED_GROUPS } from '@/lib/mockData';

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

interface DetailPaneProps {
  tab: TabId;
  item: EmailItem | null;
}

export default function DetailPane({ tab, item }: DetailPaneProps) {
  if (tab === 'handled') {
    return (
      <div
        className="flex-1 min-h-0 overflow-y-auto"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.2) transparent' }}
      >
        <div className="px-8 py-10 max-w-[640px] mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-2">
            Handled safely · last 4 days
          </div>
          <h2 className="text-[22px] font-semibold text-black mb-4 leading-tight">
            52 emails filed or replied to without your input.
          </h2>
          <p className="text-[14px] text-black/65 leading-relaxed mb-8">
            These are routine, in-policy, and well above my confidence threshold. Each one has an audit entry you can
            open from the{' '}
            <span className="text-blue-600 cursor-pointer hover:underline">Audit</span> tab. Nothing here triggered a
            safety, cost, claims, or owner-escalation rule.
          </p>
          <div className="border border-black/[0.1] rounded divide-y divide-black/[0.06]">
            {HANDLED_GROUPS.map((g) => (
              <div key={g.label} className="flex items-center justify-between px-4 py-3">
                <div className="min-w-0">
                  <div className="text-[14px] text-black/80">{g.label}</div>
                  <div className="text-[12px] text-black/45">{g.note}</div>
                </div>
                <span className="font-mono text-[16px] tabular-nums text-black/70 ml-4">{g.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <span className="text-[14px] text-black/40">Nothing selected.</span>
      </div>
    );
  }

  const meta = ITEM_META[item.id];
  const noReply = meta?.noReply ?? 'Outside the auto-reply policy.';

  return (
    <div
      className="flex-1 min-h-0 overflow-y-auto"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.2) transparent' }}
    >
      <div className="px-6 pt-7 pb-6 max-w-[720px] mx-auto">

        {/* Meta row */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`font-mono text-[10px] uppercase tracking-widest ${riskColor(item.risk)}`}>
            {item.risk}
          </span>
          <span className="font-mono text-[10px] text-black/30">·</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">{item.proj}</span>
          <span className="font-mono text-[10px] text-black/30">·</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">{item.age} ago</span>
        </div>

        {/* Subject */}
        <h2 className="text-[20px] font-semibold text-black leading-snug mb-1.5">{item.subj}</h2>
        <div className="text-[13px] text-black/55 mb-5">{item.from}</div>

        {/* Agent decision strip */}
        <div className="border border-black/[0.1] rounded mb-6">
          <div className="grid grid-cols-3 divide-x divide-black/[0.06]">
            <div className="px-4 py-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-1">Classification</div>
              <div className="text-[13px] text-black/80">{item.risk}</div>
            </div>
            <div className="px-4 py-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-1">Confidence</div>
              <div className="text-[13px] text-black/80 font-mono tabular-nums">{item.confidence}%</div>
            </div>
            <div className="px-4 py-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-1">Action taken</div>
              <div className={`text-[13px] ${actionColor(item.action)}`}>{item.action}</div>
            </div>
          </div>
        </div>

        {/* Why I flagged this */}
        <div className="mb-5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-1.5">Why I flagged this</div>
          <p className="text-[14px] text-black/80 leading-relaxed">{item.why}</p>
        </div>

        {/* What I did */}
        <div className="mb-5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-1.5">What I did</div>
          <p className="text-[14px] text-black/80 leading-relaxed">{item.did}</p>
        </div>

        {/* Why I did not auto-reply */}
        <div className="mb-5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-1.5">
            Why I did not auto-reply
          </div>
          <p className="text-[14px] text-black/80 leading-relaxed">{noReply}</p>
        </div>

        {/* Recommended next step */}
        <div className="mb-7 border-l-2 border-blue-600 pl-4 py-1">
          <div className="font-mono text-[10px] uppercase tracking-widest text-blue-600 mb-1.5">
            Recommended next step
          </div>
          <p className="text-[14px] text-black leading-relaxed">{item.next}</p>
        </div>

        {/* Original email */}
        <div className="mb-7">
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-2">Original email</div>
          <div className="border-l-2 border-black/[0.1] pl-4 py-1 text-[13px] text-black/65 leading-relaxed whitespace-pre-line">
            {item.body}
          </div>
        </div>

        {/* Decision trail */}
        <div className="border-t border-black/[0.06] pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-black/40">Decision trail</div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/45 hover:text-blue-600 cursor-pointer transition-colors">
              Open full audit →
            </span>
          </div>
          <ol className="relative pl-4">
            <span className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-black/[0.08]" />
            {item.trail.map((step, idx) => (
              <li key={idx} className="relative pb-3 last:pb-0">
                <span
                  className={`absolute -left-4 top-1.5 w-2 h-2 rounded-full ${
                    step.pending ? 'border border-blue-600 bg-white' : 'bg-black/30'
                  }`}
                />
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`text-[13px] ${step.pending ? 'text-blue-600' : 'text-black/70'}`}>
                    {step.e}
                  </span>
                  <span className="font-mono text-[10px] text-black/40 tabular-nums shrink-0">{step.t}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
