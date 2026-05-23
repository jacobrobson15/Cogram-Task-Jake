'use client';

import { FormEvent } from 'react';

export default function AgentHandoverPane() {
  function handleChatSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    if (input) input.blur();
  }

  return (
    <section className="min-w-0 bg-white border border-black/[0.1] rounded flex flex-col h-full">
      {/* Handover body */}
      <div className="flex-1 min-h-0 overflow-y-auto px-8 py-8" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.2) transparent' }}>
        <div className="max-w-[520px] mx-auto text-[15px] leading-[1.65] text-black/80 space-y-6">

          {/* Meta */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/35">Agent handover</span>
            <span className="font-mono text-[10px] text-black/30">·</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/35">Thu → Mon, 14:02</span>
          </div>

          <p className="text-[18px] leading-[1.55] text-black">Welcome back, Jordan.</p>

          <p>
            While you were away I processed{' '}
            <strong className="text-black font-semibold">80 project emails</strong> across{' '}
            <span className="font-mono text-[13px] text-black">NF-2118</span>.
          </p>

          {/* Breakdown: hierarchical */}
          <div className="border border-black/[0.1] rounded">
            {/* Total */}
            <div className="flex items-baseline justify-between px-4 py-3 border-b border-black/[0.06]">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[28px] tabular-nums text-black leading-none">80</span>
                <span className="text-[13px] text-black/70">Processed</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">Thu → Mon</span>
            </div>
            {/* Handled */}
            <div className="flex items-baseline justify-between px-4 py-3 border-b border-black/[0.06]">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[20px] tabular-nums text-black/55">52</span>
                <span className="text-[13px] text-black/65">Handled safely</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">Filed / acked</span>
            </div>
            {/* Needs review parent */}
            <div className="flex items-baseline justify-between px-4 py-3">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[20px] tabular-nums text-blue-600">28</span>
                <span className="text-[13px] text-black">Need human review</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-600">Open</span>
            </div>
            {/* Needs review children */}
            <div className="px-4 pb-3">
              <div className="border-l border-black/[0.08] pl-4 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] text-black/65">Standard review</span>
                  <span className="font-mono text-[13px] tabular-nums text-black/70">18</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] text-black/65">Sensitive · deferred</span>
                  <span className="font-mono text-[13px] tabular-nums text-black/70">7</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] text-black/65">Low confidence</span>
                  <span className="font-mono text-[13px] tabular-nums text-black/70">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety statement */}
          <div className="border-l-2 border-blue-600 pl-4 py-1">
            <div className="font-mono text-[10px] uppercase tracking-widest text-blue-600 mb-1">Safety rule applied</div>
            <p className="text-[14px] text-black/80 leading-relaxed">
              I did not auto-reply to anything involving{' '}
              <strong className="text-black font-semibold">cost, safety, claims, or owner escalation</strong>. Those are
              queued for your review on the right.
            </p>
          </div>

          {/* Transcript */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-2 text-[13px] text-black/65">
              <CheckIcon />
              <span>Filed routine RFIs and daily field reports</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-black/65">
              <CheckIcon />
              <span>Acknowledged vendor quotes and schedule pings</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-black/65">
              <CheckIcon />
              <span>Drafted low-risk replies for your review</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-black/65">
              <DotIcon />
              <span>Deferred change orders and claims</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-black/65">
              <DotIcon />
              <span>Flagged safety, cost, and owner escalations</span>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-px bg-black/[0.06]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/35">Now</span>
            <div className="flex-1 h-px bg-black/[0.06]" />
          </div>

          <p>
            Start with{' '}
            <strong className="text-black font-semibold">VO-021 waterproofing variation</strong> on the right — it has
            a commercial exposure flag and a holding reply is drafted. Five minutes should clear the queue.
          </p>
        </div>
      </div>

      {/* Footer: quiet contextual chat input */}
      <div className="shrink-0 px-8 pb-5 pt-3 border-t border-black/[0.06]">
        <div className="max-w-[520px] mx-auto">
          <form
            onSubmit={handleChatSubmit}
            className="flex items-center gap-2 border border-black/[0.08] rounded px-3 py-1.5 bg-white focus-within:border-blue-600/40 focus-within:ring-1 focus-within:ring-blue-600/15 transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-black/30 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z" />
            </svg>
            <input
              type="text"
              placeholder="Ask Cogram about this handover…"
              className="flex-1 bg-transparent text-[13px] text-black placeholder:text-black/35 focus:outline-none py-1"
            />
            <button
              type="submit"
              className="shrink-0 h-6 w-6 rounded flex items-center justify-center bg-black/[0.06] hover:bg-black/[0.12] text-black/50 hover:text-black transition-colors"
              title="Send"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
          <div className="px-1 pt-1.5 font-mono text-[10px] uppercase tracking-widest text-black/30">
            Processed Thu 14:02 → Mon 08:11
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 12 5 5 9-11" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-black/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
