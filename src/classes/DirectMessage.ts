import { Message } from "discord.js";
import fs from "fs";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default class DirectMessage {
  // prettier-ignore
  public static defaultResponse: string = "Hey there, I see you messaged me, but unfortunately I'm not programmed to do anything to your DMs.\nI've saved your message, but do not count on a speedy reply. If something is an emergency, please reach out to someone else.";

  public static captureMessage(message: Message) {
    const uuid: string = uuidv4();
    const logMessage: string = `[${moment()}]\n\n${message.content}`;
    process.stdout.write(`[${moment()}] ${message.author.tag} sent a DM, capturing it to ${uuid.slice(-5)}... `); // pretiier-ignore

    fs.writeFile(
      `res/dms/${uuid}.dm.txt`,
      logMessage,
      "utf8",
      (error: unknown) => {
        if (error) {
          console.error(error);
          process.stdout.write("ERROR\n");
        } else {
          process.stdout.write("OK\n");
        }
      }
    );
  }
}
