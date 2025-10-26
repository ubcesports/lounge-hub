/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Base class for membership tiers
 * Shared between frontend and backend
 */
class MembershipTier {
  getName() {
    throw new Error("getName() must be implemented");
  }

  getExpiryDate(firstCheckIn) {
    throw new Error("getExpiryDate() must be implemented");
  }

  getSessionDurationMs() {
    throw new Error("getSessionDurationMs() must be implemented");
  }

  hasDailyLimit() {
    throw new Error("hasDailyLimit() must be implemented");
  }

  isExpired(expiryDate, firstCheckInToday) {
    throw new Error("isExpired() must be implemented");
  }
}

export default MembershipTier;
