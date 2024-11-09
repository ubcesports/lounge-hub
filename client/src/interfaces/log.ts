export interface Log {
  firstName: string;
  lastName: string;
  studentNumber: string;
  game: string;
  pcNumber: string;
  startedAt: Date;
  endedAt: Date;
}

export interface APILog {
  student_number: string;
  pc_number: string;
  game: string;
  started_at: string;
  ended_at: string;
  first_name: string;
  last_name: string;
}
