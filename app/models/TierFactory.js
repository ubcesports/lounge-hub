import NoMembership from './tiers/NoMembership.js';
import Tier1 from './tiers/Tier1.js';
import Tier2 from './tiers/Tier2.js';
import PremierTier from './tiers/PremierTier.js';

export default class TierFactory {
  static create(tierNumber) {
    switch (tierNumber) {
      case 0:
        return new NoMembership();
      case 1:
        return new Tier1();
      case 2:
        return new Tier2();
      case 3:
        return new PremierTier();
      default:
        throw new Error(`Unknown tier number: ${tierNumber}`);
    }
  }

  static getAllTiers() {
    return {
      0: new NoMembership(),
      1: new Tier1(),
      2: new Tier2(),
      3: new PremierTier()
    };
  }

  static getTierNames() {
    const tiers = this.getAllTiers();
    const names = {};

    for (const [tierNumber, tier] of Object.entries(tiers)) {
      names[parseInt(tierNumber)] = tier.getName();
    }

    return names;
  }
}
