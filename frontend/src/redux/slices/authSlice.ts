import { createSlice } from "@reduxjs/toolkit";

const userStorage = localStorage.getItem("userInfo");

const initialState = {
  userInfo: userStorage ? JSON.parse(userStorage) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentils: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentils, logout } = authSlice.actions;

export default authSlice.reducer;
