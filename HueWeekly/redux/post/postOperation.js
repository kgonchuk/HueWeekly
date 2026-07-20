import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { create } from "axios";


axios.defaults.baseURL =  "https://hueweekly-backend-ok9w.onrender.com";

export const createPost = createAsyncThunk(
  "posts/createPost", 
  async (postData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: postData.photo,
        name: "photo.jpg",
        type: "image/jpeg"
      });
      formData.append("title", postData.title);
      formData.append("place", postData.place || "");
      formData.append("latitude", postData.latitude?.toString() || ""); 
      formData.append("longitude", postData.longitude?.toString() || ""); 
      const state = thunkAPI.getState();
      const token = state.auth.accessToken || postData.token;
      const response = await axios.post("/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      thunkAPI.dispatch(fetchPosts(token));

      return response.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const fetchPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (token, { rejectWithValue }) => { 
    try {
      const response = await axios.get("/api/posts", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);