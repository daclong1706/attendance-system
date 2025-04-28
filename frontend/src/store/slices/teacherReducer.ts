import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Class, ClassDetail } from "../../types/classType";
import teacherAPI from "../../api/teacherAPI";
import { Schedule } from "../../types/scheduleTypes";
import { Attendance, AttendanceRequest } from "../../types/attendanceTypes";

interface TeacherState {
  classes: Class[];
  classDetail: ClassDetail;
  schedule: Schedule[];
  attendanceList: Attendance[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  classes: [],
  schedule: [],
  classDetail: {
    id: 0,
    subject_name: "",
    subject_code: "",
    room: "",
    day_of_week: "",
    start_time: "",
    end_time: "",
    start_date: "",
    end_date: "",
    students: [],
  },
  attendanceList: [],
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

export const fetchClassById = createAsyncThunk<ClassDetail, number>(
  "class/fetchClassById",
  async (classId, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.getClassDetail(classId);
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

export const fetchAttendanceByClass = createAsyncThunk<
  Attendance[],
  { class_section_id: number; selected_date: string; day_of_week: number }
>("teacher/fetchAttendanceByClass", async (params, { rejectWithValue }) => {
  try {
    const response = await teacherAPI.getAttendance(
      params.class_section_id,
      params.selected_date,
      params.day_of_week,
    );
    return response.students;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const saveAttendance = createAsyncThunk<
  void,
  {
    class_section_id: number;
    selected_date: string;
    day_of_week: number;
    students: AttendanceRequest[];
  }
>("teacher/saveAttendance", async (data, { rejectWithValue }) => {
  try {
    await teacherAPI.saveAttendance(
      data.class_section_id,
      data.selected_date,
      data.day_of_week,
      data.students,
    );
  } catch (error) {
    return rejectWithValue(error);
  }
});

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    reset: (state) => {
      state.classes = [];
      state.schedule = [];
      state.attendanceList = [];
      state.classDetail = {
        id: 0,
        subject_name: "",
        subject_code: "",
        room: "",
        day_of_week: "",
        start_time: "",
        end_time: "",
        start_date: "",
        end_date: "",
        students: [],
      };
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

      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchClassById.fulfilled,
        (state, action: PayloadAction<ClassDetail>) => {
          state.loading = false;
          state.classDetail = action.payload;
        },
      )
      .addCase(fetchClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Không thể tải lớp!";
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
      })
      .addCase(fetchAttendanceByClass.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.attendanceList = [];
      })
      .addCase(
        fetchAttendanceByClass.fulfilled,
        (state, action: PayloadAction<Attendance[]>) => {
          state.loading = false;
          state.attendanceList = action.payload || [];
        },
      )
      .addCase(fetchAttendanceByClass.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tải danh sách điểm danh!";
        state.attendanceList = [];
      })

      .addCase(saveAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveAttendance.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Lưu điểm danh thất bại!";
      });
  },
});

export const { reset } = teacherSlice.actions;
export default teacherSlice.reducer;
