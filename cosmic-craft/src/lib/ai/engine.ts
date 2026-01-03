import type { ConceptNode } from "../types/game";

export interface AIResult {
  success: boolean;
  newConcept?: {
    name: string;
    category: ConceptNode['category'];
    rarity: ConceptNode['rarity'];
    stability: ConceptNode['stability'];
    explanation: string;
  };
  feedbackMessage: string;
}

const COMBINATIONS: Record<string, {
  name: string;
  category: ConceptNode['category'];
  rarity: ConceptNode['rarity'];
  stability: ConceptNode['stability'];
  explanation: string;
}> = {
  'Gravity|Star': {
    name: 'Accretion Disk',
    category: 'astronomy',
    rarity: 'uncommon',
    stability: 'stable',
    explanation: 'Matter spiraling into a gravitational well emits intense radiation.'
  },
  
  'AI|Computer': {
    name: 'Neural Network',
    category: 'technology',
    rarity: 'rare',
    stability: 'stable',
    explanation: 'An adaptive system that learns from data patterns.'
  },
  'AI|Gravity': {
    name: 'Gravitational Algorithm',
    category: 'technology',
    rarity: 'rare',
    stability: 'stable',
    explanation: 'An AI that models spacetime curvature for navigation.'
  },
  'AI|Planet': {
    name: 'Gaia Core',
    category: 'technology',
    rarity: 'epic',
    stability: 'stable',
    explanation: 'An artificial consciousness managing a planet\'s biosphere.'
  },
  'AI|Quantum': {
    name: 'Quantum Mind',
    category: 'technology',
    rarity: 'epic',
    stability: 'unstable',
    explanation: 'An intelligence leveraging quantum superposition for thought.'
  },
  'Black Hole|Nebula': {
    name: 'Quasar Nursery',
    category: 'astronomy',
    rarity: 'epic',
    stability: 'stable',
    explanation: 'A region where supermassive black holes trigger star formation.'
  },
  'Black Hole|Planet': {
    name: 'Void World',
    category: 'astronomy',
    rarity: 'rare',
    stability: 'unstable',
    explanation: 'A planet orbiting dangerously close to a black hole.'
  },
  'Computer|Gravity': {
    name: 'Gravitational Processor',
    category: 'technology',
    rarity: 'uncommon',
    stability: 'stable',
    explanation: 'A computer that uses gravity waves for data transmission.'
  },
  'Computer|Nebula': {
    name: 'Stellar CPU',
    category: 'technology',
    rarity: 'rare',
    stability: 'unstable',
    explanation: 'A computer using nebular plasma for computation.'
  },
  'Computer|Planet': {
    name: 'Planetary Core Processor',
    category: 'technology',
    rarity: 'rare',
    stability: 'stable',
    explanation: 'A computational system using a planet\'s geothermal energy.'
  },
  'Computer|Quantum': {
    name: 'Quantum Processor',
    category: 'technology',
    rarity: 'epic',
    stability: 'unstable',
    explanation: 'A computational device leveraging quantum superposition.'
  },
  'Gravity|Nebula': {
    name: 'Gravitational Collapse',
    category: 'astronomy',
    rarity: 'uncommon',
    stability: 'stable',
    explanation: 'The process that forms stars from interstellar clouds.'
  },
  'Gravity|Planet': {
    name: 'Tidal Generator',
    category: 'technology',
    rarity: 'common',
    stability: 'stable',
    explanation: 'Energy harvested from gravitational interactions between bodies.'
  },
  'Gravity|Quantum': {
    name: 'Quantum Gravity Field',
    category: 'physics',
    rarity: 'epic',
    stability: 'theoretical',
    explanation: 'A theoretical framework unifying quantum mechanics and gravity.'
  },
  'Nebula|Planet': {
    name: 'Gas Giant',
    category: 'astronomy',
    rarity: 'uncommon',
    stability: 'stable',
    explanation: 'A massive planet formed from nebular gas and dust.'
  },
  'Nebula|Quantum': {
    name: 'Quantum Cloud',
    category: 'astronomy',
    rarity: 'epic',
    stability: 'unstable',
    explanation: 'A nebula where quantum effects dominate stellar formation.'
  },
  'Nebula|Star': {
    name: 'Stellar Nursery',
    category: 'astronomy',
    rarity: 'uncommon',
    stability: 'stable',
    explanation: 'A region of gas and dust where new stars are born.'
  },
  'Planet|Quantum': {
    name: 'Quantum World',
    category: 'astronomy',
    rarity: 'epic',
    stability: 'unstable',
    explanation: 'A planet existing in multiple quantum states simultaneously.'
  },
  'Planet|Star': {
    name: 'Hot Jupiter',
    category: 'astronomy',
    rarity: 'uncommon',
    stability: 'stable',
    explanation: 'A gas giant planet orbiting extremely close to its star.'
  },
  'Quantum|Star': {
    name: 'Stellar Qubit',
    category: 'physics',
    rarity: 'rare',
    stability: 'unstable',
    explanation: 'A quantum state stabilized by stellar radiation.'
  },

  'AI|Black Hole': {
    name: 'Singularity Mind',
    category: 'technology',
    rarity: 'legendary',
    stability: 'theoretical',
    explanation: 'An intelligence existing at the event horizon of a black hole.'
  },
  'AI|Nebula': {
    name: 'Stellar Mind',
    category: 'technology',
    rarity: 'epic',
    stability: 'theoretical',
    explanation: 'An AI consciousness distributed across a nebula.'
  },
  'Black Hole|Computer': {
    name: 'Event Horizon Processor',
    category: 'technology',
    rarity: 'epic',
    stability: 'unstable',
    explanation: 'A computer that processes information at light speed near a black hole.'
  },
  'Black Hole|Gravity': {
    name: 'Event Horizon',
    category: 'astronomy',
    rarity: 'rare',
    stability: 'stable',
    explanation: 'The boundary beyond which nothing, not even light, can escape.'
  },
  'Computer|Star': {
    name: 'Solar Computer',
    category: 'technology',
    rarity: 'rare',
    stability: 'unstable',
    explanation: 'A computer powered by stellar fusion energy.'
  },
  'Gravity|Black Hole': {
    name: 'Spaghettification Field',
    category: 'astronomy',
    rarity: 'rare',
    stability: 'unstable',
    explanation: 'The extreme tidal forces near a black hole that stretch matter.'
  },
  'Nebula|Black Hole': {
    name: 'Accretion Cloud',
    category: 'astronomy',
    rarity: 'rare',
    stability: 'stable',
    explanation: 'A nebula feeding matter into a central black hole.'
  },
  'Planet|Black Hole': {
    name: 'Orbital Decay',
    category: 'astronomy',
    rarity: 'rare',
    stability: 'unstable',
    explanation: 'The process where a planet spirals into a black hole.'
  },
  'Quantum|Black Hole': {
    name: 'Hawking Radiation',
    category: 'physics',
    rarity: 'epic',
    stability: 'theoretical',
    explanation: 'Theoretical radiation emitted by black holes due to quantum effects.'
  },
  'Star|Black Hole': {
    name: 'Tidal Disruption Event',
    category: 'astronomy',
    rarity: 'epic',
    stability: 'unstable',
    explanation: 'When a star is torn apart by a black hole\'s gravity.'
  }
};

const generateKey = (a: string, b: string): string => {
  return [a, b].sort().join('|');
};

export const generateCombination = (
  a: ConceptNode,
  b: ConceptNode
): AIResult => {
  const key = generateKey(a.name, b.name);
  const cacheKey = `combo_cache_v1_${key}`;
  
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const combo = COMBINATIONS[key];

  if (combo) {
    const result: AIResult = {
      success: true,
      newConcept: combo,
      feedbackMessage: `✨ Discovered: ${combo.name}!`,
    };
    localStorage.setItem(cacheKey, JSON.stringify(result));
    return result;
  }

  const failure: AIResult = {
    success: false,
    feedbackMessage: 'No cosmic resonance detected. Try other combinations.',
  };
  localStorage.setItem(cacheKey, JSON.stringify(failure));
  return failure;
};