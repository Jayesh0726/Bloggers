import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(post => post.$id === action.payload.$id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.$id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        clearPosts: (state) => {
            state.posts = [];
            state.loading = false;
        }
    }
})

export const { setPosts, addPost, updatePost, deletePost, setLoading, clearPosts } = postSlice.actions;
export default postSlice.reducer;
