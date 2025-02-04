import {Container, Service} from "typedi";
import {CommandResponse, CommandResponseType,} from "./commandResponse/CommandResponse";
import {CommandResponseDispatchedHandler} from "./handlers/CommandResponseDispatchedHandler";
import {CommandResponseCancelledHandler} from "./handlers/CommandResponseCancelledHandler";
import {CommandResponseCompletedHandler} from "./handlers/CommandResponseCompletedHandler";
import {CommandResponseExpiredHandler} from "./handlers/CommandResponseExpiredHandler";
import {CommandResponseRejectedHandler} from "./handlers/CommandResponseRejectedHandler";

@Service()
export class CommandResponseProcessor {
  constructor() {}

  public async process(commandResponses: CommandResponse[]): Promise<void> {
    if (commandResponses.length === 0) {
      return;
    }

    const commandResponseDispatchedHandler = Container
      .get<CommandResponseDispatchedHandler>(CommandResponseDispatchedHandler);
    const commandResponseCancelledHandler = Container
      .get<CommandResponseCancelledHandler>(CommandResponseCancelledHandler);
    const commandResponseCompletedHandler = Container
      .get<CommandResponseCompletedHandler>(CommandResponseCompletedHandler);
    const commandResponseExpiredHandler = Container
      .get<CommandResponseExpiredHandler>(CommandResponseExpiredHandler);
    const commandResponseRejectedHandler = Container
      .get<CommandResponseRejectedHandler>(CommandResponseRejectedHandler);

    for (const commandResponse of commandResponses) {
      let handler = null;
      switch (commandResponse.type) {
        case CommandResponseType.Dispatched:
          handler = commandResponseDispatchedHandler;
          break;
        case CommandResponseType.Cancelled:
          handler = commandResponseCancelledHandler;
          break;
        case CommandResponseType.Completed:
          handler = commandResponseCompletedHandler;
          break;
        case CommandResponseType.Expired:
          handler = commandResponseExpiredHandler;
          break;
        case CommandResponseType.Reject:
          handler = commandResponseRejectedHandler;
          break;
      }

      if (!handler) {
        await this.processUnknown(commandResponse);
      } else {
        await handler.handle(commandResponse as never);
      }
    }
  }

  private async processUnknown(commandResponse: unknown): Promise<void> {
    console.log("Unknown", commandResponse);
  }
}
