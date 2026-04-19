'use client';
import type { ApprovalNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

interface Props { nodeId: string; data: ApprovalNodeData; }

export function ApprovalForm({ nodeId, data }: Props) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const update = (patch: Partial<ApprovalNodeData>) => updateNodeData(nodeId, patch);

  return (
    <div className="space-y-4">
      <div>
        <label className="form-label">Title *</label>
        <input className="form-input" value={data.title} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Manager Approval" />
      </div>
      <div>
        <label className="form-label">Approver Role</label>
        <select className="form-input" value={data.approverRole} onChange={(e) => update({ approverRole: e.target.value })}>
          <option value="">Select role...</option>
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
          <option value="CEO">CEO</option>
        </select>
      </div>
      <div>
        <label className="form-label">Auto-Approve Threshold (%)</label>
        <input
          className="form-input"
          type="number"
          min={0}
          max={100}
          value={data.autoApproveThreshold}
          onChange={(e) => update({ autoApproveThreshold: Number(e.target.value) })}
          placeholder="e.g. 80"
        />
        <p className="text-xs text-slate-400 mt-1">Auto-approve if score exceeds this value</p>
      </div>
    </div>
  );
}
