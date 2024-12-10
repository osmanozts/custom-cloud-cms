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
  IconButton,
} from "@chakra-ui/react";
import { JoinedDriverHistory } from "../../backend-queries/joins/joined-driver-history";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { DeleteFileConfirmationDialog } from "../dialogs/delete-file-confirmation-dialog";

type DriverHistoryTableProps = {
  historyData: JoinedDriverHistory;
  deleteDriverHistory: (id: string) => void;
};

export function DriverHistoryTable({
  historyData,
  deleteDriverHistory,
}: DriverHistoryTableProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clickedId, setClickedId] = useState<string | null>(null);

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
                  <IconButton
                    color="accentColor"
                    as={LuTrash2}
                    boxSize={8}
                    aria-label="delete employee entry"
                    bg="invertedColor"
                    padding={2}
                    onClick={(e) => {
                      e.stopPropagation(); // Stoppt die Weiterleitung des Klick-Ereignisses
                      setIsDeleteDialogOpen(true);
                      setClickedId(data.id);
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
      <DeleteFileConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={async () => {
          if (clickedId) await deleteDriverHistory(clickedId);
        }}
      />
    </Box>
  );
}
