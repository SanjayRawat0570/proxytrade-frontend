import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as sessionAPI from '../../services/sessionAPI';

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async Thunk for creating a session
export const createSessionAsync = createAsyncThunk(
  'sessions/createSession',
  async (sessionData) => {
    const response = await sessionAPI.createSession(sessionData);
    return response;
  }
);

// Async Thunk for liking a session
export const likeSessionAsync = createAsyncThunk(
  'sessions/likeSession',
  async (postId) => {
    await sessionAPI.likeSession(postId);
    return postId; // Return postId for potential UI feedback
  }
);

// Async Thunk for commenting on a session
export const commentOnSessionAsync = createAsyncThunk(
  'sessions/commentOnSession',
  async ({ postId, comment }) => {
    const response = await sessionAPI.commentOnSession({ postId, comment });
    // We aren't storing comments in the state, but you could extend this
    return response;
  }
);

const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSessionAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSessionAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the new session to our state array
        state.items.push(action.payload);
      })
      .addCase(createSessionAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default sessionSlice.reducer;