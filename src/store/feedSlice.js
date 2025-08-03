import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFeed: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    removeFeed: (state) => {
      state.data = [];
    },
    setLoading: (state) => {
      state.loading = true;
    },
    removeUserFromFeed: (state, action) => {
      if (state.data && state.data.data) {
        state.data.data = state.data.data.filter(user => user._id !== action.payload);
      }
    },
  },
});
export const { addFeed, setLoading, removeFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
