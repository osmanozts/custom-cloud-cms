import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Icon, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { getAllVehicles } from "../../backend-queries";
import { Vehicles } from "../../backend-queries/query/get-all-vehicles";
import { InputField, VehiclesTable } from "../../components";

type AllVehiclesProps = {};

export function AllVehicles({}: AllVehiclesProps) {
  // const navigate = useNavigate();

  const [vehicles, setEmployees] = useState<Vehicles>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    getAllVehicles((allVehicles: Vehicles) => setEmployees(allVehicles));
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      bg="backgroundColor"
    >
      <VStack width="100%" maxWidth="1200px" p={6}>
        <Flex w="100%" justify="space-between" align="center">
          <Box>
            <InputField
              value={searchString}
              placeholder="Suchen..."
              onChange={(newValue) => setSearchString(newValue)}
              icon={<SearchIcon color="gray.500" />}
            />
          </Box>
          <Button
            onClick={() => {
              alert("not implemented yet");
              // navigate("/create-new-user")
            }}
            bg="successColor"
          >
            <Icon as={LuPlus} />
          </Button>
        </Flex>

        <Box w="100%" overflowX="auto">
          <VehiclesTable vehicles={vehicles} />
        </Box>
      </VStack>
    </Flex>
  );
}
