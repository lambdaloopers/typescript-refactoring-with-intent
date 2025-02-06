import {Service} from "typedi";
import {CommandResponseDispatched} from "../commandResponse/CommandResponse";
import {Command, CommandStatus} from "../command/Command";
import {CommandResponseHandler} from "./CommandResponseHandler";

@Service()
export class CommandResponseDispatchedHandler extends CommandResponseHandler {

  protected getCommandPayload(commandResponse: CommandResponseDispatched, command: Command): Partial<Command> {
    return {
      status: CommandStatus.IN_PROGRESS,
      startedAt: new Date(commandResponse.payloadMessage.dispatchedAt),
    };
  }

  protected statusIsValid(status: CommandStatus): boolean {
    return [
      CommandStatus.SCHEDULED,
    ].includes(status)
  }
}
