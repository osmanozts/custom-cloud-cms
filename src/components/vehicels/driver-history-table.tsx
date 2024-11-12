import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type HistoryEntry = {
  vehicle_id: number;
  vin: string;
  license_plate: string;
  driver_id: string;
  start_date: Date;
};

type DriverHistoryTableProps = {
  historyData: HistoryEntry[];
};

export function DriverHistoryTable({ historyData }: DriverHistoryTableProps) {
  const navigate = useNavigate();

  return (
    <Box>
      <Table borderWidth={1} mt={4}>
        <Thead>
          <Tr whiteSpace="nowrap">
            <Th>Fahrzeug ID</Th>
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
              >
                <Td>{data.vehicle_id ?? "-"}</Td>
                <Td>{data.vin ?? "-"}</Td>
                <Td>{data.license_plate ?? "-"}</Td>
                <Td>{data.driver_id ?? "-"}</Td>
                <Td>{data.start_date.toString() ?? "-"}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
