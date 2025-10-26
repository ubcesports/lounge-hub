import TierFactory from "@models/TierFactory";

/**
 * Calculates the remaining time for a gaming session
 * @param startedAt - ISO string of when the session started
 * @param membershipTier - The membership tier number
 * @returns Object with timeRemaining in ms and formatted string
 */
export function calculateTimeRemaining(
  startedAt: string,
  membershipTier: number,
): { timeRemainingMs: number; formatted: string } {
  const startTime = new Date(startedAt);
  const tier = TierFactory.create(membershipTier);
  const durationMs = tier.getSessionDurationMs();

  const endTime = new Date(startTime.getTime() + durationMs);
  const now = new Date();

  const timeDiff = endTime.getTime() - now.getTime();

  if (timeDiff <= 0) {
    return {
      timeRemainingMs: timeDiff,
      formatted: "Time Up",
    };
  }

  const formatted = formatDuration(timeDiff);
  return {
    timeRemainingMs: timeDiff,
    formatted,
  };
}

/**
 * Formats a duration in milliseconds to "Xh YYm" format
 * @param durationMs - Duration in milliseconds
 * @returns Formatted string like "2h 30m" or "45m"
 */
export function formatDuration(durationMs: number): string {
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor(durationMs / (1000 * 60 * 60));

  if (hours === 0) {
    return `${minutes.toString().padStart(2, "0")}m`;
  }

  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

/**
 * Formats time in HH:MM format
 * @param date - Date object
 * @returns Time string in "HH:MM" format
 */
export function formatTime(date: Date): string {
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
}

/**
 * Creates a formatted session info string for display
 * @param startedAt - ISO string of when session started
 * @param game - Name of the game being played
 * @param membershipTier - The membership tier number
 * @returns Formatted string like "Started 14:30 · Game · 1h 30m left" or "Started 14:30 · Game · Time exceeded 0h 15m"
 */
export function formatSessionInfo(
  startedAt: string,
  game: string,
  membershipTier: number,
): string {
  const startTime = new Date(startedAt);
  const { timeRemainingMs } = calculateTimeRemaining(startedAt, membershipTier);

  const startTimeStr = formatTime(startTime);

  if (timeRemainingMs >= 0) {
    const timeLeftStr = formatDuration(timeRemainingMs);
    return `Started ${startTimeStr} \u00B7 ${game} \u00B7 ${timeLeftStr} left`;
  } else {
    const exceededDuration = Math.abs(timeRemainingMs);
    const exceededStr = formatDuration(exceededDuration);
    return `Started ${startTimeStr} \u00B7 ${game} \u00B7 Time exceeded ${exceededStr}`;
  }
}
