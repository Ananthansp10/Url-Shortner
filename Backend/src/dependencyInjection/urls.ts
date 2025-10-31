import { UrlController } from "../controllers/urlController";
import { UrlRepository } from "../repositories/implementations/urlRepository";
import { UrlServices } from "../services/implementations/urlServices";

const urlRepo = new UrlRepository();
const urlServices = new UrlServices(urlRepo);
export const urlController = new UrlController(urlServices);
