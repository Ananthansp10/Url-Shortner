import { AuthController } from "../controllers/authController";
import { UserRepository } from "../repositories/implementations/userRepository";
import { UserServices } from "../services/implementations/userServices";

const userRepo = new UserRepository();
const userServices = new UserServices(userRepo);

export const authController = new AuthController(userServices);
