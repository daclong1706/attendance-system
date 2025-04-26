import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Class } from "../../types/classType";
import classAPI from "../../api/classAPI";

interface ClassState {
  classes: Class[];
  loading: boolean;
  error: string | null;
}

const initialState: ClassState = {
  classes: [],
  loading: false,
  error: null,
};

export const fetchAllClasses = createAsyncThunk<Class[], void>(
  "class/fetchAllClasses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await classAPI.getClass();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const classSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetClasses: (state) => {
      state.classes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllClasses.fulfilled,
        (state, action: PayloadAction<Class[]>) => {
          state.loading = false;
          state.classes = action.payload;
        },
      )
      .addCase(fetchAllClasses.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tải danh sách lớp!";
      });
  },
});

export const { resetClasses } = classSlice.actions;
export default classSlice.reducer;
