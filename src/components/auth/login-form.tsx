import { FormEvent, useState } from "react";
import { useAuth } from "../../providers/auth-provider";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { handleErrorMessage } from "./helpers/handle-error-message";

export function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate("/home");
    } catch (error: unknown) {
      setError(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card maxWidth={600} width="100%">
      <CardBody display="flex" flexDirection={"column"}>
        <Text marginBottom={6} fontSize={24} textAlign="center">
          Anmelden
        </Text>
        <InputGroup marginBottom={4}>
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

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input
            variant="filled"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </InputGroup>
        <Button
          marginTop={4}
          colorScheme="teal"
          size="md"
          onClick={handleLogin}
          isLoading={loading}
        >
          Anmelden
        </Button>
        {error && (
          <Alert status="error" my={4}>
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </CardBody>
    </Card>
  );
}
