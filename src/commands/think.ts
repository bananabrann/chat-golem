import { CommandInteraction } from "discord.js";
import ThinkBomb from "../classes/ThinkBomb";

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("think")
    .setDescription(
      "Emoji bomb chat with all custom think emojis. You're welcome."
    ),

  action: async (interaction: CommandInteraction): Promise<void> => {
    if (!interaction.guild) {
      await interaction.reply({
        content:
          "Well this is awkward. This is a bug, please message Q. Error code: 'LOLSHITTYDEV'",
        ephemeral: true,
      });
      return;
    }

    const emojisAsString: string = ThinkBomb.getPreparedEmojisAsString(
      interaction.guild
    );
    await interaction.reply({
      content: emojisAsString,
      ephemeral: false,
    });
  },
};
