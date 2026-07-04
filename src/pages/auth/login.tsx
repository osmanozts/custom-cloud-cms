import { ColorModeToggle, LoginForm } from "../../components";
import { Box, Container, Flex } from "@chakra-ui/react";

export const Login = () => {
  return (
    <Container>
      <Box position="fixed" top={4} right={4} zIndex={10}>
        <ColorModeToggle />
      </Box>
      <Flex alignItems="center" height="100vh">
        <LoginForm />
      </Flex>
    </Container>
  );
};
