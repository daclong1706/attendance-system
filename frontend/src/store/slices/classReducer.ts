import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Class, Class_session } from "../../types/classType";
import classAPI from "../../api/classAPI";

interface ClassState {
  classes: Class[];
  class_session: Class_session[];
  classFind: Class_session;
  loading: boolean;
  error: string | null;
}

const initialState: ClassState = {
  classes: [],
  class_session: [],
  classFind: {} as Class_session,
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
export const fetchAllInfoClasses = createAsyncThunk<Class_session[], void>(
  "class/fetchAllInfoClasses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await classAPI.getInfoClass();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const fetchClassById = createAsyncThunk(
  "class/fetchClassById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await classAPI.getClassById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const createClass = createAsyncThunk<
  Class_session,
  Partial<Class_session>
>("class/createClass", async (newClass, { rejectWithValue }) => {
  try {
    const response = await classAPI.createClass(newClass);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteClass = createAsyncThunk<{ message: string }, number>(
  "class/deleteClass",
  async (classId, { rejectWithValue }) => {
    try {
      const response = await classAPI.deleteClass(classId);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateClass = createAsyncThunk<
  Class_session,
  { classId: number; updatedData: Partial<Class_session> }
>(
  "class/updateClass",
  async ({ classId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await classAPI.updateClass(classId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    resetClasses: (state) => {
      state.classes = [];
      state.class_session = [];
      state.classFind = {} as Class_session;
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
        state.error = action.payload as string;
      })

      .addCase(fetchAllInfoClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllInfoClasses.fulfilled,
        (state, action: PayloadAction<Class_session[]>) => {
          state.loading = false;
          state.class_session = action.payload;
        },
      )
      .addCase(fetchAllInfoClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchClassById.fulfilled,
        (state, action: PayloadAction<Class_session>) => {
          state.loading = false;
          state.classFind = action.payload;
        },
      )
      .addCase(fetchClassById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không thể tìm thấy lớp học!";
      })

      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createClass.fulfilled,
        (state, action: PayloadAction<Class_session>) => {
          state.loading = false;
          state.class_session.push(action.payload);
        },
      )
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Không thể tạo lớp học!";
      })
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = state.classes.filter(
          (cls) => cls.id !== action.meta.arg,
        );
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateClass.fulfilled,
        (state, action: PayloadAction<Class_session>) => {
          state.loading = false;
          state.class_session = state.class_session.map((cls) =>
            cls.id === action.payload.id ? action.payload : cls,
          );
        },
      )
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetClasses } = classSlice.actions;
export default classSlice.reducer;
