import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { STATUS_CODE } from "../common/statusCode";
import { ERROR_MESSAGES } from "../common/error";
import { createAccessToken } from "../utils/jwtTokenCreation";
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
    if (!accessToken) {
      res
        .status(STATUS_CODE.INVALID_DATA)
        .json({
          success: false,
          message: ERROR_MESSAGES.TOKEN_MISSING,
          isUnAuth: true,
        });
      return;
    }
    jwt.verify(
      accessToken,
      accessTokenSecret,
      (
        err: jwt.VerifyErrors | null,
        decodedToken: JwtPayload | string | undefined,
      ) => {
        if (err) {
          if (err.name == "TokenExpiredError") {
            if (!refreshToken) {
              res
                .status(STATUS_CODE.INVALID_DATA)
                .json({
                  success: false,
                  message: ERROR_MESSAGES.TOKEN_MISSING,
                  isUnAuth: true,
                });
              return;
            }
            jwt.verify(
              refreshToken,
              refreshTokenSecret,
              (
                err: jwt.VerifyErrors | null,
                decodeToken: JwtPayload | string | undefined,
              ) => {
                if (err) {
                  if (err.name == "TokenExpiredError") {
                    res
                      .status(STATUS_CODE.INVALID_DATA)
                      .json({
                        success: false,
                        message: ERROR_MESSAGES.TOKEN_EXPIRED,
                        isUnAuth: true,
                      });
                    return;
                  }
                }
                if (typeof decodeToken === "object" && decodeToken !== null) {
                  const payload = decodeToken as { id: string; email: string };
                  const newAccessToken = createAccessToken({
                    id: payload.id,
                    email: payload.email,
                  });
                  res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                  });
                  return next();
                }
              },
            );
          }
        }
        return next();
      },
    );
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        isUnAuth: true,
      });
  }
};
