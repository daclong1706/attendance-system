import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Class } from "../../types/classType";
import teacherAPI from "../../api/teacherAPI";

interface TeacherState {
  classes: Class[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  classes: [],
  loading: false,
  error: null,
};

export const fetchAllClassesByTeacher = createAsyncThunk<Class[], void>(
  "class/fetchAllClassesByTeacher",
  async (_, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.getAllClass();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    resetClasses: (state) => {
      state.classes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllClassesByTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllClassesByTeacher.fulfilled,
        (state, action: PayloadAction<Class[]>) => {
          state.loading = false;
          state.classes = action.payload;
        },
      )
      .addCase(fetchAllClassesByTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tải danh sách lớp!";
      });
  },
});

export const { resetClasses } = teacherSlice.actions;
export default teacherSlice.reducer;
