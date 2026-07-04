// CreateUserForm.js
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  Fade,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LuLock, LuMail, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/lp-logistics.png";
import { InputField } from "../../components";
import { DefaultMenu } from "../menu/default-menu";
import supabase from "../../utils/supabase";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/toast-slice";
import { Enums } from "../../utils/database/types";
import { useAuth } from "../../providers/auth-provider";

export function CreateEmployeeForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { authRole } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [personnelNumber, setPersonnelNumber] = useState<string>("");
  const [department, setDepartment] = useState<Enums<"departments"> | null>(
    null,
  );
  const [role, setRole] = useState<Enums<"auth-role">>("employee");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "create-new-user",
        { body: { email, password, personnelNumber, department, role } },
      );

      if (error) {
        dispatch(
          setToast({
            title: "Fehler!",
            description:
              "Beim Erstellen eines Mitarbeiter Kontos ist ein Fehler aufgetreten.",
            status: "error",
          }),
        );
        throw error;
      }

      if (data?.user) {
        dispatch(
          setToast({
            title: "Erfolgreich!",
            description: "Mitarbeiter Konto erfolgreich angelegt.",
            status: "success",
          }),
        );
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
    if (
      event.key === "Enter" &&
      email &&
      password &&
      personnelNumber &&
      department &&
      !isLoading
    ) {
      handleSubmit();
    }
  };

  return (
    <Card width="80%" backgroundColor="tileBgColor" onKeyDown={handleKeyDown}>
      <CardBody>
        <VStack spacing={6}>
          {/* Logo */}
          <Box justifyContent="center" alignItems="center" width="50%">
            <Image src={logo} alt="Logo" objectFit="contain" />
          </Box>

          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Neuen Nutzer Anlegen
          </Text>

          <Box width="80%">
            <InputField
              value={email}
              placeholder="Email..."
              onChange={setEmail}
              icon={<Icon as={LuMail} color="gray" />}
            />
          </Box>

          <Box width="80%">
            <InputField
              value={password}
              placeholder="Passwort"
              onChange={setPassword}
              icon={<Icon as={LuLock} color="gray" />}
            />
          </Box>

          <Box width="80%">
            <InputField
              value={personnelNumber}
              placeholder="Personalnummer"
              onChange={setPersonnelNumber}
              icon={<Icon as={LuUser} color="gray" />}
            />
          </Box>

          <Box width="80%">
            <DefaultMenu
              options={[
                { value: "administration", label: "Verwaltung" },
                { value: "dispatcher", label: "Disponent" },
                { value: "fleet_management", label: "Flottenmanagement" },
                { value: "driver", label: "Fahrer" },
              ]}
              value={department}
              onSelect={(value) =>
                setDepartment(value as Enums<"departments"> | null)
              }
              placeholder="Wähle eine Abteilung aus"
            />
          </Box>

          <Box width="80%">
            <DefaultMenu
              options={[
                {
                  value: "superadmin",
                  label: "Administrator",
                  info: "Hat uneingeschränkten Zugriff auf alle Systeme und Verwaltungsfunktionen. Kann Benutzer verwalten, Berechtigungen zuweisen und sämtliche Einstellungen anpassen.",
                },
                {
                  value: "employee_manager",
                  label: "Stationsleiter",
                  info: "Hat Leseberechtigung für das Mitarbeiter-Management und uneingeschränkten Zugriff auf das Fahrzeug-Management. Kann keine Änderungen an Mitarbeiterdaten vornehmen.",
                },
                {
                  value: "vehicle_manager",
                  label: "Flotten-Manager",
                  info: "Hat ausschließlich Zugriff auf das Fahrzeug-Management und kann dort sämtliche Verwaltungsaufgaben durchführen.",
                },
                {
                  value: "employee",
                  label: "Mitarbeiter (z. B. Fahrer)",
                  info: "Interner Systemzugriff ist nicht gestattet. Der Mitarbeiter kann lediglich seine eigenen Stammdaten und öffentlich zugängliche Dokumente einsehen.",
                },
              ]}
              value={role}
              onSelect={(value) =>
                setRole((value as Enums<"auth-role">) ?? "employee")
              }
              isDisabled={authRole !== "superadmin"}
            />
          </Box>

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
            isDisabled={!email || !password || !personnelNumber || !department}
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
