import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { EmployeesTable, InputField } from "../../components";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../../backend-queries/query/get-all-employees";
import { EmployeeWithProfile } from "../../backend-queries/joins/employee-with-profile-query";
import { LuPlus } from "react-icons/lu";
import { DefaultMenu } from "../../components/menu/default-menu";

interface AllEmployeesProps {}

export const AllEmployees: React.FC<AllEmployeesProps> = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<EmployeeWithProfile[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  useEffect(() => {
    getAllEmployees((allEmployees: EmployeeWithProfile[]) =>
      setEmployees(allEmployees)
    );
  }, []);

  useEffect(() => {
    getAllEmployees((allEmployees: EmployeeWithProfile[]) => {
      let filteredEmployees = allEmployees;

      // Suche nach Name oder Personalnummer
      if (searchString.trim() !== "") {
        filteredEmployees = filteredEmployees.filter(
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
      }

      // Filter nach Abteilung
      if (departmentFilter !== null) {
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.department === departmentFilter
        );
      }

      // Filter nach Status
      if (statusFilter !== null) {
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.state === statusFilter
        );
      }

      // Filter nach Standort
      if (locationFilter !== null) {
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.location === locationFilter
        );
      }

      setEmployees(filteredEmployees);
    });
  }, [searchString, departmentFilter, statusFilter, locationFilter]);

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
            onClick={() => navigate("/create-new-user")}
            bg="parcelColor"
            color="#fff"
            leftIcon={<Icon as={LuPlus} />}
          >
            Neuer Mitarbeiter
          </Button>
        </Flex>

        <Flex
          w="100%"
          maxW={800}
          alignItems="center"
          alignSelf="flex-start"
          gap={8}
          mt={4}
        >
          <Text fontWeight="bold" color="textColor">
            Abteilung:
          </Text>
          <DefaultMenu
            options={[
              { value: null, label: "Alle", color: "grey" },
              { value: "warehouse", label: "Lager" },
              { value: "logistics", label: "Logistik" },
              { value: "administration", label: "Verwaltung" },
            ]}
            defaultValue="Alle"
            onSelect={(value) => setDepartmentFilter(value)}
          />

          <Text fontWeight="bold" color="textColor">
            Status:
          </Text>
          <DefaultMenu
            options={[
              { value: null, label: "Alle", color: "grey" },
              { value: "active", label: "Aktiv", color: "green" },
              { value: "inactive", label: "Ausgetreten", color: "red" },
              { value: "pipeline", label: "Pipeline", color: "yellow" },
            ]}
            defaultValue="Alle"
            onSelect={(value) => setStatusFilter(value)}
          />

          <Text fontWeight="bold" color="textColor">
            Standort:
          </Text>
          <DefaultMenu
            options={[
              { value: null, label: "Alle", color: "grey" },
              { value: "DNX4", label: "DNX4", color: "blue" },
            ]}
            defaultValue="Alle"
            onSelect={(value) => setLocationFilter(value)}
          />
        </Flex>

        <Box w="100%" overflowX="auto">
          <EmployeesTable employees={employees} />
        </Box>
      </VStack>
    </Flex>
  );
};
