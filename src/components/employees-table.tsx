import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EmployeeWithProfile } from "../backend-queries/joins/employee-with-profile-query";

interface EmployeesTableProps {
  employees: EmployeeWithProfile[];
}

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
}) => {
  const navigate = useNavigate();

  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>Personalnummer</Th>
          <Th>Email</Th>
          <Th>Name</Th>
          <Th>Adresse</Th>
          <Th>Krankenkasse</Th>
          <Th>SteuerID.</Th>
          <Th>Steuerklasse</Th>
          <Th>Geburtsdatum</Th>
          <Th>Führerschein Ablaufdatum</Th>
          <Th>Ausweis Ablaufdatum</Th>
        </Tr>
      </Thead>
      <Tbody>
        {employees.map((empl) => {
          return (
            <Tr
              key={empl.id}
              cursor="pointer"
              onClick={() =>
                navigate({
                  pathname: "/edit-employee",
                  search: `?profile_id=${empl.profile_id}`,
                })
              }
            >
              <Td>{empl.personnel_number ?? "-"}</Td>
              <Td>{empl.profile?.email ?? "-"}</Td>
              <Td>
                {`${empl.first_name ?? ""} ${empl.last_name ?? ""}` ?? "-"}
              </Td>
              <Td>{`${empl.street ?? ""} ${empl.city ?? ""} ${
                empl.postal_code ?? ""
              }`}</Td>
              <Td>{empl.health_insurance ?? "-"}</Td>
              <Td>{empl.tax_id ?? "-"}</Td>
              <Td>{empl.tax_level ?? "-"}</Td>
              <Td>{empl.date_of_birth ?? "-"}</Td>
              <Td>{empl.driver_license_end_date ?? "-"}</Td>
              <Td>{empl.id_card_end_date ?? "-"}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
