import express from "express";
import { authController } from "../dependencyInjection/user";
const router = express.Router();

router.post("/register", (req, res) => authController.registerUser(req, res));

router.post("/signin", (req, res) => authController.loginUser(req, res));

router.post("/logout", (req, res) => authController.logoutUser(req, res));

export default router;
