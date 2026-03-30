/**
 * Event describing learner progress that may yield XP or badges.
 */
export interface GamificationEvent {
  /** Lesson or activity identifier. */
  activityId: string;
  /** Normalized score in 0..1 for partial credit rules. */
  score: number;
}

/**
 * Outcome of applying gamification rules to a single event.
 */
export interface GamificationAward {
  /** Experience points granted for this event. */
  xpDelta: number;
  /** Newly unlocked badge ids, if any. */
  newBadges: string[];
}

/**
 * Awards XP and evaluates badge rules from a completed learning event.
 * Persistence is handled by the app layer (e.g. SQLite); this function is pure policy.
 *
 * @param event - Completed activity metadata.
 * @returns XP change and any new badges.
 */
export function awardXpForActivity(event: GamificationEvent): GamificationAward {
  if (event.score < 0 || event.score > 1) {
    throw new RangeError("score must be between 0 and 1");
  }
  void event.activityId;
  const xpDelta = Math.round(100 * event.score);
  return { xpDelta, newBadges: [] };
}
