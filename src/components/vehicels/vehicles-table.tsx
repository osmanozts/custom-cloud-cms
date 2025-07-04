import { InfoIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { LuCar } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { getMinDetailEmployees } from "../../backend-queries";
import { EmployeesMinimumDetail } from "../../backend-queries/query/employees/get-min-detail-employees";
import { Vehicles } from "../../backend-queries/query/vehicles/get-all-vehicles";
import { mapVehicleState } from "./services/map-vehicle-state";

interface VehiclesTableProps {
  vehicles: Vehicles;
}

export const VehiclesTable = ({
  vehicles,
}: VehiclesTableProps) => {
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

  const isKmThresholdExceeding = (
    currentKm: number | null,
    nextServiceKm: number | null,
    threshold: number
  ) => {
    if (!currentKm || !nextServiceKm) return false;

    const currentKmNum = currentKm;
    const nextServiceKmNum = nextServiceKm;

    if (isNaN(currentKmNum) || isNaN(nextServiceKmNum)) return false;

    return (
      nextServiceKmNum - currentKmNum <= threshold &&
      nextServiceKmNum - currentKmNum >= 0
    );
  };

  const isKmThresholdExceeded = (
    currentKm: number | null,
    nextServiceKm: number | null
  ) => {
    if (!currentKm || !nextServiceKm) return false;

    const currentKmNum = currentKm;
    const nextServiceKmNum = nextServiceKm;

    if (isNaN(currentKmNum) || isNaN(nextServiceKmNum)) return false;

    return nextServiceKmNum - currentKmNum < 0;
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
          <Th>TÜV bis</Th>
        </Tr>
      </Thead>
      <Tbody>
        {vehicles.map((vehicle, index) => {
          console.log(vehicle.next_tuv_date);
          const isNextServiceDateExpiring = isDateExpiring(
            vehicle.next_service_date,
            30
          );
          const isNextServiceDateExpired = isDateExpired(
            vehicle.next_service_date
          );
          const isNextTuvDateExpiring = isDateExpiring(
            vehicle.next_tuv_date,
            30
          );
          const isNextTuvDateExpired = isDateExpired(
            vehicle.next_tuv_date
          );
          const isKmThresholdExceedingFlag = isKmThresholdExceeding(
            vehicle.km_age,
            vehicle.next_service_km,
            5000
          );

          const isKmThresholdExceededFlag = isKmThresholdExceeded(
            vehicle.km_age,
            vehicle.next_service_km
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
              <Td>{vehicle.vin ?? "-"}</Td>
              <Td>
                <Flex alignItems="center" gap={2}>
                  {!isNextServiceDateExpired &&
                    !isNextServiceDateExpiring &&
                    !isKmThresholdExceeding &&
                    !isKmThresholdExceededFlag &&
                    !isNextTuvDateExpired &&
                    !isNextTuvDateExpiring && (
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
                  {(isNextTuvDateExpired || isNextTuvDateExpiring) && (
                    <Tooltip
                      label={
                        isNextTuvDateExpired
                          ? "Der TÜV ist überfällig."
                          : "Der TÜV steht bald an."
                      }
                    >
                      <Icon as={InfoIcon} color="accentColor" mr={2} />
                    </Tooltip>
                  )}
                  {(isKmThresholdExceededFlag ||
                    isKmThresholdExceedingFlag) && (
                      <Tooltip
                        label={
                          isKmThresholdExceedingFlag
                            ? "Der Kilometerstand liegt nah an der Wartungsgrenze."
                            : "Der Kilometerstand ist bereits über der Grenze."
                        }
                      >
                        <Icon as={InfoIcon} color="accentColor" />
                      </Tooltip>
                    )}
                  <Text>{vehicle.license_plate ?? "-"}</Text>
                </Flex>
              </Td>
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
              <Td>
                <Text>
                  {vehicle.next_tuv_date
                    ? dayjs(vehicle.next_tuv_date).format("DD/MM/YYYY")
                    : "Kein Datum angegeben"}
                </Text>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
