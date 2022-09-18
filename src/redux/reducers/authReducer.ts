import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../../api/article/AuthService';
import { User } from '../../model/types';


interface UserState {
    loading: boolean;
    isAuthenticated: boolean;
    error?: string;
    data?: User;
}

const initialState: UserState = {
    loading: false,
    isAuthenticated : false
}

export const loginUser = createAsyncThunk(
    "auth/login",
    async (user: User) => {
      const res = await AuthService.login(user);
      return res.data;
    }
  );

const articleSlice = createSlice({
    name: 'articles',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // User authentification
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.data = payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message
        });
    }
})


export default articleSlice.reducer;
