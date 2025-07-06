import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuCheck, LuFileCheck2, LuFileKey, LuX } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";

import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getEmployee, getProfile, updateEmployee } from "../../backend-queries";
import {
  NewProfile,
  updateProfile,
} from "../../backend-queries/update/update-profile";
import { AppDispatch } from "../../redux/store";
import { setToast } from "../../redux/toast-slice";
import { Tables } from "../../utils/database/types";
import { DocumentManager, EmployeeDetails, EmployeeMinDetail } from "../../components";
import { useAuth } from "../../providers/auth-provider";

type EditEmployeeProps = {};

export const EditEmployee = ({ }: EditEmployeeProps) => {
  const { authRole } = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [employee, setEmployee] = useState<Tables<"employees"> | null>(null);
  const [profile, setProfile] = useState<Tables<"profile"> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [showFloatingButtons, setShowFloatingButtons] = useState<boolean>(false);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowFloatingButtons(true);
      } else {
        setShowFloatingButtons(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

    try {
      const dateOfBirthParts = employee.date_of_birth?.split(".");
      const dateOfBirth =
        dateOfBirthParts?.length === 3
          ? new Date(
            `${dateOfBirthParts[2]}-${dateOfBirthParts[1]}-${dateOfBirthParts[0]}T00:00:00Z`
          ).toISOString()
          : null;

      const idCardEndDateParts = employee.id_card_end_date?.split(".");
      const idCardEndDate =
        idCardEndDateParts?.length === 3
          ? new Date(
            `${idCardEndDateParts[2]}-${idCardEndDateParts[1]}-${idCardEndDateParts[0]}T00:00:00Z`
          ).toISOString()
          : null;

      const licenseEndDateParts = employee.driver_license_end_date?.split(".");
      const driverLicenseEndDate =
        licenseEndDateParts?.length === 3
          ? new Date(
            `${licenseEndDateParts[2]}-${licenseEndDateParts[1]}-${licenseEndDateParts[0]}T00:00:00Z`
          ).toISOString()
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
        auth_role: profile.auth_role,
      };
      await updateProfile(newProfile);
      dispatch(
        setToast({
          title: "Erfolgreich!",
          description: "Mitarbeiter Informationen erfolgreich gespeichert.",
          status: "success",
        })
      );
      navigate("/employee-management");
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description:
            "Beim Speichern der Mitarbeiter Informationen ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (!employee || !profile) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  try {
    return (
      <>
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
                width={120}
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
                width={120}
              >
                <Icon mr={2} as={LuX} />
                {isSaveDisabled ? 'Zurück' : 'Verwerfen'}
              </Button>
            </Flex>

          </Flex>
          <Box>
            <Box>
              <Heading fontSize="lg" fontWeight="semibold" mb={4}>
                Mitarbeiter Daten
              </Heading>

              {authRole === "superadmin" ? (
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
              ) : (
                <EmployeeMinDetail employee={employee} profile={profile} />
              )}
            </Box>

            {employee.personnel_number !== null && authRole === "superadmin" ? (
              <>
                <Box>
                  <Flex>
                    <Icon as={LuFileCheck2} boxSize={4} mr={4} />
                    <Heading fontSize="lg" fontWeight="semibold" mb={4}>
                      Öffentliche Mitarbeiter Dateien
                    </Heading>
                  </Flex>

                  <DocumentManager
                    bucket="dateien_mitarbeiter"
                    rootFolder={employee.personnel_number!}
                  />
                </Box>

                <Box mt={4}>
                  <Flex>
                    <Icon as={LuFileKey} boxSize={4} mr={4} />
                    <Heading fontSize="lg" fontWeight="semibold" mb={4}>
                      Private Mitarbeiter Dateien
                    </Heading>
                  </Flex>
                  <DocumentManager
                    bucket="dateien_mitarbeiter"
                    rootFolder={`${employee.personnel_number!}-private`}
                  />
                </Box>
              </>
            ) : (
              <Box
                mt={6}
                p={4}
                borderWidth={1}
                borderColor="red.500"
                borderRadius="md"
                backgroundColor="red.50"
                display="flex"
                alignItems="center"
              >
                <Icon as={LuX} boxSize={6} color="red.500" mr={3} />
                <Text color="red.700" fontWeight="bold">
                  Zugriff auf Dokumenten-System verweigert
                </Text>
              </Box>
            )}
          </Box>

          {authRole === "superadmin" && (
            <Flex justifyContent="flex-end" mt={10} gap={4}>
              <Button
                bg="accentColor"
                color="invertedTextColor"
                onClick={() => navigate("/employee-management")}
                aria-label="Verwerfen"
              >
                Verwerfen
              </Button>
              <Button
                bg="parcelColor"
                color="invertedTextColor"
                onClick={handleSave}
                isLoading={isLoading}
                isDisabled={isSaveDisabled}
                aria-label="Speichern"
              >
                Speichern
              </Button>
            </Flex>
          )}
        </Container>

        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          display="flex"
          flexDirection="column"
          gap={4}
          zIndex={1000}
          transition="opacity 0.3s ease"
          opacity={showFloatingButtons ? 1 : 0}
          pointerEvents={showFloatingButtons ? "auto" : "none"}
        >
          <Tooltip label="Speichern" placement="left">
            <Button
              bg="parcelColor"
              color="invertedTextColor"
              isLoading={isLoading}
              onClick={handleSave}
              size="md"
              borderRadius="full"
              isDisabled={isSaveDisabled}
              aria-label="Speichern"
              _hover={{ bg: "parcelColorHover" }}
            >
              <Icon as={LuCheck} boxSize={6} />
            </Button>
          </Tooltip>
          <Tooltip label={isSaveDisabled ? "Zurück" : "Verwerfen"} placement="left">
            <Button
              bg="accentColor"
              color="invertedTextColor"
              onClick={() => navigate("/employee-management")}
              size="md"
              borderRadius="full"
              aria-label={isSaveDisabled ? "Zurück" : "Verwerfen"}
              _hover={{ bg: "accentColorHover" }}
            >
              <Icon as={LuX} boxSize={6} />
            </Button>
          </Tooltip>
        </Box>
      </>
    );
  } catch (e) {
    console.error(e);
    return <p>Fehler beim Anzeigen der Mitarbeiterdaten </p>;
  }
};
