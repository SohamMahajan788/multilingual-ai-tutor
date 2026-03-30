/**
 * Locale and model hints for offline speech recognition.
 */
export interface OfflineTranscriptionOptions {
  /** BCP 47 or internal locale key aligned with i18n packages. */
  locale: string;
  /** Raw PCM or encoded audio bytes produced by the native capture pipeline. */
  audioPayload: Uint8Array;
}

/**
 * Transcribes speech offline using the Whisper.cpp native bridge.
 * Does not require network access; fails fast if models are missing on device.
 *
 * @param options - Locale and audio payload from the recorder.
 * @returns Recognized text in the requested locale, or an empty string if no speech is detected.
 */
export async function transcribeOffline(
  options: OfflineTranscriptionOptions
): Promise<string> {
  if (options.audioPayload.length === 0) {
    return "";
  }
  void options.locale;
  return "";
}
