import React from 'react';
import { Link } from 'react-router-dom';

const HowToPlay: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-blue-400 font-mono relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                {[...Array(120)].map((_,i) => {
                    const style = {
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.7 + 0.2,
                        animationDelay: `${Math.random() * 6}s`
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

            <div className="max-w-2xl mx-auto px-4 py-16 relative z-10">
                <h1 className="text-2xl md:text-3xl font-normal mb-8">HOW TO PLAY</h1>

                <div className="space-y-8 text-sm md:text-base">
                    <Step number={1} title="Discover Concepts">
                        You begin with a few space elements - like <span className="text-blue-300">Star</span> and <span className="text-blue-300">Gravity</span>.
                    </Step>

                    <Step number={2} title="Connect two nodes">
                        Drag one node/element toward another to combine them!
                    </Step>

                    <Step number={3} title="Create something new">
                        If the universe allows it, the combination will result in a new astral element emerges - like <span className="text-purple-300">Accretion Disk</span> or <span className="text-purple-300">Void Engine</span>.
                    </Step>

                    <Step number={4} title="Explore deeper">
                        Some elements are <span className="text-amber-400">unstable</span>, others <span className="text-violet-400">theoretical</span>.
                    </Step>
                </div>

                <div className="mt-12 p-6 border-t border-blue-800/30">
                    <p className="mb-6 text-sm">
                        There is no win condition. Combine!
                    </p>
                    <div className="flex items-start">
                        <span className="mr-2">{'>'}</span>
                        <Link
                            to="/play"
                            className="text-blue-400 hover:text-blue-300 underline decoration-dotted underline-offset-4 cursor-pointer transition-colors"
                        >
                            BEGIN EXPLORATION
                        </Link>
                    </div>
                    <div className="mt-6 flex items-start">
                        <span className="mr-2">{'>'}</span>
                        <Link
                            to="/"
                            className="text-blue-400 hover:text-blue-300 underline decoration-dotted underline-offset-4 cursor-pointer transition-colors"
                        >
                            RETURN HOMEPAGE
                        </Link>
                    </div>
                </div>
            </div>

            <footer className="absolute bottom-6 w-full text-center text-blue-700 text-opacity-60 text-xs z-10">
                <div className='max-w-2xl mx-auto px-4'>
                    <p>Let curiosity be your engine!</p>
                </div>
            </footer>
        </div>
    );
};

const Step: React.FC<{number: number; title: string; children: React.ReactNode }> = ({
    number,
    title,
    children,
}) => (
    <div className="flex">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/40 border border-blue-600 flex items-center justify-center text-xs mr-4 mt-0.5">
            {number}
        </div>
        <div>
            <h3 className="font-medium text-blue-300 mb-1">{title}</h3>
            <p className="text-blue-400/90">{children}</p>
        </div>
    </div>
);

export default HowToPlay;