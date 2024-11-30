import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createIncident, getAllVehicleIncidents } from "../../backend-queries";
import { Incidents } from "../../backend-queries/query/get-all-vehicle-incidents";
import { Tables } from "../../utils/database/types";

type AllIncidentsProps = {
  vehicle: Tables<"vehicles">;
};

export const AllIncidents = ({ vehicle }: AllIncidentsProps) => {
  const [incidents, setIncidents] = useState<Incidents>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getAllVehicleIncidents(vehicle.id, (incidents) => setIncidents(incidents));
  }, [vehicle]);

  const handleCreateIncident = async () => {
    setIsLoading(true);
    try {
      const newIncident = await createIncident(vehicle.id);
      toast({
        title: "Schadensmeldung erstellt.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(
        `/edit-incident?incident_id=${newIncident.id}&vehicle_id=${vehicle.id}`
      );
    } catch (error) {
      toast({
        title: "Fehler.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      bg="tileBgColor"
      p={6}
    >
      <Stack spacing={4}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}>
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <GridItem key={incident.id} mb={2}>
                <Link
                  to={`/edit-incident?incident_id=${incident.id}&vehicle_id=${vehicle.id}`}
                  style={{ textDecoration: "none", maxWidth: "100%" }}
                >
                  <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    bg="white"
                    _hover={{ bg: "gray.100" }}
                    transition="background-color 0.2s"
                  >
                    <Flex
                      gap={6}
                      alignItems="center"
                      flexDirection={{ base: "column", md: "row" }}
                      wrap="wrap"
                    >
                      <Grid
                        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
                        gap={4}
                      >
                        <GridItem
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                          gap={2}
                          p={4}
                        >
                          <Text fontWeight="bold" color="textColor">
                            Schaden ID:
                          </Text>
                          <Text color="textColor">{incident.id}</Text>
                        </GridItem>
                        <GridItem
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                          gap={2}
                          p={4}
                        >
                          <Text fontWeight="bold" color="textColor">
                            Erstellt am:
                          </Text>
                          <Text color="textColor">
                            {dayjs(incident.created_at).format(
                              "DD.MM.YYYY HH:mm"
                            )}
                          </Text>
                        </GridItem>
                        <GridItem
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                          gap={2}
                          p={4}
                        >
                          <Text fontWeight="bold" color="textColor">
                            Vorfall Datum:
                          </Text>
                          <Text color="textColor">
                            {incident.incident_date
                              ? dayjs(incident.incident_date).format(
                                  "DD.MM.YYYY HH:mm"
                                )
                              : "Kein Datum eingetragen"}
                          </Text>
                        </GridItem>
                        <GridItem
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                          gap={2}
                          p={4}
                        >
                          <Text fontWeight="bold" color="textColor">
                            Reperatur abgeschlossen:
                          </Text>
                          <Text color="textColor">
                            {incident.repair_completed ? "Ja" : "Nein"}
                          </Text>
                        </GridItem>
                      </Grid>
                    </Flex>
                  </Box>
                </Link>
              </GridItem>
            ))
          ) : (
            <Text color="textColor">Keine Schadensmeldungen vorhanden</Text>
          )}
        </Grid>
        <Button
          onClick={handleCreateIncident}
          isLoading={isLoading}
          loadingText="Erstellt..."
          bg="dangerColor"
        >
          Neuen Schaden / Panne melden
        </Button>
      </Stack>
    </Stack>
  );
};
