import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { getAllVehicles } from "../../backend-queries";
import { Vehicles } from "../../backend-queries/query/get-all-vehicles";
import { VehiclesTable } from "../../components";
import supabase from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

type AllVehiclesProps = {};

export function AllVehicles({}: AllVehiclesProps) {
  const navigate = useNavigate();

  const [vehicles, setEmployees] = useState<Vehicles>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          <Box></Box>
          <Button
            isLoading={isLoading}
            onClick={async () => {
              try {
                setIsLoading(true);
                const { data: vehicle, error } = await supabase
                  .from("vehicles")
                  .insert({
                    id: Math.floor(Math.random() * 100000000),
                  })
                  .select()
                  .single();

                if (error) {
                  throw new Error(error.message);
                }
                if (vehicle) {
                  setIsLoading(false);
                  navigate({
                    pathname: "/edit-vehicle",
                    search: `?vehicle_id=${vehicle.id}`,
                  });
                }
              } catch (e) {}
              alert("not implemented yet");
            }}
            bg="successColor"
          >
            <Icon as={LuPlus} mr={4} />
            <Text>Neues Fahrzeug</Text>
          </Button>
        </Flex>

        <Box w="100%" overflowX="auto">
          <VehiclesTable vehicles={vehicles} />
        </Box>
      </VStack>
    </Flex>
  );
}
