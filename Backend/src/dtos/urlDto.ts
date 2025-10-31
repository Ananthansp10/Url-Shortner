import { Types } from "mongoose";

export interface IUrlDto {
  userId: Types.ObjectId;
  urls: {
    longUrl: string;
    shortUrl: string;
    date: string;
  }[];
}
