import { FormEvent, useState } from "react";
import { useAuth } from "../../providers/auth-provider";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  PinInput,
  PinInputField,
  StepTitle,
  Text,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";

export function VerifyOtpForm() {
  const navigate = useNavigate();

  const [pin, setPin] = useState("");

  const handleOTP = async () => {
    console.log(pin);
    supabase.auth.verifyOtp({
      email: "28osman99@gmail.com",
      token: pin,
      type: "email",
    });

    navigate("/home");
  };

  return (
    <Card maxWidth={600} width="100%">
      <CardBody display="flex" flexDirection={"column"}>
        <Text marginBottom={6} fontSize={24} textAlign="center">
          Einmal Passwort
        </Text>
        <Text textAlign="center" marginBottom={6}>
          {
            " Du hast einen sechs stelligen Code in deinem E-Mail Postfach erhalten.\nBitte gib diesen innerhalb 15 Minuten ein!"
          }
        </Text>

        <HStack justifyContent={"center"}>
          <PinInput value={pin} onChange={(neuerPin) => setPin(neuerPin)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Button marginTop={4} colorScheme="teal" size="md" onClick={handleOTP}>
          Einmal Passwort erhalten
        </Button>
      </CardBody>
    </Card>
  );
}
