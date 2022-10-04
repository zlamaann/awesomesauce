import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import VoteService from '../../services/VoteService';
import { Vote } from '../../interface';


interface VoteState {
    loading: boolean;
    error: string;
    data: Vote[];
}

const initialState: VoteState = {
    loading: false,
    error: "",
    data: []
}

export const createVote = createAsyncThunk(
    "votes/create",
    async (vote: Vote, { rejectWithValue }) => {
      const res = await VoteService.create(vote);
      if (res.status === 400) return rejectWithValue("User already voted")
      return res.data;
    }
  );
  
  export const retrieveAllVotes = createAsyncThunk(
    "votes/retrieve/all",
    async () => {
      const res = await VoteService.getAll();
      return res.data;
    }
  );

const voteSlice = createSlice({
    name: 'votes',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create new vote
        builder.addCase(createVote.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createVote.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data.push(payload);
        });
        builder.addCase(createVote.rejected, (state, action) => {
            state.error = action.error.message || ""
            state.loading = false;
        });
        // Retrieve all votes
        builder.addCase(retrieveAllVotes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(retrieveAllVotes.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
        });
        builder.addCase(retrieveAllVotes.rejected, (state, action) => {
            state.error = action.error.message || ""
            state.loading = false;
        });
    }
})

export default voteSlice.reducer;
