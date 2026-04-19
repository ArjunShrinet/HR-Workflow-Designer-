'use client';
import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import type { ApprovalNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

export const ApprovalNode = memo(({ id, data, selected }: NodeProps<ApprovalNodeData>) => {
  const selectNode = useWorkflowStore((s) => s.selectNode);

  return (
    <div
      onClick={() => selectNode(id)}
      className={`relative cursor-pointer transition-all duration-200`}
      style={{ transform: selected ? 'scale(1.05)' : 'scale(1)' }}
    >
      {/* Diamond shape via rotation */}
      <div
        className={`w-36 h-36 flex items-center justify-center rounded-xl border-2 shadow-md
          bg-amber-50 rotate-45
          ${selected ? 'border-amber-500 shadow-amber-200' : 'border-amber-300 hover:border-amber-400'}`}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xl">✅</span>
        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Approval</p>
        <p className="text-xs font-semibold text-slate-700 text-center px-6 truncate max-w-[120px]">
          {data.title || 'Approval'}
        </p>
        {data.approverRole && (
          <p className="text-[10px] text-amber-400">{data.approverRole}</p>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="!bg-amber-500 !w-3 !h-3 !border-2 !border-white !top-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-amber-500 !w-3 !h-3 !border-2 !border-white !bottom-0" />
    </div>
  );
});

ApprovalNode.displayName = 'ApprovalNode';
