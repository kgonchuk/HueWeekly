import { createSlice } from "@reduxjs/toolkit";
import { createPost, fetchPosts } from "./postOperation"

const initialState={
    posts:[],
    isLoading:false,
    error:null

}
const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createPost.pending,(state)=>{
            state.isLoading=true;
            state.error=false;
        })
        .addCase(createPost.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.posts.push(action.payload)
        })
        .addCase(createPost.rejected,(state, action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
        .addCase(fetchPosts.pending,(state)=>{
            state.isLoading=true;
            state.error=false;
        })
        .addCase(fetchPosts.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected,(state, action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })  
        
    }
})

export const postReducer=postSlice.reducer;