import { Box, Button, Flex, Icon, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { EmployeesTable, InputField } from "../../components";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../../backend-queries/query/get-all-employees";
import { EmployeeWithProfile } from "../../backend-queries/joins/employee-with-profile-query";
import { LuPlus } from "react-icons/lu";

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

  useEffect(() => {
    if (searchString.trim() === "") {
      // If search string is empty, fetch all employees
      getAllEmployees((allEmployees: EmployeeWithProfile[]) =>
        setEmployees(allEmployees)
      );
    } else {
      // Otherwise, filter employees based on searchString

      const filteredEmployees: EmployeeWithProfile[] = employees.filter(
        (employee) =>
          (employee.first_name &&
            employee.first_name
              .toLowerCase()
              .includes(searchString.toLowerCase())) ||
          (employee.last_name &&
            employee.last_name
              .toLowerCase()
              .includes(searchString.toLowerCase())) ||
          (employee.personnel_number &&
            employee.personnel_number.includes(searchString))
      );
      setEmployees(filteredEmployees);
    }
  }, [searchString, employees]);

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
            onClick={() => navigate("/create-new-user")}
            bg="successColor"
          >
            <Icon as={LuPlus} />
          </Button>
        </Flex>

        <Box w="100%" overflowX="auto">
          <EmployeesTable employees={employees} />
        </Box>
      </VStack>
    </Flex>
  );
};
