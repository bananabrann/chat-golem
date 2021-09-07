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
}
