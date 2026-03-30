import { NativeModules, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

const { LlamaModule } = NativeModules;

const MODEL_FILENAME = 'model.gguf';

/**
 * Gets the path to the model file on device
 */
async function getModelPath(): Promise<string> {
  if (Platform.OS === 'android') {
    const destPath = `${FileSystem.documentDirectory}${MODEL_FILENAME}`;
    
    // Check if already copied to documents
    const info = await FileSystem.getInfoAsync(destPath);
    if (info.exists) {
      return destPath;
    }

    // Copy from assets bundle to documents directory
    await FileSystem.copyAsync({
      from: `${FileSystem.bundleDirectory ?? ''}${MODEL_FILENAME}`,
      to: destPath,
    });

    return destPath;
  }
  return '';
}

/**
 * Loads the on-device LLM model
 */
export async function loadLlamaModel(): Promise<boolean> {
  try {
    if (!LlamaModule) {
      console.warn('LlamaModule not available — using mock mode');
      return false;
    }
    const modelPath = await getModelPath();
    console.log('Loading model from:', modelPath);
    const result = await LlamaModule.loadModelAsync(modelPath);
    return result;
  } catch (e) {
    console.error('Failed to load model:', e);
    return false;
  }
}

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
      await loadLlamaModel();
    }
    const response = await LlamaModule.generateAsync(prompt, maxTokens);
    return response;
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
 * Builds a STEM tutor prompt for the model
 */
export function buildTutorPrompt(
  userMessage: string,
  language: string,
  subject: string,
  topicName: string,
  conversationHistory: { role: string; content: string }[]
): string {
  const systemPrompt = `You are VidyaBot, an AI tutor for rural Indian students.
Subject: ${subject}
Topic: ${topicName}
Language: ${language}
Rules:
- Explain concepts simply using local analogies
- Keep responses short (2-3 sentences)
- Always end with an encouraging word
- Use simple vocabulary appropriate for Class 6-10`;

  const history = conversationHistory
    .slice(-4)
    .map(m => `${m.role === 'user' ? 'Student' : 'VidyaBot'}: ${m.content}`)
    .join('\n');

  return `${systemPrompt}\n\n${history}\nStudent: ${userMessage}\nVidyaBot:`;
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
