// admin-route.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";

export const RoleAccessRoute = () => {
  const { authRole, user } = useAuth();
  const location = useLocation();

  if (authRole) {
    switch (authRole) {
      case "superadmin":
      case "admin":
      case "employee_manager":
      case "vehicle_manager":
        return <Outlet />;
      case "employee":
        return (
          <Navigate
            to={`/employee-min-detail?profile_id=${user.id}`}
            replace
            state={{ path: location.pathname }}
          />
        );
      default:
        break;
    }
  }
  return <Navigate to="/login" replace />;
};
