export interface PCList {
  pcs: PC[];
}

export interface PC {
  studentNumber: string;
  pcNumber: number;
  game: string;
  startedAt: string;
  firstName: string;
  lastName: string;
  membershipTier: number;
  notes: string;
  type: "empty" | "regular" | "wide";
  col: string;
  row: string;
}
