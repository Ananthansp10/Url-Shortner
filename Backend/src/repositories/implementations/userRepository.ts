import { Types } from "mongoose";
import { IUserRegisterDto } from "../../dtos/userRegisterDto";
import { IUserRepository } from "../interface/IUserRepository";
import { userModel } from "../../models/userModel";

export class UserRepository implements IUserRepository {
  async createUser(data: IUserRegisterDto): Promise<void> {
    await userModel.create(data);
  }

  async findUserByEmail(email: string): Promise<IUserRegisterDto | null> {
    return await userModel.findOne({ email: email });
  }

  async findUserByNumber(
    phoneNumber: string,
  ): Promise<IUserRegisterDto | null> {
    return await userModel.findOne({ phoneNumber: phoneNumber });
  }
}
