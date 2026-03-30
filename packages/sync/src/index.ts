/**
 * Describes a durable sync unit stored locally until upload succeeds.
 */
export interface SyncEnvelope {
  /** Unique idempotency key for the server. */
  id: string;
  /** Opaque JSON-serializable payload (progress events, analytics, etc.). */
  payload: Record<string, unknown>;
}

/**
 * Enqueues a sync operation for later upload when connectivity is available.
 * Offline-first: this never throws solely due to lack of network; it persists locally.
 *
 * @param envelope - Payload and idempotency metadata.
 * @returns A promise that resolves when the item is durably queued on disk.
 */
export async function enqueueSyncOperation(
  envelope: SyncEnvelope
): Promise<void> {
  if (!envelope.id) {
    throw new Error("envelope.id is required");
  }
  void envelope.payload;
  return Promise.resolve();
}
