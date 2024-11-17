import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getEmployee, getProfile, updateEmployee } from "../../backend-queries";
import {
  NewProfile,
  updateProfile,
} from "../../backend-queries/update/update-profile";
import { EmployeeDetails, EmployeeDocumentUpload } from "../../components";
import { Tables } from "../../utils/database/types";

type EditEmployeeProps = {};

export const EditEmployee = ({}: EditEmployeeProps) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [employee, setEmployee] = useState<Tables<"employees"> | null>(null);
  const [profile, setProfile] = useState<Tables<"profile"> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  useEffect(() => {
    const profileId = searchParams.get("profile_id") ?? "";
    if (profileId) {
      getEmployee(profileId, (newEmployee) => {
        setEmployee(newEmployee);
      });

      getProfile(profileId, (userProfile) => {
        setProfile(userProfile);
      });
    }
  }, [searchParams]);

  const handleSave = async () => {
    if (!employee || !profile) return;

    setIsLoading(true);

    await updateEmployee(employee);

    const newProfile: NewProfile = {
      id: profile.id,
      role: profile.role ?? "employee",
    };
    await updateProfile(newProfile);
    setIsLoading(false);
    navigate("/employee-management");
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
      <Flex flexDirection="column" mb={8} alignItems="center">
        <Heading fontSize="2xl" fontWeight="bold" color="blue.700">
          Mitarbeiter Ansehen / Bearbeiten
        </Heading>
        <Flex mt={4} width="250px" justifyContent="space-between">
          <Button
            bg="successColor"
            color="textColor"
            isLoading={isLoading}
            onClick={handleSave}
            size="sm"
            alignSelf="center"
            isDisabled={isSaveDisabled}
          >
            <Icon mr={2} as={LuCheck} />
            <Text color="textColor">Speichern</Text>
          </Button>
          <Button
            bg="dangerColor"
            color="textColor"
            onClick={() => navigate("/employee-management")}
            size="sm"
            alignSelf="center"
          >
            <Icon mr={2} as={LuX} />
            Verwerfen
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid columns={[1, null, 2]} spacing={8}>
        <Box>
          <Heading fontSize="lg" fontWeight="semibold" mb={4} color="gray.600">
            Mitarbeiter Daten
          </Heading>
          <VStack spacing={6}>
            <EmployeeDetails
              employee={employee}
              profile={profile}
              setEmployee={(newEmployee) => {
                setEmployee(newEmployee);
                setIsSaveDisabled(false);
              }}
              setProfile={(newProfile) => {
                setProfile(newProfile);
                setIsSaveDisabled(false);
              }}
            />
          </VStack>
        </Box>
        <Box>
          <Heading fontSize="lg" fontWeight="semibold" mb={4} color="gray.600">
            Mitarbeiter Dateien
          </Heading>
          <EmployeeDocumentUpload employee={employee} />
        </Box>
      </SimpleGrid>
    </Container>
  );
};
