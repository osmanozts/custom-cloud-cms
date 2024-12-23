import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuStepBack } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteKmHistory, getKmHistories } from "../../backend-queries";
import { JoinedKmHistory } from "../../backend-queries/joins/joined-km-history";
import { InputField, KmHistoryTable } from "../../components";

export function AllKmHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [historyData, setHistoryData] = useState<JoinedKmHistory>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    fetchedData();
  }, [searchString]);

  const fetchedData = async () => {
    if (searchString.trim() === "") {
      await getKmHistories(
        searchParams.get("vehicle_id") ?? "",
        (fetchedData: JoinedKmHistory) => setHistoryData(fetchedData)
      );
    } else {
      const filteredData = historyData.filter(
        (data) =>
          data.km_age?.toString().includes(searchString) ||
          data.employees?.first_name?.includes(searchString) ||
          data.employees?.last_name?.includes(searchString) ||
          data.employees?.personnel_number?.includes(searchString)
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
          </Flex>
        </Flex>

        <KmHistoryTable
          historyData={historyData}
          deleteHistory={async (id) => {
            const status = await deleteKmHistory(id);
            if (status === "success") {
              await fetchedData();
            }
            return status;
          }}
        />
      </VStack>
    </Flex>
  );
}
