import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { getAllVehicles } from "../../backend-queries";
import { Vehicles } from "../../backend-queries/query/get-all-vehicles";
import { InputField, VehiclesTable } from "../../components";
import supabase from "../../utils/supabase";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { DefaultMenu } from "../../components/menu/default-menu";

type AllVehiclesProps = {};

export function AllVehicles({}: AllVehiclesProps) {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState<Vehicles>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchString, setSearchString] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  useEffect(() => {
    getAllVehicles((allVehicles: Vehicles) => {
      let filteredVehicles = allVehicles;

      if (searchString.trim() !== "") {
        filteredVehicles = filteredVehicles.filter(
          (vehicle) =>
            vehicle.license_plate
              ?.toLowerCase()
              .includes(searchString.toLowerCase()) ||
            vehicle.vin?.toLowerCase().includes(searchString.toLowerCase()) ||
            vehicle.model?.toLowerCase().includes(searchString.toLowerCase()) ||
            vehicle.make?.toLowerCase().includes(searchString.toLowerCase())
        );
      }

      if (stateFilter !== null) {
        filteredVehicles = filteredVehicles.filter(
          (vehicle) => vehicle.state === stateFilter
        );
      }

      if (locationFilter !== null) {
        filteredVehicles = filteredVehicles.filter(
          (vehicle) => vehicle.location === locationFilter
        );
      }

      setVehicles(filteredVehicles);
    });
  }, [searchString, stateFilter, locationFilter]);

  const createNewVehicle = async () => {
    setIsLoading(true);
    const { data: vehicle, error } = await supabase
      .from("vehicles")
      .insert({
        id: Math.floor(Math.random() * 100000001),
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
          <Button
            isLoading={isLoading}
            onClick={createNewVehicle}
            bg="successColor"
          >
            <Icon as={LuPlus} mr={4} />
            <Text color="textColor">Neues Fahrzeug</Text>
          </Button>
        </Flex>
        <Flex w="100%" gap={8} mt={4}>
          <Box>
            <Text fontWeight="bold" color="textColor">
              Status:
            </Text>
            <DefaultMenu
              options={[
                { value: null, label: "Alle", color: "grey" },
                { value: "active", label: "Aktiv", color: "green" },
                { value: "decommissioned", label: "Stillgelegt", color: "red" },
                { value: "in_service", label: "In Wartung", color: "yellow" },
              ]}
              defaultValue="Alle"
              onSelect={(value) => {
                setStateFilter(value);
              }}
            />
          </Box>
          <Box>
            <Text fontWeight="bold" color="textColor">
              Standort:
            </Text>
            <DefaultMenu
              options={[
                { value: null, label: "Alle", color: "grey" },
                { value: "dusseldorf", label: "Düsseldorf", color: "green" },
                { value: "moers", label: "Moers", color: "yellow" },
              ]}
              defaultValue="Alle"
              onSelect={(value) => setLocationFilter(value)}
            />
          </Box>
        </Flex>

        <Box w="100%" overflowX="auto">
          <VehiclesTable vehicles={vehicles} />
        </Box>
      </VStack>
    </Flex>
  );
}
