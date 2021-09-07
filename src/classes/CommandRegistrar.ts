import * as fs from "fs";
import { REST, RESTOptions } from "@discordjs/rest";
import { SlashCommandBuilder } from "@discordjs/builders";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";
import { CommandInteraction, Interaction } from "discord.js";
import moment from "moment";

declare function require(name: string): any;

export interface ICommandRegistrarCommand {
  data: SlashCommandBuilder;
  action(interaction: Interaction | CommandInteraction): Promise<any> | null;
}
interface APIReadyCommand {
  name: string;
  description: string;
  options: APIApplicationCommandOption[];
}

export default class CommandRegistrar {
  private commandDir: string;
  private commands: APIReadyCommand[];
  private commandFiles: string[];

  constructor() {
    process.stdout.write(
      `[${moment()}] Construct command registrar and find commands... `
    );
    this.commandDir = `${__dirname}/../commands`;
    this.commands = [];
    this.commandFiles = fs
      .readdirSync(this.commandDir)
      .filter((file: string) => file.endsWith(".ts"));

    for (const file of this.commandFiles) {
      const command: ICommandRegistrarCommand = require(`${this.commandDir}/${file}`);
      this.commands.push(command.data.toJSON());
    }
    process.stdout.write("OK\n");
  }

  public getCommandDir(): string {
    return this.commandDir;
  }

  public publishCommands(): void {
    if (
      !process.env.APPLICATION_ID ||
      !process.env.GUILD_ID ||
      !process.env.CLIENT_TOKEN
    ) {
      console.error(
        "Missing environment variables were found. Skipping app guild commands update. Did you populate your .env?"
      );
      return;
    }

    // TODO -- Add handling for dev environments
    // See the following for the different APIs for envs.
    // https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands

    const restOptions: Partial<RESTOptions> = {
      version: "9",
    };
    const rest = new REST(restOptions);
    rest.setToken(process.env.CLIENT_TOKEN);

    (async () => {
      try {
        process.stdout.write(
          `[${moment()}] Refreshing application commands... `
        );
        await rest.put(
          Routes.applicationGuildCommands(
            process.env.APPLICATION_ID ?? "",
            process.env.GUILD_ID ?? ""
          ),
          { body: this.commands }
        );
        process.stdout.write("OK\n");
      } catch (err) {
        console.error(err);
      }
    })();
  }

  public getCommands() {
    return this.commands;
  }
}
