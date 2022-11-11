export class UserDiscordIdExtractor {
  public static ExtractDiscordId(user: any): string {
    const sub = user['sub'];
    const parts = sub.split('|');
    return parts[parts.length -1];
  }
}