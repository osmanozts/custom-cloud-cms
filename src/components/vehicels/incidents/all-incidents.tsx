import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createIncident,
  deleteIncident,
  getAllVehicleIncidents,
} from "../../../backend-queries";
import { Incidents } from "../../../backend-queries/query/incidents/get-all-vehicle-incidents";
import { AppDispatch } from "../../../redux/store";
import { setToast } from "../../../redux/toast-slice";
import { Tables } from "../../../utils/database/types";
import { DeleteIconButton } from "../../buttons/delete-icon-button";
import { useAuth } from "../../../providers/auth-provider";

type AllIncidentsProps = {
  vehicle: Tables<"vehicles">;
};

export const AllIncidents = ({ vehicle }: AllIncidentsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { authRole } = useAuth();

  const [incidents, setIncidents] = useState<Incidents>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllVehicleIncidents(vehicle.id, (incidents) => setIncidents(incidents));
  }, [vehicle]);

  const handleCreateIncident = async () => {
    setIsLoading(true);
    try {
      const newIncident = await createIncident(vehicle.id);
      dispatch(
        setToast({
          title: "Erfolgreich!",
          description: "Schadensmeldung erstellt.",
          status: "success",
        })
      );

      navigate(
        `/edit-incident?incident_id=${newIncident.id}&vehicle_id=${vehicle.id}`
      );
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description:
            "Beim Erstellen der Schadenmeldng ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
      throw error;
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
      spacing={4}
    >
      {incidents.length > 0 ? (
        incidents.map((incident) => (
          <Flex
            key={incident.id}
            justifyContent="space-between"
            alignItems="center"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            p={4}
            _hover={{ bg: "gray.100" }}
            transition="background-color 0.2s"
          >
            <Link
              to={`/edit-incident?incident_id=${incident.id}&vehicle_id=${vehicle.id}`}
              style={{ textDecoration: "none", flexGrow: 1 }}
            >
              <Flex gap={6}>
                <Text>
                  <strong>ID:</strong> {incident.id}
                </Text>
                <Text>|</Text>
                <Text>
                  <strong>Erstellt am:</strong>{" "}
                  {dayjs(incident.created_at).format("DD.MM.YYYY HH:mm")}
                </Text>
              </Flex>
            </Link>
            <DeleteIconButton
              clickedItem={incident.id}
              onDelete={async (id) => {
                await deleteIncident(id);
                getAllVehicleIncidents(vehicle.id, (incidents) =>
                  setIncidents(incidents)
                );
              }}
              authRole={authRole}
            />
          </Flex>
        ))
      ) : (
        <Text>Keine Schadensmeldungen vorhanden</Text>
      )}
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
  );
};
