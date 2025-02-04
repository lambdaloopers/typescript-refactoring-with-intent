import { Service } from "typedi";
import { CommandResponseDispatched } from "../commandResponse/CommandResponse";
import { CommandRepository } from "../command/CommandRepository";
import { CommandStatus } from "../command/Command";

@Service()
export class CommandResponseDispatchedHandler {
  constructor(private readonly commandRepository: CommandRepository) {}

  public async handle(
    commandResponse: CommandResponseDispatched,
  ): Promise<void> {
    const command = await this.commandRepository.findByCommandId(
      commandResponse.id,
    );

    if (!command) {
      return;
    }

    if (
      [CommandStatus.PENDING, CommandStatus.SCHEDULED].includes(
        command.status as CommandStatus,
      )
    ) {
      await this.commandRepository.updateByCommandId(commandResponse.id, {
        status: CommandStatus.IN_PROGRESS,
        startedAt: new Date(commandResponse.payloadMessage.dispatchedAt),
      });
    }
  }
}
