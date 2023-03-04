import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../data/postsSlice'

export default configureStore({
    reducer: {
        posts: postsReducer,
    },
})
