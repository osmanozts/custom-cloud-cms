import React from "react";
import { LoginForm } from "../components/login-form";
import { Container } from "@chakra-ui/react";

export const LoginPage = () => {
  return (
    <div>
      <Container
        borderWidth={1}
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <LoginForm />
      </Container>
    </div>
  );
};
