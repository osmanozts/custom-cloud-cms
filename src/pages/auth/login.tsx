import { LoginForm } from "../../components";
import { Container, Flex } from "@chakra-ui/react";

export const Login = () => {
  return (
    <Container>
      <Flex alignItems="center" height="100vh">
        <LoginForm />
      </Flex>
    </Container>
  );
};
