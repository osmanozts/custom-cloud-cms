import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  createIncidentEmployee,
  getEmployee,
  getProfile,
  getVehiclesByProfile,
} from "../../backend-queries";
import { VehiclesMinData } from "../../backend-queries/query/get-vehicles-by-profile";
import { Tables } from "../../utils/database/types";
import { DocumentView } from "../../components";
import { LuCar, LuFile, LuFileKey } from "react-icons/lu";

export function EmployeeMinimumDetail() {
  const [searchParams] = useSearchParams();

  const [employee, setEmployee] = useState<Tables<"employees"> | null>(null);
  const [profile, setProfile] = useState<Tables<"profile"> | null>(null);
  const [vehicles, setVehicles] = useState<VehiclesMinData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const profileId = searchParams.get("profile_id") ?? "";
    if (profileId) {
      getEmployee(profileId, setEmployee);
      getProfile(profileId, setProfile);
      getVehiclesByProfile(profileId, setVehicles);
    }
  }, [searchParams]);

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8} textAlign="center">
        <Heading as="h1" size="lg" mb={4}>
          Mitarbeiterinformationen
        </Heading>
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        gap={6}
        borderWidth="1px"
        borderRadius="lg"
        bg="tileBgColor"
        p={6}
      >
        <Box>
          <Text fontWeight="bold">Email:</Text>
          <Text>{profile?.email ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Personalnummer:</Text>
          <Text>{employee?.personnel_number ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Vorname:</Text>
          <Text>{employee?.first_name ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Nachname:</Text>
          <Text>{employee?.last_name ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Stadt:</Text>
          <Text>{employee?.city ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">PLZ:</Text>
          <Text>{employee?.postal_code ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Straße, Hausnummer:</Text>
          <Text>{employee?.street ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Mobil:</Text>
          <Text>{employee?.mobile ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Nationalität:</Text>
          <Text>{employee?.nationality ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Rolle:</Text>
          <Text>{profile?.auth_role ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Standort:</Text>
          <Text>{employee?.location ?? "N/A"}</Text>
        </Box>
      </SimpleGrid>
      {vehicles && vehicles?.length > 0 && (
        <Box mt={8}>
          <Flex mb={4}>
            <Icon as={LuCar} boxSize={4} mr={4} />
            <Heading fontSize="lg" fontWeight="semibold" mb={4}>
              Zugewiesene Fahrzeuge:
            </Heading>
          </Flex>

          {vehicles?.map((vehicle) => {
            return (
              <SimpleGrid
                key={vehicle.id}
                columns={{ base: 1, md: 1 }}
                gap={2}
                borderWidth="1px"
                borderRadius="lg"
                bg="tileBgColor"
                p={6}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text key={vehicle.id}>
                    Kennzeichen: {vehicle.license_plate ?? "N/V"}
                  </Text>

                  <Button
                    width={200}
                    bg="accentColor"
                    color="invertedTextColor"
                    isLoading={isLoading}
                    onClick={async () => {
                      setIsLoading(true);
                      try {
                        await createIncidentEmployee(vehicle.id);
                      } catch (e) {
                        throw new Error(`${e}`);
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                  >
                    Schaden melden
                  </Button>
                </Flex>
              </SimpleGrid>
            );
          })}
        </Box>
      )}

      <Box my={8}>
        <Flex>
          <Icon as={LuFile} boxSize={4} mr={4} />
          <Heading fontSize="lg" fontWeight="semibold" mb={4}>
            Persönliche Bibliothek
          </Heading>
        </Flex>
        {employee?.profile_id && (
          <DocumentView
            bucket="dateien_mitarbeiter"
            rootFolder={employee.profile_id}
          />
        )}
      </Box>
    </Container>
  );
}
