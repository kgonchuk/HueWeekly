import { createSelector } from "@reduxjs/toolkit";

const EMPTY_ARRAY = [];
export const selectAllPosts = (state) => state.posts?.posts || EMPTY_ARRAY;
export const selectPostsByAuthor = createSelector(
  [
    selectAllPosts,                        
    (state, userId) => userId,             
  ],
  (posts, userId) => {
    if (!userId) return EMPTY_ARRAY;

    return posts.filter((post) => {
      if (post && post.author && typeof post.author === 'object') {
        const authorId = post.author._id || post.author.id;
        return authorId === userId;
      }
      return post?.author === userId;
    });
  }
);