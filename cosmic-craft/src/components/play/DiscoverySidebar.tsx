import { useGameStore} from '../../store/useGameStore';

export default function DiscoverySidebar() {
    const { discoveryLog, sidebarOpen, toggleSidebar, nodes } = useGameStore();
    const getNodeById = (id: string)=> nodes.find(n => n.id === id);

    if (!sidebarOpen)return null;

    return (
        <div className="w-64 bg-black/60 backdrop-blur border-l border-blue-900/30 flex flex-col">
            <div className="p-3 border-b border-blue-900/20 flex justify-between items-center">
                <h3 className="text-blue-300 text-sm font-mono">Discovered</h3>
                <button
                    onClick={toggleSidebar}
                    className="text-blue-400 hover:text-blue-200 text-lg"
                >
                    ✕
                </button>
            </div>
            <div className="text-blue-500/60 text-xs">
                {discoveryLog.length === 0 ? (
                    <p className='text-blue-500/60 text-xs'>No discoveries yet.</p>
                ) : (
                    discoveryLog.map(id => {
                        const node = getNodeById(id);
                        if (!node) return null;
                        return (
                            <div
                                key={id}
                                className="text-xs text-blue-300/90 p-2 bg-blue-900/10 rounded border border-blue-800/20"
                            >
                                <div className="font-bold">{node.name}</div>
                                <div className="text-blue-500/70 text-[10px]">
                                    {node.category} • {node.rarity}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};