import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../pages/Posts/PostsList/postsSlice'
import userReducer from '../userSlice'

export default configureStore({
  reducer: {
    postsReducer,
    userReducer,
  },
})