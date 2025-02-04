export enum CommandStatus {
  SCHEDULED = "scheduled",
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  FINISHED = "finished",
}

export interface Command {
  commandId: string;
  startedAt?: Date | null;
  endedAt?: Date | null;
  status: CommandStatus;
  data: unknown;
}
