import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProfile, getEmployee, updateEmployee } from "../backend-queries";
import { Tables } from "../utils/database/types";
import { NewEmployee } from "../backend-queries/update/update-employee";
import {
  NewProfile,
  updateProfile,
} from "../backend-queries/update/update-profile";
import { EmployeeDetails, EmployeeDocumentUpload } from "../components";
import { mockDocuments } from "../components/employees/mock-data";

type EditEmployeeProps = {};

export const EditEmployee = ({}: EditEmployeeProps) => {
  const [searchParams] = useSearchParams();
  const [employee, setEmployee] = useState<Tables<"employees">>();
  const [profile, setProfile] = useState<Tables<"profile">>();
  const [id, setId] = useState<string>("");
  const [profileID, setProfileID] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [personnelNumber, setPersonnelNumber] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [street, setStreet] = useState<string>("");
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

  const handleSave = async () => {
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
  };

  if (!employee || !profile) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container
      maxW="container.xl"
      p={8}
      bg="backgroundColor"
      boxShadow="md"
      borderRadius="lg"
    >
      <Flex mb={8} justifyContent="center">
        <Heading fontSize="2xl" fontWeight="bold" color="blue.700">
          Mitarbeiter Ansehen / Bearbeiten
        </Heading>
      </Flex>
      <SimpleGrid columns={[1, null, 2]} spacing={8}>
        <Box>
          <Heading fontSize="lg" fontWeight="semibold" mb={4} color="gray.600">
            Mitarbeiter Daten
          </Heading>
          <VStack spacing={6}>
            <EmployeeDetails
              email={email}
              personnelNumber={personnelNumber}
              firstName={firstName}
              lastName={lastName}
              city={city}
              postalCode={postalCode}
              street={street}
              role={role}
              setEmail={setEmail}
              setPersonnelNumber={setPersonnelNumber}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setCity={setCity}
              setPostalCode={setPostalCode}
              setStreet={setStreet}
              setRole={setRole}
            />
          </VStack>
        </Box>
        <Box>
          <Heading fontSize="lg" fontWeight="semibold" mb={4} color="gray.600">
            Mitarbeiter Dateien
          </Heading>
          <EmployeeDocumentUpload
            employeeId={id}
            initialDocuments={mockDocuments}
          />
        </Box>
      </SimpleGrid>
      <Flex justifyContent="center" mt={8}>
        <Button
          colorScheme="blue"
          isLoading={isLoading}
          onClick={handleSave}
          size="lg"
        >
          Speichern
        </Button>
      </Flex>
    </Container>
  );
};
