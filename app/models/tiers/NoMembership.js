import MembershipTier from '../MembershipTier.js';

export default class NoMembership extends MembershipTier {
  getName() {
    return "No Membership";
  }

  getExpiryDate() {
    return null;
  }

  getSessionDurationMs() {
    return 0;
  }

  hasDailyLimit() {
    return false;
  }

  isExpired() {
    return false;
  }
}
