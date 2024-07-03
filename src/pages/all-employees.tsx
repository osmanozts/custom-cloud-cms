import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { EmployeesTable, InputField } from "../components";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../backend-queries/query/get-all-employees";
import { EmployeeWithProfile } from "../backend-queries/joins/employee-with-profile-query";

interface AllEmployeesProps {}

export const AllEmployees: React.FC<AllEmployeesProps> = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<EmployeeWithProfile[]>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    getAllEmployees((allEmployees: EmployeeWithProfile[]) =>
      setEmployees(allEmployees)
    );
  }, []);

  return (
    <Flex justifyContent="center" alignItems="flex-start" minHeight="100vh">
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
            onClick={() => navigate("/create-new-user")}
            colorScheme="blue"
          >
            +
          </Button>
        </Flex>

        <Box w="100%" overflowX="auto">
          <EmployeesTable employees={employees} />
        </Box>
      </VStack>
    </Flex>
  );
};
