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
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  LuCar,
  LuCheck,
  LuFile,
  LuPersonStanding,
  LuWrench,
  LuX,
} from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RepeatClockIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  createKmHistory,
  getMinDetailEmployees,
  getVehicle,
  updateVehicle,
} from "../../backend-queries";
import { createDriverHistory } from "../../backend-queries/create/driver_history/create-driver-history";
import { EmployeesMinimumDetail } from "../../backend-queries/query/employees/get-min-detail-employees";
import {
  AllIncidents,
  DocumentManager,
  VehicleDetails,
} from "../../components";
import { AppDispatch } from "../../redux/store";
import { setToast } from "../../redux/toast-slice";
import { Tables } from "../../utils/database/types";

type EditVehicleProps = {};

export const EditVehicle = ({ }: EditVehicleProps) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [vehicle, setVehicle] = useState<Tables<"vehicles"> | null>(null);
  const [oldDriverId, setOldDriverId] = useState<string | null>(null);
  const [oldKmAge, setOldKmAge] = useState<number | null>(null);

  const [drivers, setDrivers] = useState<EmployeesMinimumDetail>([]);

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
    getMinDetailEmployees((employees) => setDrivers(employees));
  }, [searchParams]);

  useEffect(() => {
    const vehicleId = searchParams.get("vehicle_id") ?? "";
    if (vehicleId) {
      getVehicle(vehicleId, (newVehicle) => {
        const mappedVehicle: Tables<"vehicles"> = {
          ...newVehicle,
          next_service_date: newVehicle.next_service_date
            ? dayjs(newVehicle.next_service_date).format("DD.MM.YYYY")
            : "",
          next_tuv_date: newVehicle.next_tuv_date
            ? dayjs(newVehicle.next_tuv_date).format("DD.MM.YYYY")
            : "",
        };

        setOldDriverId(newVehicle.profile_id);
        setOldKmAge(newVehicle.km_age);
        setVehicle(mappedVehicle);
      });
    }
  }, [searchParams]);

  const handleSave = async () => {
    if (!vehicle) return;

    setIsLoading(true);
    try {
      const nextServiceDateParts = vehicle.next_service_date?.split(".");
      const nextServiceDate =
        nextServiceDateParts?.length === 3
          ? new Date(
            `${nextServiceDateParts[2]}-${nextServiceDateParts[1]}-${nextServiceDateParts[0]}T00:00:00Z`
          ).toISOString()
          : null;
      const nextTuvDateParts = vehicle.next_tuv_date?.split(".");
      const nextTuvDate =
        nextTuvDateParts?.length === 3
          ? new Date(
            `${nextTuvDateParts[2]}-${nextTuvDateParts[1]}-${nextTuvDateParts[0]}`
          ).toISOString()
          : null;

      const updatedVehicle: Tables<"vehicles"> = {
        ...vehicle,
        next_service_date: nextServiceDate,
        next_tuv_date: nextTuvDate,
      };
      await updateVehicle(updatedVehicle);
      if (vehicle.profile_id && vehicle.profile_id !== oldDriverId) {
        await createDriverHistory(vehicle.profile_id, vehicle.id);
      }
      if (vehicle.profile_id && vehicle.km_age && vehicle.km_age !== oldKmAge) {
        await createKmHistory(
          vehicle.km_age,
          vehicle.profile_id ?? "",
          vehicle.id
        );
      }
      dispatch(
        setToast({
          title: "Erfolgreich!",
          description: "Fahrzeug Informationen erfolgreich gespeichert.",
          status: "success",
        })
      );
      navigate("/vehicle-management");
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description:
            "Beim Speichern der Fahrzeug Informationen ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
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
      <Flex flexDirection="column" alignItems="center">
        <Heading fontSize="2xl" fontWeight="bold">
          Fahrzeug Ansehen / Bearbeiten
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
            leftIcon={<Icon as={LuCheck} />}
            _hover={{ bg: "parcelColor", transform: "scale(1.025)" }}
          >
            Speichern
          </Button>
          <Button
            bg="accentColor"
            color="invertedTextColor"
            onClick={() => navigate("/vehicle-management")}
            size="sm"
            alignSelf="center"
            leftIcon={<Icon as={LuX} />}
            _hover={{ bg: "accentColor", transform: "scale(1.025)" }}
          >
            {isSaveDisabled ? 'Zurück' : 'Verwerfen'}
          </Button>
        </Flex>
      </Flex>

      <Box>
        <Heading fontSize="lg" fontWeight="semibold" mb={4}>
          <Icon mr={2} as={LuCar} /> Fahrzeug Daten
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
        <Heading fontSize="lg" fontWeight="semibold" mb={4} mt={8}>
          <RepeatClockIcon mr={2} />
          Historien
        </Heading>
        <Stack
          bg="tileBgColor"
          justifyContent="flex-start"
          alignItems="flex-start"
          p={8}
        >
          <VStack spacing={6}>
            <Flex alignItems="flex-end" height="100%" gap={4}>
              <Button
                borderWidth={1}
                width={200}
                bg="backgroundColor"
                leftIcon={<LuPersonStanding />}
                onClick={() =>
                  navigate("/driver-history?vehicle_id=" + vehicle.id)
                }
              >
                <Text>Fahrer Historie</Text>
              </Button>

              <Button
                borderWidth={1}
                width={250}
                bg="backgroundColor"
                leftIcon={<LuCar />}
                onClick={() => navigate("/km-history?vehicle_id=" + vehicle.id)}
              >
                <Text>Kilometerstand Historie</Text>
              </Button>
            </Flex>
          </VStack>
        </Stack>

        <Box mt={8}>
          <Heading fontSize="lg" fontWeight="semibold" mb={4}>
            <Icon mr={2} as={LuFile} />
            Fahrzeug Dateien
          </Heading>
          <DocumentManager
            bucket="dateien_fahrzeuge"
            rootFolder={vehicle.license_plate!}
          />
        </Box>

        <Box mt={8}>
          <Heading fontSize="lg" fontWeight="semibold" my={4}>
            <Icon mr={2} as={LuWrench} /> Schadensmeldungen
          </Heading>
          <VStack spacing={6}>
            <AllIncidents vehicle={vehicle} />
          </VStack>
        </Box>
      </Box>

      {/* Fixierte Action Buttons unten rechts (nur bei Scroll sichtbar) */}
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
            onClick={() => navigate("/vehicle-management")}
            size="md"
            borderRadius="full"
            aria-label={isSaveDisabled ? "Zurück" : "Verwerfen"}
            _hover={{ bg: "accentColorHover" }}
          >
            <Icon as={LuX} boxSize={6} />
          </Button>
        </Tooltip>
      </Box>
    </Container>
  );
};
