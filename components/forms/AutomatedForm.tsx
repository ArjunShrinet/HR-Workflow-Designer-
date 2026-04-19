'use client';
import { useEffect, useState } from 'react';
import type { AutomatedNodeData } from '@/types/workflow';
import type { AutomationAction } from '@/types/workflow';
import { useWorkflowStore } from '@/store/workflowStore';
import { getAutomations } from '@/mocks/api';

interface Props { nodeId: string; data: AutomatedNodeData; }

export function AutomatedForm({ nodeId, data }: Props) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const update = (patch: Partial<AutomatedNodeData>) => updateNodeData(nodeId, patch);
  const [actions, setActions] = useState<AutomationAction[]>([]);

  useEffect(() => {
    getAutomations().then(setActions);
  }, []);

  const selectedAction = actions.find((a) => a.id === data.actionId);

  const handleActionChange = (actionId: string) => {
    update({ actionId, actionParams: {} });
  };

  const handleParamChange = (param: string, value: string) => {
    update({ actionParams: { ...data.actionParams, [param]: value } });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="form-label">Title *</label>
        <input
          className="form-input"
          value={data.title}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="e.g. Send Welcome Email"
        />
      </div>
      <div>
        <label className="form-label">Action</label>
        <select
          className="form-input"
          value={data.actionId}
          onChange={(e) => handleActionChange(e.target.value)}
        >
          <option value="">Select an action...</option>
          {actions.map((a) => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </select>
      </div>
      {selectedAction && selectedAction.params.length > 0 && (
        <div className="space-y-3">
          <label className="form-label">Action Parameters</label>
          {selectedAction.params.map((param) => (
            <div key={param}>
              <label className="text-xs text-slate-500 capitalize mb-1 block">{param}</label>
              <input
                className="form-input"
                value={data.actionParams[param] || ''}
                onChange={(e) => handleParamChange(param, e.target.value)}
                placeholder={`Enter ${param}...`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
