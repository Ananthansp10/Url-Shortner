import { URL_API } from "@/apiConstants/urlApi";
import axios from "../config/axiosConfig";

export const generateShortUrl = async (data: {
  userId: string;
  url: string;
}) => {
  try {
    return await axios.post(URL_API.GENERATE_SHORT_URL, data);
  } catch (error) {
    throw error;
  }
};

export const getUserUrlHistory = async (userId: string) => {
  try {
    return await axios.get(URL_API.GET_USER_URL_HISTORY(userId));
  } catch (error) {
    throw error;
  }
};

export const redirectUrl = async (userId: string, shortUrl: string) => {
  try {
    return await axios.post(URL_API.REDIRECT_URL(userId, shortUrl));
  } catch (error) {
    throw error;
  }
};
