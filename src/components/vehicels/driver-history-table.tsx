import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Badge,
  Tooltip,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { JoinedDriverHistory } from "../../backend-queries/joins/joined-driver-history";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { LuPencil } from "react-icons/lu";

type DriverHistoryTableProps = {
  historyData: JoinedDriverHistory;
};

export function DriverHistoryTable({ historyData }: DriverHistoryTableProps) {
  const navigate = useNavigate();

  return (
    <Box width="100%">
      <Table borderWidth={1} mt={4} w="100%">
        <Thead>
          <Tr whiteSpace="nowrap">
            <Th>Verlauf ID</Th>
            <Th>Fahrer</Th>
            <Th>Fahrt Beginn</Th>
            <Th>Fahrt Ende</Th>
            <Th>VIN</Th>
            <Th>Kennzeichen</Th>
            <Th>Personalnummer</Th>
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
                color="textColor"
                bg={"tileBgColor"}
                _hover={{ bg: "backgroundColor" }}
                onClick={() => navigate("/edit-driver-history?id=" + data.id)}
              >
                <Td>
                  <Text color="textColor">{data.id ?? "-"}</Text>
                </Td>
                <Td>
                  <Text color="textColor">
                    {data.employees?.first_name +
                      " " +
                      data.employees?.last_name ?? "-"}
                  </Text>
                </Td>
                <Td>
                  <Text color="textColor">
                    {dayjs(data.drive_start).format("DD.MM.YYYY").toString()}
                  </Text>
                </Td>
                <Td>
                  <Text color="textColor">
                    {data.drive_end
                      ? dayjs(data.drive_end).format("DD.MM.YYYY").toString()
                      : "N/V"}
                  </Text>
                </Td>
                <Td>
                  <Text color="textColor">{data.vehicles?.vin ?? "-"}</Text>
                </Td>
                <Td>
                  <Text color="textColor">
                    {data.vehicles?.license_plate ?? "-"}
                  </Text>
                </Td>
                <Td>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text color="textColor">
                      {data.employees?.personnel_number ?? "-"}
                    </Text>
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
