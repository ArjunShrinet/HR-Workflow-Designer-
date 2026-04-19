'use client';
import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import type { AutomatedNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

export const AutomatedNode = memo(({ id, data, selected }: NodeProps<AutomatedNodeData>) => {
  const selectNode = useWorkflowStore((s) => s.selectNode);

  return (
    <div
      onClick={() => selectNode(id)}
      className="relative cursor-pointer rounded-xl px-4 py-3 min-w-[180px] transition-all duration-200 border-2"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: selected ? '#8b5cf6' : 'var(--border)',
        boxShadow: selected ? '0 0 0 3px rgba(139,92,246,0.15)' : 'var(--shadow)',
        transform: selected ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-violet-500 !w-3 !h-3 !border-2 !border-white" />
      <div className="flex items-start gap-2">
        <span className="text-lg mt-0.5">⚡</span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#8b5cf6' }}>Automated</p>
          <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{data.title || 'Auto Step'}</p>
          {data.actionId && (
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>🔧 {data.actionId}</p>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-violet-500 !w-3 !h-3 !border-2 !border-white" />
    </div>
  );
});
AutomatedNode.displayName = 'AutomatedNode';
