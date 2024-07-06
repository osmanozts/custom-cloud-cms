import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Vehicles } from "../../backend-queries/query/get-all-vehicles";
import dayjs from "dayjs";
import { getMinDetailEmployees } from "../../backend-queries";
import { useEffect, useState } from "react";
import { EmployeesMinimumDetail } from "../../backend-queries/query/get-min-detail-employees";

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
          <Th>VIN</Th>
          <Th>Kennzeichen</Th>
          <Th>Farbe</Th>
          <Th>Kilometerstand</Th>
          <Th>Letzte Wartung</Th>
          <Th>Nächste Wartung</Th>
          <Th>Marke</Th>
          <Th>Modell</Th>
          <Th>Haupt-Fahrer</Th>
          <Th>Profilbild URL</Th>
          <Th>Status</Th>
          <Th>Baujahr</Th>
          <Th>Erstellt am</Th>
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
            >
              <Td>{vehicle.vin ?? "-"}</Td>
              <Td>{vehicle.license_plate ?? "-"}</Td>
              <Td>{vehicle.color ?? "-"}</Td>
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
              <Td>{vehicle.make ?? "-"}</Td>
              <Td>{vehicle.model ?? "-"}</Td>
              <Td>
                {findMinEmployee(vehicle.profile_id ?? "")?.first_name}{" "}
                {findMinEmployee(vehicle.profile_id ?? "")?.last_name}
              </Td>
              <Td>{vehicle.profile_picture_url ?? "-"}</Td>
              <Td>{vehicle.state ?? "-"}</Td>
              <Td>{vehicle.year ?? "-"}</Td>
              <Td>
                {vehicle.created_at
                  ? dayjs(vehicle.created_at).format("DD/MM/YYYY")
                  : "Kein Datum ausgewählt"}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
