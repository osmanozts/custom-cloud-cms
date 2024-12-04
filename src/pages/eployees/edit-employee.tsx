import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
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
import dayjs from "dayjs";

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
        const mappedEmployee: Tables<"employees"> = {
          ...newEmployee,
          date_of_birth: newEmployee.date_of_birth
            ? dayjs(newEmployee.date_of_birth).format("DD.MM.YYYY")
            : "",
          id_card_end_date: newEmployee.id_card_end_date
            ? dayjs(newEmployee.id_card_end_date).format("DD.MM.YYYY")
            : "",
          driver_license_end_date: newEmployee.driver_license_end_date
            ? dayjs(newEmployee.driver_license_end_date).format("DD.MM.YYYY")
            : "",
        };

        setEmployee(mappedEmployee);
      });

      getProfile(profileId, (userProfile) => {
        setProfile(userProfile);
      });
    }
  }, [searchParams]);

  const handleSave = async () => {
    if (!employee || !profile) return;

    setIsLoading(true);

    console.log("driver_license_end_date: ", employee.driver_license_end_date);
    const dateOfBirth = employee.date_of_birth
      ? new Date(employee.date_of_birth).toLocaleString()
      : null;
    const idCardEndDate = employee.id_card_end_date
      ? new Date(employee.id_card_end_date).toLocaleDateString()
      : null;
    const driverLicenseEndDate = employee.driver_license_end_date
      ? new Date(employee.driver_license_end_date).toLocaleDateString()
      : null;

    const updatedEmployee: Tables<"employees"> = {
      ...employee,
      date_of_birth: dateOfBirth,
      id_card_end_date: idCardEndDate,
      driver_license_end_date: driverLicenseEndDate,
    };

    await updateEmployee(updatedEmployee);

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
        <Heading fontSize="2xl" fontWeight="bold">
          Mitarbeiter Ansehen / Bearbeiten
        </Heading>
        <Flex mt={4} width="250px" justifyContent="space-between">
          <Button
            bg="parcelColor"
            color="invertedTextColor"
            isLoading={isLoading}
            onClick={handleSave}
            size="sm"
            alignSelf="center"
            isDisabled={isSaveDisabled}
          >
            <Icon mr={2} as={LuCheck} />
            <Text>Speichern</Text>
          </Button>
          <Button
            bg="accentColor"
            color="invertedTextColor"
            onClick={() => navigate("/employee-management")}
            size="sm"
            alignSelf="center"
          >
            <Icon mr={2} as={LuX} />
            Verwerfen
          </Button>
        </Flex>
      </Flex>
      <Box>
        <Box>
          <Heading fontSize="lg" fontWeight="semibold" mb={4}>
            Mitarbeiter Daten
          </Heading>

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
        </Box>
        <Box>
          <Heading fontSize="lg" fontWeight="semibold" mb={4}>
            Mitarbeiter Dateien
          </Heading>
          <EmployeeDocumentUpload employee={employee} />
        </Box>
      </Box>
    </Container>
  );
};
