import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EmployeeWithProfile } from "../../backend-queries/joins/employee-with-profile-query";
import dayjs from "dayjs";

interface EmployeesTableProps {
  employees: EmployeeWithProfile[];
}

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
}) => {
  const navigate = useNavigate();

  return (
    <Table borderWidth={1} mt={4}>
      <Thead>
        <Tr whiteSpace="nowrap">
          <Th>Personalnummer</Th>
          <Th>Standort</Th>
          <Th>Abteilung</Th>
          <Th>Email</Th>
          <Th>Vorname, Nachname</Th>
          <Th>Straße,Stadt,Plz</Th>
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
              whiteSpace="nowrap"
              cursor="pointer"
              onClick={() =>
                navigate({
                  pathname: "/edit-employee",
                  search: `?profile_id=${empl.profile_id}`,
                })
              }
              color="textColor"
              bg={"tileBgColor"}
            >
              <Td>{empl.personnel_number ?? "-"}</Td>
              <Td>{empl.location ?? "-"}</Td>
              <Td>{empl.department ?? "-"}</Td>
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
              <Td>
                {empl.date_of_birth
                  ? dayjs(empl.date_of_birth).format("DD/MM/YYYY")
                  : "Kein Datum ausgewählt"}
              </Td>
              <Td>
                {empl.driver_license_end_date
                  ? dayjs(empl.driver_license_end_date).format("DD/MM/YYYY")
                  : "Kein Datum ausgewählt"}
              </Td>
              <Td>
                {empl.id_card_end_date
                  ? dayjs(empl.id_card_end_date).format("DD/MM/YYYY")
                  : "Kein Datum ausgewählt"}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
