import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { DriverHistoryTable, InputField } from "../../components";
import { useEffect, useState } from "react";
import { getVehicleDriverHistories } from "../../backend-queries/query/get-vehicle-histories";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { JoinedDriverHistory } from "../../backend-queries/joins/joined-driver-history";
import { LuStepBack } from "react-icons/lu";

export function AllDriverHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [historyData, setHistoryData] = useState<JoinedDriverHistory>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    if (searchString.trim() === "") {
      getVehicleDriverHistories(
        Number(searchParams.get("vehicle_id")),
        (fetchedData: JoinedDriverHistory) => setHistoryData(fetchedData)
      );
    } else {
      const filteredData = historyData.filter(
        (data) =>
          data.employees?.first_name?.toString().includes(searchString) ||
          data.employees?.last_name?.toString().includes(searchString) ||
          data.employees?.personnel_number?.toString().includes(searchString)
      );
      setHistoryData(filteredData);
    }
  }, [searchString]);

  return (
    <Flex
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      bg="backgroundColor"
    >
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
          <Box>
            <Button
              leftIcon={<Icon as={LuStepBack} w={6} h={6} color="textColor" />}
              onClick={() =>
                navigate(
                  `/edit-vehicle?vehicle_id=${searchParams.get("vehicle_id")}`
                )
              }
            >
              <Text color="textColor">Zurück zum Fahrzeug</Text>
            </Button>
          </Box>
        </Flex>

        <DriverHistoryTable historyData={historyData} />
      </VStack>
    </Flex>
  );
}
