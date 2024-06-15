import { LoginForm } from "../components";
import { Box } from "@chakra-ui/react";

export const LoginPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <LoginForm />
    </Box>
  );
};
