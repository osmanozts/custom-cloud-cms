import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { EmployeesTable, InputField } from "../components";
import { useNavigate } from "react-router-dom";
import { EmployeesWithProfile } from "../backend-queries/joins/employees-with-profile-query";

interface AllEmployeesProps {}

export const AllEmployees = ({}: AllEmployeesProps) => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<EmployeesWithProfile | null>(null);

  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    getAllEmployees();
  }, []);

  async function getAllEmployees() {
    const { data: employees, error } = await supabase.from("employees").select(`
      *,
      profile(*)
      `);
    if (error) throw error;

    setEmployees(employees);
  }

  return (
    <Flex justifyContent="center" alignItems="center">
      <VStack height="100vh" px={12}>
        <Flex width="80%" mt={8} justifyContent="space-between">
          <Box alignSelf="flex-start">
            <InputField
              value={searchString}
              placeholder="Suchen..."
              onChange={setSearchString}
              icon={<SearchIcon color="gray" />}
            />
          </Box>

          <Button onClick={() => navigate("/create-new-user")}>+</Button>
        </Flex>

        <EmployeesTable employees={employees ?? []} />
      </VStack>
    </Flex>
  );
};
