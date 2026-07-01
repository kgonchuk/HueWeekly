import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  refreshUser,
  register,
  updateAvatar,
} from "./authOperation";

const initialState = {
  // user: { displayname: null, email: null,avatarUrl:null},
  // accessToken: null,
  // refreshToken: null,
  // isLoading: false,
  // isLoggedIn: false,
  // isRefreshing: false,
  user: { id: "test-id", displayname: "Developer Mode", email: "aurora.chen@example.com", avatarUrl :"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&h=180&fit=crop&auto=format" },
  token: "fake-development-token",
  isLoggedIn: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { username: null, email: null };
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isRefreshing = false;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload; 
      });
  },
});

export const authReducer = authSlice.reducer;