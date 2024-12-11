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
import { JoinedDriverHistory } from "../../backend-queries/joins/joined-driver-history";
import { DeleteIconButton } from "../buttons/delete-icon-button";

type DriverHistoryTableProps = {
  historyData: JoinedDriverHistory;
  deleteDriverHistory: (id: string) => void;
};

export function DriverHistoryTable({
  historyData,
  deleteDriverHistory,
}: DriverHistoryTableProps) {
  const navigate = useNavigate();

  return (
    <Box width="100%">
      <Table borderWidth={1} mt={4} w="100%">
        <Thead>
          <Tr whiteSpace="nowrap">
            <Th>Aktion</Th>
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
                bg={"tileBgColor"}
                _hover={{ bg: "backgroundColor" }}
                onClick={() => navigate("/edit-driver-history?id=" + data.id)}
              >
                <Td>
                  <DeleteIconButton
                    clickedItem={data.id}
                    onDelete={async (id) => {
                      await deleteDriverHistory(id);
                    }}
                  />
                </Td>
                <Td>
                  <Text>{data.id ?? "-"}</Text>
                </Td>
                <Td>
                  <Text>
                    {(data.employees?.first_name ?? "-") +
                      " " +
                      (data.employees?.last_name ?? "-")}
                  </Text>
                </Td>
                <Td>
                  <Text>
                    {dayjs(data.drive_start).format("DD.MM.YYYY").toString()}
                  </Text>
                </Td>
                <Td>
                  <Text>
                    {data.drive_end
                      ? dayjs(data.drive_end).format("DD.MM.YYYY").toString()
                      : "N/V"}
                  </Text>
                </Td>
                <Td>
                  <Text>{data.vehicles?.vin ?? "-"}</Text>
                </Td>
                <Td>
                  <Text>{data.vehicles?.license_plate ?? "-"}</Text>
                </Td>
                <Td>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>{data.employees?.personnel_number ?? "-"}</Text>
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
