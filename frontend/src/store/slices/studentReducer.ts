import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Schedule } from "../../types/scheduleTypes";
import studentAPI from "../../api/studentAPI";

interface TeacherState {
  schedule: Schedule[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  schedule: [],
  loading: false,
  error: null,
};

export const fetchScheduleByStudent = createAsyncThunk<Schedule[], void>(
  "class/fetchScheduleByStudent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getSchedule();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    reset: (state) => {
      state.schedule = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduleByStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchScheduleByStudent.fulfilled,
        (state, action: PayloadAction<Schedule[]>) => {
          state.loading = false;
          state.schedule = action.payload;
        },
      )
      .addCase(fetchScheduleByStudent.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tìm thời khóa biểu";
      });
  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
