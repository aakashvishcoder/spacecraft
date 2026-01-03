import { Link } from 'react-router-dom';
import NodeCanvas from './NodeCanvas';
import DiscoverySidebar from './DiscoverySidebar';
import { useGameStore } from '../../store/useGameStore';

export default function PlayScreen() {
  const { sidebarOpen, toggleSidebar, nodes } = useGameStore();

  return (
    <div className="min-h-screen bg-black text-blue-400 font-mono relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl">SPACECRAFT</h1>
          <div className="space-x-4">
            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300 text-sm underline decoration-dotted"
            >
              Home
            </Link>
            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Show Log
              </button>
            )}
          </div>
        </div>

        <div className="flex h-[calc(100vh-120px)]">
          <div className="flex-1 rounded-lg overflow-hidden">
            <NodeCanvas key={nodes.length} />
          </div>
          <DiscoverySidebar />
        </div>
      </div>
    </div>
  );
}