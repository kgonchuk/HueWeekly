import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { getToken, removeToken, saveToken } from "../../servises/storage";
import { Platform } from "react-native";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  return {};
};

export const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
  return {};
};

axios.defaults.baseURL = "http://192.168.0.108:5001";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    console.log("=== ЩО ПРИЙШЛО В REDUX THUNK ===", credentials);
   try {
      const { data } = await axios.post("/api/auth/register", credentials);
      await saveToken(data.accessToken);
      setAuthHeader(data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);


export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });

      const { accessToken, user } = response.data;

      setAuthHeader(accessToken);
      await saveToken(accessToken);
      //   toast.success(`Welcome ${user.username}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth?.accessToken;
    if (!token) {
      clearAuthHeader();
      await removeToken("accessToken");
      await removeToken("refreshToken");

      return true;
    }

    await axios.post("/api/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    clearAuthHeader();

    return true;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    const savedToken = await getToken();
    if (!savedToken) {
      return rejectWithValue("No token found");
    }
    try {
      setAuthHeader(savedToken);
      const response = await axios.get("/api/auth/refresh");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to refresh user",
      );
    }
  },
);
// оновлення аватара

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (fileUri, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      const formData = new FormData();

      const cleanedUri = Platform.OS === 'ios' ? fileUri.replace('file://', '') : fileUri;
      const filename = fileUri.split('/').pop() || 'avatar.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append("avatar", {
        uri: Platform.OS === 'ios' ? fileUri : cleanedUri,
        name: filename,
        type: type,
      });

      console.log("=== Відправка аватара на бекенд ===", { filename, type, fileUri });

    const { data } = await axios.patch("/api/auth/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data", 
        },
      });
 return data;
    } catch (error) {
      console.log("❌ Помилка в updateAvatar operation:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);