import { SearchIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuDownload, LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { EmployeeWithProfile } from "../../backend-queries/joins/employee-with-profile-query";
import { getAllEmployees } from "../../backend-queries/query/employees/get-all-employees";
import { EmployeesTable, InputField } from "../../components";
import { DefaultMenu } from "../../components/menu/default-menu";
import supabase from "../../utils/supabase";
import { printEmployeesToPdf } from "./services/print-employees-to-pdf";
import { useAuth } from "../../providers/auth-provider";

interface AllEmployeesProps { }

export const AllEmployees: React.FC<AllEmployeesProps> = () => {
  const { authRole } = useAuth()
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<EmployeeWithProfile[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllEmployees((allEmployees: EmployeeWithProfile[]) =>
      setEmployees(allEmployees)
    );
  }, []);

  useEffect(() => {
    getAllEmployees((allEmployees: EmployeeWithProfile[]) => {
      let filteredEmployees = allEmployees;

      // Filterlogik
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

      if (departmentFilter !== null) {
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.department === departmentFilter
        );
      }

      if (statusFilter !== null) {
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.state === statusFilter
        );
      }

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
        {/* Fehleranzeige im UI */}
        {errorMessage && (
          <Alert status="error" borderRadius="md" mb={4}>
            <AlertIcon />
            <AlertTitle>Unauthorized</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

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
            color="invertedTextColor"
            leftIcon={<Icon as={LuPlus} />}
            isDisabled={authRole !== "superadmin"}
          >
            Neuer Mitarbeiter
          </Button>
        </Flex>

        <Flex
          w="100%"
          maxW={900}
          alignItems="center"
          alignSelf="flex-start"
          gap={8}
          mt={4}
        >
          <Text fontWeight="bold">Abteilung:</Text>
          <DefaultMenu
            options={[
              { value: null, label: "Alle" },
              { value: "warehouse", label: "Lager" },
              { value: "logistics", label: "Logistik" },
              { value: "administration", label: "Verwaltung" },
            ]}
            defaultValue="Alle"
            onSelect={(value) => setDepartmentFilter(value)}
          />

          <Text fontWeight="bold">Status:</Text>
          <DefaultMenu
            options={[
              { value: null, label: "Alle" },
              { value: "active", label: "Aktiv" },
              { value: "inactive", label: "Ausgetreten" },
              { value: "pipeline", label: "Pipeline" },
            ]}
            defaultValue="Alle"
            onSelect={(value) => setStatusFilter(value)}
          />

          <Text fontWeight="bold">Standort:</Text>
          <DefaultMenu
            options={[
              { value: null, label: "Alle" },
              { value: "DNX4", label: "DNX4" },
            ]}
            defaultValue="Alle"
            onSelect={(value) => setLocationFilter(value)}
          />
        </Flex>

        <Box w="100%" overflowX="auto">
          <EmployeesTable
            employees={employees}
            onDelete={async (id) => {
              try {
                const response = await supabase.functions.invoke(
                  "delete-user",
                  {
                    body: { id },
                  }
                );

                console.log("🚀 ~ response:", response);

                if (!response.error) {
                  // Erfolgreiche Löschung
                  getAllEmployees((allEmployees: EmployeeWithProfile[]) =>
                    setEmployees(allEmployees)
                  );
                  return "success";
                }

                // Fehleranalyse basierend auf status_code
                const status = response.error.context.status;
                if (status === 401) {
                  return "unauthorized";
                } else if (status === 500) {
                  return "error";
                }

                return "success";
              } catch (e) {
                console.error("Error deleting user:", e);
                return "error";
              }
            }}
          />
        </Box>

        <Button
          bg="parcelColor"
          alignSelf="flex-end"
          leftIcon={<LuDownload />}
          color="invertedTextColor"
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            try {
              await printEmployeesToPdf(employees);
            } catch (e) {
              setErrorMessage(`Fehler beim Herunterladen der PDF: ${e}`);
            } finally {
              setIsLoading(false);
            }
          }}
          px={4}
        >
          <Text>PDF Herunterladen</Text>
        </Button>
      </VStack>
    </Flex>
  );
};
