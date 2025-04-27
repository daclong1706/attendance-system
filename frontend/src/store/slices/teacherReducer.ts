import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Class } from "../../types/classType";
import teacherAPI from "../../api/teacherAPI";
import { Schedule } from "../../types/scheduleTypes";

interface TeacherState {
  classes: Class[];
  schedule: Schedule[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  classes: [],
  schedule: [],
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

export const fetchScheduleByTeacher = createAsyncThunk<Schedule[], void>(
  "class/fetchScheduleByTeacher",
  async (_, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.getSchedule();
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
    reset: (state) => {
      state.classes = [];
      state.schedule = [];
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
      })

      .addCase(fetchScheduleByTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchScheduleByTeacher.fulfilled,
        (state, action: PayloadAction<Schedule[]>) => {
          state.loading = false;
          state.schedule = action.payload;
        },
      )
      .addCase(fetchScheduleByTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tìm thời khóa biểu";
      });
  },
});

export const { reset } = teacherSlice.actions;
export default teacherSlice.reducer;
