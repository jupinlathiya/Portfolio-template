import {  createSlice } from "@reduxjs/toolkit";


const initialState = {isAuthenticated:localStorage.getItem("isAuth")??false};
const authSlice = createSlice({
  name: "Auth Slice",
  initialState,
  reducers: {
    loginUser(state) {
      state.isAuthenticated = true;
      localStorage.setItem("isAuth", "true");
    },

    logoutUser(state) {
      state.isAuthenticated = false;
      localStorage.setItem("isAuth", "false");
    },
  },

});
export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
