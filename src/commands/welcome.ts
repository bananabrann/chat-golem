import { CommandInteraction, GuildMember, TextChannel } from "discord.js";
import moment from "moment";
import GreetingMessage from "../classes/GreetingMessage";

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("Send a welcome message.")
    .addUserOption((option: any) =>
      option
        .setName("target")
        .setDescription("The user to be welcomed.")
        .setRequired(true)
    ),
  action: async (interaction: CommandInteraction): Promise<void> => {
    const targetMember = interaction.options.getMember("target");
    if (!(targetMember instanceof GuildMember)) {
      console.error(`[${moment()}] /welcome was called but targetMember was null or of an unexpected class.`); // prettier-ignore
      await interaction.reply({
        content:
          "Something happened and I couldn't find that member. This is probably a bug, please report me to Q.",
        ephemeral: true,
      });
    } else {
      const greeting: GreetingMessage = new GreetingMessage(
        targetMember,
        interaction.channel as TextChannel
      );
      greeting.sendGreeting();
      interaction.reply({
        content: "Okay, I sent it!",
        ephemeral: true,
      });
    }
  },
};
