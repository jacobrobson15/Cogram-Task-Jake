'use client';

export default function Header() {
  return (
    <header className="shrink-0 h-12 flex items-center justify-between px-4 border-b border-black/[0.08] bg-white">
      <div className="flex items-center gap-2">
        {/* Cogram mark */}
        <div className="w-6 h-6 rounded-sm border border-black/15 flex items-center justify-center">
          <span className="font-mono text-[11px] font-semibold tracking-tight">C</span>
        </div>
        <span className="font-mono text-[13px] tracking-wide font-medium">cogram</span>

        <span className="mx-3 h-4 w-px bg-black/10" />

        <nav className="flex items-center gap-1">
          <button className="h-7 px-2.5 rounded font-mono text-[11px] tracking-wide text-blue-600 border border-blue-600/20 bg-blue-50/40">
            Handover
          </button>
          <button className="h-7 px-2.5 rounded font-mono text-[11px] tracking-wide text-black/55 hover:bg-black/[0.04] hover:text-black transition-colors">
            Projects
          </button>
          <button className="h-7 px-2.5 rounded font-mono text-[11px] tracking-wide text-black/55 hover:bg-black/[0.04] hover:text-black transition-colors">
            Audit
          </button>
          <button className="h-7 px-2.5 rounded font-mono text-[11px] tracking-wide text-black/55 hover:bg-black/[0.04] hover:text-black transition-colors">
            Rules
          </button>
        </nav>

        <span className="mx-3 h-4 w-px bg-black/10" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">
          Northfield Tower · NF-2118
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="h-8 px-2 rounded text-black/50 hover:bg-black/[0.04] hover:text-black flex items-center gap-1.5 transition-colors"
          title="Search"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="font-mono text-[11px] tracking-wide hidden md:inline">Search</span>
          <span className="font-mono text-[10px] text-black/35 border border-black/10 rounded px-1 py-px hidden md:inline">
            ⌘K
          </span>
        </button>

        <button
          className="h-8 w-8 rounded text-black/50 hover:bg-black/[0.04] hover:text-black flex items-center justify-center transition-colors"
          title="Help"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7" />
            <circle cx="12" cy="17" r=".6" fill="currentColor" />
          </svg>
        </button>

        <button
          className="h-8 w-8 rounded text-black/50 hover:bg-black/[0.04] hover:text-black flex items-center justify-center transition-colors"
          title="Settings"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
          </svg>
        </button>

        <span className="mx-1 h-4 w-px bg-black/10" />

        <div className="h-7 w-7 rounded-full bg-black/[0.06] border border-black/10 flex items-center justify-center">
          <span className="font-mono text-[10px] text-black/60">JM</span>
        </div>
      </div>
    </header>
  );
}
