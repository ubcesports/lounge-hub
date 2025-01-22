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
}

export enum PCStatus {
  Open,
  Exec,
  Busy,
  Closed,
}

export namespace PCStatus {
  export function getMessage(
    status: PCStatus,
    openString: string,
    execString: string,
    busyString: string,
    closedString: string,
  ): string {
    switch (status) {
      case PCStatus.Open:
        return openString;
      case PCStatus.Exec:
        return execString;
      case PCStatus.Busy:
        return busyString;
      case PCStatus.Closed:
        return closedString;
      default:
        return "Unknown PC status.";
    }
  }
}
