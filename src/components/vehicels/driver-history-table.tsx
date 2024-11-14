import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { JoinedDriverHistory } from "../../backend-queries/joins/joined-driver-history";
import dayjs from "dayjs";

type DriverHistoryTableProps = {
  historyData: JoinedDriverHistory;
};

export function DriverHistoryTable({ historyData }: DriverHistoryTableProps) {
  return (
    <Box>
      <Table borderWidth={1} mt={4} w="100%">
        <Thead>
          <Tr whiteSpace="nowrap">
            <Th>VIN</Th>
            <Th>Kennzeichen</Th>
            <Th>Fahrer</Th>
            <Th>Fahrt Beginn</Th>
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
              >
                <Td>{data.vehicles?.vin ?? "-"}</Td>
                <Td>{data.vehicles?.license_plate ?? "-"}</Td>
                <Td>
                  {data.employees?.first_name +
                    " " +
                    data.employees?.last_name ?? "-"}
                </Td>
                <Td>
                  {dayjs(data.drive_start)
                    .format("DD.MM.YYYY HH:mm")
                    .toString()}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
