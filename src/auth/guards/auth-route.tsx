import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { AdminNavbar, Navbar } from "../../components";

export const AuthRoute = () => {
  const { user, loading, authRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
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
        <Text>Authentifizierung...</Text>
      </Box>
    );
  }

  if (!loading && user) {
    return (
      <>
        {authRole === "employee" ? <Navbar /> : <AdminNavbar />}
        <Outlet />
      </>
    );
  } else if (!loading && !user) {
    console.log("Redirect to Login");
    return <Navigate to={"/login"} state={{ path: location.pathname }} />;
  }
};
