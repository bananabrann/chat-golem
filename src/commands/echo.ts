import { CommandInteraction } from "discord.js";
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies with your input.")
    .addStringOption((option: any) =>
      option
        .setName("input")
        .setDescription("The input to echo back.")
        .setRequired(true)
    ),
  action: async (interaction: CommandInteraction): Promise<void> => {
    const replyMessage = interaction.options?.getString("input");
    await interaction.reply(replyMessage!.toString());
  },
};
