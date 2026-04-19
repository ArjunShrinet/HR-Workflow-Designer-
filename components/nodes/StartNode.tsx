'use client';
import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import type { StartNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

export const StartNode = memo(({ id, data, selected }: NodeProps<StartNodeData>) => {
  const selectNode = useWorkflowStore((s) => s.selectNode);

  return (
    <div
      onClick={() => selectNode(id)}
      className={`relative cursor-pointer rounded-2xl px-5 py-3 min-w-[160px] transition-all duration-200
        bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg
        ${selected ? 'ring-2 ring-white ring-offset-2 ring-offset-emerald-500 scale-105' : 'hover:scale-102'}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">🟢</span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-100">Start</p>
          <p className="text-sm font-semibold text-white truncate max-w-[110px]">
            {data.title || 'Start Node'}
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-white !w-3 !h-3 !border-2 !border-emerald-500" />
    </div>
  );
});

StartNode.displayName = 'StartNode';
