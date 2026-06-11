# Gemini CLI Instructions - Google Workspace Add-ons Samples (Medusa)

This project is a comprehensive repository of Google Workspace Add-ons samples, demonstrating integrations with Gmail, Google Chat, and other Workspace applications across multiple languages and platforms.

## Project Overview

- **Purpose:** Provide reference implementations and starter code for building Google Workspace Add-ons and Google Chat apps.
- **Key Technologies:**
  - **Google Apps Script:** Native scripting for Google Workspace.
  - **Node.js:** Often deployed as Google Cloud Functions using the Functions Framework.
  - **Java:** Maven-based projects for backend services.
  - **Python:** Scripting and backend integrations.
  - **Gemini / AI:** Strong focus on integrating Gemini Enterprise AI agents into Workspace.
- **Architecture:** Monorepo structure where each subdirectory under `apps-script/`, `node/`, `java/`, or `python/` represents a standalone sample or application.

## Directory Structure

- `apps-script/`: Contains Apps Script projects. Look for `appsscript.json` (manifest) and `.gs` files.
- `node/`: Node.js samples. Typically include `package.json` and `index.js`. Many are designed to run on Cloud Functions.
- `java/`: Java samples, usually Maven projects with `pom.xml`.
- `python/`: Python-based integrations and samples.
- `src/`: Contains TypeScript source code, possibly for a central helper or a specific dynamic Card UI implementation.
- `third_party/`: External libraries used by the samples.

## Building and Running

### Apps Script
- Use `clasp` (Command Line Apps Script Projects) to manage these projects.
- `clasp login`, `clasp clone <scriptId>`, `clasp push`.

### Node.js
- Navigate to the sample directory (e.g., `node/chat/avatar-app/`).
- Install dependencies: `npm install`.
- Run locally (if applicable): `npx @google-cloud/functions-framework --target=<functionName>`.

### Java
- Navigate to the sample directory (e.g., `java/chat/avatar-app/`).
- Build: `mvn compile`.
- Test: `mvn test`.

### Python
- Navigate to the sample directory.
- Install dependencies: `pip install -r requirements.txt`.

## Development Conventions

- **Style Guide:** Follow the [Google Cloud Platform Samples Style Guide](https://github.com/GoogleCloudPlatform/Template/wiki/style.html).
- **READMEs:** Every sample subdirectory should have its own `README.md` explaining its specific purpose and deployment steps.
- **Licensing:** All samples are licensed under Apache-2.0.
- **Contributions:** Requires a signed Contributor License Agreement (CLA). Ensure new code includes unit tests where appropriate.

## Strategic Guidance for Gemini CLI

- **Surgical Edits:** When modifying a sample, ensure you only touch files within that specific sample's directory unless explicitly asked otherwise.
- **Contextual Awareness:** Be aware of the manifest files (`appsscript.json`, `package.json`, `pom.xml`) as they define the permissions (scopes) and dependencies for each add-on.
- **Testing:** Always look for existing tests within the sample directory. If none exist, prioritize creating a simple reproduction script or test case for any fixes or features.
