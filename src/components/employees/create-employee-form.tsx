// CreateUserForm.js
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  Fade,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../components";
import supabase from "../../utils/supabase";
import logo from "../../assets/logo/lp-logistics.png";

export function CreateEmployeeForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "create-new-user",
        { body: { email, password } }
      );

      if (error) throw error;

      if (data?.user) {
        navigate({
          pathname: "/edit-employee",
          search: `?profile_id=${data.user.id}`,
        });
      }
    } catch (error: any) {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && email && password && !isLoading) {
      handleSubmit();
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

          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Neuen Nutzer Anlegen
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
            onChange={setPassword}
            icon={<LockIcon color="gray" />}
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
            bg="accentColor"
            color="invertedTextColor"
            size="md"
            onClick={handleSubmit}
            isLoading={isLoading}
            isDisabled={!email || !password}
            _hover={{ bg: "accentColorHover" }}
          >
            Nutzer erstellen
          </Button>

          <Text fontSize="sm" color="gray.500" mt={2}>
            Bitte geben Sie die notwendigen Informationen ein.
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
