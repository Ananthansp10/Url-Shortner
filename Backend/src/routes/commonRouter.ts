import express from "express";
import { urlController } from "../dependencyInjection/urls";
const router = express.Router();

router.get("/:url", (req, res) => urlController.redirect(req, res));

export default router;
