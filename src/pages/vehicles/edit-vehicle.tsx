import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuCar, LuCheck, LuWrench, LuX } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  getMinDetailEmployees,
  getVehicle,
  updateVehicle,
} from "../../backend-queries";
import { EmployeesMinimumDetail } from "../../backend-queries/query/get-min-detail-employees";
import { AllIncidents, VehicleDetails } from "../../components";
import { Tables } from "../../utils/database/types";
import { createDriverHistory } from "../../backend-queries/create/create-driver-history";
import { RepeatClockIcon } from "@chakra-ui/icons";

type EditVehicleProps = {};

export const EditVehicle = ({}: EditVehicleProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [vehicle, setVehicle] = useState<Tables<"vehicles"> | null>(null);
  const [drivers, setDrivers] = useState<EmployeesMinimumDetail>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

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
    if (vehicle.profile_id) {
      await createDriverHistory(vehicle.profile_id, vehicle.id);
    }
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
        <Heading
          fontSize="2xl"
          fontWeight="bold"
          color="blue.700"
          textColor="textColor"
        >
          Fahrzeug Ansehen / Bearbeiten
        </Heading>
        <Flex mt={4} width="250px" justifyContent="space-between">
          <Button
            bg="parcelColor"
            color="#fff"
            isLoading={isLoading}
            onClick={handleSave}
            size="sm"
            alignSelf="center"
            isDisabled={isSaveDisabled}
            leftIcon={<Icon as={LuCheck} />}
            _hover={{ bg: "parcelColor", transform: "scale(1.025)" }}
          >
            Speichern
          </Button>
          <Button
            bg="accentColor"
            color="#fff"
            onClick={() => navigate("/vehicle-management")}
            size="sm"
            alignSelf="center"
            leftIcon={<Icon as={LuX} />}
            _hover={{ bg: "accentColor", transform: "scale(1.025)" }}
          >
            Verwerfen
          </Button>
        </Flex>
      </Flex>

      <Box>
        <Heading fontSize="lg" fontWeight="semibold" mb={4} color="textColor">
          <Icon mr={2} as={LuCar} color="textColor" /> Fahrzeug Daten
        </Heading>
        <VStack spacing={6}>
          <VehicleDetails
            vehicle={vehicle}
            drivers={drivers}
            setVehicle={(vehicle) => {
              setVehicle(vehicle);
              setIsSaveDisabled(false);
            }}
          />
        </VStack>
        <Stack
          bg="tileBgColor"
          justifyContent="flex-start"
          alignItems="flex-start"
          p={8}
          my={8}
        >
          <VStack spacing={6}>
            <Flex alignItems="flex-end" height="100%">
              <Button
                borderWidth={1}
                color="textColor"
                width="100%"
                bg="backgroundColor"
                leftIcon={<RepeatClockIcon />}
                onClick={() =>
                  navigate("/driver-history?vehicle_id=" + vehicle.id)
                }
              >
                <Text>Fahrer Historie</Text>
              </Button>
            </Flex>
          </VStack>
        </Stack>

        <Heading fontSize="lg" fontWeight="semibold" my={4} color="textColor">
          <Icon mr={2} as={LuWrench} /> Schadensmeldungen
        </Heading>
        <VStack spacing={6}>
          <AllIncidents vehicle={vehicle} />
        </VStack>
      </Box>
    </Container>
  );
};
