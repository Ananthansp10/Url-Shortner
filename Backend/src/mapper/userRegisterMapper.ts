import { IUserRegisterDto } from "../dtos/userRegisterDto";
import { IUserResponseDto } from "../dtos/userResponseDto";

export class UserRegisterMappper {
  static userResponseMapper(
    userData: IUserRegisterDto,
    accessToken: string,
    refreshToken: string,
  ): IUserResponseDto {
    return {
      userData: {
        id: userData._id?.toString() ?? "",
        userName: userData.userName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
