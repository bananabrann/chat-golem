import { Message, MessageEmbed, TextBasedChannels } from "discord.js";

export default class SuggestionMessage {
  private readonly message: Message;

  constructor(message: Message) {
    this.message = message as Message;
  }

  public react(): void {
    this.message.react("👍");
    this.message.react("👎");
  }
}
