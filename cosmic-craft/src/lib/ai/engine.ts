/**
 * AI Engine
 * for demo version, im just going to keep some preset combinations
 * but I will eventually add AI to this (tokens are the main drawback as of rn)
 */
import type { ConceptNode } from '../types/game';

export interface AIResult {
  success: boolean;
  newConcept?: {
    name: string;
    category: ConceptNode['category'];
    rarity: ConceptNode['rarity'];
    stability: ConceptNode['stability'];
    explanation: string;
  };
}

const combinationKey = (a: string, b: string): string => {
  return [a, b].sort().join('|');
};

const combiner= (a: ConceptNode, b: ConceptNode): result => {
    const combos: Record<string,string> = {
        'Star|Gravity': 'Accretion Disk',
        'Black Hole|Computer': 'Event Horizon Processor',
        'Wormhole|Probe': 'Quantum Tunneler',
        'Dark Matter|Engine': 'Void Drive',
    };
    const key = combinationKey(a.name, b.name);
    const name = combos[key] || `${a.name} + ${b.name}`;

    return {
        success: true,
        newConcept: {
            name,
            category: 'physics',
            rarity: 'legendary',
            stability: 'unstable',
            explanation: `Synthesis of ${a.name} and ${b.name}.`,
        },
    };
};

export const generateCombination = (a: ConceptNode, b: ConceptNode): result => {
    const key = `${combinationKey(a.name, b.name)}`;
    const cached = localStorage.getItem(key);
    if (cached) return JSON.parse(cached);

    const res = combiner(a,b);
    localStorage.getItem(key, JSON.stringify(res));
    return res;
};