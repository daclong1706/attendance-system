import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserManagement from "./pages/User/UserManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          {/* <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/schedule" element={<SchedulePage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
