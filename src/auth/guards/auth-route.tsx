import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";
import { Box, Spinner } from "@chakra-ui/react";
import { AdminNavbar, Navbar } from "../../components";

export const AuthRoute = () => {
  const { user, loading, role } = useAuth();
  const location = useLocation();

  if (loading) {
    // You can render a loading spinner here or return null
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  return user ? (
    <>
      {role === "employee" ? <Navbar /> : <AdminNavbar />}
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};
