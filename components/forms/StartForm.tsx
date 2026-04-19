'use client';
import type { StartNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

interface Props { nodeId: string; data: StartNodeData; }

export function StartForm({ nodeId, data }: Props) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  const update = (patch: Partial<StartNodeData>) => updateNodeData(nodeId, patch);

  const addMeta = () => update({ metadata: [...data.metadata, { key: '', value: '' }] });
  const updateMeta = (i: number, field: 'key' | 'value', val: string) => {
    const metadata = [...data.metadata];
    metadata[i] = { ...metadata[i], [field]: val };
    update({ metadata });
  };
  const removeMeta = (i: number) => update({ metadata: data.metadata.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div>
        <label className="form-label">Start Title *</label>
        <input
          className="form-input"
          value={data.title}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="e.g. Employee Onboarding Start"
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="form-label mb-0">Metadata</label>
          <button onClick={addMeta} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">+ Add</button>
        </div>
        {data.metadata.map((m, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className="form-input flex-1" placeholder="Key" value={m.key} onChange={(e) => updateMeta(i, 'key', e.target.value)} />
            <input className="form-input flex-1" placeholder="Value" value={m.value} onChange={(e) => updateMeta(i, 'value', e.target.value)} />
            <button onClick={() => removeMeta(i)} className="text-rose-400 hover:text-rose-600 text-sm px-1">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
