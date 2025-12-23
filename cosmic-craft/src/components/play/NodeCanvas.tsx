import { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { generateCombination } from '../../lib/ai/engine';
import type { ConceptNode } from '../../lib/types/game';
import DraggableNode from './DraggableNode';

const DISTANCE_THRESHOLD = 80; 

export default function NodeCanvas() {
  const { nodes, addNode, removeNode } = useGameStore();
  const processedPairs = useRef<Set<string>>(new Set());

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
        const newId = `${a.id}-${b.id}`;
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
          removeNode(a.id);
          removeNode(b.id);
          addNode(newNode);
        }, 300);
      }
    });
  }, [nodes, addNode, removeNode]);

  return (
    <div className="relative w-full h-full bg-black/30 backdrop-blur-sm border border-blue-900/20 rounded-lg">
      {nodes.map(node => (
        <DraggableNode key={node.id} node={node} />
      ))}
    </div>
  );
}