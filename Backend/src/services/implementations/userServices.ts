import { CustomError } from "../../common/customError";
import { ERROR_MESSAGES } from "../../common/error";
import { STATUS_CODE } from "../../common/statusCode";
import { IUserRegisterDto } from "../../dtos/userRegisterDto";
import { IUserResponseDto } from "../../dtos/userResponseDto";
import { UserRegisterMappper } from "../../mapper/userRegisterMapper";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { checkPassword } from "../../utils/checkPassword";
import { hashPassword } from "../../utils/hashPassword";
import { createAccessToken } from "../../utils/jwtTokenCreation";
import { IUserServices } from "../interface/IUserServices";

export class UserServices implements IUserServices {
  constructor(private _userRepo: IUserRepository) {}

  async registerUser(data: IUserRegisterDto): Promise<void> {
    try {
      const isEmailExist = await this._userRepo.findUserByEmail(data.email);
      if (isEmailExist) {
        throw new CustomError(ERROR_MESSAGES.EMAIL_EXIST, 409);
      }
      const isPhoneNumberExist = await this._userRepo.findUserByNumber(
        data.phoneNumber,
      );
      if (isPhoneNumberExist) {
        throw new CustomError(ERROR_MESSAGES.PHONE_NUMBER_EXIST, 409);
      }
      const hashedPassword = await hashPassword(data.password);
      await this._userRepo.createUser({ ...data, password: hashedPassword });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async userLogin(email: string, password: string): Promise<IUserResponseDto> {
    try {
      const userDetails = await this._userRepo.findUserByEmail(email);
      if (!userDetails) {
        throw new CustomError(
          ERROR_MESSAGES.USER_NOT_FOUND,
          STATUS_CODE.USER_NOT_FOUND,
        );
      }
      const isPasswordMatch = await checkPassword(
        password,
        userDetails.password,
      );
      if (!isPasswordMatch) {
        throw new CustomError(
          ERROR_MESSAGES.PASSWORD_WRONG,
          STATUS_CODE.INVALID_DATA,
        );
      }
      const accessToken = createAccessToken({
        id: userDetails._id ?? "",
        email: userDetails.email,
      });
      const refreshToken = createAccessToken({
        id: userDetails._id ?? "",
        email: userDetails.email,
      });

      return UserRegisterMappper.userResponseMapper(
        userDetails,
        accessToken,
        refreshToken,
      );
    } catch (error) {
      throw error;
    }
  }
}
