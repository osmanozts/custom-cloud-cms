import { Box, FormControl, FormLabel, Grid, GridItem } from "@chakra-ui/react";

import { Enums, Tables } from "../../utils/database/types";
import { InputField } from "../input-field";
import { DefaultMenu } from "../menu/default-menu";
import { useAuth } from "../../providers/auth-provider";
import { EmployeeProfilePic } from "./employee-profile-pic";

type EmployeeDetailsProps = {
  employee: Tables<"employees">;
  profile: Tables<"profile">;
  setEmployee: (employee: Tables<"employees">) => void;
  setProfile: (profile: Tables<"profile">) => void;
};

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  employee,
  profile,
  setEmployee,
  setProfile,
}) => {
  const { authRole } = useAuth();

  return (
    <Box bg="tileBgColor" borderWidth="1px" borderRadius="lg" p={6} mb={6}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} mb={4}>
        <GridItem>
          <EmployeeProfilePic employee_id={employee.id.toString()} />
        </GridItem>
      </Grid>
      <Grid
        width="100%"
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={8}
      >
        <GridItem>
          <FormControl my={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputField
              id="email"
              isDisabled
              value={profile.email ?? ""}
              onChange={(value) => setProfile({ ...profile, email: value })}
              placeholder="Email"
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="personnelNumber">Personalnummer</FormLabel>
            <InputField
              id="personnelNumber"
              value={employee.personnel_number ?? ""}
              onChange={(value) =>
                setEmployee({ ...employee, personnel_number: value })
              }
              placeholder="Personalnummer"
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="firstName">Vorname</FormLabel>
            <InputField
              id="firstName"
              value={employee.first_name ?? ""}
              onChange={(value) =>
                setEmployee({ ...employee, first_name: value })
              }
              placeholder="Vorname"
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="lastName">Nachname</FormLabel>
            <InputField
              id="lastName"
              value={employee.last_name ?? ""}
              onChange={(value) =>
                setEmployee({ ...employee, last_name: value })
              }
              placeholder="Nachname"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl my={4}>
            <FormLabel htmlFor="city">Stadt</FormLabel>
            <InputField
              id="city"
              value={employee.city ?? ""}
              onChange={(value) => setEmployee({ ...employee, city: value })}
              placeholder="Stadt"
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="postalCode">PLZ</FormLabel>
            <InputField
              id="postalCode"
              value={employee.postal_code ?? ""}
              onChange={(value) =>
                setEmployee({ ...employee, postal_code: value })
              }
              placeholder="PLZ"
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="street">Straße</FormLabel>
            <InputField
              id="street"
              value={employee.street ?? ""}
              onChange={(value) => setEmployee({ ...employee, street: value })}
              placeholder="Straße"
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="dateOfBirth">Geburtsdatum</FormLabel>
            <InputField
              id="birth-date"
              regex={
                /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})(\s([01]\d|2[0-3]):([0-5]\d))?$/
              }
              regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
              value={employee.date_of_birth ?? ""}
              isDate
              onChange={(e) => {
                setEmployee({ ...employee, date_of_birth: e });
              }}
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="dateOfBirth">Mobil</FormLabel>
            <InputField
              id="mobile"
              value={employee.mobile ?? ""}
              onChange={(value) => setEmployee({ ...employee, mobile: value })}
              placeholder="Mobil..."
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl my={4}>
            <FormLabel htmlFor="location">Standort</FormLabel>
            <DefaultMenu
              options={[{ value: "DNX4", label: "DNX4 - Düsseldorf" }]}
              defaultValue={employee.location ?? "Wähle ein Standort aus"}
              onSelect={(value) =>
                setEmployee({ ...employee, location: value })
              }
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="department">Abteilung</FormLabel>
            <DefaultMenu
              options={[
                { value: "warehouse", label: "Lager" },
                { value: "logistics", label: "Logistik" },
                { value: "administration", label: "Verwaltung" },
              ]}
              defaultValue={employee.department ?? "Wähle eine Abteilung aus"}
              onSelect={(value) =>
                setEmployee({ ...employee, department: value })
              }
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="role">Status</FormLabel>
            <DefaultMenu
              options={[
                { value: "active", label: "Aktiv" },
                { value: "inactive", label: "Ausgetreten" },
                { value: "pipeline", label: "Pipeline" },
              ]}
              defaultValue={employee.state ?? ""}
              onSelect={(value) =>
                setEmployee({
                  ...employee,
                  state: value as Enums<"employee_state">,
                })
              }
            />
          </FormControl>
          <FormControl isDisabled={authRole !== "superadmin"}>
            <FormLabel htmlFor="role">Rolle</FormLabel>
            <DefaultMenu
              options={[
                { value: "superadmin", label: "Superadmin" },
                { value: "admin", label: "Admin" },
                { value: "employee", label: "Mitarbeiter" },
              ]}
              defaultValue={profile.auth_role ?? ""}
              onSelect={(value) =>
                setProfile({
                  ...profile,
                  auth_role: value as Enums<"auth-role">,
                })
              }
            />
          </FormControl>

          <FormControl my={4}>
            <FormLabel htmlFor="driverLicenseEndDate">
              Führerschein Ablaufdatum
            </FormLabel>

            <InputField
              id="driver-license-expire-date"
              regex={
                /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})(\s([01]\d|2[0-3]):([0-5]\d))?$/
              }
              regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
              value={employee.driver_license_end_date ?? ""}
              isDate
              onChange={(e) => {
                setEmployee({ ...employee, driver_license_end_date: e });
              }}
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="idCardEndDate">
              Personalausweis Ablaufdatum
            </FormLabel>
            <InputField
              id="id-expire-date"
              regex={
                /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})(\s([01]\d|2[0-3]):([0-5]\d))?$/
              }
              regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
              value={employee.id_card_end_date ?? ""}
              isDate
              onChange={(e) => {
                setEmployee({ ...employee, id_card_end_date: e });
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl my={4}>
            <FormLabel htmlFor="nationality">Nationalität</FormLabel>
            <InputField
              id="nationality"
              value={employee.nationality ?? ""}
              onChange={(value) =>
                setEmployee({ ...employee, nationality: value })
              }
              placeholder="Nationalität"
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="taxId">Steuer-ID</FormLabel>
            <InputField
              id="taxId"
              value={employee.tax_id ?? ""}
              onChange={(value) => setEmployee({ ...employee, tax_id: value })}
              placeholder="Steuer-ID"
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="taxLevel">Steuerklasse</FormLabel>
            <DefaultMenu
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
                { value: "6", label: "6" },
              ]}
              defaultValue={employee.tax_level ?? "Wähle eine Steuerklasse"}
              onSelect={(value) =>
                setEmployee({ ...employee, tax_level: value })
              }
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="driverliclevel">Führerscheinklasse</FormLabel>
            <DefaultMenu
              options={[
                { value: "A", label: "A" },
                { value: "AM", label: "AM" },
                { value: "A1", label: "A1" },
                { value: "A2", label: "A2" },
                { value: "B", label: "B" },
                { value: "B17", label: "B17" },
                { value: "BE", label: "BE" },
                { value: "B96", label: "B96" },
                { value: "C", label: "C" },
                { value: "CE", label: "CE" },
                { value: "C1", label: "C1" },
                { value: "C1E", label: "C1E" },
                { value: "D", label: "D" },
                { value: "DE", label: "DE" },
                { value: "D1", label: "D1" },
                { value: "D1E", label: "D1E" },
              ]}
              defaultValue={
                employee.driver_license_level ?? "Wähle eine Führerscheinklasse"
              }
              onSelect={(value) =>
                setEmployee({ ...employee, driver_license_level: value })
              }
            />
          </FormControl>

          <FormControl my={4}>
            <FormLabel htmlFor="healthInsurance">Krankenversicherung</FormLabel>
            <InputField
              id="healthInsurance"
              value={employee.health_insurance ?? ""}
              onChange={(value) =>
                setEmployee({ ...employee, health_insurance: value })
              }
              placeholder="Krankenversicherung"
            />
          </FormControl>
        </GridItem>
      </Grid>
    </Box>
  );
};
