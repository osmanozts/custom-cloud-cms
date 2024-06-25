import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import { Tables } from "../utils/database/types";
import { SearchIcon } from "@chakra-ui/icons";
import { EmployeesTable, InputField } from "../components";

interface AllEmployeesProps {}

export const AllEmployees = ({}: AllEmployeesProps) => {
  const [employees, setEmployees] = useState<Tables<"employees">[] | null>(
    null
  );

  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    getAllEmployees();
  }, []);

  async function getAllEmployees() {
    const { data: employees, error } = await supabase
      .from("employees")
      .select("*");

    setEmployees(employees);

    if (error) throw error;
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

        <EmployeesTable employees={employees ?? []} />
      </VStack>
    </Flex>
  );
};
