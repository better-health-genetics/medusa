// Gorgon legacy types (Hydra Control Node explorer).
// ⚠️ This is local to the Gorgon node only. The active Face portal (bhcp-clinical-auth-gateway/)
// uses its own types in src/types.ts and strictly follows AGENTS.md + motion/react.
// Do not propagate patterns from here to the Face.

export interface Tool {
  name: string;
  path: string;
  type: 'node' | 'appsscript' | 'java' | 'python';
  description?: string;
}

export type LogEntry =
  | { type: 'stdout' | 'stderr' | 'error'; content: string }
  | { type: 'system'; content: string };
