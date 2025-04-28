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
  "subject/fetchAllSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await subjectAPI.getSubject();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createSubject = createAsyncThunk<Subject, Partial<Subject>>(
  "subject/createSubject",
  async (subjectData, { rejectWithValue }) => {
    try {
      const response = await subjectAPI.createSubject(subjectData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateSubject = createAsyncThunk<
  Subject,
  { subjectId: number; updatedData: Partial<Subject> }
>(
  "subject/updateSubject",
  async ({ subjectId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await subjectAPI.updateSubject(subjectId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteSubject = createAsyncThunk<{ message: string }, number>(
  "subject/deleteSubject",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await subjectAPI.deleteSubject(subjectId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const subjectSlice = createSlice({
  name: "subject",
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
      })

      .addCase(createSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSubject.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          state.loading = false;
          state.subjects = [...state.subjects, action.payload];
        },
      )
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Không thể tạo học phần!";
      })

      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSubject.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          state.loading = false;
          state.subjects = state.subjects.map((subject) =>
            subject.id === action.payload.id ? action.payload : subject,
          );
        },
      )
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = state.subjects.filter(
          (subject) => subject.id !== action.meta.arg,
        );
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSubjects } = subjectSlice.actions;
export default subjectSlice.reducer;
