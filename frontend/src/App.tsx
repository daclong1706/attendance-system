import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";
import Attendance from "./pages/Teacher/Attendance";
import { ThemeProvider } from "flowbite-react";
import { theme } from "./components/utils/theme";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import ClassList from "./pages/Teacher/ClassList";
import Schedule from "./pages/Teacher/Schedule";
import ScheduleStudent from "./pages/Student/ScheduleStudent";
import ClassManagement from "./pages/Admin/ClassManagement";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SubjectManagement from "./pages/Admin/SubjectManagement";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/">
              <Route index element={<Navigate to="/login" />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              path="/student"
              element={
                <ProtectedRoute role="student">
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/student/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="schedule" element={<ScheduleStudent />} />
              <Route path="class-list" element={<Attendance />} />
              {/* <Route path="/schedule" element={<SchedulePage />} /> */}
            </Route>
            <Route
              path="/teacher"
              element={
                <ProtectedRoute role="teacher">
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/teacher/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="class" element={<ClassList />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="schedule" element={<Schedule />} />
              {/* <Route path="/schedule" element={<SchedulePage />} /> */}
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="class-management" element={<ClassManagement />} />
              <Route
                path="subject-management"
                element={<SubjectManagement />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}
