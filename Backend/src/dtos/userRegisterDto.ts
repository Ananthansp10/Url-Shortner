import { Types } from "mongoose";

export interface IUserRegisterDto {
  _id?: Types.ObjectId;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
