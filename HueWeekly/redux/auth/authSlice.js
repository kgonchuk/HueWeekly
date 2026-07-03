import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  refreshUser,
  register,
  updateAvatar,
} from "./authOperation";

const initialState = {
  user: { displayname: null, email: null,avatarUrl:null},
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: false,
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
       const userData = action.payload.user || action.payload;
  state.user = {
    displayname: userData.displayname,
    email: userData.email,
    avatarUrl: userData.avatarUrl, 
    id: userData.id || userData._id,
  };
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
if (!state.user) state.user = {};
  const cleanUrl = action.payload?.avatarUrl || action.payload?.avatar || action.payload;

  if (typeof cleanUrl === 'string') {
    state.user.avatarUrl = cleanUrl;
  } else if (cleanUrl && typeof cleanUrl === 'object') {
    state.user.avatarUrl = cleanUrl.avatarUrl || cleanUrl.url;
  }
      })
  
  },
});

export const authReducer = authSlice.reducer;