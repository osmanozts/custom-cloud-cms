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

type SortKey =
  | keyof EmployeeWithProfile
  | "email"
  | "full_name"
  | "full_address";

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
}) => {
  const navigate = useNavigate();

  const [sortedEmployees, setSortedEmployees] = useState<EmployeeWithProfile[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    setSortedEmployees(employees);
  }, [employees]);

  const isDateKey = (key: SortKey) =>
    [
      "driver_license_end_date",
      "id_card_end_date",
      "date_of_birth",
    ].includes(key);

  const handleSort = (key: SortKey) => {
    const direction =
      sortConfig?.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sorted = [...sortedEmployees].sort((a, b) => {
      const getValue = (obj: EmployeeWithProfile) => {
        if (key === "email") return obj.profile?.email ?? "";
        if (key === "full_name")
          return `${obj.first_name ?? ""} ${obj.last_name ?? ""}`;
        if (key === "full_address")
          return `${obj.street ?? ""} ${obj.city ?? ""} ${obj.postal_code ?? ""}`;

        const value = obj[key as keyof EmployeeWithProfile];

        if (typeof value === "object" && value !== null) {
          return "";
        }

        return value ?? "";
      };

      const aValue = getValue(a);
      const bValue = getValue(b);

      if (key === "personnel_number") {
        const numA = Number(aValue);
        const numB = Number(bValue);
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return direction === "asc" ? numA - numB : numB - numA;
      }

      if (isDateKey(key)) {
        const aDate = dayjs(aValue);
        const bDate = dayjs(bValue);
        return direction === "asc"
          ? aDate.valueOf() - bDate.valueOf()
          : bDate.valueOf() - aDate.valueOf();
      }

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      if (aStr < bStr) return direction === "asc" ? -1 : 1;
      if (aStr > bStr) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedEmployees(sorted);
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <TriangleUpIcon boxSize={3} />
    ) : (
      <TriangleDownIcon boxSize={3} />
    );
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
          <Th cursor="pointer" onClick={() => handleSort("personnel_number")}>
            <Flex align="center" gap={1}>
              <Text>Personalnummer</Text>
              {renderSortIcon("personnel_number")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("location")}>
            <Flex align="center" gap={1}>
              <Text>Standort</Text>
              {renderSortIcon("location")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("department")}>
            <Flex align="center" gap={1}>
              <Text>Abteilung</Text>
              {renderSortIcon("department")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("email")}>
            <Flex align="center" gap={1}>
              <Text>Email</Text>
              {renderSortIcon("email")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("full_name")}>
            <Flex align="center" gap={1}>
              <Text>Vorname, Nachname</Text>
              {renderSortIcon("full_name")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("full_address")}>
            <Flex align="center" gap={1}>
              <Text>Straße, Stadt, Plz</Text>
              {renderSortIcon("full_address")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("driver_license_end_date")}>
            <Flex align="center" gap={1}>
              <Text>Führerschein Ablaufdatum</Text>
              {renderSortIcon("driver_license_end_date")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("id_card_end_date")}>
            <Flex align="center" gap={1}>
              <Text>Ausweis Ablaufdatum</Text>
              {renderSortIcon("id_card_end_date")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("health_insurance")}>
            <Flex align="center" gap={1}>
              <Text>Krankenkasse</Text>
              {renderSortIcon("health_insurance")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("tax_id")}>
            <Flex align="center" gap={1}>
              <Text>SteuerID.</Text>
              {renderSortIcon("tax_id")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("tax_level")}>
            <Flex align="center" gap={1}>
              <Text>Steuerklasse</Text>
              {renderSortIcon("tax_level")}
            </Flex>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("date_of_birth")}>
            <Flex align="center" gap={1}>
              <Text>Geburtsdatum</Text>
              {renderSortIcon("date_of_birth")}
            </Flex>
          </Th>
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
