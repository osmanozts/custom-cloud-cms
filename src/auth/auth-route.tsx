import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";

const AuthRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You can render a loading spinner here or return null
    return <div>Loading...</div>;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;
