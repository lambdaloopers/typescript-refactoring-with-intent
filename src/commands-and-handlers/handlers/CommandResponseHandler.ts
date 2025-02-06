import {CommandResponse} from "../commandResponse/CommandResponse";
import {Command, CommandStatus} from "../command/Command";
import {CommandRepository} from "../command/CommandRepository";

export abstract class CommandResponseHandler {
  constructor(protected readonly commandRepository: CommandRepository) {
  }

  public async handle(commandResponse: CommandResponse): Promise<void> {
    const command = await this.commandRepository.findByCommandId(
      commandResponse.id,
    );

    if (!command) {
      return;
    }

    if (this.statusIsValid(command.status)) {
      await this.commandRepository.updateByCommandId(
        commandResponse.id,
        this.getCommandPayload(commandResponse, command)
      );
    }
  }

  protected abstract getCommandPayload(commandResponse: CommandResponse, command: Command): Partial<Command>;

  protected abstract statusIsValid(status: CommandStatus): boolean;
}