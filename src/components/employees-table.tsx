import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EmployeesWithProfile } from "../backend-queries/joins/employees-with-profile-query";
import { useNavigate } from "react-router-dom";

interface EmployeesTableProps {
  employees: EmployeesWithProfile;
}

export function EmployeesTable({ employees }: EmployeesTableProps) {
  const navigate = useNavigate();
  return (
    <TableContainer
      width="80%"
      mt={8}
      maxHeight="80svh"
      overflowY="scroll"
      overflowX="scroll"
    >
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
          </Tr>
        </Thead>
        <Tbody>
          {employees?.map((empl) => {
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
                <Td>{empl.first_name + " " + empl.last_name ?? "-"}</Td>
                <Td>
                  {empl.street ?? "-"} {empl.city ?? "-"}{" "}
                  {empl.postal_code ?? "-"}
                </Td>
                <Td>{empl.health_insurance ?? "-"}</Td>
                <Td>{empl.tax_id ?? "-"}</Td>
                <Td>{empl.tax_level ?? "-"}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
