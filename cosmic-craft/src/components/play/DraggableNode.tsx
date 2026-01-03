import type { ConceptNode } from '../../lib/types/game';
import { useGameStore } from '../../store/useGameStore';

interface DraggableNodeProps {
  node: ConceptNode;
}

export default function DraggableNode({ node }: DraggableNodeProps) {
  const moveNode = useGameStore((state) => state.moveNode);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...node.position };

    const handleMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      moveNode(node.id, startPos.x + dx, startPos.y + dy);
    };

    const handleUp = () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  };

  const artSrc = node.artKey ? `/assets/nodes/${node.artKey}.png` : null;
  const baseClasses =
    'absolute w-16 h-16 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center border-2';

  const stabilityClasses = {
    stable: 'border-green-400 shadow-green-500/30',
    unstable: 'border-amber-400 animate-pulse',
    theoretical: 'border-purple-400 border-dashed opacity-80',
  }[node.stability];

  return (
    <div
      className={`${baseClasses} ${stabilityClasses} select-none`}
      style={{
        left: node.position.x - 32,
        top: node.position.y - 32,
        userSelect: 'none',
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
    >
      <span className="text-white text-xs font-bold text-center px-1 leading-tight">
        {node.name}
      </span>
    </div>
  );
}