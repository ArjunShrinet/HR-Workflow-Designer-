'use client';
import type { TaskNodeData } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';

interface Props { nodeId: string; data: TaskNodeData; }

export function TaskForm({ nodeId, data }: Props) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const update = (patch: Partial<TaskNodeData>) => updateNodeData(nodeId, patch);

  const addField = () => update({ customFields: [...data.customFields, { key: '', value: '' }] });
  const updateField = (i: number, field: 'key' | 'value', val: string) => {
    const customFields = [...data.customFields];
    customFields[i] = { ...customFields[i], [field]: val };
    update({ customFields });
  };
  const removeField = (i: number) => update({ customFields: data.customFields.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div>
        <label className="form-label">Title *</label>
        <input className="form-input" value={data.title} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Collect Documents" />
      </div>
      <div>
        <label className="form-label">Description</label>
        <textarea className="form-input resize-none h-20" value={data.description} onChange={(e) => update({ description: e.target.value })} placeholder="Describe this task..." />
      </div>
      <div>
        <label className="form-label">Assignee</label>
        <input className="form-input" value={data.assignee} onChange={(e) => update({ assignee: e.target.value })} placeholder="e.g. John Doe or HR Team" />
      </div>
      <div>
        <label className="form-label">Due Date</label>
        <input className="form-input" type="date" value={data.dueDate} onChange={(e) => update({ dueDate: e.target.value })} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="form-label mb-0">Custom Fields</label>
          <button onClick={addField} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">+ Add</button>
        </div>
        {data.customFields.map((f, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className="form-input flex-1" placeholder="Key" value={f.key} onChange={(e) => updateField(i, 'key', e.target.value)} />
            <input className="form-input flex-1" placeholder="Value" value={f.value} onChange={(e) => updateField(i, 'value', e.target.value)} />
            <button onClick={() => removeField(i)} className="text-rose-400 hover:text-rose-600 px-1">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
