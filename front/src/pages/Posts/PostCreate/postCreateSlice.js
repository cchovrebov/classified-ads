import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  post: {
    title: '',
    price: 0,
    category: '',
    description: '',
    images: '',
  },
  isLoading: false,
}

const postCreateSlice = createSlice({
  name: 'postCreateSlice',
  initialState,
  reducers: {
    setPost(state, action) {
      state.post[action.payload.inputName] = action.payload.value;
    },
  },
})

export const { setPost } = postCreateSlice.actions
export default postCreateSlice.reducer