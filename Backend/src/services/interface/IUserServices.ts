import { IUserRegisterDto } from "../../dtos/userRegisterDto";
import { IUserResponseDto } from "../../dtos/userResponseDto";

export interface IUserServices {
  registerUser(data: IUserRegisterDto): Promise<void>;
  userLogin(email: string, password: string): Promise<IUserResponseDto>;
}
