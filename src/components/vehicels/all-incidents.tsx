import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { LuPen } from "react-icons/lu";
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
      navigate(`/edit-incident?incident_id=${newIncident.id}`);
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
              <GridItem key={incident.id}>
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
                      >
                        <GridItem
                          borderRightWidth={1}
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          gap={2}
                        >
                          <Icon as={LuPen} size="24px" color="gray.600" />
                          <Text whiteSpace="normal" wordBreak="break-word">
                            Schaden ID: {incident.id}
                          </Text>
                        </GridItem>

                        <GridItem
                          borderRightWidth={1}
                          display="flex"
                          flexDirection="row"
                          justifyContent="center"
                        >
                          <Text whiteSpace="normal" wordBreak="break-word">
                            Erstellt am:{" "}
                            {dayjs(incident.created_at).format(
                              "DD.MM.YYYY HH:mm"
                            )}
                          </Text>
                        </GridItem>
                        <GridItem
                          borderRightWidth={1}
                          display="flex"
                          flexDirection="row"
                          justifyContent="center"
                        >
                          <Text whiteSpace="normal" wordBreak="break-word">
                            Vorfall Datum:{" "}
                            {incident.incident_date
                              ? dayjs(incident.incident_date).format(
                                  "DD.MM.YYYY HH:mm"
                                )
                              : "Kein Datum eingetragen"}
                          </Text>
                        </GridItem>
                        <GridItem
                          borderRightWidth={1}
                          display="flex"
                          flexDirection="row"
                          justifyContent="center"
                        >
                          <Text whiteSpace="normal" wordBreak="break-word">
                            Reperatur abgeschlossen:{" "}
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
            <Text>Keine Schadensmeldungen vorhanden</Text>
          )}
        </Grid>
        <Button
          onClick={handleCreateIncident}
          isLoading={isLoading}
          loadingText="Creating"
          bg="dangerColor"
        >
          Neuen Schaden / Panne melden
        </Button>
      </Stack>
    </Stack>
  );
};
