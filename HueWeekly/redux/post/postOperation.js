import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { create } from "axios";


axios.defaults.baseURL =  "http://192.168.0.108:5001";

export const createPost= createAsyncThunk("/api/posts/createPost", async (postData,{rejectWithValue})=>{
    try{
        const formData = new FormData();
        formData.append("photo", {
            uri:postData.photo,
            name:"photo.jpg",
            type:"image/jpeg"
        });
        formData.append("title", postData.title);
        formData.append("place", postData.place || "");
        formData.append("name",  postData.place);
      formData.append("latitude", postData.latitude?.toString() || ""); 
      formData.append("longitude", postData.longitude?.toString() || ""); 
        
      const response= await axios.post("/api/posts", formData,{
         method: "POST",
        body: formData,
         headers: {
          Authorization: `Bearer ${postData.token}`,
        },
      })
    if(!response.ok){
         const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post");
    }
    const data = await response.json();
    return data;

    }
    catch(err){
         return rejectWithValue(err.message);
    }
})
export const fetchPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/posts");
      if (response.status !== 200) {
        throw new Error("Failed to fetch posts");
      }
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);