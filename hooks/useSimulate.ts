import { useWorkflowStore } from '@/store/workflowStore';
import { simulateWorkflow } from '@/mocks/api';

export function useSimulate() {
  const { nodes, edges, setSimulationResult, setIsSimulating, setIsPanelOpen } =
    useWorkflowStore();

  const runSimulation = async () => {
    setIsSimulating(true);
    setIsPanelOpen(true);
    setSimulationResult(null);
    try {
      const result = await simulateWorkflow(nodes, edges);
      setSimulationResult(result);
    } finally {
      setIsSimulating(false);
    }
  };

  return { runSimulation };
}
