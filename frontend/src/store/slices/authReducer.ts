import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthResponse } from "../../types/authTypes";
import authAPI from "../../api/authAPI";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const userFromStorage = localStorage.getItem("auth");
const parsedUser: User | null = userFromStorage
  ? JSON.parse(userFromStorage).user
  : null;

const initialState: AuthState = {
  user: parsedUser,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await authAPI.login(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error || "Đăng nhập thất bại!");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      authAPI.logout();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user; // ✅ Lấy `user` từ `AuthResponse`
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Đăng nhập thất bại!";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
