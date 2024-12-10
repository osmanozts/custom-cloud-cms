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
import dayjs from "dayjs";

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
        const mappedVehicle: Tables<"driver_history"> = {
          ...newValue,
          drive_start: newValue.drive_start
            ? dayjs(newValue.drive_start).format("DD.MM.YYYY HH:mm")
            : null,
          drive_end: newValue.drive_end
            ? dayjs(newValue.drive_end).format("DD.MM.YYYY HH:mm")
            : null,
        };
        setDriverHistory(mappedVehicle);
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

    const driveStartDateParts = driverHistory.drive_start?.split(".");
    const driveStartDate =
      driveStartDateParts?.length === 3
        ? new Date(
            `${driveStartDateParts[2]}-${driveStartDateParts[1]}-${driveStartDateParts[0]}T00:00:00Z`
          ).toISOString()
        : null;

    const driveEndDateParts = driverHistory.drive_end?.split(".");
    const driveEndDate =
      driveEndDateParts?.length === 3
        ? new Date(
            `${driveEndDateParts[2]}-${driveEndDateParts[1]}-${driveEndDateParts[0]}T00:00:00Z`
          ).toISOString()
        : null;

    setIsLoading(true);

    const updatedDriverHistory: Tables<"driver_history"> = {
      ...driverHistory,
      drive_start: driveStartDate,
      drive_end: driveEndDate,
    };
    await updateDriverHistory(updatedDriverHistory);
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
        <Heading fontSize="2xl" fontWeight="bold">
          Fahrer Historie Ansehen / Bearbeiten
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
