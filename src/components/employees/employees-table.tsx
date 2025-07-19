import { InfoIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
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
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { EmployeeWithProfile } from "../../backend-queries/joins/employee-with-profile-query";

interface EmployeesTableProps {
  employees: EmployeeWithProfile[];
}

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
}) => {
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedEmployees, setSortedEmployees] = useState<EmployeeWithProfile[]>([]);

  useEffect(() => {
    setSortedEmployees(employees);
  }, [employees]);

  const sortByPersonnelNumber = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...sortedEmployees].sort((a, b) => {
      const numA = Number(a.personnel_number);
      const numB = Number(b.personnel_number);

      if (numA == null && numB != null) return 1;
      if (numA != null && numB == null) return -1;
      if (numA == null && numB == null) return 0;

      if (numA! < numB!) return newOrder === "asc" ? -1 : 1;
      if (numA! > numB!) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setSortOrder(newOrder);
    setSortedEmployees(sorted);
  };

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
    <Table borderWidth={2} borderColor="tileBgColor" mt={4}>
      <Thead>
        <Tr whiteSpace="nowrap">
          <Th cursor="pointer" onClick={sortByPersonnelNumber}>
            <Flex align="center" gap={1}>
              <Text>Personalnummer</Text>
              {sortOrder === "asc" ? (
                <TriangleUpIcon boxSize={3} />
              ) : (
                <TriangleDownIcon boxSize={3} />
              )}
            </Flex>
          </Th>
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
        {sortedEmployees.map((empl, index) => {
          const isDriverLicenseExpiring = isDateExpiring(
            empl.driver_license_end_date,
            30
          );
          const isDriverLicenseExpired = isDateExpired(
            empl.driver_license_end_date
          );
          const isIdCardExpiring = isDateExpiring(empl.id_card_end_date, 30);
          const isIdCardExpired = isDateExpired(empl.id_card_end_date);

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
              bg={index % 2 === 0 ? "tileBgColor" : "invertedColor"}
              _hover={{ bg: "backgroundColor" }}
            >
              <Td>
                <Flex alignItems="center" gap={2}>
                  {!isDriverLicenseExpired &&
                    !isDriverLicenseExpiring &&
                    !isIdCardExpired &&
                    !isIdCardExpiring && (
                      <Icon as={LuUser} boxSize={4} mr={2} />
                    )}
                  {(isDriverLicenseExpired || isDriverLicenseExpiring) && (
                    <Tooltip
                      label={
                        isDriverLicenseExpired
                          ? "Der Führerschein ist abgelaufen."
                          : "Der Führerschein läuft bald ab."
                      }
                    >
                      <Icon as={InfoIcon} color="accentColor" mr={2} />
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
                      <Icon as={InfoIcon} color="accentColor" mr={2} />
                    </Tooltip>
                  )}
                  <Text>{empl.personnel_number ?? "-"}</Text>
                </Flex>
              </Td>
              <Td>{empl.location ?? "-"}</Td>
              <Td>{empl.department ?? "-"}</Td>
              <Td>{empl.profile?.email ?? "-"}</Td>
              <Td>{`${empl.first_name ?? ""} ${empl.last_name ?? ""}`}</Td>
              <Td>{`${empl.street ?? ""} ${empl.city ?? ""} ${empl.postal_code ?? ""}`}</Td>
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
