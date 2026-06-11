import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // ⚠️ Gorgon legacy UI — active Face portal uses motion/react per AGENTS.md. Do not propagate this import pattern to bhcp-clinical-auth-gateway/.
import { ToolSelector } from './components/ToolSelector';
import { SpellEditor } from './components/SpellEditor';
import { BleedTerminal } from './components/BleedTerminal';
import { Terminal, Shield, zap } from 'lucide-react';

export default function App() {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then(setTools);
  }, []);

  const executeTool = (payload) => {
    if (!selectedTool) return;
    
    setLogs([]);
    setIsExecuting(true);

    // Use the robust fetch + ReadableStream SSE reader only.
    // (EventSource cannot do POST; the prior attempt was emitting stray GET /api/execute 404s against the Vite origin.)
    startExecution(payload);
  };

  const startExecution = async (payload) => {
    setLogs([{ type: 'system', content: `Initializing connection to ${selectedTool.name}...` }]);
    
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: selectedTool, payload })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');

        lines.forEach(line => {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'stdout' || data.type === 'stderr') {
                setLogs(prev => [...prev, data]);
              } else if (data.status === 'finished') {
                setLogs(prev => [...prev, { type: 'system', content: `Execution finished with code ${data.code}` }]);
                setIsExecuting(false);
              } else if (data.status === 'starting') {
                setLogs(prev => [...prev, { type: 'system', content: data.message }]);
              }
            } catch (e) {
              console.error('Error parsing SSE data', e);
            }
          }
        });
      }
    } catch (error) {
      setLogs(prev => [...prev, { type: 'error', content: error.message }]);
      setIsExecuting(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-obsidian text-neon flex flex-col font-mono selection:bg-neon selection:text-obsidian">
      {/* Header */}
      <header className="h-16 border-b border-neon/20 flex items-center px-6 glass justify-between z-50">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-neon animate-pulse" />
          <h1 className="text-2xl font-bold tracking-tighter neon-text uppercase">Hydra Control Node</h1>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
            <span className="opacity-50 uppercase">Matrix Online</span>
          </div>
          <div className="px-3 py-1 border border-neon/30 glass uppercase tracking-widest">
            v1.0.0-SOVEREIGN
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 flex overflow-hidden">
        <ToolSelector 
          tools={tools} 
          selectedTool={selectedTool} 
          onSelect={setSelectedTool} 
        />
        
        <div className="flex-1 flex flex-col border-x border-neon/10">
          <SpellEditor 
            tool={selectedTool} 
            onExecute={executeTool} 
            isExecuting={isExecuting}
          />
        </div>

        <BleedTerminal logs={logs} />
      </main>

      {/* Footer */}
      <footer className="h-8 border-t border-neon/10 bg-black/40 flex items-center px-4 text-[10px] uppercase tracking-[0.2em] justify-between opacity-50">
        <span>Sovereign Daemon Active</span>
        <span>Scanning Medusa Matrix...</span>
        <span>© 2026 Hydra Control</span>
      </footer>
    </div>
  );
}
