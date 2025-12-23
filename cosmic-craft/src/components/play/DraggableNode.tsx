import type { ConceptNode } from '../../lib/types/game';
import { useGameStore } from '../../store/useGameStore';

interface DraggableNodeProps {
    node: ConceptNode;
};

export default function DraggableNode({node}: DraggableNodeProps) {
    const moveNode = useGameStore(state => state.moveNode);
    const removeNode = useGameStore(state => state.removeNode);

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const startPos = {...node.position};

        const handleMove = (moveEvent: PointerEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            moveNode(node.id, startPos.x + dx, startPos.y + dy);
        };

        const handleUp = () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerdown', handleUp);
        };

        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
    };

    const artSrc = node.artKey ? `/assets/nodes/${node.artKey}.png` : null;
    const baseClasses = "absolute w-16 h-16 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center border-2";

    const stabilityClasses = {
        stable: 'border-green-400 shadow-green-500/30',
        unstable: 'border-amber-400 shadow-amber-500/30',
    }[node.stability];

    return (
        
    );
};