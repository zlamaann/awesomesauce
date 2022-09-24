import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { CurrentUser, RegisterUser, User, UserCredentials } from '../../interface';


interface UserState {
    loading: boolean;
    isAuthenticated: boolean;
    error: string;
    user: any;
}

const initialState: UserState = {
    loading: false,
    isAuthenticated: false,
    error: "",
    user: null
}

export const register = createAsyncThunk(
    "auth/register",
    async (user: RegisterUser) => {
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

  export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
      const res = await AuthService.logout();
      return res.data;
    }
  );

const articleSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // User login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || ""
            state.isAuthenticated = false;
        });
        // User logout
        builder.addCase(logout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = '';
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
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
            state.loading = false;
            state.error = action.error.message || ""
            state.isAuthenticated = false;
        });
    }
})


export default articleSlice.reducer;
