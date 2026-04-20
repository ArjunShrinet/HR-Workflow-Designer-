# HR Workflow Designer — Tredence Assignment

A visual drag-and-drop HR Workflow Designer built with **Next.js**, **TypeScript**, **React Flow**, and **Zustand**.

---

## 🚀 How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

---

## 🧱 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 (App Router) | React framework |
| TypeScript | Type safety throughout |
| React Flow | Drag-drop canvas and node graph |
| Zustand | Global state management |
| Tailwind CSS | Styling |
| Mock API (local) | Simulated backend (no server needed) |

---

## 📁 Folder Structure

```
tredence-assignment/
├── app/
│   ├── page.tsx              # Main page - composes the full layout
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles + utility classes
├── types/
│   └── workflow.ts           # All TypeScript interfaces
├── store/
│   └── workflowStore.ts      # Zustand store - single source of truth
├── mocks/
│   └── api.ts                # Mock API: GET /automations + POST /simulate
├── hooks/
│   └── useSimulate.ts        # Custom hook for simulation
└── components/
    ├── nodes/                # 5 custom React Flow node components
    ├── forms/                # Edit forms for each node type
    ├── canvas/               # Canvas layout components
    └── sandbox/              # Simulation panel
```

---

## Features Implemented

### Core
- Drag-and-drop workflow canvas (React Flow)
- 5 custom node types: Start, Task, Approval, Automated, End
- Click any node -> side panel opens with editable form
- Connect nodes with animated edges
- Delete nodes and edges
- Mock API for automation actions
- Workflow simulation with BFS traversal
- Step-by-step simulation log panel
- Validation: missing start/end node, disconnected nodes
- MiniMap, zoom controls, pan

### Bonus
- Export workflow as JSON file
- Import workflow from JSON file
- Fully typed with TypeScript discriminated unions per node type
- Collapsible sidebars to maximize canvas space

---

## 🎬 Demo Video

[![Demo Video Thumbnail](./public/Screenshot%202026-04-21%20003738.png)](https://github.com/user-attachments/assets/7b0c3dfc-e6e2-4da9-abb4-a7b4ff96792a)

**Watch the demo to see:**
- 🖱️ Drag and drop nodes onto the canvas
- ✏️ Click nodes to edit their properties in the side panel
- 🔗 Connect nodes to build complete workflows
- ▶️ Run simulations to test workflow execution
- 📊 View step-by-step simulation logs
- 💾 Export/Import workflows as JSON
- 🌙 Toggle between light and dark themes
- 📦 Minimize sidebars for a larger canvas view

---

## 📊 Architecture Overview

### System Architecture Diagram

![HR Workflow Designer Architecture](./public/architecture-diagram.png)

### Architecture Explanation

**Frontend Layer (React Components)**
- **React Flow Canvas**: Handles drag-and-drop, node rendering, and graph interactions
- **Node Form Panel**: Dynamically renders type-safe forms based on selected node type
- **Sandbox Panel**: Displays step-by-step simulation results and execution log

**State Management (Zustand)**
- Single source of truth for all workflow data
- Holds: nodes, edges, selectedNodeId, simulationResult, UI state
- Actions: node CRUD operations, connections, simulation control
- No prop drilling - components directly subscribe to store changes

**Custom Hooks**
- `useSimulate()`: Triggers workflow simulation and manages async states
- Provides clean API for components to interact with mock backend

**API Layer (Mock Backend)**
- `GET /automations`: Returns available automation actions
- `POST /simulate`: Executes BFS traversal on workflow graph, returns execution log
- Simulates network delay (500ms) for realistic behavior
- Easy to swap with real API endpoints later

---

## 🏗️ Architecture & Design Decisions

### 1. Discriminated Union Types for Nodes
Each node type has its own TypeScript interface with a type field as discriminant:
```ts
type WorkflowNodeData = StartNodeData | TaskNodeData | ApprovalNodeData | ...
```
This means the form components are fully type-safe.

### 2. Zustand for State
All workflow state lives in a single Zustand store. This avoids prop drilling and keeps all React Flow callbacks stable.

### 3. Mock API as Pure Functions
The mock API is just async functions that return data after a short delay - simulating real network calls. Easy to swap for a real API later.

### 4. BFS for Simulation
The simulate function uses Breadth-First Search starting from the Start node, following edges to traverse the graph in order. This naturally produces the execution log in the correct sequence.

### 5. Component Decomposition
- Node components: purely visual, just display data
- Form components: handle editing, read/write from Zustand
- Canvas: handles drag-drop, React Flow wiring
- Sandbox: simulation UI only

---

## What I would add with more time

- Real backend with FastAPI and PostgreSQL to persist workflows
- Undo/Redo using a history stack in the store
- Conditional edges with true/false labels for approval branches
- Red border on misconfigured nodes for visual validation
- Auto-layout using dagre to auto-arrange nodes
- Node templates to save common workflow patterns
- E2E tests with Cypress/Playwright
- Login System so that user could save their work in a workspace







---


