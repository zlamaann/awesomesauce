import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { User, UserCredentials } from '../../interface';


interface UserState {
    loading: boolean;
    isAuthenticated: boolean;
    error: string;
    user: User | null;
}

const initialState: UserState = {
    loading: false,
    isAuthenticated: false,
    error: "",
    user: null
}

export const register = createAsyncThunk(
    "auth/register",
    async (user: User) => {
      const res = await AuthService.register(user);
      return res.data;
    }
  );

export const login = createAsyncThunk(
    "auth/login",
    async (credentials: UserCredentials) => {
      const res = await AuthService.login(credentials);
      return res.data;
    }
  );

const articleSlice = createSlice({
    name: 'articles',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        // User authentification
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error.message || ""
        });
        // User registration
        builder.addCase(register.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.error.message || ""
        });
    }
})

export const { logout } = articleSlice.actions;

export default articleSlice.reducer;
