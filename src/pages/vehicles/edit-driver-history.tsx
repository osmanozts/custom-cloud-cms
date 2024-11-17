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

import {
  getAllEmployees,
  getDriverHistory,
  getEmployee,
} from "../../backend-queries";
import { DriverHistoryDetails } from "../../components";
import { updateDriverHistory } from "../../backend-queries/update/update-driver-history";
import { Tables } from "../../utils/database/types";

type EditDriverHistoryProps = {};

export const EditDriverHistory = ({}: EditDriverHistoryProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [driverHistory, setDriverHistory] =
    useState<Tables<"driver_history"> | null>(null);
  const [employee, setEmployee] = useState<Tables<"employees"> | null>(null);
  const [employees, setEmployees] = useState<Tables<"employees">[] | null>(
    null
  );

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const id = searchParams.get("id") ?? "";
    if (id) {
      getDriverHistory(Number(id), (newValue) => {
        setDriverHistory(newValue);
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (driverHistory) {
      getEmployee(driverHistory?.driver_id ?? "", (newValue) => {
        setEmployee(newValue);
      });
      getAllEmployees((newValue) => setEmployees(newValue));
    }
  }, [driverHistory]);
  useEffect(() => {
    getAllEmployees((newValue) => setEmployees(newValue));
  }, [employee]);

  const handleSave = async () => {
    if (!driverHistory) return;

    setIsLoading(true);
    await updateDriverHistory(driverHistory);
    setIsLoading(false);
    navigate(
      "/driver-history?vehicle_id=" + driverHistory.vehicle_id?.toString()
    );
  };

  if (!driverHistory) {
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
          Fahrer Historie Ansehen / Bearbeiten
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
            isDisabled={isSaveDisabled}
          >
            <Icon mr={2} as={LuCheck} />
            <Text color="textColor">Speichern</Text>
          </Button>
          <Button
            bg="dangerColor"
            color="textColor"
            onClick={() =>
              navigate("/driver-history?vehicle_id=" + driverHistory.vehicle_id)
            }
            size="sm"
            alignSelf="center"
          >
            <Icon mr={2} as={LuX} />
            Verwerfen
          </Button>
        </Flex>
      </Flex>

      <Box pb={6}>
        <DriverHistoryDetails
          driverHistory={driverHistory}
          employee={employee ?? undefined}
          employees={employees ?? undefined}
          setDriverHistory={(newValue) => {
            setDriverHistory(newValue);
            setIsSaveDisabled(false);
          }}
        />
      </Box>
    </Container>
  );
};
