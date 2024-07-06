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

import {
  getMinDetailEmployees,
  getVehicle,
  updateVehicle,
} from "../../backend-queries";
import { EmployeesMinimumDetail } from "../../backend-queries/query/get-min-detail-employees";
import { VehicleDetails } from "../../components";
import { Tables } from "../../utils/database/types";

type EditVehicleProps = {};

export const EditVehicle = ({}: EditVehicleProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [vehicle, setVehicle] = useState<Tables<"vehicles"> | null>(null);
  const [drivers, setDrivers] = useState<EmployeesMinimumDetail>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getMinDetailEmployees((employees) => setDrivers(employees));
  }, [searchParams]);

  useEffect(() => {
    const vehicleId = searchParams.get("vehicle_id") ?? "";
    if (vehicleId) {
      getVehicle(vehicleId, (newVehicle) => {
        setVehicle(newVehicle);
      });
    }
  }, [searchParams]);

  const handleSave = async () => {
    if (!vehicle) return;

    setIsLoading(true);
    await updateVehicle(vehicle);
    setIsLoading(false);
    navigate("/vehicle-management");
  };

  if (!vehicle) {
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
          Fahrzeug Ansehen / Bearbeiten
        </Heading>
        <Flex mt={4} width="250px" justifyContent="space-between">
          <Button
            bg="successColor"
            color="textColor"
            isLoading={isLoading}
            onClick={handleSave}
            size="sm"
            alignSelf="center"
          >
            <Icon mr={2} as={LuCheck} />
            <Text>Speichern</Text>
          </Button>
          <Button
            bg="dangerColor"
            color="textColor"
            onClick={() => navigate("/vehicle-management")}
            size="sm"
            alignSelf="center"
          >
            <Icon mr={2} as={LuX} />
            Verwerfen
          </Button>
        </Flex>
      </Flex>

      <Box>
        <Heading fontSize="lg" fontWeight="semibold" mb={4} color="gray.600">
          Fahrzeug Daten
        </Heading>
        <VStack spacing={6}>
          <VehicleDetails
            vehicle={vehicle}
            drivers={drivers}
            setVehicle={setVehicle}
          />
        </VStack>
      </Box>
    </Container>
  );
};
