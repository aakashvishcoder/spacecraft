import type { ConceptNode } from '../types/game';

let transformers: any = null;

const loadTransformers = async () => {
  if (!transformers) {
    const mod = await import('@xenova/transformers');
    transformers = mod;
    transformers.env.allowLocalModels = false;
    transformers.env.allowRemoteModels = true;
  }
  return transformers;
};

const MODEL_ID = 'Xenova/Phi-3-mini-4k-instruct-onnx'; 

let generator: any = null;

const getGenerator = async () => {
  if (!generator) {
    console.log('🧠 Initializing cosmic AI engine...');
    const { pipeline } = await loadTransformers();
    generator = await pipeline('text-generation', MODEL_ID, {
      quantized: true,
      progress_callback: (progress: any) => {
        console.log(`📥 Loading model: ${(progress?.loaded / 1024 / 1024).toFixed(1)} MB`);
      },
    });
  }
  return generator;
};

const formatPrompt = (a: string, b: string): string => {
  return `<|system|>You are a cosmic concept synthesizer. Respond only in valid JSON.<|end|>
<|user|>Combine "${a}" and "${b}" into a single, scientifically inspired new concept.<|end|>
<|assistant|>
{
  "name": "New Concept Name",
  "category": "astronomy|physics|technology|abstract|exploration|cosmic phenomena",
  "rarity": "common|uncommon|rare|epic|legendary",
  "stability": "stable|unstable|theoretical",
  "explanation": "One-sentence explanation."
}`;
};

export const generateCombinationWithAI = async (
  a: ConceptNode,
  b: ConceptNode
) => {
  try {
    const generator = await getGenerator();
    const prompt = formatPrompt(a.name, b.name);

    const response = await generator(prompt, {
      max_new_tokens: 200,
      temperature: 0.8,
      repetition_penalty: 1.1,
      do_sample: true,
    });

    let output = response[0]?.generated_text || '';
    if (output.startsWith(prompt)) {
      output = output.slice(prompt.length);
    }
    output = output.trim();

    const jsonStart = output.indexOf('{');
    const jsonEnd = output.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
      throw new Error('No JSON found');
    }
    const jsonStr = output.slice(jsonStart, jsonEnd + 1);

    const parsed = JSON.parse(jsonStr);

    const validCategories = ['astronomy', 'physics', 'technology', 'abstract', 'exploration', 'cosmic phenomena'];
    const validRarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    const validStabilities = ['stable', 'unstable', 'theoretical'];

    if (
      typeof parsed.name === 'string' &&
      parsed.name.length > 0 &&
      validCategories.includes(parsed.category) &&
      validRarities.includes(parsed.rarity) &&
      validStabilities.includes(parsed.stability) &&
      typeof parsed.explanation === 'string'
    ) {
      return {
        success: true,
        newConcept: {
          name: parsed.name.trim(),
          category: parsed.category,
          rarity: parsed.rarity,
          stability: parsed.stability,
          explanation: parsed.explanation.trim(),
        },
      };
    } else {
      throw new Error('Invalid schema');
    }
  } catch (error) {
    console.error('AI generation failed:', error);
    return {
      success: false,
    };
  }
};