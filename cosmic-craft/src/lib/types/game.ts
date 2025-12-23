export type ConceptCategory = 'astronomy' | 'physics' | 'technology' | 'exploration';
export type RarityLevel = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type StabilityLevel = 'stable' | 'unstable';

export interface ConceptNode {
    id: string;
    name: string;
    category: ConceptCategory;
    rarity: RarityLevel;
    stability: StabilityLevel;
    position: { x: number, y: number };
    artKey?: string;
    artType?: 'png' | 'svg' | 'webp';
    combinedFrom?: [string, string];
};