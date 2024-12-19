import { Box, Spinner, Text } from "@chakra-ui/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../../components";
import { useAuth } from "../../providers/auth-provider";

export const AuthRoute = () => {
  const { user, loading } = useAuth();
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
        <Navbar />
        <Outlet />
      </>
    );
  } else if (!loading && !user) {
    console.log("Redirect to Login");
    return <Navigate to={"/login"} state={{ path: location.pathname }} />;
  }
};
