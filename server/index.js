import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { discoverTools } from './discovery.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/tools', async (req, res) => {
  try {
    const tools = await discoverTools(rootDir);
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/execute', (req, res) => {
  const { tool, payload } = req.body;

  if (!tool || !tool.path) {
    return res.status(400).json({ error: 'Invalid tool configuration' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const send = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  send({ status: 'starting', message: `Executing ${tool.name}...` });

  let command = 'npm';
  let args = ['start'];

  if (tool.type === 'node') {
    command = 'npm';
    args = ['start']; // Default to start, could be customized
  } else if (tool.type === 'appsscript') {
    command = 'clasp';
    args = ['push']; // Clasp push is a common action
  } else if (tool.type === 'java') {
    command = 'mvn';
    args = ['compile'];
  } else if (tool.type === 'python') {
    command = 'python3';
    args = ['-m', 'unittest']; // Or some other default
  }

  const child = spawn(command, args, {
    cwd: tool.path,
    shell: true,
    env: { ...process.env, PAYLOAD: JSON.stringify(payload) }
  });

  child.stdout.on('data', (data) => {
    send({ type: 'stdout', content: data.toString() });
  });

  child.stderr.on('data', (data) => {
    send({ type: 'stderr', content: data.toString() });
  });

  child.on('close', (code) => {
    send({ status: 'finished', code });
    res.end();
  });

  child.on('error', (err) => {
    send({ type: 'error', content: err.message });
    res.end();
  });

  req.on('close', () => {
    child.kill();
  });
});

app.listen(port, () => {
  console.log(`Hydra Execution Layer listening at http://localhost:${port}`);
});
