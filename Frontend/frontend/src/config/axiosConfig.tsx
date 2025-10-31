import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

const api = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL || "http://localhost:5000/api" ,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
