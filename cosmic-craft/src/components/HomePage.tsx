import React from 'react';
import { Link } from 'react-router-dom';

// each node will be grouped to a png (for simplicity)

const EXAMPLE_NODES = [
  { id: 'star', name: 'Star', artKey: 'star' },
  { id: 'black-hole', name: 'Black Home', artKey: 'black-hole' },
  { id: 'nebula', name: 'Nebula', artKey: 'nebula' },
  { id: 'quantum', name: 'Quantum Foam', artKey: 'quantum' },
].map((node, i) => ({
  ...node,
  delay: i * 0.5,
  duration: 12 + i * 2,
  x: 20 + (i % 2) * 60,
  y: 30 + (Math.floor(i / 2) * 30),
}));

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-blue-400 font-mono relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {[...Array(150)].map((_,i) => {
          const style = {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2,
            animationDelay: `${Math.random() * 5}s`
          };

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={style}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 z-5 pointer-events-none">
        {EXAMPLE_NODES.map((node) => {
          const artSrc = node.artKey ? `/assets/nodes/${node.artKey}.png` : null; // node art will be stored in here
          return (
            <div
              key={node.id}
              className="absolute w-12 h-12 flex items-center justify-center"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                animation: `float ${node.duration}s ease-in-out ${node.delay}s infinite`,
              }}
            >
              {artSrc ? (
                <img 
                  src={artSrc}
                  alt={node.name}
                  className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/50 flex items-center justify-center">
                  <span className="text-[8px] text-center px-0.5 leading-tight">
                    {node.name.split(' ')[0]}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-20 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-normal mb-6">
            Welcome to Spacecraft.
          </h1>
          <p className="mb-6">
            Combine space elements to make new ones!
          </p>
          <p>
            Press [HOW TO PLAY] to begin.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          <div className="flex items-center">
            <span className="mr-2">{'>'}</span>
            <Link
              to="/howto"
              className="text-blue-400 hover:text-blue-300 underline decoration-dotted underline-offset-4 cursor-pointer transition-colors"
            >
              HOW TO
            </Link>
          </div>
          <div className="flex items-center">
            <span className="mr-2">{'>'}</span>
            <Link
              to="/play"
              className="text-blue-400 hover:text-blue-300 underline decoration-dotted underline-offset-4 cursor-pointer transition-colors"
            >
              PLAY
            </Link>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-6 w-full text-center text-blue-700 text-opacity-70 text-sm z-10">
        <div className="max-w-2xl mx-auto px-4">
          <p className="px-1">Made with love and stardust!</p>
          <p>By @acash</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;