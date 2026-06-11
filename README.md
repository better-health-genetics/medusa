# 🐍 Medusa: Google Workspace Add-ons Sample Explorer (Gorgon Node)

> **Legacy Discovery UI + Sample Index for the Gorgon Ingress.**

**⚠️ GORGON NODE — This directory is the "Gorgon" (Workspace Add-on Ingress) in the BHCP Hydra topology.**  
It contains the historical "Hydra Control Node" React explorer (the 3-column framer-motion UI you see at http://localhost:5173 when running the dev servers here) plus the multi-language sample projects that the add-on can surface.

The **active production application** is the Face portal in `../bhcp-clinical-auth-gateway/` (Corp.bhcp.health internal role-based workspace: SalesTriage, PharmacyLab kanban, ExecutiveDash).  
The Python Shadow State core lives in `../med-usa/`.

See the root `AGENTS.md`, `.github/copilot-instructions.md`, and this node's `.gemini/NEST.md` + `config.yaml` (v3.0.0-shadow-state) for BEEBA boundaries.

---

## 🏗 System Architecture (Gorgon Explorer)

This subtree provides a discovery UI for exploring and managing the sample add-ons:

- **Frontend (legacy)**: React 18 SPA powered by **Vite 5** (the "Hydra Control Node" UI).
- **Backend**: **Express.js** discovery + execution server (`server/index.js` on port 3000) providing `/api/tools` indexing and `/api/execute` SSE.
- **Styling**: Tailwind CSS 3 with Framer Motion (local to this Gorgon explorer only — the active Face portal uses `motion/react` exclusively).
- **Samples**: Standalone projects across four primary languages (the "snakes" that can be pushed via clasp or deployed as Cloud Functions/Run):
  - `apps-script/`: Native Google Apps Script projects (Manifest-driven, primary for the Gorgon add-on).
  - `node/`: High-performance Node.js Cloud Functions.
  - `python/`: Modern Python scripts and FastAPI integrations.
  - `java/`: Robust Maven-based backend services.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js**: v20+ (LTS recommended)
- **npm**: v10+
- **clasp**: `npm install -g @google/apps-script/clasp` (For Apps Script management)

### 2. Installation
```bash
git clone <repository-url>
cd medusa
npm install
```

### 3. Development Mode (Human Only)
Launch the legacy discovery UI ("Hydra Control Node") and the execution server concurrently:
```bash
npm run dev
```
- **Discovery UI (legacy Gorgon explorer)**: `http://localhost:5173`
- **Execution / Discovery Server**: `http://localhost:3000` (Express + nodemon, proxied by Vite)

**BEEBA / agent note**: The `.gemini/config.yaml` forbids the agent from executing npm/pip/Docker in this directory. Humans only for local exploration of the samples.

### 4. Production Build
Generate the optimized static assets for the explorer:
```bash
npm run build
```

---

## 📁 Directory Blueprint

| Path | Purpose | Key Artifacts |
| :--- | :--- | :--- |
| `/apps-script` | Native Workspace logic | `appsscript.json`, `.gs` |
| `/node` | Cloud-native JS samples | `package.json`, `index.js` |
| `/python` | AI & Scripting samples | `requirements.txt`, `main.py` |
| `/java` | Enterprise Java services | `pom.xml`, `src/` |
| `/server` | Medusa Discovery Backend | `index.js`, `discovery.js` |
| `/src` | Medusa Frontend Source | `App.tsx`, `components/` |

---

## 🛠 Development Workflow

### Adding a New Sample
1. Create a subdirectory in the appropriate language folder (e.g., `node/chat/my-new-app`).
2. Include a `README.md` within the sample folder explaining its specific deployment.
3. The Discovery Server will automatically index the new folder if it contains standard manifest files (`package.json`, `pom.xml`, etc.).

### Deploying Apps Script
Use `clasp` for seamless deployment:
```bash
cd apps-script/my-sample
clasp login
clasp push
```

### Deploying Node/Python/Java
Samples are typically designed for **Google Cloud Functions** or **Cloud Run**:
```bash
gcloud functions deploy <sample-name> --runtime <runtime> --trigger-http
```

---

## 🔒 Security & Best Practices

- **Zero-Secret Policy**: Never commit `.env` files or service account keys (`*.json`) to this repository. Use Secret Manager for production deployments. The active Face portal and Shadow State enforce stricter ephemeral + role-based boundaries (this Gorgon explorer must not persist patient data either).
- **OAuth Scopes**: Always use the principle of least privilege in your `appsscript.json` or GCP configurations.
- **HIPAA/Data Privacy**: For clinical or sensitive integrations (like the BHCP project), ensure PHI is never logged to standard output or persisted in local SQLite files. The active Face portal (`bhcp-clinical-auth-gateway/`) and Shadow State (`med-usa/`) enforce stricter ephemeral + role-based boundaries.

---

## 📜 License

Licensed under the **Apache 2.0 License**. See `LICENSE` for details.

---

## ⛓️ BEEBA SOVEREIGNTY — GORGON NODE LOCK

**This is not a standalone project.**  
This directory is **The Gorgon** (Workspace Add-on Ingress) in the three-headed BHCP Hydra:

- **The Face** → `../bhcp-clinical-auth-gateway/` (active internal portal: SalesTriage EDI, PharmacyLab kanban, ExecutiveDash WAC ledger — pure Vite/React 19 + `motion/react`, no router, role-based, mobile-first, clinical branding).
- **The Shadow State** → `../med-usa/` (Python FastAPI + Vitriol core — signed URLs, tenant impersonation, the real `/api/workspace/webhook` target).
- **The Gorgon** → here (medusa/) — legacy "Hydra Control Node" explorer + the multi-language "snakes" (apps-script/ is the primary for clasp-driven Workspace Add-on work).

**BEEBA (Betty Badass) rules for this node (enforced by `.gemini/config.yaml` v3.0.0-shadow-state and `.gemini/NEST.md` "Gorgon Lair" manifest):**
- Tech stack: Google Apps Script, JSON manifests (`appsscript.json`), clasp, Google Workspace Add-ons.
- **Agent prohibition**: DO NOT execute `npm`, `pip`, `docker`, `gcloud run deploy`, or any container/build commands while the working directory is inside this Gorgon node. Those belong to the Face (npm) or Shadow State (venv + uvicorn).
- Human operators may run the dev servers for local sample exploration: `npm run dev` (launches the legacy 3-column framer-motion UI at 5173 + Express SSE executor at 3000).
- All webhook / execution routing from Gorgon samples must ultimately target the live Shadow State Cloud Run service (med-usa-*.run.app).
- On any Apps Script change: validate manifest structure. On deploy: ensure the add-on points at the current Shadow State ingress.
- HIPAA: No PHI in logs, no local persistence of patient data. This explorer is for sample discovery only.

The root `AGENTS.md` (and the Face's own `AGENTS.md`) are the master manuals. 4-document synchronization (package.json / README / GEMINI / AGENTS) is mandatory on the *active Face portal* for any visual or architectural change. This Gorgon README is subordinate documentation.

*Gorgon Ingress — The snakes are listening. The matrix is secure.*  
**Kneel and worship the logic, Babe... ⛓️🔥👑**

---
*Maintained under the Hydra Protocol for the Better Health Compounding Portal.*
