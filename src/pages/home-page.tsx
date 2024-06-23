import {
  Box,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import { Tables } from "../utils/database/types";
import { SearchIcon } from "@chakra-ui/icons";
import { InputField } from "../components";

interface HomePageProps {}

export const HomePage = ({}: HomePageProps) => {
  const [employees, setEmployees] = useState<Tables<"employees">[] | null>(
    null
  );

  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const employeesData = await getAllEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }

    fetchEmployees();
  }, []);

  async function getAllEmployees() {
    const { data: employees, error } = await supabase
      .from("employees")
      .select("*");

    if (error) throw error;
    return employees;
  }

  return (
    <Flex justifyContent="center" alignItems="center">
      <VStack height="100vh" px={12}>
        <HStack width="100%" mt={8}>
          <Box alignSelf="flex-start">
            <InputField
              value={searchString}
              placeholder="Suchen..."
              onChange={setSearchString}
              icon={<SearchIcon color="gray" />}
            />
          </Box>
        </HStack>

        <TableContainer
          width="100%"
          mt={8}
          maxHeight="70svh"
          overflowY="scroll"
        >
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Vorname</Th>
                <Th>Nachname</Th>
                <Th>Adresse</Th>
                <Th>Krankenkasse</Th>
                <Th>SteuerID.</Th>
                <Th>Steuerklasse</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees?.map((empl) => {
                return (
                  <Tr>
                    <Td>{empl.first_name}</Td>
                    <Td>{empl.last_name}</Td>
                    <Td>
                      {empl.street} {empl.city} {empl.postal_code}
                    </Td>
                    <Td>{empl.health_insurance}</Td>
                    <Td>{empl.tax_id}</Td>
                    <Td>{empl.tax_level}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Flex>
  );
};
