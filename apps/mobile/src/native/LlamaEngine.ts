import { NativeModules } from 'react-native';
import { getAILanguageInstruction } from '../data/translations';

const { LlamaModule } = NativeModules;

export async function generateResponse(
  prompt: string,
  maxTokens: number = 200
): Promise<string> {
  try {
    if (!LlamaModule) return getMockResponse(prompt);
    const isLoaded = await LlamaModule.isLoaded();
    if (!isLoaded) return getMockResponse(prompt);

    console.log('Generating with real AI...');
    const raw = await LlamaModule.generateAsync(prompt, maxTokens);
    console.log('AI raw response:', raw);

    let response = raw || '';
    const stopTokens = ['<|im_start|>', '<|im_end|>', '<|system|>', '<|user|>', '<|assistant|>', '</s>'];
    for (const stop of stopTokens) {
      const idx = response.indexOf(stop);
      if (idx !== -1) response = response.substring(0, idx);
    }
    response = response.replace(/[\uFFFC\uFFFD\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
    console.log('AI cleaned response:', response);
    return response || getMockResponse(prompt);
  } catch (e) {
    console.error('Generation error:', e);
    return getMockResponse(prompt);
  }
}

export async function stopGeneration(): Promise<void> {
  try {
    if (LlamaModule) await LlamaModule.stopGenerationAsync();
  } catch (e) {
    console.error('Stop generation error:', e);
  }
}

export async function isModelLoaded(): Promise<boolean> {
  try {
    if (!LlamaModule) return false;
    return await LlamaModule.isLoaded();
  } catch {
    return false;
  }
}

export function buildTutorPrompt(
  userMessage: string,
  language: string,
  subject: string,
  topicName: string,
  conversationHistory: { role: string; content: string }[]
): string {
  const langInstruction = language === 'English' ? '' : `Reply in ${language} only.`;
  const systemContent = `You are VidyaBot, a tutor for Indian students. ${langInstruction} Answer in 2 sentences max.`;

  let prompt = `<|system|>\n${systemContent}</s>\n`;

  const recentHistory = conversationHistory.slice(-2);
  for (const msg of recentHistory) {
    if (msg.role === 'user') {
      prompt += `<|user|>\n${msg.content}</s>\n<|assistant|>\n`;
    } else {
      prompt += `${msg.content}</s>\n`;
    }
  }

  prompt += `<|user|>\n${userMessage}</s>\n<|assistant|>\n`;
  return prompt;
}

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
    return 'Fractions are like cutting a roti! Cut into 4 equal pieces and take 1 piece, that is 1/4. Simple! 🫓';
  }
  return 'Great question! Let me explain step by step. What part would you like to understand first?';
}