import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Tables } from "../utils/database/types";

interface EmployeesTableProps {
  employees: Tables<"employees">[];
}

export function EmployeesTable({ employees }: EmployeesTableProps) {
  return (
    <TableContainer width="100%" mt={8} maxHeight="70svh" overflowY="scroll">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Vorname</Th>
            <Th>Nachname</Th>
            <Th>Adresse</Th>
            <Th>Krankenkasse</Th>
            <Th>SteuerID.</Th>
            <Th>Steuerklasse</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees?.map((empl) => {
            return (
              <Tr cursor="pointer" onClick={() => console.log(empl.profile_id)}>
                <Td>{empl.first_name}</Td>
                <Td>{empl.last_name}</Td>
                <Td>
                  {empl.street} {empl.city} {empl.postal_code}
                </Td>
                <Td>{empl.health_insurance}</Td>
                <Td>{empl.tax_id}</Td>
                <Td>{empl.tax_level}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
