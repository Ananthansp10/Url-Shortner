import express from "express";
import { urlController } from "../dependencyInjection/urls";
import { verifyToken } from "../middlewares/verifyToken";
import { STATUS_CODE } from "../common/statusCode";
const router = express.Router();

router.get("/:url", (req, res) => urlController.redirect(req, res));

router.post("/verify-token", verifyToken, (req, res) => {
  res
    .status(STATUS_CODE.SUCCESS_CODE)
    .json({ success: true, message: "Valid Token", isUnAuth: false });
});

export default router;
