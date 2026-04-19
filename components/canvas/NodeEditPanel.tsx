'use client';
import { useWorkflowStore } from '@/store/workflowStore';
import { StartForm } from '@/components/forms/StartForm';
import { TaskForm } from '@/components/forms/TaskForm';
import { ApprovalForm } from '@/components/forms/ApprovalForm';
import { AutomatedForm } from '@/components/forms/AutomatedForm';
import { EndForm } from '@/components/forms/EndForm';
import type { WorkflowNodeData } from '@/types/workflow';

const NODE_COLORS: Record<string, string> = {
  start:     'from-emerald-500 to-teal-500',
  task:      'from-indigo-500 to-blue-500',
  approval:  'from-amber-500 to-orange-500',
  automated: 'from-violet-500 to-purple-500',
  end:       'from-rose-500 to-pink-500',
};

const NODE_ICONS: Record<string, string> = {
  start: '🟢', task: '📋', approval: '✅', automated: '⚡', end: '🔴',
};

export function NodeEditPanel() {
  const { nodes, selectedNodeId, selectNode, deleteNode, isRightPanelOpen, setIsRightPanelOpen } = useWorkflowStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!isRightPanelOpen) {
    return (
      <div
        className="w-14 flex flex-col items-center justify-center h-full border-l gap-3 py-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      >
        <button
          onClick={() => setIsRightPanelOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Expand panel"
        >
          ◀
        </button>
      </div>
    );
  }

  if (!selectedNode) {
    return (
      <div
        className="w-72 flex flex-col h-full border-l"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Properties
          </p>
          <button
            onClick={() => setIsRightPanelOpen(false)}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Collapse panel"
          >
            ▶
          </button>
        </div>

        {/* Empty State */}
        <div
          className="flex-1 flex flex-col items-center justify-center text-center p-8"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--bg-subtle)' }}
          >
            <span className="text-2xl">👆</span>
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            No node selected
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Click any node on the canvas to edit it
          </p>
        </div>
      </div>
    );
  }

  const data = selectedNode.data as WorkflowNodeData;
  const colorClass = NODE_COLORS[data.type] || 'from-slate-500 to-slate-600';

  return (
    <div
      className="w-72 flex flex-col h-full border-l"
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${colorClass} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{NODE_ICONS[data.type]}</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                {data.type} node
              </p>
              <p className="text-sm font-semibold truncate max-w-[130px]">{data.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => selectNode(null)}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-sm transition-colors"
              title="Deselect node"
            >
              ✕
            </button>
            <button
              onClick={() => setIsRightPanelOpen(false)}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-sm transition-colors"
              title="Collapse panel"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4">
        {data.type === 'start'     && <StartForm     nodeId={selectedNode.id} data={data} />}
        {data.type === 'task'      && <TaskForm      nodeId={selectedNode.id} data={data} />}
        {data.type === 'approval'  && <ApprovalForm  nodeId={selectedNode.id} data={data} />}
        {data.type === 'automated' && <AutomatedForm nodeId={selectedNode.id} data={data} />}
        {data.type === 'end'       && <EndForm       nodeId={selectedNode.id} data={data} />}
      </div>

      {/* Delete */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={() => deleteNode(selectedNode.id)}
          className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors border"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            color: '#f43f5e',
            borderColor: 'var(--border)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(244,63,94,0.08)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-subtle)';
          }}
        >
          🗑️ Delete Node
        </button>
      </div>
    </div>
  );
}
