import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { JoinedDriverHistory } from "../../backend-queries/joins/joined-driver-history";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
            return (
              <Tr
                key={data.vehicle_id}
                whiteSpace="nowrap"
                cursor="pointer"
                color="textColor"
                bg={"tileBgColor"}
                _hover={{ bg: "backgroundColor" }}
                onClick={() => navigate("/edit-driver-history?id=" + data.id)}
              >
                <Td>{data.id ?? "-"}</Td>
                <Td>
                  {data.employees?.first_name +
                    " " +
                    data.employees?.last_name ?? "-"}
                </Td>
                <Td>
                  {dayjs(data.drive_start).format("DD.MM.YYYY").toString()}
                </Td>
                <Td>
                  {data.drive_end
                    ? dayjs(data.drive_end).format("DD.MM.YYYY").toString()
                    : "N/V"}
                </Td>
                <Td>{data.vehicles?.vin ?? "-"}</Td>
                <Td>{data.vehicles?.license_plate ?? "-"}</Td>
                <Td>{data.employees?.personnel_number ?? "-"}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
