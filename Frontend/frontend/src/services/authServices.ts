import { USER_API } from "@/apiConstants/userApi";
import axios from "../config/axiosConfig";

interface UserData {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const registerUser = async (data: UserData) => {
  try {
    return await axios.post(USER_API.REGISTER_USER, data);
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    return await axios.post(USER_API.SIGNIN_USER, data);
  } catch (error) {
    throw error;
  }
};

export const userLogout = async () => {
  try {
    return await axios.post(USER_API.LOGOUT_USER);
  } catch (error) {
    throw error;
  }
};
