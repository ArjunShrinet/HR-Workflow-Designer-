'use client';
import type { EndNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

interface Props { nodeId: string; data: EndNodeData; }

export function EndForm({ nodeId, data }: Props) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const update = (patch: Partial<EndNodeData>) => updateNodeData(nodeId, patch);

  return (
    <div className="space-y-4">
      <div>
        <label className="form-label">End Message</label>
        <input
          className="form-input"
          value={data.endMessage}
          onChange={(e) => update({ endMessage: e.target.value })}
          placeholder="e.g. Onboarding Complete!"
        />
      </div>
      <div
        className="flex items-center justify-between p-3 rounded-lg border"
        style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
      >
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Show Summary</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Display a summary at workflow end</p>
        </div>
        <button
          onClick={() => update({ summaryFlag: !data.summaryFlag })}
          className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0"
          style={{ backgroundColor: data.summaryFlag ? '#6366f1' : 'var(--border-strong)' }}
        >
          <span
            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
            style={{ transform: data.summaryFlag ? 'translateX(20px)' : 'translateX(0)' }}
          />
        </button>
      </div>
    </div>
  );
}
