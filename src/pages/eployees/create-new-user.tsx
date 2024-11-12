import { Button, Container, Text, VStack } from "@chakra-ui/react";
import { InputField } from "../../components";
import { useState } from "react";
import supabase from "../../utils/supabase";
import { useNavigate } from "react-router-dom";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

export function CreateNewUser() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createNewUser = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.functions.invoke("create-new-user", {
      body: { email, password },
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }

    if (data.user) {
      setIsLoading(false);

      navigate({
        pathname: "/edit-employee",
        search: `?profile_id=${data.user.id}`,
      });
    }
  };

  return (
    <Container
      height="100svh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        borderWidth={1}
        px={6}
        width="100%"
        paddingTop={12}
        paddingBottom={12}
      >
        <Text mb={4} color="textColor">
          Neuen Nutzer Anlegen
        </Text>
        <InputField
          value={email}
          onChange={setEmail}
          placeholder="Email..."
          icon={<EmailIcon color="gray" />}
        />
        <InputField
          value={password}
          onChange={setPassword}
          placeholder="Passwort..."
          icon={<LockIcon color="gray" />}
        />
        <Button isLoading={isLoading} onClick={createNewUser}>
          Anlegen
        </Button>
      </VStack>
    </Container>
  );
}
