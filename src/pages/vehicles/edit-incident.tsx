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
import { LuCheck, LuWrench, LuX } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getIncident, updateIncident } from "../../backend-queries";
import { IncidentDetails } from "../../components";
import { Tables } from "../../utils/database/types";

type EditIncidentProps = {};

export const EditIncident = ({}: EditIncidentProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const vehicleID = searchParams.get("vehicle_id") ?? "";

  const [incident, setIncident] = useState<Tables<"incidents"> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const incidentId = searchParams.get("incident_id") ?? "";
    if (incidentId) {
      getIncident(Number(incidentId), (newIncident) => {
        setIncident(newIncident);
      });
    }
  }, [searchParams]);

  const handleSave = async () => {
    if (!incident) return;

    setIsLoading(true);
    await updateIncident(incident);
    setIsLoading(false);
    navigate("/edit-vehicle?vehicle_id=" + vehicleID);
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
            bg="successColor"
            color="textColor"
            isLoading={isLoading}
            loadingText="Speichern..."
            onClick={handleSave}
            size="sm"
            alignSelf="center"
          >
            <Icon mr={2} as={LuCheck} />
            <Text color="textColor">Speichern</Text>
          </Button>
          <Button
            bg="dangerColor"
            color="textColor"
            onClick={() => navigate("/edit-vehicle?vehicle_id=" + vehicleID)}
            size="sm"
            alignSelf="center"
          >
            <Icon mr={2} as={LuX} />
            Verwerfen
          </Button>
        </Flex>
      </Flex>

      <Box pb={6}>
        <Heading fontSize="lg" fontWeight="semibold" mb={4} color="gray.600">
          <Icon mr={2} as={LuWrench} /> Schadensmeldung Daten
        </Heading>
        <IncidentDetails
          incident={incident}
          setIncident={setIncident}
          vehicle_id={vehicleID}
        />
      </Box>
    </Container>
  );
};
