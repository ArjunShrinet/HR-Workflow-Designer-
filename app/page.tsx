'use client';
import { Sidebar } from '@/components/canvas/Sidebar';
import { WorkflowCanvas } from '@/components/canvas/WorkflowCanvas';
import { NodeEditPanel } from '@/components/canvas/NodeEditPanel';
import { SimulationPanel } from '@/components/sandbox/SimulationPanel';
import { Toolbar } from '@/components/canvas/Toolbar';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <WorkflowCanvas />
        <NodeEditPanel />
        <SimulationPanel />
      </div>
    </div>
  );
}
