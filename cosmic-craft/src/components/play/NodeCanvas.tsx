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

    // Detect collisions
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

    const processCollisions = async () => {
      for (const [a, b] of pairsToCheck) {
        const result = await generateCombination(a, b);
        if (result.success && result.newConcept) {
          const newId = `${a.id}-${b.id}-${Date.now()}`;
          const newNode: ConceptNode = {
            id: newId,
            ...result.newConcept,
            position: {
              x: (a.position.x + b.position.x) / 2,
              y: (a.position.y + b.position.y) / 2,
            },
            combinedFrom: [a.id, b.id],
          };

          setTimeout(() => {
            removeNodeFromCanvas(a.id);
            removeNodeFromCanvas(b.id);
            addNodeToCanvas(newNode);
            recordDiscovery(newNode);
            resetProcessedPairs();
          }, 300);
        }
      }
    };

    if (pairsToCheck.length > 0) {
      processCollisions();
    }
  }, [nodes, addNodeToCanvas, removeNodeFromCanvas, recordDiscovery, resetProcessedPairs]);

  return (
    <div className="relative w-full h-full bg-black/30 backdrop-blur-sm border border-blue-900/20 rounded-lg">
      {nodes.map((node) => (
        <DraggableNode key={node.id} node={node} />
      ))}
    </div>
  );
}