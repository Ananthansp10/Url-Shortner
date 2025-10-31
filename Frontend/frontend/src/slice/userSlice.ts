"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
}

// const userDetails = localStorage.getItem("userDetails") || null
const getUserFromStorage = (): UserState | null => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("userDetails");
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return null;
};

const user = getUserFromStorage() || null;

const initialState = user || null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      const userData = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userDetails", JSON.stringify(userData));
      }
      return userData;
    },
    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userDetails");
      }
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
