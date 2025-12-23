import type { ConceptNode } from '../types/game';
import { generateCombinationWithAI } from './aiEngine';

const USE_REAL_AI = true;

const generateCombinationKey = (a: string, b: string): string => {
  return [a, b].sort().join('|');
};

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

/**
 * Main entry point for combination logic.
 * - Checks cache first
 * - Uses real AI if enabled and not cached
 * - Falls back to mock in dev if needed
 */
export const generateCombination = async (
  a: ConceptNode,
  b: ConceptNode
): Promise<AIResult> => {
  const cacheKey = `ai_cache_v2_${generateCombinationKey(a.name, b.name)}`;
  
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.warn('Invalid cache entry, regenerating...');
    }
  }

  let result: AIResult;

  if (USE_REAL_AI) {
    console.log(`Combining: "${a.name}" + "${b.name}"`);
    const aiResponse = await generateCombinationWithAI(a, b);
    
    if (aiResponse.success && aiResponse.newConcept) {
      result = {
        success: true,
        newConcept: aiResponse.newConcept,
        feedbackMessage: `✨ Discovered: ${aiResponse.newConcept.name}!`,
      };
    } else {
      result = {
        success: false,
        feedbackMessage: 'No cosmic resonance detected. Try other combinations.',
      };
    }
  } else {
    result = mockAIEngine(a, b);
  }

  localStorage.setItem(cacheKey, JSON.stringify(result));
  return result;
};

const mockAIEngine = (a: ConceptNode, b: ConceptNode): AIResult => {
  const combos: Record<string, string> = {
    'Star|Gravity': 'Accretion Disk',
    'Black Hole|Computer': 'Event Horizon Processor',
    'Wormhole|Probe': 'Quantum Tunneler',
    'Dark Matter|Engine': 'Void Drive',
    'Nebula|AI': 'Stellar Mind',
  };
  const key = generateCombinationKey(a.name, b.name);
  const name = combos[key] || `${a.name} ${b.name} Synthesis`;

  return {
    success: true,
    newConcept: {
      name,
      category: 'physics',
      rarity: 'rare',
      stability: 'unstable',
      explanation: `Emergent synthesis of ${a.name} and ${b.name}.`,
    },
    feedbackMessage: `Discovered: ${name}!`,
  };
};