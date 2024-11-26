import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tooltip,
  Icon,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Vehicles } from "../../backend-queries/query/get-all-vehicles";
import dayjs from "dayjs";
import { getMinDetailEmployees } from "../../backend-queries";
import { useEffect, useState } from "react";
import { EmployeesMinimumDetail } from "../../backend-queries/query/get-min-detail-employees";
import { InfoIcon } from "@chakra-ui/icons";

interface VehiclesTableProps {
  vehicles: Vehicles;
}

export const VehiclesTable = ({ vehicles }: VehiclesTableProps) => {
  const navigate = useNavigate();

  const [minEmployees, setMinEmployees] = useState<EmployeesMinimumDetail>([]);

  useEffect(() => {
    getMinDetailEmployees((employees) => setMinEmployees(employees));
  }, [vehicles]);

  const findMinEmployee = (profile_id: string) => {
    return minEmployees.find((employee) => employee.profile_id === profile_id);
  };

  const isDateExpiring = (date: string | null, daysBeforeExpire: number) => {
    if (!date) return false;
    const targetDate = dayjs(date);
    const currentDate = dayjs();
    return (
      targetDate.isAfter(currentDate) &&
      targetDate.diff(currentDate, "day") <= daysBeforeExpire
    );
  };

  const isDateExpired = (date: string | null) => {
    if (!date) return false;
    const targetDate = dayjs(date);
    return targetDate.isBefore(dayjs(), "day");
  };

  const isKmThresholdExceeded = (
    currentKm: string | null,
    nextServiceKm: string | null,
    threshold: number
  ) => {
    if (!currentKm || !nextServiceKm) return false;

    const currentKmNum = parseInt(currentKm, 10);
    const nextServiceKmNum = parseInt(nextServiceKm, 10);

    if (isNaN(currentKmNum) || isNaN(nextServiceKmNum)) return false;

    return nextServiceKmNum - currentKmNum <= threshold;
  };

  return (
    <Table borderWidth={1} mt={4}>
      <Thead>
        <Tr whiteSpace="nowrap">
          <Th>FIN</Th>
          <Th>Kennzeichen</Th>
          <Th>Status</Th>
          <Th>Standort</Th>
          <Th>Haupt-Fahrer</Th>
          <Th>Kilometerstand</Th>
          <Th>Nächste Wartung am</Th>
          <Th>Nächste Wartung ab</Th>
        </Tr>
      </Thead>
      <Tbody>
        {vehicles.map((vehicle) => {
          const isNextServiceDateExpiring = isDateExpiring(
            vehicle.next_service_date,
            30
          );
          const isNextServiceDateExpired = isDateExpired(
            vehicle.next_service_date
          );
          const isKmThresholdExceededFlag = isKmThresholdExceeded(
            vehicle.km_age,
            vehicle.next_service_km,
            30000
          );

          let rowBg = "tileBgColor"; // Standardfarbe
          if (isNextServiceDateExpired || isKmThresholdExceededFlag) {
            rowBg = "red.100"; // Rot für abgelaufene Bedingungen
          } else if (isNextServiceDateExpiring) {
            rowBg = "yellow.100"; // Gelb für bald ablaufende Bedingungen
          }

          return (
            <Tr
              key={vehicle.id}
              whiteSpace="nowrap"
              cursor="pointer"
              onClick={() =>
                navigate({
                  pathname: "/edit-vehicle",
                  search: `?vehicle_id=${vehicle.id}`,
                })
              }
              color="textColor"
              bg={rowBg}
              _hover={
                !isNextServiceDateExpired &&
                !isNextServiceDateExpiring &&
                !isKmThresholdExceededFlag
                  ? { bg: "backgroundColor" }
                  : undefined
              }
            >
              <Td>{vehicle.vin ?? "-"}</Td>
              <Td>{vehicle.license_plate ?? "-"}</Td>
              <Td>{vehicle.state ?? "-"}</Td>
              <Td>{vehicle.location ?? "-"}</Td>
              <Td>
                {findMinEmployee(vehicle.profile_id ?? "")?.first_name}{" "}
                {findMinEmployee(vehicle.profile_id ?? "")?.last_name}
              </Td>
              <Td>{vehicle.km_age ? `${vehicle.km_age} km` : "-"}</Td>
              <Td>
                <Flex alignItems="center" gap={2}>
                  <Text color="textColor">
                    {vehicle.next_service_date
                      ? dayjs(vehicle.next_service_date).format("DD/MM/YYYY")
                      : "Kein Datum ausgewählt"}
                  </Text>
                  {(isNextServiceDateExpired || isNextServiceDateExpiring) && (
                    <Tooltip
                      label={
                        isNextServiceDateExpired
                          ? "Die Wartung ist überfällig."
                          : "Die Wartung steht bald an."
                      }
                    >
                      <Icon as={InfoIcon} color="red.500" />
                    </Tooltip>
                  )}
                </Flex>
              </Td>
              <Td>
                <Flex alignItems="center" gap={2}>
                  <Text color="textColor">
                    {vehicle.next_service_km
                      ? `${vehicle.next_service_km} km`
                      : "Keine KM angegeben"}
                  </Text>
                  {isKmThresholdExceededFlag && (
                    <Tooltip label="Der Kilometerstand liegt nah an der Wartungsgrenze.">
                      <Icon as={InfoIcon} color="red.500" />
                    </Tooltip>
                  )}
                </Flex>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
