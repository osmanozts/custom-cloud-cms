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
import { DeleteIconButton } from "../../buttons/delete-icon-button";
import { JoinedKmHistory } from "../../../backend-queries/joins/joined-km-history";
import { useAuth } from "../../../providers/auth-provider";

type KmHistoryTableProps = {
  historyData: JoinedKmHistory;
  deleteDriverHistory: (id: string) => void;
};

export function KmHistoryTable({
  historyData,
  deleteDriverHistory,
}: KmHistoryTableProps) {
  const navigate = useNavigate();
  const { authRole } = useAuth();

  return (
    <Box width="100%">
      <Table borderWidth={1} mt={4} w="100%">
        <Thead>
          <Tr whiteSpace="nowrap">
            <Th>Aktion</Th>
            <Th>Datum</Th>
            <Th>Kilometerstand</Th>
            <Th>Personalnummer</Th>
            <Th>Fahrer</Th>
            <Th>VIN</Th>
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
                onClick={() => navigate("/edit-km-history?id=" + data.id)}
              >
                <Td>
                  <DeleteIconButton
                    clickedItem={data.id}
                    onDelete={async (id) => {
                      await deleteDriverHistory(id);
                    }}
                    authRole={authRole}
                  />
                </Td>
                <Td>
                  <Text>
                    {dayjs(data.created_at).format("DD.MM.YYYY").toString()}
                  </Text>
                </Td>
                <Td>
                  <Text>{data.km_age}</Text>
                </Td>
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
                  <Text>{data.vehicles?.vin ?? "N/V"}</Text>
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
