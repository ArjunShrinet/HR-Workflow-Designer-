'use client';
import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import type { EndNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

export const EndNode = memo(({ id, data, selected }: NodeProps<EndNodeData>) => {
  const selectNode = useWorkflowStore((s) => s.selectNode);

  return (
    <div
      onClick={() => selectNode(id)}
      className={`relative cursor-pointer rounded-2xl px-5 py-3 min-w-[160px] transition-all duration-200
        bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg
        ${selected ? 'ring-2 ring-white ring-offset-2 ring-offset-rose-500 scale-105' : 'hover:scale-102'}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-white !w-3 !h-3 !border-2 !border-rose-500" />
      <div className="flex items-center gap-2">
        <span className="text-xl">🔴</span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-rose-100">End</p>
          <p className="text-sm font-semibold text-white truncate max-w-[110px]">
            {data.endMessage || 'End Node'}
          </p>
        </div>
      </div>
    </div>
  );
});

EndNode.displayName = 'EndNode';
