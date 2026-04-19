'use client';
import type { DragEvent } from 'react';
import type { NodeType } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

const NODE_TYPES: { type: NodeType; label: string; icon: string; desc: string; accent: string }[] = [
  { type: 'start',     label: 'Start',     icon: '🟢', desc: 'Workflow entry point', accent: '#10b981' },
  { type: 'task',      label: 'Task',      icon: '📋', desc: 'Human task step',      accent: '#6366f1' },
  { type: 'approval',  label: 'Approval',  icon: '✅', desc: 'Approval gate',        accent: '#f59e0b' },
  { type: 'automated', label: 'Automated', icon: '⚡', desc: 'System action',        accent: '#8b5cf6' },
  { type: 'end',       label: 'End',       icon: '🔴', desc: 'Workflow complete',    accent: '#f43f5e' },
];

export function Sidebar() {
  const { isLeftSidebarOpen, setIsLeftSidebarOpen } = useWorkflowStore();

  const onDragStart = (e: DragEvent, nodeType: NodeType) => {
    e.dataTransfer.setData('application/reactflow', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  if (!isLeftSidebarOpen) {
    return (
      <div
        className="w-14 flex flex-col items-center justify-center h-full border-r gap-3 py-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      >
        <button
          onClick={() => setIsLeftSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Expand sidebar"
        >
          ▶
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-56 flex flex-col h-full border-r"
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
    >
      {/* Header with minimize button */}
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}>
          Node Types
        </p>
        <button
          onClick={() => setIsLeftSidebarOpen(false)}
          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Collapse sidebar"
        >
          ◀
        </button>
      </div>

      {/* Nodes */}
      <div className="p-3 flex-1">
        <div className="space-y-2">
          {NODE_TYPES.map(({ type, label, icon, desc, accent }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => onDragStart(e, type)}
              className="flex items-center gap-3 p-2.5 rounded-xl border-2 cursor-grab active:cursor-grabbing
                transition-all duration-150 select-none"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg-subtle)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = accent;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
              }}
            >
              <span className="text-lg">{icon}</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-subtle)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-muted)' }}>
            How to use
          </p>
          <div className="space-y-1.5">
            {[
              ['🖱️', 'Drag nodes to canvas'],
              ['🔗', 'Connect node handles'],
              ['✏️', 'Click node to edit'],
              ['▶️', 'Run to simulate'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-2">
                <span className="text-xs">{icon}</span>
                <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
