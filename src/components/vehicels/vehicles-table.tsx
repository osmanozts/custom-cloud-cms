import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Vehicles } from "../../backend-queries/query/get-all-vehicles";
import dayjs from "dayjs";
import { getMinDetailEmployees } from "../../backend-queries";
import { useEffect, useState } from "react";
import { EmployeesMinimumDetail } from "../../backend-queries/query/get-min-detail-employees";
import { VehicleProfilePic } from "./vehicle-profile-pic";

interface VehiclesTableProps {
  vehicles: Vehicles;
}

export const VehiclesTable = ({ vehicles }: VehiclesTableProps) => {
  const navigate = useNavigate();

  const [minEmployees, setMinEmployees] = useState<EmployeesMinimumDetail>([]);

  useEffect(() => {
    getMinDetailEmployees((employees) => setMinEmployees(employees));
  }, [vehicles]);

  // find min employee by profile_id
  const findMinEmployee = (profile_id: string) => {
    return minEmployees.find((employee) => employee.profile_id === profile_id);
  };

  return (
    <Table borderWidth={1} mt={4}>
      <Thead>
        <Tr whiteSpace="nowrap">
          <Th>Bild</Th>
          <Th>ID</Th>
          <Th>FIN</Th>
          <Th>Kennzeichen</Th>
          <Th>Status</Th>
          <Th>Standort</Th>
          <Th>Haupt-Fahrer</Th>
          <Th>Kilometerstand</Th>
          <Th>Letzte Wartung</Th>
          <Th>Nächste Wartung</Th>
        </Tr>
      </Thead>
      <Tbody>
        {vehicles.map((vehicle) => {
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
              bg={"tileBgColor"}
              _hover={{ bg: "backgroundColor" }}
            >
              <Td>
                <VehicleProfilePic isSmall vehicle_id={vehicle.id.toString()} />
              </Td>
              <Td>{vehicle.id ?? "-"}</Td>
              <Td>{vehicle.vin ?? "-"}</Td>
              <Td>{vehicle.license_plate ?? "-"}</Td>
              <Td>{vehicle.state ?? "-"}</Td>
              <Td>{vehicle.location ?? "-"}</Td>
              <Td>
                {findMinEmployee(vehicle.profile_id ?? "")?.first_name}{" "}
                {findMinEmployee(vehicle.profile_id ?? "")?.last_name}
              </Td>
              <Td>{vehicle.km_age ?? 0 + "km" ?? "-"}</Td>
              <Td>
                {vehicle.last_service_date
                  ? dayjs(vehicle.last_service_date).format("DD/MM/YYYY")
                  : "Kein Datum ausgewählt"}
              </Td>
              <Td>
                {vehicle.next_service_date
                  ? dayjs(vehicle.next_service_date).format("DD/MM/YYYY")
                  : "Kein Datum ausgewählt"}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
