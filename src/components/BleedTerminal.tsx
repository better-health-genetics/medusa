import { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Cpu, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // ⚠️ Gorgon legacy UI — active Face portal uses motion/react per AGENTS.md. Do not propagate this import pattern to bhcp-clinical-auth-gateway/.

export function BleedTerminal({ logs }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-96 flex flex-col bg-black/40 border-l border-neon/10 h-full overflow-hidden">
      <div className="p-4 border-b border-neon/10 bg-neon/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 opacity-50" />
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold opacity-70">The Bleed (Output)</h2>
        </div>
        <Activity className="w-3 h-3 text-neon animate-pulse" />
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed scroll-smooth scrollbar-none"
      >
        <div className="space-y-1">
          {logs.length === 0 && (
            <div className="flex items-center gap-2 opacity-20 italic">
              <span className="animate-pulse">{'>'}</span>
              <span>Awaiting transmission...</span>
            </div>
          )}
          {logs.map((log, i) => (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              key={i}
              className={`
                flex gap-2 break-all
                ${log.type === 'stderr' ? 'text-red-400' : ''}
                ${log.type === 'system' ? 'text-blue-400 font-bold border-l-2 border-blue-400 pl-2 my-2' : ''}
                ${log.type === 'error' ? 'text-red-600 bg-red-400/10 p-2 border border-red-400/50 my-2' : ''}
              `}
            >
              <span className="opacity-30 shrink-0">[{i.toString().padStart(3, '0')}]</span>
              <pre className="whitespace-pre-wrap flex-1">{log.content}</pre>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-neon/10 bg-black/60 flex items-center gap-3">
        <div className="flex-1 h-1 bg-neon/5 rounded-full overflow-hidden relative">
           <motion.div 
             className="absolute inset-0 bg-neon"
             animate={{ x: ['-100%', '100%'] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           />
        </div>
        <Cpu className="w-4 h-4 opacity-40" />
      </div>
    </div>
  );
}
