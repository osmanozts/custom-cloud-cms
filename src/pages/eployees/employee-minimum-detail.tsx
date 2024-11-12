import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getEmployee,
  getProfile,
  getVehiclesByProfile,
} from "../../backend-queries";
import { VehiclesMinData } from "../../backend-queries/query/get-vehicles-by-profile";
import { Tables } from "../../utils/database/types";

export function EmployeeMinimumDetail() {
  const [searchParams] = useSearchParams();

  const [employee, setEmployee] = useState<Tables<"employees"> | null>(null);
  const [profile, setProfile] = useState<Tables<"profile"> | null>(null);
  const [vehicles, setVehicles] = useState<VehiclesMinData | null>(null);

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
          <Text fontWeight="bold" color="textColor">
            Email:
          </Text>
          <Text color="textColor">{profile?.email ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold" color="textColor">
            Personalnummer:
          </Text>
          <Text color="textColor">{employee?.personnel_number ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold" color="textColor">
            Vorname:
          </Text>
          <Text color="textColor">{employee?.first_name ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold" color="textColor">
            Nachname:
          </Text>
          <Text color="textColor">{employee?.last_name ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold" color="textColor">
            Stadt:
          </Text>
          <Text color="textColor">{employee?.city ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold" color="textColor">
            PLZ:
          </Text>
          <Text color="textColor">{employee?.postal_code ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold" color="textColor">
            Straße:
          </Text>
          <Text color="textColor">{employee?.street ?? "N/A"}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold" color="textColor">
            Rolle:
          </Text>
          <Text color="textColor">{profile?.role ?? "N/A"}</Text>
        </Box>
      </SimpleGrid>
      {vehicles && vehicles?.length > 0 && (
        <Box borderWidth="1px" borderRadius="lg" bg="tileBgColor" p={6} my={4}>
          <Text mb={4} fontWeight="bold" color="textColor">
            Deine Fahrzeuge:
          </Text>
          {vehicles?.map((vehicle) => {
            return (
              <SimpleGrid key={vehicle.id} columns={{ base: 1, md: 2 }} gap={2}>
                <Text key={vehicle.id} color="textColor">
                  Kennzeichen: {vehicle.license_plate}
                </Text>

                <Button>Schaden melden</Button>

                <Divider m={4} />
              </SimpleGrid>
            );
          })}
        </Box>
      )}
    </Container>
  );
}
