import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    async (comment: Comment, { rejectWithValue }) => {
      const res = await CommentService.create(comment);
      return res.data;
    }
  );
  
  export const retrieveAllArticleComments = createAsyncThunk(
    "comments/article/retrieve/all",
    async (id: number) => {
      const res = await CommentService.getAllArticleComments(id);
      return res.data;
    }
  );

  export const retrieveAllComments = createAsyncThunk(
    "comments/retrieve/all",
    async () => {
      const res = await CommentService.getAllComments();
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
            //TODO push new comment into nested comments - it shouldn't be reloaded after every created comment
        });
        builder.addCase(createComment.rejected, (state, action) => {
            state.error = action.error.message || ""
            state.loading = false;
        });
        // Retrieve all article comments
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
        // Retrieve all comments
        builder.addCase(retrieveAllComments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(retrieveAllComments.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
        });
        builder.addCase(retrieveAllComments.rejected, (state, action) => {
            state.error = action.error.message || ""
            state.loading = false;
        });
    }
})

export default commentSlice.reducer;
