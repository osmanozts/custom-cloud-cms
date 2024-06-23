import { LoginForm } from "../components";
import { Box, Container, Flex } from "@chakra-ui/react";

export const LoginPage = () => {
  return (
    <Container>
      <Flex alignItems="center" height="100vh">
        <LoginForm />
      </Flex>
    </Container>
  );
};
