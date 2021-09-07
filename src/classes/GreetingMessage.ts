import {
    GuildMember,
    Message,
    MessageEmbed,
    TextChannel,
    User,
} from "discord.js";
import Utils from "../utils";

export default class GreetingMessage {
    readonly member: GuildMember;
    readonly targetChannel: TextChannel;

    constructor(member: GuildMember, targetChannel: TextChannel) {
        this.member = member;
        this.targetChannel = targetChannel as TextChannel;
    }

    private readonly messageOptions: string[] = [
        "This—unit—will—now—greet—you. GREETINGS. Welcome—to—the—guild, —ANALYSIS— %name",
        "Checking %name for excessive Sylvari lifeforce ...\n——RESULTS——. Inconclusive. Welcome, %name.",
        "Drawing quantum intersection matrices. Collaborating hyper-warp fractalization. Member found, hello %name.",
        "——Activating 5G——. ——Engaging 60FPS——. ——SUCCESS——!\nWelcome, %name. ",
    ];

    private getRandomMessage(): string {
        let message: string = Utils.getRandomFromArray(
            this.messageOptions
        ).replace(/%name/g, this.member.user.username);

        return message;
    }

    private getMessageEmbed(): MessageEmbed {
        const message: MessageEmbed = new MessageEmbed()
            .setTitle("Welcome")
            .setColor("#a642d4")
            .setDescription(this.getRandomMessage())
            .setThumbnail(this.member.user.displayAvatarURL())
            .setTimestamp();

        return message;
    }

    public sendGreeting(): void {
        this.targetChannel
            .send({ embeds: [this.getMessageEmbed()] })
            .then((message: Message) => {
                message.react("👋");
            });
    }
}
