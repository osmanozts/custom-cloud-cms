import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
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

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={6}
        borderWidth="1px"
        borderRadius="lg"
        bg="tileBgColor"
        p={6}
      >
        <GridItem>
          <Box>
            <Text fontWeight="bold">Email:</Text>
            <Text>{profile?.email ?? "N/A"}</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text fontWeight="bold">Personalnummer:</Text>
            <Text>{employee?.personnel_number ?? "N/A"}</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text fontWeight="bold">Vorname:</Text>
            <Text>{employee?.first_name ?? "N/A"}</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text fontWeight="bold">Nachname:</Text>
            <Text>{employee?.last_name ?? "N/A"}</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text fontWeight="bold">Stadt:</Text>
            <Text>{employee?.city ?? "N/A"}</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text fontWeight="bold">PLZ:</Text>
            <Text>{employee?.postal_code ?? "N/A"}</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text fontWeight="bold">Straße:</Text>
            <Text>{employee?.street ?? "N/A"}</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text fontWeight="bold">Rolle:</Text>
            <Text>{profile?.role ?? "N/A"}</Text>
          </Box>
        </GridItem>
      </Grid>
      {vehicles && vehicles?.length > 0 && (
        <Box borderWidth="1px" borderRadius="lg" bg="tileBgColor" p={6} my={4}>
          <Text mb={4} fontWeight="bold">
            Deine Fahrzeuge:
          </Text>
          {vehicles?.map((vehicle) => {
            return (
              <Grid
                key={vehicle.id}
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={2}
              >
                <GridItem>
                  <Text key={vehicle.id}>
                    Kennzeichen: {vehicle.license_plate}
                  </Text>
                </GridItem>
                <GridItem>
                  <Button>Schaden melden</Button>
                </GridItem>
                <Divider m={4} />
              </Grid>
            );
          })}
        </Box>
      )}
    </Container>
  );
}
