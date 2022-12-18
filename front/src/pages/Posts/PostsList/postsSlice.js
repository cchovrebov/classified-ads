import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: null,
  isLoading: false,
}

const counterSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.isLoading
    },
    setPosts(state, action) {
      state.posts = action.posts
      state.isLoading = action.isLoading
    },
  },
})

export const { setIsLoading, setPosts } = counterSlice.actions
export default counterSlice.reducer