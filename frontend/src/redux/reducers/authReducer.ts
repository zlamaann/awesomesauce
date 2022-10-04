import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { RegisterUser, UserCredentials } from '../../interface';

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

export const authenticate = createAsyncThunk(
    "auth",
    async () => {
        const res = await AuthService.authenticate();
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
        // User authentication
        builder.addCase(authenticate.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authenticate.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = payload;
        });
        builder.addCase(authenticate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || ""
            state.isAuthenticated = false;
        });
    }
})


export default articleSlice.reducer;
