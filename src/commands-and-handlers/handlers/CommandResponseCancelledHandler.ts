import {Service} from "typedi";
import {CommandResponseCancelled} from "../commandResponse/CommandResponse";
import {Command, CommandStatus} from "../command/Command";
import {CommandResponseHandler} from "./CommandResponseHandler";

@Service()
export class CommandResponseCancelledHandler extends CommandResponseHandler {

  protected getCommandPayload(commandResponse: CommandResponseCancelled, command: Command): Partial<Command> {
    return {
      status: CommandStatus.FINISHED,
      startedAt:
        command.startedAt ??
        new Date(commandResponse.payloadMessage.cancelledAt),
      endedAt: new Date(commandResponse.payloadMessage.cancelledAt),
    };
  }

  protected statusIsValid(status: CommandStatus): boolean {
    return [
      CommandStatus.PENDING,
      CommandStatus.SCHEDULED,
      CommandStatus.IN_PROGRESS,
    ].includes(status)
  }
}
