import mongoose from "mongoose";
import { IUrlDto } from "../../dtos/urlDto";
import { IUrlRepository } from "../../repositories/interface/IUrlRepository";
import { IUrlServices } from "../interface/IUrlServices";
import { nanoid } from "nanoid";
import { CustomError } from "../../common/customError";
import { ERROR_MESSAGES } from "../../common/error";
import { STATUS_CODE } from "../../common/statusCode";

export class UrlServices implements IUrlServices {
  constructor(private _urlRepo: IUrlRepository) {}

  async generateShortUrl(
    userId: string,
    longUrl: string,
    protocol: string,
    host: string,
  ): Promise<string> {
    try {
      try {
        new URL(longUrl);
      } catch (error) {
        throw new CustomError(
          ERROR_MESSAGES.INVALID_URL,
          STATUS_CODE.BAD_REQUEST,
        );
      }
      const shortId = nanoid(7);
      const shortUrl = `${protocol}://${host}/${shortId}`;
      const isUrlExist = await this._urlRepo.findUrlByUserId(
        new mongoose.Types.ObjectId(userId),
      );
      const isLongUrlExist = isUrlExist?.urls.find(
        (url) => url.longUrl == longUrl,
      );
      if (isLongUrlExist) {
        throw new CustomError("Url already exist", 409);
      }
      if (isUrlExist) {
        await this._urlRepo.addUrl(new mongoose.Types.ObjectId(userId), {
          longUrl: longUrl,
          shortUrl: shortUrl,
          date: new Date().toISOString().split("T")[0],
        });
      } else {
        let userUrlObj = {
          userId: new mongoose.Types.ObjectId(userId),
          urls: [
            {
              longUrl: longUrl,
              shortUrl: shortUrl,
              date: new Date().toISOString().split("T")[0],
            },
          ],
        };
        await this._urlRepo.createUrl(userUrlObj);
      }
      return shortId;
    } catch (error) {
      throw error;
    }
  }

  async getUrls(userId: string): Promise<IUrlDto | null> {
    try {
      const userUrls = await this._urlRepo.findUrlByUserId(
        new mongoose.Types.ObjectId(userId),
      );
      if (!userUrls || userUrls.urls.length == 0) {
        return null;
      } else {
        return userUrls;
      }
    } catch (error) {
      throw error;
    }
  }

  async redirectUrl(userId: string, url: string): Promise<string | null> {
    try {
      const findUrl = await this._urlRepo.findUrlByUserId(
        new mongoose.Types.ObjectId(userId),
      );
      const longUrl = findUrl?.urls.find((urls) => urls.shortUrl == url);
      return longUrl?.longUrl ?? null;
    } catch (error) {
      throw error;
    }
  }

  async redirect(url: string): Promise<string> {
    try {
      let result = this._urlRepo.findUrl(url);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
