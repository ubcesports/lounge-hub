import moment from "moment-timezone";
import MembershipTier from "../MembershipTier.js";

export default class PremierTier extends MembershipTier {
  getName() {
    return "Premier";
  }

  getExpiryDate() {
    return this.getNextMayFirst();
  }

  getSessionDurationMs() {
    return 5 * 60 * 60 * 1000; // 5 hours
  }

  hasDailyLimit() {
    return false;
  }

  isExpired(expiryDate) {
    const today = moment().tz("America/Los_Angeles").startOf("day");
    const expiry = moment(expiryDate).startOf("day");
    return today.isAfter(expiry);
  }

  getNextMayFirst() {
    const now = moment().tz("America/Los_Angeles");
    let year = now.year();
    if (now.month() >= 4) {
      year++;
    }
    return moment
      .tz(`${year}-05-01`, "America/Los_Angeles")
      .format("YYYY-MM-DD");
  }
}
