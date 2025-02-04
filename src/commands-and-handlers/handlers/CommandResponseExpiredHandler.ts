import { Service } from "typedi";
import { CommandStatus } from "../command/Command";
import { CommandRepository } from "../command/CommandRepository";
import { CommandResponseExpired } from "../commandResponse/CommandResponse";

@Service()
export class CommandResponseExpiredHandler {
  constructor(private readonly commandRepository: CommandRepository) {}

  public async handle(commandResponse: CommandResponseExpired): Promise<void> {
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
          new Date(commandResponse.payloadMessage.expiredAt),
        endedAt: new Date(commandResponse.payloadMessage.expiredAt),
      });
    }
  }
}
