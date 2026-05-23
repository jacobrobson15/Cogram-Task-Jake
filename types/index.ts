export type TabId = 'review' | 'sensitive' | 'lowconf' | 'handled';

export type ItemKind = 'sensitive' | 'drafted' | 'held';

export interface TrailStep {
  t: string;
  e: string;
  pending?: boolean;
}

export interface EmailItem {
  id: string;
  subj: string;
  from: string;
  proj: string;
  risk: string;
  action: string;
  confidence: number;
  age: string;
  body: string;
  why: string;
  did: string;
  next: string;
  trail: TrailStep[];
}

export interface ItemMeta {
  kind: ItemKind;
  noReply: string;
}

export interface HandledGroup {
  label: string;
  count: number;
  note: string;
}

export interface ActionConfig {
  primary: string;
  secondary: string[];
}
