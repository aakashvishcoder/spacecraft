import { useGameStore } from '../../store/useGameStore';

export default function DiscoverySidebar() {
  const { discoveredNodes, sidebarOpen, toggleSidebar, addNodeToCanvas } = useGameStore();

  if (!sidebarOpen) return null;

  return (
    <div className="w-64 bg-black/60 backdrop-blur border-l border-blue-900/30 flex flex-col">
      <div className="p-3 border-b border-blue-900/20 flex justify-between items-center">
        <h3 className="text-blue-300 text-sm font-mono">Your Collection</h3>
        <button
          onClick={toggleSidebar}
          className="text-blue-400 hover:text-blue-200 text-lg"
        >
          ✕
        </button>
      </div>
      
      <div className="overflow-y-auto p-2 space-y-2 flex-1">
        {discoveredNodes.length === 0 ? (
          <p className="text-blue-500/60 text-xs">Discover your first concept!</p>
        ) : (
          discoveredNodes.map((template, idx) => (
            <div
              key={template.name + idx} 
              className="group relative text-xs text-blue-300/90 p-2 bg-blue-900/10 rounded border border-blue-800/20 hover:bg-blue-800/20 transition"
            >
              <div className="flex items-center gap-2 mb-1">
                {template.artKey ? (
                  <img
                    src={`/assets/nodes/${template.artKey}.png`}
                    alt={template.name}
                    className="w-6 h-6 object-contain"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-purple-900/40 flex items-center justify-center">
                    <span className="text-[8px]">{template.name[0]}</span>
                  </div>
                )}
                <span className="font-bold">{template.name}</span>
              </div>
              
              <div className="text-[10px] text-blue-500/70">
                {template.category} • {template.rarity}
              </div>

              <button
                onClick={() => addNodeToCanvas(template)}
                className="absolute -right-2 -top-2 w-5 h-5 bg-blue-600 hover:bg-blue-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                title={`Add ${template.name} to canvas`}
              >
                +
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}