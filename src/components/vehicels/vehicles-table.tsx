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
import { LuCar } from "react-icons/lu";
import { mapVehicleState } from "./services/map-vehicle-state";

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
    currentKm: number | null,
    nextServiceKm: number | null,
    threshold: number
  ) => {
    if (!currentKm || !nextServiceKm) return false;

    const currentKmNum = currentKm;
    const nextServiceKmNum = nextServiceKm;

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
        {vehicles.map((vehicle, index) => {
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
            5000
          );

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
              bg={index % 2 == 0 ? "tileBgColor" : "invertedColor"}
              _hover={{ bg: "backgroundColor" }}
            >
              <Td>
                <Flex alignItems="center" gap={2}>
                  {!isNextServiceDateExpired &&
                    !isNextServiceDateExpiring &&
                    !isKmThresholdExceededFlag && (
                      <Icon as={LuCar} boxSize={4} mr={2} />
                    )}
                  {(isNextServiceDateExpired || isNextServiceDateExpiring) && (
                    <Tooltip
                      label={
                        isNextServiceDateExpired
                          ? "Die Wartung ist überfällig."
                          : "Die Wartung steht bald an."
                      }
                    >
                      <Icon as={InfoIcon} color="accentColor" mr={2} />
                    </Tooltip>
                  )}
                  {isKmThresholdExceededFlag && (
                    <Tooltip label="Der Kilometerstand liegt nah an der Wartungsgrenze.">
                      <Icon as={InfoIcon} color="accentColor" />
                    </Tooltip>
                  )}
                  <Text>{vehicle.vin ?? "-"}</Text>
                </Flex>
              </Td>
              <Td>{vehicle.license_plate ?? "-"}</Td>
              <Td>{mapVehicleState(vehicle.state ?? "active")}</Td>
              <Td>{vehicle.location ?? "-"}</Td>
              <Td>
                {findMinEmployee(vehicle.profile_id ?? "")?.first_name}{" "}
                {findMinEmployee(vehicle.profile_id ?? "")?.last_name}
              </Td>
              <Td>{vehicle.km_age ? `${vehicle.km_age} km` : "-"}</Td>
              <Td>
                <Text>
                  {vehicle.next_service_date
                    ? dayjs(vehicle.next_service_date).format("DD/MM/YYYY")
                    : "Kein Datum ausgewählt"}
                </Text>
              </Td>
              <Td>
                <Text>
                  {vehicle.next_service_km
                    ? `${vehicle.next_service_km} km`
                    : "Keine KM angegeben"}
                </Text>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
