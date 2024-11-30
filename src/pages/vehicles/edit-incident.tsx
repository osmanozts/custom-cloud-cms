import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getIncident, getVehicle, updateIncident } from "../../backend-queries";
import { IncidentDetails } from "../../components";
import { Tables } from "../../utils/database/types";
import dayjs from "dayjs";

type EditIncidentProps = {};

export const EditIncident = ({}: EditIncidentProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const vehicleID = searchParams.get("vehicle_id") ?? "";
  const [vehicle, setVehicle] = useState<Tables<"vehicles">>();

  useEffect(() => {
    if (vehicleID) {
      getVehicle(vehicleID, (newVehicle) => {
        setVehicle(newVehicle);
      });
    }
  }, [vehicleID]);

  const [incident, setIncident] = useState<Tables<"incidents"> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  useEffect(() => {
    const incidentId = searchParams.get("incident_id") ?? "";
    if (incidentId) {
      getIncident(Number(incidentId), (newIncident) => {
        if (newIncident) {
          const time = newIncident?.incident_time?.split(":");
          const newTime = `${time![0]}:${time![1]}`;

          const mappedIncident: Tables<"incidents"> = {
            ...newIncident,
            incident_date: newIncident?.incident_date
              ? dayjs(newIncident?.incident_date).format("DD.MM.YYYY")
              : "",
            incident_time: newIncident.incident_time ? newTime : "",
            opponent_driver_birth_date: newIncident?.opponent_driver_birth_date
              ? dayjs(newIncident?.opponent_driver_birth_date).format(
                  "DD.MM.YYYY"
                )
              : "",
          };
          setIncident(mappedIncident);
        }
      });
    }
  }, [searchParams]);

  const handleSave = async () => {
    if (!incident) return;

    const incidentDate = incident?.incident_date
      ? new Date(incident.incident_date).toLocaleDateString("de-DE")
      : null;
    const incidentTime = incident?.incident_time
      ? incident.incident_time
      : null;

    const birthDate = incident?.opponent_driver_birth_date
      ? new Date(incident.opponent_driver_birth_date).toLocaleDateString()
      : null;

    const mappedIncident: Tables<"incidents"> = {
      ...incident,
      incident_date: incidentDate,
      incident_time: incidentTime,
      opponent_driver_birth_date: birthDate,
    };

    setIsLoading(true);
    try {
      await updateIncident(mappedIncident);
      navigate("/edit-vehicle?vehicle_id=" + vehicleID);
    } catch (error) {
      console.error("Fehler beim Speichern des Vorfalls:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!incident) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container maxW="container.xl" bg="backgroundColor" borderRadius="lg">
      <Flex flexDirection="column" my={8} alignItems="center">
        <Heading fontSize="2xl" fontWeight="bold" color="blue.700">
          Schadensmeldung Ansehen / Bearbeiten
        </Heading>
        <Flex mt={4} width="250px" justifyContent="space-between">
          <Button
            bg="parcelColor"
            color="#fff"
            isLoading={isLoading}
            loadingText="Speichern..."
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
            color="#fff"
            onClick={() => navigate("/edit-vehicle?vehicle_id=" + vehicleID)}
            size="sm"
            alignSelf="center"
          >
            <Icon mr={2} as={LuX} />
            <Text>Verwerfen</Text>
          </Button>
        </Flex>
      </Flex>
      {vehicle && (
        <Box pb={6}>
          <IncidentDetails
            incident={incident}
            setIncident={(newIncident) => {
              setIncident(newIncident);
              setIsSaveDisabled(false);
            }}
            vehicle={vehicle}
          />
        </Box>
      )}
    </Container>
  );
};
