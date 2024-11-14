import { Box, Flex, VStack } from "@chakra-ui/react";
import { DriverHistoryTable, InputField } from "../../components";
import { useEffect, useState } from "react";
import { getVehicleDriverHistory } from "../../backend-queries/query/get-vehicle-history";
import { useSearchParams } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { JoinedDriverHistory } from "../../backend-queries/joins/joined-driver-history";

export function AllDriverHistory() {
  const [searchParams] = useSearchParams();

  const [historyData, setHistoryData] = useState<JoinedDriverHistory>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    if (searchString.trim() === "") {
      getVehicleDriverHistory(
        Number(searchParams.get("vehicle_id")),
        (fetchedData: JoinedDriverHistory) => setHistoryData(fetchedData)
      );
    } else {
      const filteredData = historyData.filter(
        (data) =>
          data.driver_id?.toString().includes(searchString) ||
          data.vehicle_id?.toString().includes(searchString)
      );
      setHistoryData(filteredData);
    }
  }, [searchString]);

  return (
    <VStack width="100%" maxWidth="1200px" p={6}>
      <Flex w="100%" justify="space-between" align="center">
        <Box maxW={300}>
          <InputField
            value={searchString}
            placeholder="Suchen..."
            onChange={(newValue) => setSearchString(newValue)}
            icon={<SearchIcon color="gray.500" />}
          />
        </Box>
      </Flex>

      <DriverHistoryTable historyData={historyData} />
    </VStack>
  );
}
