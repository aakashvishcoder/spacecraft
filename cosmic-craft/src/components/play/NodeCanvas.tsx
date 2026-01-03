import { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { generateCombination } from '../../lib/ai/engine';
import type { ConceptNode } from '../../lib/types/game';
import DraggableNode from './DraggableNode';

const DISTANCE_THRESHOLD = 25;

export default function NodeCanvas() {
  const {
    nodes,
    removeNodeFromCanvas,
    addNodeToCanvas,
    recordDiscovery,
  } = useGameStore();

  const processedPairs = useRef<Set<string>>(new Set());

  useEffect(() => {

    processedPairs.current.clear();

    nodes.forEach((node, i) => {
      console.log(`  ${i}: ${node.name} @ (${node.position.x.toFixed(1)}, ${node.position.y.toFixed(1)})`);
    });
    
    if (nodes.length < 2) {
      return;
    }

    const pairsToCheck: [ConceptNode, ConceptNode][] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const key = [a.id, b.id].sort().join('|');

        if (processedPairs.current.has(key)) {
          continue;
        }

        const dx = a.position.x - b.position.x;
        const dy = a.position.y - b.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < DISTANCE_THRESHOLD) {
          pairsToCheck.push([a, b]);
          processedPairs.current.add(key);
        }
      }
    }

    if (pairsToCheck.length === 0) {
      return;
    }


    for (const [a, b] of pairsToCheck) {
      const result = generateCombination(a, b);

      if (result.success && result.newConcept) {
        const { name, category, rarity, stability } = result.newConcept;
        const nodeTemplate = { name, category, rarity, stability };

        removeNodeFromCanvas(a.id);
        removeNodeFromCanvas(b.id);

        addNodeToCanvas(nodeTemplate);

        recordDiscovery(name, nodeTemplate);

        break;
      } 
    }
  }, [nodes, removeNodeFromCanvas, addNodeToCanvas, recordDiscovery]);

  return (
    <div className="relative w-full h-full bg-black/30 backdrop-blur-sm border border-blue-900/20 rounded-lg">
      {nodes.map((node) => (
        <DraggableNode key={node.id} node={node} />
      ))}
    </div>
  );
}