export enum CommandResponseType {
  Dispatched = "Dispatched",
  Cancelled = "Cancelled",
  Completed = "Completed",
  Expired = "Expired",
  Reject = "Reject",
}

export interface CommandResponseBase {
  id: string;
  serverId: string;
  /** ISO Date */
  emittedAt: string;
}

export type CommandResponseDispatched = CommandResponseBase & {
  type: CommandResponseType.Dispatched;
  payloadMessage: {
    /** ISO Date */
    dispatchedAt: string;
  };
};

export type CommandResponseCancelled = CommandResponseBase & {
  type: CommandResponseType.Cancelled;
  payloadMessage: {
    /** ISO Date */
    cancelledAt: string;
    reason: string;
  };
};

export type CommandResponseCompleted = CommandResponseBase & {
  type: CommandResponseType.Completed;
  payloadMessage: {
    /** ISO Date */
    completedAt: string;
  };
};

export type CommandResponseExpired = CommandResponseBase & {
  type: CommandResponseType.Expired;
  payloadMessage: {
    /** ISO Date */
    expiredAt: string;
  };
};

export type CommandResponseRejected = CommandResponseBase & {
  type: CommandResponseType.Reject;
  payloadMessage: {
    rejectedAt: string;
    reason: string;
  };
};

export type CommandResponse =
  | CommandResponseDispatched
  | CommandResponseCancelled
  | CommandResponseCompleted
  | CommandResponseExpired
  | CommandResponseRejected;
