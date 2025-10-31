import express from "express";
import { urlController } from "../dependencyInjection/urls";
import { verifyToken } from "../middlewares/verifyToken";
const router = express.Router();

router.post("/create-short-url", verifyToken, (req, res) =>
  urlController.createShortUrl(req, res),
);

router.get("/get-user-url/:userId", verifyToken, (req, res) =>
  urlController.getUserUrls(req, res),
);

router.post("/redirect-url/:userId/:urlId", verifyToken, (req, res) =>
  urlController.redirectUrl(req, res),
);

export default router;
