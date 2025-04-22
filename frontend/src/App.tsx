import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";
import Attendance from "./pages/Teacher/Attendance";
import { ThemeProvider } from "flowbite-react";
import { theme } from "./components/utils/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/attendance" element={<Attendance />} />
            {/* <Route path="/schedule" element={<SchedulePage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
