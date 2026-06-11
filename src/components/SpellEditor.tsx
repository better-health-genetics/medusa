import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, Code2, Database } from 'lucide-react';
import type { Tool } from '../types';

export function SpellEditor({ 
  tool, 
  onExecute, 
  isExecuting 
}: { 
  tool: Tool | null; 
  onExecute: (payload: unknown) => void; 
  isExecuting: boolean;
}) {
  const [payload, setPayload] = useState('{\n  "action": "execute",\n  "params": {}\n}');

  useEffect(() => {
    if (tool) {
      setPayload(JSON.stringify({
        action: "command",
        timestamp: new Date().toISOString(),
        tool: tool.name,
        params: {}
      }, null, 2));
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_#39FF14_0%,_transparent_70%)]" />
        <div className="text-center space-y-4 relative z-10">
          <Database className="w-16 h-16 mx-auto opacity-20 animate-pulse" />
          <p className="text-sm uppercase tracking-[0.4em] opacity-30">Select a Head to Begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-black/20">
      <div className="p-4 border-b border-neon/10 bg-neon/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 opacity-50" />
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold opacity-70">The Spell (Configuration)</h2>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[10px] opacity-40 font-mono">{tool.type?.toUpperCase()} RUNTIME</span>
        </div>
      </div>

      <div className="flex-1 p-6 relative group">
        <div className="absolute top-4 right-4 z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isExecuting}
            onClick={() => onExecute(JSON.parse(payload))}
            className="flex items-center gap-2 bg-neon text-obsidian px-6 py-2 font-black uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExecuting ? (
              <>
                <Zap className="w-4 h-4 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Cast Spell
              </>
            )}
          </motion.button>
        </div>

        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          spellCheck={false}
          className="w-full h-full bg-black/40 border border-neon/20 p-6 font-mono text-sm focus:outline-none focus:border-neon/50 transition-colors resize-none glass text-neon/90"
        />
        
        <div className="absolute bottom-10 left-10 pointer-events-none opacity-5">
            <Zap className="w-64 h-64" />
        </div>
      </div>

      <div className="p-4 border-t border-neon/10 bg-black/40 flex items-center gap-4 text-[10px] uppercase tracking-widest opacity-50">
          <span>Payload JSON</span>
          <div className="h-px flex-1 bg-neon/20" />
          <span>UTF-8 Ready</span>
      </div>
    </div>
  );
}
