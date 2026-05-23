# Jake Cogram Design Inbox Agent

A polished front-end foundation for Cogram's Agentic Inbox — a review tool for AEC project managers returning after time away. The agent has processed 80 emails and this UI shows what was handled, what needs human attention, and why.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Stack

- **Next.js 15** — App Router
- **TypeScript**
- **Tailwind CSS v4** — utility-first with `@import "tailwindcss"`
- **Inter** + **IBM Plex Mono** — loaded via `next/font/google`
- **Local mock data only** — no API, no LLM integration

---

## Project structure

```
app/
  layout.tsx              Root layout — fonts, metadata, html/body wrappers
  page.tsx                Main page — split-pane layout, splitter drag logic, tab/selection state
  globals.css             Tailwind import + CSS theme variables (font stacks)

components/
  Header.tsx              Top nav bar — Cogram mark, nav tabs, search, user avatar
  AgentHandoverPane.tsx   Left pane — handover summary, breakdown, safety rule, transcript, chat input
  ReviewWorkspace.tsx     Right pane wrapper — stats strip, tabs, queue list + detail column
  QueueList.tsx           Scrollable queue list — per-tab rendering (review/sensitive/lowconf/handled)
  DetailPane.tsx          Selected item detail — classification strip, reasoning, email, decision trail
  ActionBar.tsx           Sticky action bar — kind-aware CTA, Edit/Defer, Mark wrong call with revert UI

lib/
  mockData.ts             All mock email data — ITEMS, HANDLED_GROUPS, ITEM_META, ACTIONS_BY_KIND

types/
  index.ts                TypeScript types — TabId, ItemKind, EmailItem, TrailStep, ItemMeta, etc.
```

---

## What was built

### Layout
- Full-height two-pane split with a draggable splitter (keyboard accessible: Tab to focus, ←/→ to nudge, Shift for larger steps)
- Left pane constrained min 320px, right pane min 440px, default left width 380px

### Left pane — Agent handover
- Handover meta (date range, project reference)
- Welcome message from the agent
- Hierarchical breakdown: 80 processed → 52 handled safely / 28 need review (18 standard / 7 sensitive / 3 low confidence)
- Safety rule callout (blue left-bar): no auto-reply on cost, safety, claims, or owner escalation
- Transcript checklist with check/dot icons for handled vs deferred
- Quiet contextual chat input docked at the bottom ("Ask Cogram about this handover…")

### Right pane — Review workspace
- Stats strip: 18 needs review · 7 sensitive deferred · 3 low confidence · 52 handled safely
- Four tabs: Needs review · Sensitive deferred · Low confidence · Handled safely
- Narrow queue list (200px) with per-item: risk type, subject, sender, action, confidence, age
- Blue left-border + tinted background for the active/selected row
- Detail column showing (in this order, reasoning above the email):
  - Meta row (risk · project ref · age)
  - Subject heading + sender
  - 3-col classification strip: Classification / Confidence / Action taken
  - Agent reasoning: Why I flagged this · What I did · Why I did not auto-reply
  - Recommended next step (blue left-bar, prominent, above the fold)
  - Original email body (indented, below reasoning)
  - Decision trail timeline
- Sticky action bar at the bottom — kind-aware:
  - `sensitive`: Send holding reply · Edit · Defer · Mark wrong call
  - `drafted`: Approve draft reply · Edit · Defer · Mark wrong call
  - `held`: Reply manually · Dismiss · Defer · Mark wrong call
- "Mark wrong call" toggles inline to "Reverted · audit trail preserved"

### Mock data
- 5 items in the **Needs review** tab (cost implication, routine RFI, submittal, schedule risk, resubmittal)
- 3 items in the **Sensitive deferred** tab (claim/legal, owner escalation, safety)
- 3 items in the **Low confidence** tab (ambiguous sender, thread mismatch, no context)
- 6 handled-safely groups summing to 52

---

## Visual design

Follows the Cogram DESIGN.md system:
- `#F5F5F5` app shell · `bg-white` work surfaces
- `border-black/[0.1]` default borders · `border-black/[0.06]` subtle dividers
- `hover:bg-black/[0.04]` hover surfaces — no blue hover backgrounds
- `text-blue-600` for active/selected states only
- Inter body text · IBM Plex Mono for labels, metadata, monospaced numbers
- CTA buttons: white fill, blue border/text — no solid black or gradient fills
- No orange, no glassmorphism, no heavy shadows, no rounded bubble cards

---

## Known gaps / next steps

1. **Action buttons are UI-only** — Edit, Defer, Approve do not persist state; only "Mark wrong call" has inline feedback
2. **Chat input** — Renders but does not send; needs API wiring for agent Q&A (streaming Claude API call)
3. **Handled safely tab** — Queue list shows grouped summary, not individual emails
4. **Touch/mobile splitter** — Mouse drag works; touch events not wired in the React port
5. **Keyboard navigation in queue** — Arrow key selection through queue items not implemented
6. **Count fidelity** — Stats strip shows hardcoded counts (18/7/3/52); ITEMS arrays have fewer items (prototype subset)
7. **Splitter width persistence** — `localStorage` save/restore not yet added

### Suggested next steps for wiring
- Replace `lib/mockData.ts` with an API route or server component fetch
- Add `useReducer` or Zustand for action state (approve → defer → revert flow)
- Wire the chat footer to a streaming Claude API call with handover context injected as system prompt
- Add optimistic updates for action bar interactions
- Persist splitter width to `localStorage` on drag end
