import { Service } from "typedi";
import { Command } from "./Command";

@Service()
export class CommandRepository {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findByCommandId(commandId: string): Promise<Command | null> {
    return null;
  }

  public async updateByCommandId(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    commandId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: Partial<Command>,
  ): Promise<void> {}
}
