import { InfoIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  IconButton,
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
import { LuCar, LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { getMinDetailEmployees } from "../../backend-queries";
import { Vehicles } from "../../backend-queries/query/get-all-vehicles";
import { EmployeesMinimumDetail } from "../../backend-queries/query/get-min-detail-employees";
import { mapVehicleState } from "./services/map-vehicle-state";
import { DeleteFileConfirmationDialog } from "../dialogs/delete-file-confirmation-dialog";

interface VehiclesTableProps {
  vehicles: Vehicles;
  deleteVehicle: (id: string) => void;
}

export const VehiclesTable = ({
  vehicles,
  deleteVehicle,
}: VehiclesTableProps) => {
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clickedId, setClickedId] = useState<string | null>(null);

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
          <Th>Aktion</Th>
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
          const isKmThresholdExceedingFlag = isKmThresholdExceeding(
            vehicle.km_age,
            vehicle.next_service_km,
            5000
          );
          console.log(
            "isKmThresholdExceedingFlag: ",
            isKmThresholdExceedingFlag,
            " for: ",
            vehicle.id
          );
          const isKmThresholdExceededFlag = isKmThresholdExceeded(
            vehicle.km_age,
            vehicle.next_service_km
          );
          console.log(
            "isKmThresholdExceededFlag: ",
            isKmThresholdExceededFlag,
            " for: ",
            vehicle.id
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
              <Td color="accentColor">
                <IconButton
                  color="accentColor"
                  as={LuTrash2}
                  boxSize={8}
                  aria-label="delete employee entry"
                  bg="invertedColor"
                  padding={2}
                  onClick={(e) => {
                    e.stopPropagation(); // Stoppt die Weiterleitung des Klick-Ereignisses
                    setIsDeleteDialogOpen(true);
                    setClickedId(vehicle.id);
                  }}
                />
              </Td>
              <Td>
                <Flex alignItems="center" gap={2}>
                  {!isNextServiceDateExpired &&
                    !isNextServiceDateExpiring &&
                    !isKmThresholdExceeding &&
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
            </Tr>
          );
        })}
      </Tbody>
      <DeleteFileConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={async () => {
          if (clickedId) await deleteVehicle(clickedId);
        }}
      />
    </Table>
  );
};
