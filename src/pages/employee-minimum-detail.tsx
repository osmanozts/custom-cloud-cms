import { Container, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getEmployee, getProfile } from "../backend-queries";
import { Tables } from "../utils/database/types";

export function EmployeeMinimumDetail() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [employee, setEmployee] = useState<Tables<"employees">>();
  const [profile, setProfile] = useState<Tables<"profile">>();

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
        <Text fontSize={28}>Mitarbeiter Informationen Ansehen</Text>
      </Flex>

      <Text fontSize={20} mb={4}>
        Systeminterne Daten
      </Text>
      <Flex>
        <Text fontWeight="bold" mr={4}>
          Email:
        </Text>
        <Text>{email}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" mr={4}>
          Profil ID:
        </Text>
        <Text>{profileID}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" mr={4}>
          Mitarbeiter ID:
        </Text>
        <Text>{id}</Text>
      </Flex>
      <Text fontSize={20} my={4}>
        Mitarbeiter Daten
      </Text>
      <Flex>
        <Text fontWeight="bold" mr={4}>
          Personalnummer:
        </Text>
        <Text>{personnelNumber}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" mr={4}>
          Vorname:
        </Text>
        <Text>{firstName}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" mr={4}>
          Nachname:
        </Text>
        <Text>{lastName}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" mr={4}>
          Stadt:
        </Text>
        <Text>{city}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" mr={4}>
          PLZ:
        </Text>
        <Text>{postalCode}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" mr={4}>
          Straße:
        </Text>
        <Text>{street}</Text>
      </Flex>
      <Flex mb={12}>
        <Text fontWeight="bold" mr={4}>
          Rolle:
        </Text>
        <Text>{role}</Text>
      </Flex>
    </Container>
  );
}
