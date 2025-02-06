import {Service} from "typedi";
import {CommandResponseCompleted} from "../commandResponse/CommandResponse";
import {Command, CommandStatus} from "../command/Command";
import {CommandResponseHandler} from "./CommandResponseHandler";

@Service()
export class CommandResponseCompletedHandler extends CommandResponseHandler {

  protected getCommandPayload(commandResponse: CommandResponseCompleted, command: Command): Partial<Command> {
    return {
      status: CommandStatus.FINISHED,
      startedAt:
        command.startedAt ??
        new Date(commandResponse.payloadMessage.completedAt),
      endedAt: new Date(commandResponse.payloadMessage.completedAt),
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
