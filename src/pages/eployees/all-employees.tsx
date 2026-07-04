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
  Spinner,
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

const qpToPage = (v: string | null) => {
  const parsed = Number(v);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const PAGE_SIZE = 25;

export const AllEmployees: React.FC<AllEmployeesProps> = () => {
  const { authRole } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const [employees, setEmployees] = useState<EmployeeWithProfile[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

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
  const [currentPage, setCurrentPage] = useState<number>(() =>
    qpToPage(searchParams.get("page")),
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  useEffect(() => {
    const next: Record<string, string> = {};

    if (searchString.trim() !== "") next.q = searchString.trim();
    if (departmentFilter !== null) next.dep = departmentFilter;
    if (statusFilter !== null) next.status = statusFilter;
    if (locationFilter !== null) next.loc = locationFilter;
    if (currentPage > 1) next.page = String(currentPage);

    setSearchParams(next, { replace: true });
  }, [
    searchString,
    departmentFilter,
    statusFilter,
    locationFilter,
    currentPage,
    setSearchParams,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchString, departmentFilter, statusFilter, locationFilter]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsTableLoading(true);
      setErrorMessage(null);

      try {
        const result = await getAllEmployees({
          page: currentPage,
          pageSize: PAGE_SIZE,
          searchString,
          departmentFilter,
          statusFilter,
          locationFilter,
        });

        setEmployees(result.employees);
        setTotalCount(result.totalCount);

        const nextTotalPages = Math.max(
          1,
          Math.ceil(result.totalCount / PAGE_SIZE),
        );

        if (currentPage > nextTotalPages) {
          setCurrentPage(nextTotalPages);
        }
      } catch (error) {
        setEmployees([]);
        setTotalCount(0);
        setErrorMessage(`Fehler beim Laden der Mitarbeiter: ${error}`);
      } finally {
        setIsTableLoading(false);
      }
    };

    fetchEmployees();
  }, [
    currentPage,
    searchString,
    departmentFilter,
    statusFilter,
    locationFilter,
  ]);

  const hasActiveFilters =
    searchString.trim() !== "" ||
    departmentFilter !== null ||
    statusFilter !== null ||
    locationFilter !== null;

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
            <AlertTitle>Fehler</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Flex w="100%" justify="space-between" align="center">
          <Box maxW={300}>
            <InputField
              value={searchString}
              placeholder="Suchen..."
              onChange={(newValue) => setSearchString(newValue)}
              icon={<SearchIcon color="iconColor" />}
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
          position="relative"
          zIndex={2}
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

        <Box
          w="100%"
          maxHeight="60vh"
          minHeight="60vh"
          overflowX="auto"
          overflowY="auto"
          position="relative"
          borderRadius="md"
          zIndex={1}
        >
          <EmployeesTable
            employees={employees}
            isLoading={isTableLoading}
            emptyMessage={
              hasActiveFilters
                ? "Keine Mitarbeiter für die aktuelle Suche oder Filtereinstellung gefunden."
                : "Es sind aktuell keine Mitarbeiter vorhanden."
            }
          />

          {isTableLoading && (
            <Flex
              position="absolute"
              inset={0}
              align="center"
              justify="center"
              bg="blackAlpha.200"
              backdropFilter="blur(1px)"
              zIndex={1}
            >
              <Spinner />
            </Flex>
          )}
        </Box>

        <Flex
          w="100%"
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={4}
        >
          <Flex gap={4} align="center">
            <Text fontWeight="bold">
              Einträge: {employees.length} von {totalCount}
            </Text>
            <Text>
              Seite {currentPage} von {totalPages}
            </Text>
          </Flex>

          <Flex gap={2} align="center">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              isDisabled={currentPage <= 1 || isTableLoading}
            >
              Zurück
            </Button>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              isDisabled={currentPage >= totalPages || isTableLoading}
            >
              Weiter
            </Button>
          </Flex>
        </Flex>

        <Flex gap={4} width="100%" justify="flex-end" alignItems="center">
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