import { z } from 'zod';

// Babe's Authorization Tiers
export const RbacSchema = z.enum([
    'BHG_ADMIN',      // Full Workspace control
    'PARTNER_ADMIN',  // Manager Interface (Add/Remove users via SA)
    'BASIC_USER'      // Pure Sheets interaction (Add patient, send telehealth)
]);
