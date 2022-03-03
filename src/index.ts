require("dotenv").config();
import {
  Client,
  ClientOptions,
  Collection,
  CommandInteraction,
  Emoji,
  GuildEmoji,
  GuildEmojiManager,
  GuildMember,
  Interaction,
  Message,
  Snowflake,
  TextChannel,
} from "discord.js";
import moment from "moment";
import GreetingMessage from "./classes/GreetingMessage";
import CommandRegistrar, { ICommandRegistrarCommand, } from "./classes/CommandRegistrar"; // prettier-ignore
import DirectMessage from "./classes/DirectMessage";
import SuggestionMessage from "./classes/SuggestionMessage";
import { Database } from "sqlite";
import { openDb } from "./db";
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
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_TYPING",
  ],
  /*
    NOTE -
    On Discord API v8 and later, DM Channels do not emit the CHANNEL_CREATE event,
    which means discord.js is unable to cache them automatically. In order for your
    bot to receive DMs, the CHANNEL partial must be enabled.
  */
  partials: ["CHANNEL"],
};

const db: Database = openDb();

const commandRegistrar: CommandRegistrar = new CommandRegistrar();
commandRegistrar.publishCommands();

const client: Client = new Client(clientOptions);

client.login(process.env.CLIENT_TOKEN);

client.on("ready", () => {
  console.log(`[${moment()}] Client ready, logged in as ${client.user?.tag}`);
});

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return; // Message is itself

  if (!message.guild) {
    // Message is a DM
    message.reply(DirectMessage.defaultResponse);
    DirectMessage.captureMessage(message);
  }

  if (message.channel.id == process.env.CHANNEL_ID_SUGGESTIONS) {
    // Message is in #suggestions
    const suggestionMessage: SuggestionMessage = new SuggestionMessage(message);
    suggestionMessage.react();
  }

  if (
    message.content.toLowerCase().includes(":think") ||
    message.content.toLowerCase().includes("think:") ||
    message.content.includes("🤔")
  ) {
    // prettier-ignore
    const emojiManager: GuildEmojiManager | null = message.guild?.emojis ?? null;
    let customThinkEmojiIds: string[] = [];


    if (emojiManager) {
      // Harvest all the emojis and organize them as an interpretable string
      for (const [key, value] of emojiManager.cache.entries()) {
        if (value.name?.toLocaleLowerCase().includes("think")) {
          // prettier-ignore
          const s: string = `<${value.animated ? "a" : ""}:${value.name}:${key}>`;
          customThinkEmojiIds.push(s);
        }
      }

      // Shuffle and cap emojis (Discord has a reaction per message limit)
      // then react to the message
      customThinkEmojiIds = Utils.shuffle(customThinkEmojiIds).slice(0, 20);
      customThinkEmojiIds.forEach((e) => {
        message.react(e);
      });
    }
  }
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
