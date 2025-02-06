import {Service} from "typedi";
import {CommandResponseRejected} from "../commandResponse/CommandResponse";
import {Command, CommandStatus} from "../command/Command";
import {CommandResponseHandler} from "./CommandResponseHandler";

@Service()
export class CommandResponseRejectedHandler extends CommandResponseHandler {

  protected getCommandPayload(commandResponse: CommandResponseRejected, command: Command): Partial<Command> {
    return {
      status: CommandStatus.FINISHED,
      startedAt:
        command.startedAt ??
        new Date(commandResponse.payloadMessage.rejectedAt),
      endedAt: new Date(commandResponse.payloadMessage.rejectedAt),
    };
  }

  protected statusIsValid(status: CommandStatus): boolean {
    return [
      CommandStatus.SCHEDULED,
    ].includes(status)
  }
}
