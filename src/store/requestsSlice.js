import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
    initialState: {
        requests: [],
    },
    reducers: {
        setRequests: (state, action) => {
            state.requests = action.payload;
        },
        removeRequests: (state) => {
            state.requests = [];
        },
        acceptRequest: (state, action) => {
            state.requests = state.requests.filter(request => request._id !== action.payload);
        },
        rejectRequest: (state, action) => {
            state.requests = state.requests.filter(request => request._id !== action.payload);
        }
    }
});

export const { setRequests, removeRequests, acceptRequest, rejectRequest } = requestsSlice.actions;
export default requestsSlice.reducer; 