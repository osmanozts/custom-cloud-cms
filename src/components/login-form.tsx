import { FormEvent, useState } from "react";
import { useAuth } from "../providers/auth-provider";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  InputLeftElement,
  StepTitle,
  Text,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

export function LoginForm() {
  const [email, setEmail] = useState("");

  const { login } = useAuth();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    login(email).then();
  };

  return (
    <Card maxWidth={600} width="100%">
      <CardBody display="flex" flexDirection={"column"}>
        <Text marginBottom={6} fontSize={24} textAlign="center">
          Login
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input
            variant="filled"
            placeholder="Email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </InputGroup>
        <Button
          marginTop={4}
          colorScheme="teal"
          size="md"
          onClick={handleLogin}
        >
          Einmal Passwort erhalten
        </Button>
      </CardBody>
    </Card>
  );
}
