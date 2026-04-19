'use client';
import { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useWorkflowStore } from '@/store/workflowStore';
import { StartNode } from '@/components/nodes/StartNode';
import { TaskNode } from '@/components/nodes/TaskNode';
import { ApprovalNode } from '@/components/nodes/ApprovalNode';
import { AutomatedNode } from '@/components/nodes/AutomatedNode';
import { EndNode } from '@/components/nodes/EndNode';
import type { WorkflowNodeData, NodeType } from '@/types/workflow';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

const DEFAULT_DATA: Record<NodeType, WorkflowNodeData> = {
  start: { type: 'start', label: 'Start', title: 'Workflow Start', metadata: [] },
  task: { type: 'task', label: 'Task', title: 'New Task', description: '', assignee: '', dueDate: '', customFields: [] },
  approval: { type: 'approval', label: 'Approval', title: 'Approval Step', approverRole: 'Manager', autoApproveThreshold: 0 },
  automated: { type: 'automated', label: 'Automated', title: 'Auto Step', actionId: '', actionParams: {} },
  end: { type: 'end', label: 'End', endMessage: 'Workflow Complete', summaryFlag: false },
};

let idCounter = 1;

export function WorkflowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, selectNode } = useWorkflowStore();

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/reactflow') as NodeType;
    if (!type || !reactFlowInstance.current || !reactFlowWrapper.current) return;

    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.current.project({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });

    const newNode: Node<WorkflowNodeData> = {
      id: `node_${idCounter++}`,
      type,
      position,
      data: { ...DEFAULT_DATA[type] },
    };

    useWorkflowStore.getState().setNodes([...useWorkflowStore.getState().nodes, newNode]);
    selectNode(newNode.id);
  }, [selectNode]);

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => { reactFlowInstance.current = instance; }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPaneClick={() => selectNode(null)}
        nodeTypes={nodeTypes}
        deleteKeyCode={['Backspace', 'Delete']}
        onNodesDelete={(deleted) => {
          const store = useWorkflowStore.getState();
          deleted.forEach((n) => {
            if (store.selectedNodeId === n.id) store.selectNode(null);
          });
        }}
        isValidConnection={(connection) => {
          // Prevent connecting INTO a Start node
          const nodes = useWorkflowStore.getState().nodes;
          const targetNode = nodes.find((n) => n.id === connection.target);
          if (targetNode?.data.type === 'start') return false;
          // Prevent connecting OUT OF an End node
          const sourceNode = nodes.find((n) => n.id === connection.source);
          if (sourceNode?.data.type === 'end') return false;
          return true;
        }}
        fitView
        defaultEdgeOptions={{ animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }}
        className="bg-slate-50"
      >
        <Background color="#e2e8f0" gap={20} size={1} />
        <Controls className="!bottom-4 !left-4 !top-auto" />
        <MiniMap
          className="!bottom-4 !right-4 !top-auto"
          nodeColor={(n) => {
            const colors: Record<string, string> = {
              start: '#10b981', task: '#6366f1', approval: '#f59e0b',
              automated: '#8b5cf6', end: '#f43f5e',
            };
            return colors[n.type || ''] || '#94a3b8';
          }}
          maskColor="rgba(248,250,252,0.7)"
        />
      </ReactFlow>
    </div>
  );
}
