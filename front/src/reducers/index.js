import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../pages/Posts/PostsList/postsSlice'
import postCreateReducer from '../pages/Posts/PostCreate/postCreateSlice'
import userReducer from '../userSlice'

export default configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
  reducer: {
    postCreateReducer,
    postsReducer,
    userReducer,
  },
})