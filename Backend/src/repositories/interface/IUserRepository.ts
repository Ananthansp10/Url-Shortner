import { IUserRegisterDto } from "../../dtos/userRegisterDto";

export interface IUserRepository {
  createUser(data: IUserRegisterDto): Promise<void>;
  findUserByEmail(email: string): Promise<IUserRegisterDto | null>;
  findUserByNumber(phoneNumber: string): Promise<IUserRegisterDto | null>;
}
