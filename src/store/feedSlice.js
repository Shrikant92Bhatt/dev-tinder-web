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
    setLoading: (state)=> {
        state.loading = true;
    }

  },
});
export const { addFeed, setLoading, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
