import { motion } from 'framer-motion'; // ⚠️ Gorgon legacy UI — active Face portal uses motion/react per AGENTS.md. Do not propagate this import pattern to bhcp-clinical-auth-gateway/.
import { Package, FileCode, Coffee, Terminal as TerminalIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Tool } from '../types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TYPE_ICONS: Record<Tool['type'], React.ReactNode> = {
  node: <Package className="w-4 h-4" />,
  appsscript: <FileCode className="w-4 h-4" />,
  java: <Coffee className="w-4 h-4" />,
  python: <TerminalIcon className="w-4 h-4" />,
};

export function ToolSelector({ 
  tools, 
  selectedTool, 
  onSelect 
}: { 
  tools: Tool[]; 
  selectedTool: Tool | null; 
  onSelect: (tool: Tool) => void;
}) {
  return (
    <div className="w-80 flex flex-col bg-black/20 border-r border-neon/10 h-full">
      <div className="p-4 border-b border-neon/10 bg-neon/5">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold opacity-70">The Heads (Tool Index)</h2>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
        {tools.map((tool: Tool, index: number) => (
          <motion.button
            key={`${tool.path}:${tool.type || 'tool'}:${index}`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(tool)}
            className={cn(
              "w-full text-left p-3 flex items-start gap-3 transition-all border border-transparent group",
              selectedTool?.path === tool.path 
                ? "bg-neon/10 border-neon/30 neon-border" 
                : "hover:bg-white/5"
            )}
          >
            <div className={cn(
              "p-2 bg-black/40 border border-neon/20 group-hover:border-neon/50 transition-colors",
              selectedTool?.path === tool.path && "border-neon shadow-[0_0_10px_rgba(57,255,20,0.2)]"
            )}>
              {TYPE_ICONS[tool.type] || <TerminalIcon className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className={cn(
                "text-sm font-bold truncate uppercase tracking-tight",
                selectedTool?.path === tool.path ? "text-neon" : "text-white/70"
              )}>
                {tool.name}
              </div>
              <div className="text-[10px] opacity-40 truncate font-mono">
                {tool.path.split('/').slice(-3).join('/')}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
