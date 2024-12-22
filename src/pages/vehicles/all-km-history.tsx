import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuPlus, LuStepBack } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createDriverHistoryManuel,
  deleteDriverHistory,
  getKmHistories,
} from "../../backend-queries";
import { InputField, KmHistoryTable } from "../../components";
import { useAuth } from "../../providers/auth-provider";
import { setToast } from "../../redux/toast-slice";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { JoinedKmHistory } from "../../backend-queries/joins/joined-km-history";

export function AllKmHistory() {
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
            <Button
              onClick={async () => {
                setIsLoading(true);
                try {
                  await createDriverHistoryManuel(
                    searchParams.get("vehicle_id") ?? "",
                    user.id
                  );
                  fetchedData();
                  dispatch(
                    setToast({
                      title: "Erfolgreich!",
                      description: "Historie erfolgreich manuell erstellt.",
                      status: "success",
                    })
                  );
                } catch (e) {
                  dispatch(
                    setToast({
                      title: "Fehler!",
                      description:
                        "Beim Löschen der Historie ist ein Fehler aufgetreten.",
                      status: "error",
                    })
                  );
                  throw new Error(
                    `Fehler beim manuellen Erstellen einer Kilometerstand History: ${e}`
                  );
                } finally {
                  setIsLoading(false);
                }
              }}
              bg="parcelColor"
              color="invertedTextColor"
              _hover={{ bg: "darkColor" }}
              display="flex"
              isLoading={isLoading}
            >
              <Icon as={LuPlus} w={6} h={6} mr={2} />
              <Text>Neuer Eintrag</Text>
            </Button>
          </Flex>
        </Flex>

        <KmHistoryTable
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
