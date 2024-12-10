import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LuTrash2 } from "react-icons/lu";
import {
  createIncident,
  deleteIncident,
  getAllVehicleIncidents,
} from "../../backend-queries";
import { Incidents } from "../../backend-queries/query/get-all-vehicle-incidents";
import { Tables } from "../../utils/database/types";
import { DeleteFileConfirmationDialog } from "../dialogs/delete-file-confirmation-dialog";

type AllIncidentsProps = {
  vehicle: Tables<"vehicles">;
};

export const AllIncidents = ({ vehicle }: AllIncidentsProps) => {
  const [incidents, setIncidents] = useState<Incidents>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clickedId, setClickedId] = useState<string | null>(null);

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
                <Box
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
                      width="100%"
                      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                      gap={4}
                    >
                      <Link
                        to={`/edit-incident?incident_id=${incident.id}&vehicle_id=${vehicle.id}`}
                        style={{ textDecoration: "none", maxWidth: "100%" }}
                      >
                        <Grid
                          width="200%"
                          templateColumns={{
                            base: "1fr",
                            md: "repeat(2, 1fr)",
                          }}
                          gap={4}
                        >
                          <GridItem
                            display="flex"
                            flexDirection="row"
                            alignItems="flex-start"
                            gap={2}
                            p={4}
                          >
                            <Text fontWeight="bold">Schaden ID:</Text>
                            <Text>{incident.id}</Text>
                          </GridItem>
                          <GridItem
                            display="flex"
                            flexDirection="row"
                            alignItems="flex-start"
                            gap={2}
                            p={4}
                          >
                            <Text fontWeight="bold">Erstellt am:</Text>
                            <Text>
                              {dayjs(incident.created_at).format(
                                "DD.MM.YYYY HH:mm"
                              )}
                            </Text>
                          </GridItem>
                        </Grid>
                      </Link>
                      <GridItem
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        gap={2}
                        color="accentColor"
                      >
                        <IconButton
                          color="accentColor"
                          as={LuTrash2}
                          boxSize={10}
                          aria-label="delete employee entry"
                          bg="invertedColor"
                          padding={2}
                          mr={4}
                          onClick={(e) => {
                            e.stopPropagation(); // Stoppt die Weiterleitung des Klick-Ereignisses
                            setClickedId(incident.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        />
                      </GridItem>
                    </Grid>
                  </Flex>
                </Box>
              </GridItem>
            ))
          ) : (
            <Text>Keine Schadensmeldungen vorhanden</Text>
          )}
        </Grid>
        <Button
          onClick={handleCreateIncident}
          isLoading={isLoading}
          loadingText="Erstellt..."
          bg="accentColor"
          color="invertedColor"
        >
          Neuen Schaden / Panne melden
        </Button>
      </Stack>

      <DeleteFileConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={async () => {
          if (clickedId) await deleteIncident(clickedId);
          await getAllVehicleIncidents(vehicle.id, (incidents) =>
            setIncidents(incidents)
          );
        }}
      />
    </Stack>
  );
};
