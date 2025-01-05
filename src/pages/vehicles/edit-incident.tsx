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

import dayjs from "dayjs";
import { getIncident, getVehicle, updateIncident } from "../../backend-queries";
import { DocumentManager, IncidentDetails } from "../../components";
import { Tables } from "../../utils/database/types";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/toast-slice";

type EditIncidentProps = {};

export const EditIncident = ({ }: EditIncidentProps) => {
  const dispatch: AppDispatch = useDispatch();
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
      getIncident(incidentId, (newIncident) => {
        if (newIncident) {
          const time = newIncident?.incident_time?.split(":") ?? ["-", "-"];
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
    setIsLoading(true);

    try {
      const incidentDateParts = incident.incident_date?.split(".");
      const incidentDate =
        incidentDateParts?.length === 3
          ? new Date(
            `${incidentDateParts[2]}-${incidentDateParts[1]}-${incidentDateParts[0]}T00:00:00Z`
          ).toISOString()
          : null;

      const incidentTime = incident?.incident_time
        ? incident.incident_time
        : null;

      const birthDatePart = incident?.opponent_driver_birth_date?.split(".");
      const birthDate =
        birthDatePart?.length === 3
          ? new Date(
            `${birthDatePart[2]}-${birthDatePart[1]}-${birthDatePart[0]}T00:00:00Z`
          ).toISOString()
          : null;

      const mappedIncident: Tables<"incidents"> = {
        ...incident,
        incident_date: incidentDate,
        incident_time: incidentTime,
        opponent_driver_birth_date: birthDate,
      };

      await updateIncident(mappedIncident);
      dispatch(
        setToast({
          title: "Erfolgreich!",
          description: "Schadensmeldung Informationen erfolgreich gespeichert.",
          status: "success",
        })
      );
      navigate("/edit-vehicle?vehicle_id=" + vehicleID);
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description:
            "Beim Speichern der Schadensmeldung Informationen ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
      throw error;
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
        <Heading fontSize="2xl" fontWeight="bold">
          Schadensmeldung Ansehen / Bearbeiten
        </Heading>
        <Flex mt={4} width="250px" justifyContent="space-between">
          <Button
            bg="parcelColor"
            color="invertedTextColor"
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
            color="invertedTextColor"
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

      <Box my={8}>
        <Heading fontSize="lg" fontWeight="semibold" mb={4}>
          Schaden Dateien
        </Heading>
        <DocumentManager
          bucket="dateien_fahrzeuge"
          rootFolder={`${vehicle?.license_plate!}/Schadensmeldungen/${incident.id
            }`}
        />
      </Box>
    </Container>
  );
};
