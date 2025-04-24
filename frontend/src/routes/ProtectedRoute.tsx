import { ReactNode } from "react";
import { useAppSelector } from "../store/hook"; // Dùng selector của Redux đúng chuẩn
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user || (role && user?.role !== role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
//   // Lấy user từ localStorage
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   if (!user?.role || (role && user.role !== role)) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
