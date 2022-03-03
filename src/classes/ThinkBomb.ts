import {
  CommandInteraction,
  Guild,
  GuildEmojiManager,
  Interaction,
  Message,
  TextChannel,
} from "discord.js";
import Utils from "../utils";

// I mean, this should really just be functions, right?...
export default class ThinkBomb {
  public static getPreparedEmojis(guild: Guild): string[] {
    const emojiManager: GuildEmojiManager | null = guild?.emojis ?? null;
    let customThinkEmojiIds: string[] = [];

    if (emojiManager) {
      // Harvest all the emojis and organize them as an interpretable string
      for (const [key, value] of emojiManager.cache.entries()) {
        if (value.name?.toLocaleLowerCase().includes("think")) {
          // Expected value for custom emojis by Discord chat is
          // <name:id> and <a:name:id> for animated emojis
          // prettier-ignore
          const s: string = `<${value.animated ? "a" : ""}:${value.name}:${key}>`;
          customThinkEmojiIds.push(s);
        }
      }
    }
    return customThinkEmojiIds

  }

  public static getPreparedEmojisAsString(guild: Guild) {
    return this.getPreparedEmojis(guild).join('')
  }

  public static reactThinkBomb(message: Message) {
    if (!message.guild) return;

    let customThinkEmojis = this.getPreparedEmojis(message.guild);

    // Shuffle and limit reactions to 20 (Discord has a limit)
    // FIXME -- Bot crashes if reactions are added by humans while the bot is
    // adding them
    customThinkEmojis = Utils.shuffle(customThinkEmojis).slice(0, 20);
    customThinkEmojis.forEach((e) => {
      message.react(e);
    });
  }
}
