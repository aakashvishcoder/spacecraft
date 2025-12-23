// store/useGameStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ConceptNode } from '../lib/types/game';

const STARTER_NODES: ConceptNode[] = [
  { id: 'star', name: 'Star', category: 'astronomy', rarity: 'common', stability: 'stable', position: { x: 300, y: 200 }, artKey: 'star' },
  { id: 'gravity', name: 'Gravity', category: 'physics', rarity: 'common', stability: 'stable', position: { x: 500, y: 200 }, artKey: 'gravity' },
];

interface GameState {
  nodes: ConceptNode[];
  discoveryLog: string[]; 
  toggleSidebar: () => void;
  addNode: (node: ConceptNode) => void;
  moveNode: (id: string, x: number, y: number) => void;
  removeNode: (id: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      nodes: STARTER_NODES,
      discoveryLog: STARTER_NODES.map(n => n.id),
      sidebarOpen: true,

      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),

      addNode: (node) => {
        set(state => ({
          nodes: [...state.nodes, node],
          discoveryLog: [...state.discoveryLog, node.id],
        }));
      },

      moveNode: (id, x, y) => {
        set(state => ({
          nodes: state.nodes.map(n => n.id === id ? { ...n, position: { x, y } } : n),
        }));
      },

      removeNode: (id) => {
        set(state => ({
          nodes: state.nodes.filter(n => n.id !== id),
        }));
      },
    }),
    { name: 'spacecraft-game-v1' }
  )
);