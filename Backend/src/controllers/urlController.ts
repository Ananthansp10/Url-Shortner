import { ERROR_MESSAGES } from "../common/error";
import { STATUS_CODE } from "../common/statusCode";
import { SUCCESS_MESSAGE } from "../common/successMessages";
import { IUrlServices } from "../services/interface/IUrlServices";
import { Request, Response } from "express";
import { CustomError } from "../common/customError";

export class UrlController {
  constructor(private _urlServices: IUrlServices) {}

  async createShortUrl(req: Request, res: Response) {
    try {
      const result = await this._urlServices.generateShortUrl(
        req.body.userId,
        req.body.url,
        req.protocol,
        req.get("host") ?? "",
      );
      const shortUrl = `${req.protocol}://${req.get("host")}/${result}`;
      res.status(STATUS_CODE.SUCCESS_CODE).json({
        success: true,
        message: SUCCESS_MESSAGE.URL_SHORTED,
        data: shortUrl,
      });
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

  async getUserUrls(req: Request, res: Response) {
    try {
      const result = await this._urlServices.getUrls(req.params.userId);
      res.status(STATUS_CODE.SUCCESS_CODE).json({
        success: true,
        message: SUCCESS_MESSAGE.URL_FOUND,
        data: result,
      });
    } catch (error) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async redirectUrl(req: Request, res: Response) {
    try {
      const result = await this._urlServices.redirectUrl(
        req.params.userId,
        req.params.urlId,
      );
      if (result) {
        res.redirect(result);
      }
    } catch (error) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async redirect(req: Request, res: Response) {
    try {
      let result = await this._urlServices.redirect(
        `${req.protocol}://${req.get("host")}/${req.params.url}`,
      );
      res.redirect(result);
    } catch (error) {
      res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
  }
}
