import {
  Badge,
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
import { LuPencil } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { JoinedDriverHistory } from "../../../backend-queries/joins/joined-driver-history";

type DriverHistoryTableProps = {
  historyData: JoinedDriverHistory;
};

export function DriverHistoryTable({
  historyData,
}: DriverHistoryTableProps) {
  const navigate = useNavigate();

  return (
    <Box width="100%">
      <Table borderWidth={1} mt={4} w="100%">
        <Thead>
          <Tr whiteSpace="nowrap">
            <Th>Aktion</Th>
            <Th>Personalnummer</Th>
            <Th>Fahrer</Th>
            <Th>Fahrt Beginn</Th>
            <Th>Kennzeichen</Th>
          </Tr>
        </Thead>
        <Tbody>
          {historyData.map((data) => {
            const isEdited = data.is_edited; // Check if the entry is edited
            return (
              <Tr
                key={data.id}
                whiteSpace="nowrap"
                cursor="pointer"
                bg={"tileBgColor"}
                _hover={{ bg: "backgroundColor" }}
                onClick={() => navigate("/edit-driver-history?id=" + data.id)}
              >
                <Td>
                  <Text>{data.employees?.personnel_number ?? "N/V"}</Text>
                </Td>
                <Td>
                  <Text>
                    {(data.employees?.first_name ?? "N/V") +
                      " " +
                      (data.employees?.last_name ?? "N/V")}
                  </Text>
                </Td>
                <Td>
                  <Text>
                    {dayjs(data.drive_start).format("DD.MM.YYYY").toString()}
                  </Text>
                </Td>
                <Td>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>{data.vehicles?.license_plate ?? "N/V"}</Text>
                    {isEdited && (
                      <Tooltip label="Dieser Eintrag wurde bearbeitet" hasArrow>
                        <Badge bg="transparent">
                          {/* Bearbeitet */}
                          <Icon as={LuPencil} w={4} h={4} color="accentColor" />
                        </Badge>
                      </Tooltip>
                    )}
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
