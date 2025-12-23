import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ConceptNode } from '../lib/types/game';

const STARTER_NODES: ConceptNode[] = [
  { id: 'star', name: 'Star', category: 'astronomy', rarity: 'common', stability: 'stable', position: { x: 300, y: 200 }, artKey: 'star' },
  { id: 'gravity', name: 'Gravity', category: 'physics', rarity: 'common', stability: 'stable', position: { x: 500, y: 200 }, artKey: 'gravity' },
];

interface GameState {
  nodes: ConceptNode[]; 
  discoveredNodes: ConceptNode[]; 
  sidebarOpen: boolean;
  
  toggleSidebar: () => void;
  addNodeToCanvas: (nodeTemplate: Omit<ConceptNode, 'id' | 'position'>) => void;
  removeNodeFromCanvas: (id: string) => void;
  recordDiscovery: (node: ConceptNode) => void;
  moveNode: (id: string, x: number, y: number) => void; 
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      nodes: [...STARTER_NODES],
      discoveredNodes: [...STARTER_NODES],
      sidebarOpen: true,

      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),

      addNodeToCanvas: (nodeTemplate) => {
        const x = 400 + Math.random() * 200;
        const y = typeof window !== 'undefined' ? window.innerHeight - 150 : 400;
        const newId = `${nodeTemplate.name.replace(/\s+/g, '-')}-${Date.now()}`;
        
        const newNode: ConceptNode = {
          ...nodeTemplate,
          id: newId,
          position: { x, y },
        };
        
        set(state => ({
          nodes: [...state.nodes, newNode],
        }));
      },

      removeNodeFromCanvas: (id) => {
        set(state => ({
          nodes: state.nodes.filter(n => n.id !== id),
        }));
      },

      recordDiscovery: (node) => {
        set(state => {
          const exists = state.discoveredNodes.some(n => n.name === node.name);
          if (exists) return {};
          return {
            discoveredNodes: [...state.discoveredNodes, node],
          };
        });
      },

      moveNode: (id, x, y) => {
        set(state => ({
          nodes: state.nodes.map(node =>
            node.id === id ? { ...node, position: { x, y } } : node
          ),
        }));
      },
    }),
    {
      name: 'spacecraft-game-v2',
      partialize: (state) => ({
        discoveredNodes: state.discoveredNodes,
      }),
    }
  )
);