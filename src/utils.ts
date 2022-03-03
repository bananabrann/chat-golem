import { GuildMember, Role } from "discord.js";

export default class Utils {
  static getRandomFromArray(a: string[]): string {
    const randomElement = a[Math.floor(Math.random() * a.length)];
    return randomElement;
  }

  static isAuthorized(member: GuildMember, allowedRoles: string[]): boolean {
    let isAllowed: boolean = false;
    member.roles.cache.map((role: Role) => {
      if (allowedRoles.includes(role.id)) isAllowed = true;
    });
    return isAllowed;
  }

  static shuffle(a: Array<any>) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
