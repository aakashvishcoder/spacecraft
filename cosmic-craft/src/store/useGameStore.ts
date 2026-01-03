import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ConceptNode } from '../lib/types/game';

const STARTER_NODES: ConceptNode[] = [
  { id: 'star', name: 'Star', category: 'astronomy', rarity: 'common', stability: 'stable', position: { x: 300, y: 200 }, artKey: 'star' },
  { id: 'gravity', name: 'Gravity', category: 'physics', rarity: 'common', stability: 'stable', position: { x: 500, y: 200 }, artKey: 'gravity' },

  { id: 'planet', name: 'Planet', category: 'astronomy', rarity: 'common', stability: 'stable', position: { x: 400, y: 300 }, artKey: 'planet' },
  { id: 'nebula', name: 'Nebula', category: 'astronomy', rarity: 'uncommon', stability: 'stable', position: { x: 600, y: 300 }, artKey: 'nebula' },
  { id: 'black-hole', name: 'Black Hole', category: 'astronomy', rarity: 'rare', stability: 'stable', position: { x: 300, y: 400 }, artKey: 'black-hole' },
  { id: 'quantum', name: 'Quantum', category: 'physics', rarity: 'uncommon', stability: 'unstable', position: { x: 500, y: 400 }, artKey: 'quantum' },
  { id: 'computer', name: 'Computer', category: 'technology', rarity: 'common', stability: 'stable', position: { x: 400, y: 500 }, artKey: 'computer' },
  { id: 'ai', name: 'AI', category: 'technology', rarity: 'rare', stability: 'stable', position: { x: 600, y: 500 }, artKey: 'ai' },
];

interface GameState {
  nodes: ConceptNode[];
  discoveredNodes: ConceptNode[];
  sidebarOpen: boolean;

  toggleSidebar: () => void;
  addNodeToCanvas: (nodeTemplate: Omit<ConceptNode, 'id' | 'position'>) => void;
  removeNodeFromCanvas: (id: string) => void;
  recordDiscovery: (nodeName: string, nodeData: Omit<ConceptNode, 'id' | 'position'>) => void;
  moveNode: (id: string, x: number, y: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      nodes: [...STARTER_NODES],
      discoveredNodes: [...STARTER_NODES],
      sidebarOpen: true,

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      addNodeToCanvas: (nodeTemplate) => {
        const newNode: ConceptNode = {
          ...nodeTemplate,
          id: `${nodeTemplate.name.replace(/\s+/g, '-')}-${Date.now()}`,
          position: { x: 500, y: 300 }, 
        };

        set((state) => ({
          nodes: [...state.nodes, newNode],
        }));
      },

      removeNodeFromCanvas: (id) => {
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== id),
        }));
      },

      recordDiscovery: (name, nodeData) => {
        set((state) => {
          if (state.discoveredNodes.some(n => n.name === name)) return {};
          return {
            discoveredNodes: [
              ...state.discoveredNodes,
              {
                ...nodeData,
                id: name,
                name,
                position: { x: 0, y: 0 }
              }
            ],
          };
        });
      },

      moveNode: (id, x, y) => {
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id ? { ...node, position: { x, y } } : node
          ),
        }));
      },
    }),
    {
      name: 'spacecraft-game-v5',
      partialize: (state) => ({
        discoveredNodes: state.discoveredNodes,
      }),
    }
  )
);