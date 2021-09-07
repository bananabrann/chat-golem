require("dotenv").config();
import {
  Client,
  ClientOptions,
  CommandInteraction,
  GuildMember,
  Interaction,
  Message,
  TextChannel,
} from "discord.js";
import moment from "moment";
import GreetingMessage from "./classes/GreetingMessage";
import CommandRegistrar, {
  ICommandRegistrarCommand,
} from "./classes/CommandRegistrar";
import Utils from "./utils";

const CHANNEL_ID_HANGOUT: string = "745780665865207889";
const CHANNEL_ID_DEV: string = "881875634018734130";
const IS_PROD: boolean = process.env.ENV === "prod";
const CHANNEL_BASE_ID: string = IS_PROD ? CHANNEL_ID_HANGOUT : CHANNEL_ID_DEV;

const clientOptions: ClientOptions = {
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_MESSAGES",
  ],
};

const commandRegistrar: CommandRegistrar = new CommandRegistrar();
commandRegistrar.publishCommands();

const client: Client = new Client(clientOptions);

client.login(process.env.CLIENT_TOKEN);

client.on("ready", () => {
  console.log(`[${moment()}] Client ready, logged in as ${client.user?.tag}`);
});

client.on("messageCreate", async (message: Message) => {
  // DEV --
  if (message.mentions.users.has(client.user!.id) && !message.author.bot) {
  }
  // ------
});

client.on("interactionCreate", async (interaction: Interaction) => {
  // If interaction is not of type CommandInteraction
  if (!interaction.isCommand()) return;
  // prettier-ignore
  const targetCommand: ICommandRegistrarCommand = require(`${commandRegistrar.getCommandDir()}/${interaction.commandName}.ts`);
  targetCommand.action(interaction as CommandInteraction);
});

client.on("guildMemberAdd", (member: GuildMember) => {
  const targetChannel: TextChannel = client.channels.cache.get(
    CHANNEL_BASE_ID
  ) as TextChannel;
  const greeting: GreetingMessage = new GreetingMessage(member, targetChannel);
  greeting.sendGreeting();
});
