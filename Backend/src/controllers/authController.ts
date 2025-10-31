import { CustomError } from "../common/customError";
import { ERROR_MESSAGES } from "../common/error";
import { STATUS_CODE } from "../common/statusCode";
import { SUCCESS_MESSAGE } from "../common/successMessages";
import { IUserResponseDto } from "../dtos/userResponseDto";
import { IUserServices } from "../services/interface/IUserServices";
import { Request, Response } from "express";

export class AuthController {
  constructor(private _userService: IUserServices) {}

  async registerUser(req: Request, res: Response) {
    try {
      await this._userService.registerUser(req.body);
      res
        .status(STATUS_CODE.SUCCESS_CODE)
        .json({ success: true, message: SUCCESS_MESSAGE.USER_CREATED });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      }
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { userData, accessToken, refreshToken }: IUserResponseDto =
        await this._userService.userLogin(req.body.email, req.body.password);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(STATUS_CODE.SUCCESS_CODE).json({
        success: true,
        message: SUCCESS_MESSAGE.USER_LOGGEDIN,
        data: userData,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
          success: false,
          messsage: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  async logoutUser(req: Request, res: Response) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res
        .status(STATUS_CODE.SUCCESS_CODE)
        .json({ success: true, message: SUCCESS_MESSAGE.USER_LOGOUT });
    } catch (error) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
