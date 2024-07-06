import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Vehicles } from "../../backend-queries/query/get-all-vehicles";

interface VehiclesTableProps {
  vehicles: Vehicles;
}

export const VehiclesTable = ({ vehicles }: VehiclesTableProps) => {
  const navigate = useNavigate();

  return (
    <Table borderWidth={1} mt={4}>
      <Thead>
        <Tr whiteSpace="nowrap">
          <Th>VIN</Th>
          <Th>Kennzeichen</Th>
          <Th>Farbe</Th>
          <Th>Kilometerstand</Th>
          <Th>Letzte Wartung</Th>
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
              <Td>{vehicle.km_age + "km" ?? "-"}</Td>
              <Td>{vehicle.last_service_date ?? "-"}</Td>
              <Td>{vehicle.make ?? "-"}</Td>
              <Td>{vehicle.model ?? "-"}</Td>
              <Td>{vehicle.profile_id ?? "-"}</Td>
              <Td>{vehicle.profile_picture_url ?? "-"}</Td>
              <Td>{vehicle.state ?? "-"}</Td>
              <Td>{vehicle.year ?? "-"}</Td>
              <Td>{vehicle.created_at ?? "-"}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
