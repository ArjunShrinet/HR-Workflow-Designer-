import type { AutomationAction, SimulationResult, SimulationStep } from '@/types/workflow';
import type { Node, Edge } from 'reactflow';
import type { WorkflowNodeData, NodeType } from '@/types/workflow';

export const mockAutomations: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'send_slack', label: 'Send Slack Message', params: ['channel', 'message'] },
  { id: 'create_ticket', label: 'Create Ticket', params: ['project', 'title'] },
  { id: 'update_db', label: 'Update Database', params: ['table', 'field', 'value'] },
];

export async function getAutomations(): Promise<AutomationAction[]> {
  await new Promise((r) => setTimeout(r, 300));
  return mockAutomations;
}

export async function simulateWorkflow(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): Promise<SimulationResult> {
  await new Promise((r) => setTimeout(r, 800));

  const errors: string[] = [];
  const steps: SimulationStep[] = [];

  const startNodes = nodes.filter((n) => n.data.type === 'start');
  const endNodes = nodes.filter((n) => n.data.type === 'end');

  if (startNodes.length === 0) errors.push('Workflow must have a Start node.');
  if (endNodes.length === 0) errors.push('Workflow must have an End node.');
  if (nodes.length < 2) errors.push('Workflow must have at least 2 nodes.');

  const connectedNodeIds = new Set<string>();
  edges.forEach((e) => {
    connectedNodeIds.add(e.source);
    connectedNodeIds.add(e.target);
  });

  nodes.forEach((n) => {
    if (!connectedNodeIds.has(n.id) && nodes.length > 1) {
      errors.push(`Node "${n.data.label}" is not connected.`);
    }
  });

  if (errors.length > 0) {
    return { success: false, steps: [], errors };
  }

  // BFS traversal from start node
  const startNode = startNodes[0];
  const visited = new Set<string>();
  const queue = [startNode.id];
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const node = nodeMap.get(currentId);
    if (!node) continue;

    const typeMessages: Record<NodeType, string> = {
      start: 'Workflow initiated successfully.',
      task: `Task assigned to ${(node.data as { assignee?: string }).assignee || 'Unassigned'}.`,
      approval: `Sent for approval to ${(node.data as { approverRole?: string }).approverRole || 'Approver'}.`,
      automated: `Automation triggered: ${(node.data as { actionId?: string }).actionId || 'action'}.`,
      end: 'Workflow completed successfully.',
    };

    steps.push({
      nodeId: node.id,
      nodeType: node.data.type,
      label: node.data.label,
      status: 'success',
      message: typeMessages[node.data.type],
    });

    const nextEdges = edges.filter((e) => e.source === currentId);
    nextEdges.forEach((e) => queue.push(e.target));
  }

  return { success: true, steps, errors: [] };
}
