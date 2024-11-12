import { LoginForm } from "../../components";
import { Box, Container, Flex, Image } from "@chakra-ui/react";
import logo from "../../assets/logo/lp-logistics.png";

export const Login = () => {
  return (
    <Container border="solid">
      <Box
        position="absolute"
        top={150}
        justifyContent="center"
        alignItems="center"
      >
        <Image src={logo} alt="Logo" objectFit="contain" />
      </Box>
      <Flex alignItems="center" height="100vh">
        <LoginForm />
      </Flex>
    </Container>
  );
};
