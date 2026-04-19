'use client';
import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import type { TaskNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

export const TaskNode = memo(({ id, data, selected }: NodeProps<TaskNodeData>) => {
  const selectNode = useWorkflowStore((s) => s.selectNode);

  return (
    <div
      onClick={() => selectNode(id)}
      className="relative cursor-pointer rounded-xl px-4 py-3 min-w-[180px] transition-all duration-200 border-2"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: selected ? '#6366f1' : 'var(--border)',
        boxShadow: selected ? '0 0 0 3px rgba(99,102,241,0.15)' : 'var(--shadow)',
        transform: selected ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-indigo-500 !w-3 !h-3 !border-2 !border-white" />
      <div className="flex items-start gap-2">
        <span className="text-lg mt-0.5">📋</span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#6366f1' }}>Task</p>
          <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{data.title || 'Task Node'}</p>
          {data.assignee && (
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>👤 {data.assignee}</p>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-indigo-500 !w-3 !h-3 !border-2 !border-white" />
    </div>
  );
});
TaskNode.displayName = 'TaskNode';
