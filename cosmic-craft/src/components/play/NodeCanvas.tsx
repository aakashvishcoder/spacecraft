import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { generateCombination } from '../../lib/ai/engine';
import type { ConceptNode } from '../../lib/types/game';
import DraggableNode from './DraggableNode';

const DISTANCE_THRESHOLD = 80;

export default function NodeCanvas() {
  const {
    nodes,
    removeNodeFromCanvas,
    addNodeToCanvas,
    recordDiscovery,
  } = useGameStore();

  const processedPairs = useRef<Set<string>>(new Set());

  const resetProcessedPairs = useCallback(() => {
    processedPairs.current.clear();
  }, []);

  useEffect(() => {
    const pairsToCheck: [ConceptNode, ConceptNode][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const key = [a.id, b.id].sort().join('|');
        if (processedPairs.current.has(key)) continue;

        const dx = a.position.x - b.position.x;
        const dy = a.position.y - b.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < DISTANCE_THRESHOLD) {
          pairsToCheck.push([a, b]);
          processedPairs.current.add(key);
        }
      }
    }

    pairsToCheck.forEach(([a, b]) => {
      const result = generateCombination(a, b);
      if (result.success && result.newConcept) {
        const newTemplate: Omit<ConceptNode, 'id' | 'position'> = {
          ...result.newConcept,
          combinedFrom: [a.name, b.name], 
        };

        recordDiscovery({
          ...newTemplate,
          id: `${a.name}-${b.name}-${Date.now()}`, 
          position: { x: 0, y: 0 },
        });

        const canvasNode: ConceptNode = {
          ...newTemplate,
          id: `${a.id}-${b.id}-${Date.now()}`,
          position: {
            x: (a.position.x + b.position.x) / 2,
            y: (a.position.y + b.position.y) / 2,
          },
        };

        setTimeout(() => {
          removeNodeFromCanvas(a.id);
          removeNodeFromCanvas(b.id);
          addNodeToCanvas(canvasNode);
          resetProcessedPairs(); 
        }, 300);
      }
    });
  }, [nodes, addNodeToCanvas, removeNodeFromCanvas, recordDiscovery, resetProcessedPairs]);

  return (
    <div className="relative w-full h-full bg-black/30 backdrop-blur-sm border border-blue-900/20 rounded-lg">
      {nodes.map(node => (
        <DraggableNode key={node.id} node={node} />
      ))}
    </div>
  );
}