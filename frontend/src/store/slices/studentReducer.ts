import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Schedule } from "../../types/scheduleTypes";
import studentAPI from "../../api/studentAPI";
import {
  AttendanceHistory,
  AttendanceStatus,
} from "../../types/attendanceTypes";

interface StudentState {
  schedule: Schedule[];
  attendanceStatus: AttendanceStatus;
  attendanceAll: AttendanceHistory;
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  schedule: [],
  attendanceStatus: {
    student_id: 0,
    class_section_id: 0,
    attendance_history: [],
  },
  attendanceAll: {
    student_id: 0,
    attendance_history: {},
  },
  loading: false,
  error: null,
};

export const fetchScheduleByStudent = createAsyncThunk<Schedule[], void>(
  "student/fetchScheduleByStudent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getSchedule();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchAttendanceByStudent = createAsyncThunk<
  AttendanceStatus,
  { student_id: number; class_section_id: number }
>("student/fetchAttendanceByStudent", async (data, { rejectWithValue }) => {
  try {
    const response = await studentAPI.getAttendanceStatus(
      data.student_id,
      data.class_section_id,
    );
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchAttendanceAll = createAsyncThunk<
  AttendanceHistory,
  { student_id: number }
>("student/fetchAttendanceAll", async (data, { rejectWithValue }) => {
  try {
    const response = await studentAPI.getAllAttendanceStatus(data.student_id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    reset: (state) => {
      state.schedule = [];
      state.attendanceStatus = {
        student_id: 0,
        class_section_id: 0,
        attendance_history: [],
      };
      state.attendanceAll = {
        student_id: 0,
        attendance_history: {},
      };
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
      })

      .addCase(fetchAttendanceByStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAttendanceByStudent.fulfilled,
        (state, action: PayloadAction<AttendanceStatus>) => {
          state.loading = false;
          state.attendanceStatus = action.payload;
        },
      )
      .addCase(fetchAttendanceByStudent.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tìm thời khóa biểu";
      })

      .addCase(fetchAttendanceAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAttendanceAll.fulfilled,
        (state, action: PayloadAction<AttendanceHistory>) => {
          state.loading = false;
          state.attendanceAll = action.payload;
        },
      )
      .addCase(fetchAttendanceAll.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tìm thời khóa biểu";
      });
  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
