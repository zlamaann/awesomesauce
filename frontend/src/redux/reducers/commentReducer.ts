import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import CommentService from '../../services/CommentService';
import { Comment } from '../../interface';


interface CommentState {
    loading: boolean;
    error: string;
    data: Comment[];
}

const initialState: CommentState = {
    loading: false,
    error: "",
    data: []
}

export const createComment = createAsyncThunk(
    "comments/create",
    async (comment: Comment) => {
      const res = await CommentService.create(comment);
      return res.data;
    }
  );
  
  export const retrieveAllArticleComments = createAsyncThunk(
    "comments/retrieve/all",
    async () => {
      const res = await CommentService.getAllArticleComments();
      return res.data;
    }
  );

const commentSlice = createSlice({
    name: 'comments',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create new comment
        builder.addCase(createComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createComment.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data.push(payload);
        });
        builder.addCase(createComment.rejected, (state, action) => {
            state.error = action.error.message || ""
            state.loading = false;
        });
        // Retrieve all comments
        builder.addCase(retrieveAllArticleComments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(retrieveAllArticleComments.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
        });
        builder.addCase(retrieveAllArticleComments.rejected, (state, action) => {
            state.error = action.error.message || ""
            state.loading = false;
        });
    }
})

export default commentSlice.reducer;
