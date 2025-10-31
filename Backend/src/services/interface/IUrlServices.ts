import { IUrlDto } from "../../dtos/urlDto";

export interface IUrlServices {
  generateShortUrl(
    userId: string,
    longUrl: string,
    protocol: string,
    host: string,
  ): Promise<string>;
  getUrls(userId: string): Promise<IUrlDto | null>;
  redirectUrl(userId: string, url: string): Promise<string | null>;
  redirect(url: string): Promise<string>;
}
