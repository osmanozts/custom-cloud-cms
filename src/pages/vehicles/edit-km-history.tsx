import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getAllEmployees, getKmHistory } from "../../backend-queries";
import { EmployeeWithProfile } from "../../backend-queries/joins/employee-with-profile-query";
import { KmHistoryDetails } from "../../components";
import { Tables } from "../../utils/database/types";

type EditKmHistoryProps = {};

export const EditKmHistory = ({}: EditKmHistoryProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [kmHistory, setDriverHistory] = useState<Tables<"km_history"> | null>(
    null,
  );
  const [employees, setEmployees] = useState<EmployeeWithProfile[] | null>(
    null,
  );

  useEffect(() => {
    const id = searchParams.get("id") ?? "";

    if (!id) return;

    getKmHistory(id, (newValue) => {
      const mappedVehicle: Tables<"km_history"> = {
        ...newValue,
      };
      setDriverHistory(mappedVehicle);
    });
  }, [searchParams]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await getAllEmployees({
          page: 1,
          pageSize: 1000,
        });
        setEmployees(result.employees);
      } catch (error) {
        console.error("Fehler beim Laden der Mitarbeiter:", error);
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);

  if (!kmHistory) {
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
          Fahrer Historie Ansehen / Bearbeiten
        </Heading>
        <Flex mt={4} width="250px" justifyContent="space-between">
          <Button
            bg="accentColor"
            color="invertedTextColor"
            onClick={() =>
              navigate("/km-history?vehicle_id=" + kmHistory.vehicle_id)
            }
            size="sm"
            alignSelf="center"
          >
            <Icon mr={2} as={LuX} />
            Zurück
          </Button>
        </Flex>
      </Flex>

      <Box pb={6}>
        <KmHistoryDetails
          kmHistory={kmHistory}
          employees={employees ?? undefined}
        />
      </Box>
    </Container>
  );
};