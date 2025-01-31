import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types";
import { authService } from "../../services/authService";
import { loadWishlist } from "./wishlistSlice";

const initialState: AuthState = {
  user: authService.getCurrentUser(),
  isAuthenticated: !!authService.getCurrentUser(),
  token: null,
  status: !!authService.getCurrentUser() ? 'idle' : 'logged_out'
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: {username: string, password: string}, { dispatch, rejectWithValue }) => {
    const userFound = authService.login(user);
    if (!userFound) return rejectWithValue("Invalid credentials");
    authService.setCurrentUser(userFound);
    dispatch(loadWishlist(userFound.id));
    return user;
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: User, { rejectWithValue }) => {
    const success = authService.register(user);
    if (!success) return rejectWithValue("User already exists!");
    return user;
  }
);
  
export const logoutUser = createAsyncThunk(
  "auth/logoutUser", 
  async (_, { dispatch}) => {
    authService.logout();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.user = authService.getCurrentUser();
        if(state.user) {
          state.isAuthenticated = true;
          state.status = "idle";
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(registerUser.pending, (state) => {
        console.log('Registrations pending');
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "registered";
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = "logged_out";
      });
  },
});

export default authSlice.reducer;
