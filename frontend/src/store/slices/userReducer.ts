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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  },
);
export const fetchAllTeacher = createAsyncThunk<User[], void>(
  "user/fetchAllTeacher",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getAllTeacher();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createUser = createAsyncThunk<User, Partial<User>>(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userAPI.createUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteUser = createAsyncThunk<{ message: string }, number>(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userAPI.deleteUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk<
  User,
  { userId: number; updatedData: Partial<User> }
>("user/updateUser", async ({ userId, updatedData }, { rejectWithValue }) => {
  try {
    const response = await userAPI.updateUser(userId, updatedData);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

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
      })
      .addCase(fetchAllTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllTeacher.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchAllTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tìm thời khóa biểu";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = [...state.users, action.payload];
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Không thể tạo người dùng!";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;
