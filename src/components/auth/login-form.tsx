import { useEffect, useState } from "react";
import { useAuth } from "../../providers/auth-provider";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  Image,
  VStack,
  Fade,
  Text,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { InputField } from "../input-field";
import logo from "../../assets/logo/lp-logistics.png";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
    } catch (error: any) {
      const errorMessage = error;

      if (errorMessage.includes("Invalid login credentials")) {
        setError("Falsche Anmeldedaten. Bitte versuchen Sie es erneut.");
      } else {
        setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && email && password && !loading) {
      handleLogin();
    }
  };

  return (
    <Card width="100%" backgroundColor="tileBgColor" onKeyDown={handleKeyDown}>
      <CardBody>
        <VStack spacing={6}>
          {/* Logo */}
          <Box justifyContent="center" alignItems="center" width="50%">
            <Image src={logo} alt="Logo" objectFit="contain" />
          </Box>

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

          {error && (
            <Fade in={!!error}>
              <Alert status="error" borderRadius="md" my={2}>
                <AlertIcon />
                <AlertTitle fontSize="sm">{error}</AlertTitle>
              </Alert>
            </Fade>
          )}

          <Button
            marginTop={4}
            bg="accentColor"
            color="invertedTextColor"
            size="md"
            onClick={handleLogin}
            isLoading={loading}
            isDisabled={!email || !password}
            _hover={{ bg: "accentColorHover" }}
          >
            Anmelden
          </Button>

          <Text fontSize="sm" color="gray.500" mt={2}>
            Bitte geben Sie Ihre Anmeldedaten ein.
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
