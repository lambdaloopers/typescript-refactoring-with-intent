import {Service} from "typedi";
import {Command, CommandStatus} from "../command/Command";
import {CommandResponseExpired} from "../commandResponse/CommandResponse";
import {CommandResponseHandler} from "./CommandResponseHandler";

@Service()
export class CommandResponseExpiredHandler extends CommandResponseHandler {

  protected getCommandPayload(commandResponse: CommandResponseExpired, command: Command): Partial<Command> {
    return {
      status: CommandStatus.FINISHED,
      startedAt:
        command.startedAt ??
        new Date(commandResponse.payloadMessage.expiredAt),
      endedAt: new Date(commandResponse.payloadMessage.expiredAt),
    };
  }

  protected statusIsValid(status: CommandStatus): boolean {
    return [
      CommandStatus.PENDING,
      CommandStatus.IN_PROGRESS,
    ].includes(status)
  }
}
