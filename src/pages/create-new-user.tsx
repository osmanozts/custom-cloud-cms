import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { InputField } from "../components";
import { useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";

export function CreateNewUser() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Flex height="100svh" justifyContent="center">
      <VStack borderWidth={1} width="50%" justifyContent="center" px={6}>
        <Text mb={4}>Neuen Nutzer Anlegen</Text>
        <InputField value={email} onChange={setEmail} placeholder="Email..." />
        <InputField
          value={password}
          onChange={setPassword}
          placeholder="Passwort..."
        />
        <Button
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
            });

            if (error) {
              setIsLoading(false);
              throw error;
            }

            if (data.user) {
              setIsLoading(false);
              navigate("/all-employees");
            }
          }}
        >
          Anlegen
        </Button>
      </VStack>
    </Flex>
  );
}
