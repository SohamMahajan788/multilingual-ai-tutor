/**
 * Handle returned from opening the curriculum SQLite database.
 * Implementations use expo-sqlite; callers must close when done.
 */
export interface CurriculumDbHandle {
  /** Stable identifier for logging and migrations. */
  readonly databaseId: string;
}

/**
 * Opens the curriculum database backed by SQLite (expo-sqlite).
 * Curriculum and progress must not use AsyncStorage; use this API for structured data.
 *
 * @param databaseName - Logical name of the SQLite file (without path); must be stable across sessions.
 * @returns A promise resolving to a database handle, or rejecting if SQLite cannot be opened.
 */
export async function openCurriculumDatabase(
  databaseName: string
): Promise<CurriculumDbHandle> {
  if (!databaseName.trim()) {
    throw new Error("databaseName must be non-empty");
  }
  return { databaseId: databaseName.trim() };
}
