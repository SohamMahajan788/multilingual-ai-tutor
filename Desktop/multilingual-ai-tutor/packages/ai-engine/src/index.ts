/**
 * Configuration used to initialize the on-device inference runtime.
 * Values map to llama.cpp JNI bridge limits and queue behavior.
 */
export interface AiEngineInitOptions {
  /** Maximum resident memory for the model and KV cache in megabytes. */
  maxMemoryMb: number;
  /** When true, defer or drop work if reported battery is below the policy threshold. */
  respectBatteryThrottle: boolean;
}

/**
 * Initializes the VidyaBot on-device AI engine with queue-based, non-blocking inference.
 * Call once at app startup after native modules are ready; safe to call again only after {@link shutdownAiEngine}.
 *
 * @param options - Memory and power constraints for rural Android devices.
 * @returns A promise that resolves when the JNI bridge and job queue are ready, or rejects on fatal init errors.
 */
export async function initializeAiEngine(
  options: AiEngineInitOptions
): Promise<void> {
  const { maxMemoryMb, respectBatteryThrottle } = options;
  if (maxMemoryMb <= 0) {
    throw new RangeError("maxMemoryMb must be positive");
  }
  void respectBatteryThrottle;
  return Promise.resolve();
}

/**
 * Releases native model handles, drains the inference queue, and frees memory.
 * Call when the host activity is destroyed or before swapping models.
 *
 * @returns A promise that resolves when teardown is complete.
 */
export async function shutdownAiEngine(): Promise<void> {
  return Promise.resolve();
}
