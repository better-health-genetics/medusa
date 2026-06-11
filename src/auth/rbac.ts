// @ts-nocheck — Zod is an optional dep for future RBAC hardening in the Gorgon ingress.
// This file is not imported by the React "Hydra Control Node" explorer (App + components).
// If you need full typing: `npm i zod` (human only — BEEBA respects the .gemini/config.yaml boundary).
import { z } from 'zod';

// Babe's Authorization Tiers
export const RbacSchema = z.enum([
    'BHG_ADMIN',      // Full Workspace control
    'PARTNER_ADMIN',  // Manager Interface (Add/Remove users via SA)
    'BASIC_USER'      // Pure Sheets interaction (Add patient, send telehealth)
]);
