'use client';
import { useWorkflowStore } from '@/store/workflowStore';
import { useThemeStore } from '@/store/themeStore';
import { useSimulate } from '@/hooks/useSimulate';
import { useRef } from 'react';

export function Toolbar() {
  const { nodes, edges, exportWorkflow, importWorkflow, isPanelOpen, setIsPanelOpen, isSimulating } = useWorkflowStore();
  const { isDark, toggle } = useThemeStore();
  const { runSimulation } = useSimulate();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const json = exportWorkflow();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => importWorkflow(ev.target?.result as string);
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div
      className="h-12 flex items-center justify-between px-4 z-10 border-b"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <h1 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            HR Workflow Designer
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--border-strong)' }} />
          <span>{nodes.length} nodes</span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--border-strong)' }} />
          <span>{edges.length} connections</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />

        <button onClick={() => fileRef.current?.click()} className="toolbar-btn">
          📥 Import
        </button>

        <button onClick={handleExport} className="toolbar-btn">
          📤 Export
        </button>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggle}
          className="toolbar-btn"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>

        <button
          onClick={() => { setIsPanelOpen(!isPanelOpen); if (!isPanelOpen) runSimulation(); }}
          disabled={isSimulating}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold
            bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors
            shadow-sm shadow-indigo-200"
        >
          {isSimulating ? '⏳ Running...' : '▶ Run Workflow'}
        </button>
      </div>
    </div>
  );
}
