import { Types } from "mongoose";
import { IUrlDto } from "../../dtos/urlDto";

export interface IUrlRepository {
  createUrl(data: IUrlDto): Promise<void>;
  addUrl(
    userId: Types.ObjectId,
    urls: { longUrl: string; shortUrl: string; date: string },
  ): Promise<void>;
  findUrlByUserId(userId: Types.ObjectId): Promise<IUrlDto | null>;
  findUrl(url: string): Promise<string>;
}
