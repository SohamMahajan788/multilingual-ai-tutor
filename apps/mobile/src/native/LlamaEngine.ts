import { NativeModules } from 'react-native';

const { LlamaModule } = NativeModules;

/**
 * Generates a response from the on-device LLM
 */
export async function generateResponse(
  prompt: string,
  maxTokens: number = 256
): Promise<string> {
  try {
    if (!LlamaModule) {
      return getMockResponse(prompt);
    }
    const isLoaded = await LlamaModule.isLoaded();
    if (!isLoaded) {
      console.log('Model not loaded yet, falling back to mock');
      return getMockResponse(prompt);
    }
    console.log('Generating with real AI...');
    const response = await LlamaModule.generateAsync(prompt, maxTokens);
    console.log('AI response:', response);
    return response || getMockResponse(prompt);
  } catch (e) {
    console.error('Generation error:', e);
    return getMockResponse(prompt);
  }
}

/**
 * Stops ongoing generation
 */
export async function stopGeneration(): Promise<void> {
  try {
    if (LlamaModule) {
      await LlamaModule.stopGenerationAsync();
    }
  } catch (e) {
    console.error('Stop generation error:', e);
  }
}

/**
 * Checks if model is loaded
 */
export async function isModelLoaded(): Promise<boolean> {
  try {
    if (!LlamaModule) return false;
    return await LlamaModule.isLoaded();
  } catch {
    return false;
  }
}

/**
 * Builds prompt using TinyLlama's exact chat template format
 * <|system|>\n{system}</s>\n<|user|>\n{user}</s>\n<|assistant|>
 */
export function buildTutorPrompt(
  userMessage: string,
  language: string,
  subject: string,
  topicName: string,
  conversationHistory: { role: string; content: string }[]
): string {
  const systemContent = `You are VidyaBot, a friendly AI tutor for Indian students studying ${subject}, topic: ${topicName}. Give short, simple answers in 2-3 sentences. Use simple words. Give a local Indian analogy when helpful. Always be encouraging.`;

  let prompt = `<|system|>\n${systemContent}</s>\n`;

  // Add last 2 exchanges for context
  const recentHistory = conversationHistory.slice(-4);
  for (const msg of recentHistory) {
    if (msg.role === 'user') {
      prompt += `<|user|>\n${msg.content}</s>\n<|assistant|>\n`;
    } else {
      prompt += `${msg.content}</s>\n`;
    }
  }

  // Add current message
  prompt += `<|user|>\n${userMessage}</s>\n<|assistant|>\n`;

  return prompt;
}

/**
 * Fallback mock responses when model is not available
 */
function getMockResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes('photo') || lower.includes('plant')) {
    return 'Photosynthesis is like a kitchen in the plant! Leaves use sunlight as a stove, water and CO2 as ingredients, and make glucose as food. 🌱';
  }
  if (lower.includes('water') || lower.includes('cycle')) {
    return 'The water cycle is like water going on a journey! It evaporates from rivers, forms clouds, then falls as rain to start again. 💧';
  }
  if (lower.includes('force') || lower.includes('push')) {
    return 'Force is a push or pull! When you kick a football, your foot applies force. More force = ball goes farther! ⚽';
  }
  if (lower.includes('fraction')) {
    return 'Fractions are like cutting a roti! If you cut it into 4 equal pieces and take 1 piece, that is 1/4. Simple! 🫓';
  }
  return 'Great question! This concept is like something you see every day in your village. Let me explain step by step. What part would you like to understand first?';
}