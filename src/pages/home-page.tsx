import {
  Box,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useAuth } from "../providers/auth-provider";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import { Tables } from "../utils/database/types";

interface HomePageProps {}

export const HomePage = ({}: HomePageProps) => {
  const { signOut } = useAuth();
  const [employees, setEmployees] = useState<Tables<"employees">[] | null>(
    null
  );

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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <TableContainer width="100%" px={12}>
        <Table size="md" variant="striped" colorScheme="teal">
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
      <Button mt={12} onClick={signOut}>
        Log dich aus
      </Button>
    </Box>
  );
};
