// const { SlashCommandBuilder } = require("@discordjs/builders");
import { SlashCommandBuilder } from "@discordjs/builders";
import { DiscordAPIError } from "@discordjs/rest";
import {
  CommandInteraction,
  GuildMember,
  Message,
  TextChannel,
} from "discord.js";
import moment from "moment";
import Utils from "../utils";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("copy")
    .setDescription("Copies a message of given ID to a given channel")
    // FIXME -- Add type SlashCommandStringOption
    .addStringOption((option: any) =>
      option
        .setName("message")
        .setDescription("The ID of the message to be sent.")
        .setRequired(true)
    )
    // TODO -- Add type SlashCommandChannelOption
    .addChannelOption((option: any) =>
      option
        .setName("channel")
        .setDescription("The channel the message should be sent to.")
        .setRequired(true)
    ),
  action: async (interaction: CommandInteraction): Promise<void> => {
    // TODO -- Move to some other file or something
    const exemplarKnight: string = "414042748375531531";
    const roundtableKnight: string = "832480874561929227";
    const outriderKnight: string = "841497782283927552";
    const discordAdmin: string = "881654496000901130";

    const messageId: string = interaction.options.getString("message") ?? "";
    const member: GuildMember = interaction.member as GuildMember;
    const isAuthorized: boolean = Utils.isAuthorized(member as GuildMember, [
      discordAdmin,
      exemplarKnight,
      roundtableKnight,
      outriderKnight,
    ]);
    let targetMessage: Message;
    let targetChannel: TextChannel;

    process.stdout.write(`[${moment()}] ${member.user.tag} called /copy... `);

    // SECTION
    // Check and verify
    if (!(member instanceof GuildMember)) {
      process.stdout.write(`ERROR\n`);

      await interaction.reply({
        content:
          "I don't know who you are, therefore cannot verify you. This is probably a bug, please report me to Q.",
        ephemeral: true,
      });
      return;
    }

    if (!isAuthorized) {
      process.stdout.write(`UNATHORIZED\n`);
      await interaction.reply({
        content: "You don't have permission to do that.",
        ephemeral: true,
      });
      return;
    }

    // SECTION
    // Parse and send message
    try {
      // Fetch message and channel
      // prettier-ignore
      targetMessage = await interaction.channel!.messages.fetch(messageId);
      targetChannel = interaction.options.getChannel("channel") as TextChannel;
      // Send message
      targetChannel.send(targetMessage.content);
      // Report
      interaction.reply(`Copied mesage to #${targetChannel.name}.`);

      process.stdout.write(`OK\n`);
    } catch (error: unknown) {
      process.stdout.write(`ERROR or BAD OPTIONS\n`);
      console.error(error);
      interaction.reply({
        content: `${error}\n\nAn error happened. Is your message ID valid?\nI've logged this, but if you think this is a bug, **please report this to Q.**`,
        ephemeral: true,
      });
    }
  },
};
