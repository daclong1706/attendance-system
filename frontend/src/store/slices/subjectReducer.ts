import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Subject } from "../../types/subjectType";
import subjectAPI from "../../api/subjectAPI";

interface SubjectState {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
}

const initialState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
};

export const fetchAllSubjects = createAsyncThunk<Subject[], void>(
  "class/fetchAllSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await subjectAPI.getSubject();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const subjectSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetSubjects: (state) => {
      state.subjects = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllSubjects.fulfilled,
        (state, action: PayloadAction<Subject[]>) => {
          state.loading = false;
          state.subjects = action.payload;
        },
      )
      .addCase(fetchAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tải danh sách lớp!";
      });
  },
});

export const { resetSubjects } = subjectSlice.actions;
export default subjectSlice.reducer;
