'use client';
import { useWorkflowStore } from '@/store/workflowStore';
import { useSimulate } from '@/hooks/useSimulate';

const TYPE_ICONS: Record<string, string> = {
  start: '🟢', task: '📋', approval: '✅', automated: '⚡', end: '🔴',
};

export function SimulationPanel() {
  const { simulationResult, isSimulating, isPanelOpen, setIsPanelOpen } = useWorkflowStore();
  const { runSimulation } = useSimulate();

  if (!isPanelOpen) return null;

  return (
    <div
      className="absolute bottom-0 left-56 right-72 border-t z-10"
      style={{
        height: '280px',
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isSimulating ? 'bg-amber-400 animate-pulse'
            : simulationResult?.success ? 'bg-emerald-400'
            : 'bg-rose-400'
          }`} />
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {isSimulating ? 'Running Simulation...' : 'Simulation Results'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600
              disabled:opacity-50 font-medium transition-colors"
          >
            {isSimulating ? '⏳ Running...' : '▶ Re-run'}
          </button>
          <button
            onClick={() => setIsPanelOpen(false)}
            className="text-sm w-6 h-6 flex items-center justify-center rounded transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >✕</button>
        </div>
      </div>

      {/* Body */}
      <div className="overflow-y-auto p-4" style={{ height: 'calc(280px - 44px)' }}>
        {isSimulating && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Executing workflow steps...
            </p>
          </div>
        )}

        {!isSimulating && simulationResult && (
          <>
            {/* Errors */}
            {simulationResult.errors.length > 0 && (
              <div className="mb-4 p-3 rounded-xl border"
                style={{ backgroundColor: 'rgba(244,63,94,0.06)', borderColor: 'rgba(244,63,94,0.2)' }}>
                <p className="text-sm font-bold mb-2" style={{ color: '#f43f5e' }}>❌ Validation Errors</p>
                {simulationResult.errors.map((err, i) => (
                  <p key={i} className="text-xs" style={{ color: '#f43f5e' }}>• {err}</p>
                ))}
              </div>
            )}

            {/* Steps */}
            {simulationResult.steps.length > 0 && (
              <div className="space-y-2">
                {simulationResult.steps.map((step, i) => (
                  <div
                    key={step.nodeId}
                    className="flex items-start gap-3 p-2.5 rounded-xl border text-xs"
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <div className="flex items-center gap-1.5 min-w-[80px]">
                      <span className="font-bold" style={{ color: 'var(--text-muted)' }}>#{i + 1}</span>
                      <span>{TYPE_ICONS[step.nodeType]}</span>
                      <span className="font-semibold capitalize" style={{ color: 'var(--text-secondary)' }}>
                        {step.nodeType}
                      </span>
                    </div>
                    <div className="flex-1" style={{ color: 'var(--text-primary)' }}>
                      <span className="font-semibold">{step.label}</span>
                      <span style={{ color: 'var(--text-muted)' }}> — {step.message}</span>
                    </div>
                    <span>{step.status === 'success' ? '✅' : step.status === 'warning' ? '⚠️' : '❌'}</span>
                  </div>
                ))}
                {simulationResult.success && (
                  <div className="mt-3 p-3 rounded-xl border text-center"
                    style={{ backgroundColor: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}>
                    <p className="text-sm font-bold" style={{ color: '#10b981' }}>
                      🎉 Workflow completed successfully!
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
