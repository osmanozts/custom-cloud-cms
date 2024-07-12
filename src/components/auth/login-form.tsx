import { useState } from "react";
import { useAuth } from "../../providers/auth-provider";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  Text,
  VStack,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { handleErrorMessage } from "./helpers/handle-error-message";
import { InputField } from "../input-field";

export function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Logging in...");
      await login(email, password);

      navigate("/");
    } catch (error: unknown) {
      console.log("🚀 ~ error:", error);
      setError(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card width="100%" backgroundColor="gray.200">
      <CardBody>
        <VStack>
          <Text marginBottom={6} fontSize={24} textAlign="center">
            Anmelden
          </Text>

          <InputField
            value={email}
            placeholder="Email..."
            onChange={setEmail}
            icon={<EmailIcon color="gray" />}
          />

          <InputField
            value={password}
            placeholder="Passwort"
            isPasswordField
            icon={<LockIcon color="gray" />}
            onChange={setPassword}
          />

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
        </VStack>
      </CardBody>
    </Card>
  );
}
