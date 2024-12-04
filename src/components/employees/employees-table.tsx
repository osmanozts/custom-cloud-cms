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
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EmployeeWithProfile } from "../../backend-queries/joins/employee-with-profile-query";
import dayjs from "dayjs";
import { InfoIcon } from "@chakra-ui/icons";

interface EmployeesTableProps {
  employees: EmployeeWithProfile[];
}

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
}) => {
  const navigate = useNavigate();

  const isDateExpiring = (date: string | null, daysBeforeExpire: number) => {
    if (!date) return false;
    const targetDate = dayjs(date);
    const currentDate = dayjs();
    return targetDate.diff(currentDate, "day") <= daysBeforeExpire;
  };

  const isDateExpired = (date: string | null) => {
    if (!date) return false;
    const targetDate = dayjs(date);
    return targetDate.isBefore(dayjs());
  };

  return (
    <Table borderWidth={1} mt={4}>
      <Thead>
        <Tr whiteSpace="nowrap">
          <Th>Personalnummer</Th>
          <Th>Standort</Th>
          <Th>Abteilung</Th>
          <Th>Email</Th>
          <Th>Vorname, Nachname</Th>
          <Th>Straße, Stadt, Plz</Th>
          <Th>Führerschein Ablaufdatum</Th>
          <Th>Ausweis Ablaufdatum</Th>
          <Th>Krankenkasse</Th>
          <Th>SteuerID.</Th>
          <Th>Steuerklasse</Th>
          <Th>Geburtsdatum</Th>
        </Tr>
      </Thead>
      <Tbody>
        {employees.map((empl) => {
          // Führerscheinstatus prüfen
          const isDriverLicenseExpiring = isDateExpiring(
            empl.driver_license_end_date,
            30
          );
          const isDriverLicenseExpired = isDateExpired(
            empl.driver_license_end_date
          );

          // Ausweisstatus prüfen
          const isIdCardExpiring = isDateExpiring(empl.id_card_end_date, 30);
          const isIdCardExpired = isDateExpired(empl.id_card_end_date);

          // Zeilenfarbe bestimmen
          let rowBg = "tileBgColor"; // Standardfarbe
          if (isDriverLicenseExpired || isIdCardExpired) {
            rowBg = "red.100"; // Rot für abgelaufene Dokumente
          } else if (isDriverLicenseExpiring || isIdCardExpiring) {
            rowBg = "yellow.100"; // Gelb für bald ablaufende Dokumente
          }

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
              bg={rowBg}
              _hover={
                !isDriverLicenseExpired &&
                !isDriverLicenseExpiring &&
                !isIdCardExpired &&
                !isIdCardExpiring
                  ? { bg: "backgroundColor" }
                  : undefined
              }
            >
              <Td>
                <Flex alignItems="center" gap={2}>
                  <Text>{empl.personnel_number ?? "-"}</Text>
                  {(isDriverLicenseExpired || isDriverLicenseExpiring) && (
                    <Tooltip
                      label={
                        isDriverLicenseExpired
                          ? "Der Führerschein ist abgelaufen."
                          : "Der Führerschein läuft bald ab."
                      }
                    >
                      <Icon as={InfoIcon} color="red.500" />
                    </Tooltip>
                  )}
                  {(isIdCardExpired || isIdCardExpiring) && (
                    <Tooltip
                      label={
                        isIdCardExpired
                          ? "Der Ausweis ist abgelaufen."
                          : "Der Ausweis läuft bald ab."
                      }
                    >
                      <Icon as={InfoIcon} color="red.500" />
                    </Tooltip>
                  )}
                </Flex>
              </Td>
              <Td>{empl.location ?? "-"}</Td>
              <Td>{empl.department ?? "-"}</Td>
              <Td>{empl.profile?.email ?? "-"}</Td>
              <Td>{`${empl.first_name ?? ""} ${empl.last_name ?? ""}`}</Td>
              <Td>{`${empl.street ?? ""} ${empl.city ?? ""} ${
                empl.postal_code ?? ""
              }`}</Td>
              <Td>
                {empl.driver_license_end_date ? (
                  <Box>
                    {dayjs(empl.driver_license_end_date).format("DD/MM/YYYY")}
                  </Box>
                ) : (
                  "Kein Datum ausgewählt"
                )}
              </Td>
              <Td>
                {empl.id_card_end_date ? (
                  <Box>{dayjs(empl.id_card_end_date).format("DD/MM/YYYY")}</Box>
                ) : (
                  "Kein Datum ausgewählt"
                )}
              </Td>
              <Td>{empl.health_insurance ?? "-"}</Td>
              <Td>{empl.tax_id ?? "-"}</Td>
              <Td>{empl.tax_level ?? "-"}</Td>
              <Td>
                {empl.date_of_birth
                  ? dayjs(empl.date_of_birth).format("DD/MM/YYYY")
                  : "Kein Datum ausgewählt"}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
