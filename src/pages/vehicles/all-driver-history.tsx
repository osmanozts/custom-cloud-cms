import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { DriverHistoryTable, InputField } from "../../components";
import { useEffect, useState } from "react";
import { getVehicleDriverHistories } from "../../backend-queries/query/get-vehicle-histories";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { JoinedDriverHistory } from "../../backend-queries/joins/joined-driver-history";
import { LuPlus, LuStepBack } from "react-icons/lu";
import { deleteDriverHistory } from "../../backend-queries";

export function AllDriverHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [historyData, setHistoryData] = useState<JoinedDriverHistory>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    fetchedData();
  }, [searchString]);

  const fetchedData = async () => {
    if (searchString.trim() === "") {
      await getVehicleDriverHistories(
        searchParams.get("vehicle_id") ?? "",
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
  };

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
          <Flex gap={4}>
            <Button
              onClick={() =>
                navigate(
                  `/edit-vehicle?vehicle_id=${searchParams.get("vehicle_id")}`
                )
              }
              bg="tileBgColor"
              _hover={{ bg: "darkColor", color: "invertedTextColor" }}
              display="flex"
            >
              <Icon as={LuStepBack} w={6} h={6} mr={2} />
              <Text>Zurück zum Fahrzeug</Text>
            </Button>
            <Button
              onClick={() =>
                navigate(
                  `/edit-vehicle?vehicle_id=${searchParams.get("vehicle_id")}`
                )
              }
              bg="parcelColor"
              color="invertedTextColor"
              _hover={{ bg: "darkColor" }}
              display="flex"
            >
              <Icon as={LuPlus} w={6} h={6} mr={2} />
              <Text>Neuer Eintrag</Text>
            </Button>
          </Flex>
        </Flex>

        <DriverHistoryTable
          historyData={historyData}
          deleteDriverHistory={async (id) => {
            await deleteDriverHistory(id);
            await fetchedData();
          }}
        />
      </VStack>
    </Flex>
  );
}
