import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    posts: [],
    item: {},
    loading: false,
    error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    return await axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.data)

})
export const fetchPostsUpdate = createAsyncThunk('posts/fetchPostsUpdate', async ({ payload, postId }) => {
    return await axios
        .put(`https://jsonplaceholder.typicode.com/posts/${postId}`, payload)
        .then((res) => res.data)

})
export const fetchPostsDelete = createAsyncThunk('posts/fetchPostsDelete', async ({ postId }) => {
    return await axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((res) => res.data)

})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    return await axios
        .post('https://jsonplaceholder.typicode.com/posts', initialPost)
        .then((res) => res.data)
}
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false
                // Add any fetched posts to the array
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
            .addCase(fetchPostsUpdate.fulfilled, (state, action) => {
                state.loading = false
                // Add any fetched posts to the array
                // state.posts = state.posts.concat(action.payload)
                const { id, title, body } = action.payload
                const existingPost = state.posts.find((post) => post.id === id)
                if (existingPost) {
                    existingPost.title = title
                    existingPost.body = body
                }

            })
            .addCase(fetchPostsDelete.fulfilled, (state, action) => {
                state.loading = false
                const indexOfId = state.posts.indexOf(action.payload)
                state.posts.splice(indexOfId, 1)

            })
    },
})

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) => state?.posts?.posts?.find((post) => post.id === postId ? postId : postId)

