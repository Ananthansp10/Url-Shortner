import { Types } from "mongoose";
import { IUrlDto } from "../../dtos/urlDto";
import { IUrlRepository } from "../interface/IUrlRepository";
import { urlsModel } from "../../models/urlsModel";

export class UrlRepository implements IUrlRepository {
  async createUrl(data: IUrlDto): Promise<void> {
    await urlsModel.create(data);
  }

  async addUrl(
    userId: Types.ObjectId,
    urls: { longUrl: string; shortUrl: string; date: string },
  ): Promise<void> {
    await urlsModel.updateOne({ userId: userId }, { $push: { urls: urls } });
  }

  async findUrlByUserId(userId: Types.ObjectId): Promise<IUrlDto | null> {
    return await urlsModel.findOne({ userId: userId });
  }

  async findUrl(url: string): Promise<string> {
    let result = await urlsModel.aggregate([
      {
        $unwind: "$urls",
      },
      {
        $match: {
          "urls.shortUrl": url,
        },
      },
    ]);
    return result[0].urls.longUrl;
  }
}
