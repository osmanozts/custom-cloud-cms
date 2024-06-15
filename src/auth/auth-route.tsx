import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";
import { Box, Spinner } from "@chakra-ui/react";

const AuthRoute = () => {
  const { user, loading } = useAuth();
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
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;
