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
import { useNavigate, useSearchParams } from "react-router-dom";
import { EmployeeWithProfile } from "../../backend-queries/joins/employee-with-profile-query";
import { getAllEmployees } from "../../backend-queries/query/employees/get-all-employees";
import { EmployeesTable, InputField } from "../../components";
import { DefaultMenu } from "../../components/menu/default-menu";
import { useAuth } from "../../providers/auth-provider";
import { printEmployeesToPdf } from "./services/print-employees-to-pdf";

interface AllEmployeesProps {}

const qpToNullable = (v: string | null) => (v === null || v === "" ? null : v);

export const AllEmployees: React.FC<AllEmployeesProps> = () => {
  const { authRole } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<EmployeeWithProfile[]>([]);

  const [searchString, setSearchString] = useState<string>(
    () => searchParams.get("q") ?? "",
  );
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(() =>
    qpToNullable(searchParams.get("dep")),
  );
  const [statusFilter, setStatusFilter] = useState<string | null>(() =>
    qpToNullable(searchParams.get("status")),
  );
  const [locationFilter, setLocationFilter] = useState<string | null>(() =>
    qpToNullable(searchParams.get("loc")),
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const next: Record<string, string> = {};

    if (searchString.trim() !== "") next.q = searchString.trim();
    if (departmentFilter !== null) next.dep = departmentFilter;
    if (statusFilter !== null) next.status = statusFilter;
    if (locationFilter !== null) next.loc = locationFilter;

    setSearchParams(next, { replace: true });
  }, [
    searchString,
    departmentFilter,
    statusFilter,
    locationFilter,
    setSearchParams,
  ]);

  useEffect(() => {
    getAllEmployees((allEmployees: EmployeeWithProfile[]) => {
      let filteredEmployees = allEmployees;

      if (searchString.trim() !== "") {
        filteredEmployees = filteredEmployees.filter(
          (employee) =>
            employee.first_name
              ?.toLowerCase()
              .includes(searchString.toLowerCase()) ||
            employee.last_name
              ?.toLowerCase()
              .includes(searchString.toLowerCase()) ||
            (employee.personnel_number &&
              employee.personnel_number.includes(searchString)) ||
            (employee.transporter_id &&
              employee.transporter_id.includes(searchString)),
        );
      }

      if (departmentFilter !== null) {
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.department === departmentFilter,
        );
      }

      if (statusFilter !== null) {
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.state === statusFilter,
        );
      }

      if (locationFilter !== null) {
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.location === locationFilter,
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
              { value: "administration", label: "Verwaltung" },
              { value: "dispatcher", label: "Disponent" },
              { value: "fleet_management", label: "Flottenmanagement" },
              { value: "driver", label: "Fahrer" },
            ]}
            value={departmentFilter}
            onSelect={(value) => setDepartmentFilter(value)}
            placeholder="Alle"
          />

          <Text fontWeight="bold">Status:</Text>
          <DefaultMenu
            options={[
              { value: null, label: "Alle" },
              { value: "active", label: "Aktiv" },
              { value: "inactive", label: "Ausgetreten" },
            ]}
            value={statusFilter}
            onSelect={(value) => setStatusFilter(value)}
            placeholder="Alle"
          />

          <Text fontWeight="bold">Standort:</Text>
          <DefaultMenu
            options={[
              { value: null, label: "Alle" },
              { value: "DNX4", label: "DNX4" },
              { value: "DNW1", label: "DNW1" },
              { value: "Lplg-Moers", label: "Lplg Moers" },
              { value: "Heix", label: "Heix" },
            ]}
            value={locationFilter}
            onSelect={(value) => setLocationFilter(value)}
            placeholder="Alle"
          />
        </Flex>

        <Box w="100%" maxHeight="60vh" overflowX="auto" overflowY="auto">
          <EmployeesTable employees={employees} />
        </Box>

        <Flex gap={4} width="100%" justify="flex-end" alignItems="center">
          <Text fontWeight="bold">Einträge: {employees.length}</Text>
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
        </Flex>
      </VStack>
    </Flex>
  );
};
