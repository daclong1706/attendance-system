import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/userTypes";
import userAPI from "../../api/userAPI";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk<User[], void>(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getAllUser();
      return response;
    } catch (error) {
      return rejectWithValue(error || "Không thể tải danh sách người dùng!");
    }
  },
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserById(id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error || `Không thể tìm thấy người dùng với ID ${id}!`,
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tải danh sách người dùng!";
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          const existingUser = state.users.find(
            (user) => user.id === action.payload.id,
          );
          if (!existingUser) {
            state.users.push(action.payload);
          }
        },
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tìm thấy người dùng!";
      });
  },
});

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;
