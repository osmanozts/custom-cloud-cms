import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProfile, getEmployee, updateEmployee } from "../backend-queries";
import { InputField, RadioButtons } from "../components";
import { Tables } from "../utils/database/types";
import { NewEmployee } from "../backend-queries/update/update-employee";
import {
  NewProfile,
  updateProfile,
} from "../backend-queries/update/update-profile";

type EditEmployeeProps = {};

export function EditEmployee({}: EditEmployeeProps) {
  const [searchParams] = useSearchParams();

  const [employee, setEmployee] = useState<Tables<"employees">>();
  const [profile, setProfile] = useState<Tables<"profile">>();

  console.log("employee:", employee);
  console.log("profile:", profile);

  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [personnelNumber, setPersonnelNumber] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [profileID, setProfileID] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const profileId = searchParams.get("profile_id") ?? "";
    if (profileId) {
      getEmployee(profileId, (newEmployee) => {
        setEmployee(newEmployee);
        if (newEmployee) {
          setId(newEmployee.id.toString() ?? "");
          setPersonnelNumber(newEmployee.personnel_number ?? "");
          setFirstName(newEmployee.first_name ?? "");
          setLastName(newEmployee.last_name ?? "");
          setCity(newEmployee.city ?? "");
          setPostalCode(newEmployee.postal_code ?? "");
          setStreet(newEmployee.street ?? "");
          setProfileID(newEmployee.profile_id ?? "");
        }
      });

      getProfile(profileId, (userProfile) => {
        setProfile(userProfile);
        if (userProfile) {
          setEmail(userProfile.email ?? "");
          setRole(userProfile.role ?? "");
        }
      });
    }
  }, [searchParams]);

  return (
    <Container
      display="flex"
      flexDirection="column"
      pt={12}
      pl={12}
      pr={12}
      height="100svh"
      borderWidth={1}
      maxWidth="50%"
    >
      <Flex mb={12} justifyContent="center">
        <Text fontSize={28}>Mitarbeiter Ansehen / Bearbeiten</Text>
      </Flex>

      <Text fontSize={20} mb={4}>
        Systeminterne Daten
      </Text>
      <Box>
        <Text>Email</Text>
        <InputField
          isDisabled
          placeholder="Email..."
          value={email}
          onChange={setEmail}
        />
      </Box>
      <Box>
        <Text>Profil ID</Text>
        <InputField
          isDisabled
          placeholder="Profile ID..."
          value={profileID}
          onChange={setProfileID}
        />
      </Box>
      <Box>
        <Text>Mitarbeiter ID</Text>
        <InputField
          isDisabled
          placeholder="Mitarbeiter ID..."
          value={id}
          onChange={setId}
        />
      </Box>
      <Text fontSize={20} my={4}>
        Mitarbeiter Daten
      </Text>
      <Box>
        <Text>Personalnummer</Text>
        <InputField
          placeholder="Personalnummer..."
          value={personnelNumber}
          onChange={setPersonnelNumber}
        />
      </Box>
      <Box>
        <Text>Vorname</Text>
        <InputField
          placeholder="Vorname..."
          value={firstName}
          onChange={setFirstName}
        />
      </Box>
      <Box>
        <Text>Nachname</Text>
        <InputField
          placeholder="Nachname..."
          value={lastName}
          onChange={setLastName}
        />
      </Box>
      <Box>
        <Text>Stadt</Text>
        <InputField placeholder="Stadt..." value={city} onChange={setCity} />
      </Box>
      <Box>
        <Text>PLZ</Text>
        <InputField
          placeholder="PLZ..."
          value={postalCode}
          onChange={setPostalCode}
        />
      </Box>
      <Box>
        <Text>Straße</Text>
        <InputField
          placeholder="Straße + Hausnummer..."
          value={street}
          onChange={setStreet}
        />
      </Box>
      <Box mb={12}>
        <Text>Rolle</Text>
        <RadioButtons
          options={["superadmin", "admin", "employee"]}
          value={role}
          onChange={(newRole) => setRole(newRole)}
        />
      </Box>
      <Button
        isLoading={isLoading}
        onClick={async () => {
          setIsLoading(true);
          const newEmployee: NewEmployee = {
            id,
            personnelNumber,
            firstName,
            lastName,
            city,
            postalCode,
            street,
            profileID,
          };
          await updateEmployee(newEmployee);

          const newProfile: NewProfile = {
            id: profileID,
            role,
          };
          await updateProfile(newProfile);

          setIsLoading(false);
        }}
      >
        Speichern
      </Button>
    </Container>
  );
}
