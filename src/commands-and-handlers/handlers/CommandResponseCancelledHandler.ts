import { Service } from "typedi";
import { CommandResponseCancelled } from "../commandResponse/CommandResponse";
import { CommandStatus } from "../command/Command";
import { CommandRepository } from "../command/CommandRepository";

@Service()
export class CommandResponseCancelledHandler {
  constructor(private readonly commandRepository: CommandRepository) {}

  public async handle(
    commandResponse: CommandResponseCancelled,
  ): Promise<void> {
    const command = await this.commandRepository.findByCommandId(
      commandResponse.id,
    );

    if (!command) {
      return;
    }

    if (
      [
        CommandStatus.PENDING,
        CommandStatus.SCHEDULED,
        CommandStatus.IN_PROGRESS,
      ].includes(command.status as CommandStatus)
    ) {
      await this.commandRepository.updateByCommandId(commandResponse.id, {
        status: CommandStatus.FINISHED,
        startedAt:
          command.startedAt ??
          new Date(commandResponse.payloadMessage.cancelledAt),
        endedAt: new Date(commandResponse.payloadMessage.cancelledAt),
      });
    }
  }
}
