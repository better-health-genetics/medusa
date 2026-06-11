import fs from 'fs';
import path from 'path';

const IGNORE_DIRS = ['node_modules', '.git', '.gemini', 'server', 'dist', 'third_party'];

export async function discoverTools(baseDir) {
  const tools = [];
  const seenPaths = new Set();

  async function walk(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (IGNORE_DIRS.includes(file)) continue;

        // Check for manifests in this directory
        const manifests = {
          packageJson: path.join(fullPath, 'package.json'),
          appsscriptJson: path.join(fullPath, 'appsscript.json'),
          pomXml: path.join(fullPath, 'pom.xml'),
          requirementsTxt: path.join(fullPath, 'requirements.txt'),
        };

        // Dedupe by absolute path to prevent duplicate React keys downstream
        if (!seenPaths.has(fullPath)) {
          let pushed = false;
          if (fs.existsSync(manifests.packageJson) && fullPath !== baseDir) {
            const pkg = JSON.parse(fs.readFileSync(manifests.packageJson, 'utf-8'));
            tools.push({
              name: pkg.name || file,
              path: fullPath,
              type: 'node',
              description: pkg.description || '',
            });
            pushed = true;
          }

          if (fs.existsSync(manifests.appsscriptJson)) {
            tools.push({
              name: file,
              path: fullPath,
              type: 'appsscript',
              description: 'Google Apps Script project',
            });
            pushed = true;
          }

          if (fs.existsSync(manifests.pomXml)) {
            tools.push({
              name: file,
              path: fullPath,
              type: 'java',
              description: 'Maven Java project',
            });
            pushed = true;
          }

          if (fs.existsSync(manifests.requirementsTxt)) {
            tools.push({
              name: file,
              path: fullPath,
              type: 'python',
              description: 'Python project',
            });
            pushed = true;
          }

          if (pushed) {
            seenPaths.add(fullPath);
          }
        }

        // Recurse for nested structures (apps-script subprojects etc.)
        await walk(fullPath);
      }
    }
  }

  await walk(baseDir);
  return tools;
}
