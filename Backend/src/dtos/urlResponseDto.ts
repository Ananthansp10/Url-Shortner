import { Types } from "mongoose";
import { IUrlDto } from "./urlDto";

export interface UrlResponseDto {
  userId: Types.ObjectId;
  urls: IUrlDto;
}
