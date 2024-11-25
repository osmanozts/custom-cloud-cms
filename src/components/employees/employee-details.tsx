import { EmailIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";

import { Tables } from "../../utils/database/types";
import { InputField } from "../input-field";
import { CustomCalendar } from "../calendars/custom-calendar";
import { DefaultMenu } from "../menu/default-menu";
import { useAuth } from "../../providers/auth-provider";

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
  const { role } = useAuth();

  const handleDateChange =
    (dateKey: keyof Tables<"employees">) => (value: Date | null) => {
      setEmployee({
        ...employee,
        [dateKey]: value ? value : "",
      });
    };

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="tileBgColor"
      p={6}
    >
      <GridItem>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputField
              id="email"
              isDisabled
              value={profile.email ?? ""}
              onChange={(value) => setProfile({ ...profile, email: value })}
              placeholder="Email"
              icon={<EmailIcon color="gray.500" />}
            />
          </FormControl>
          <FormControl>
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
          <FormControl>
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
          <FormControl>
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
          <FormControl>
            <FormLabel htmlFor="city">Stadt</FormLabel>
            <InputField
              id="city"
              value={employee.city ?? ""}
              onChange={(value) => setEmployee({ ...employee, city: value })}
              placeholder="Stadt"
            />
          </FormControl>
          <FormControl>
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
          <FormControl>
            <FormLabel htmlFor="street">Straße</FormLabel>
            <InputField
              id="street"
              value={employee.street ?? ""}
              onChange={(value) => setEmployee({ ...employee, street: value })}
              placeholder="Straße"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="dateOfBirth">Geburtsdatum</FormLabel>
            <CustomCalendar
              value={
                employee.date_of_birth ? new Date(employee.date_of_birth) : null
              }
              onChange={(date) => {
                handleDateChange("date_of_birth")(date);
              }}
            />
          </FormControl>
        </Stack>
      </GridItem>
      <GridItem>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="driverLicenseEndDate">
              Führerschein Ablaufdatum
            </FormLabel>
            <CustomCalendar
              value={
                employee.driver_license_end_date
                  ? new Date(employee.driver_license_end_date)
                  : null
              }
              onChange={(date) => {
                handleDateChange("driver_license_end_date")(date);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="idCardEndDate">
              Personalausweis Ablaufdatum
            </FormLabel>
            <CustomCalendar
              value={
                employee.id_card_end_date
                  ? new Date(employee.id_card_end_date)
                  : null
              }
              onChange={(date) => {
                handleDateChange("id_card_end_date")(date);
              }}
            />
          </FormControl>
          <FormControl>
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
          <FormControl>
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
          <FormControl>
            <FormLabel htmlFor="taxId">Steuer-ID</FormLabel>
            <InputField
              id="taxId"
              value={employee.tax_id ?? ""}
              onChange={(value) => setEmployee({ ...employee, tax_id: value })}
              placeholder="Steuer-ID"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="taxLevel">Steuerklasse</FormLabel>
            <InputField
              id="taxLevel"
              value={employee.tax_level ?? ""}
              onChange={(value) =>
                setEmployee({ ...employee, tax_level: value })
              }
              placeholder="Steuerklasse"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="location">Standort</FormLabel>
            <DefaultMenu
              options={[{ value: "DNX4", label: "DNX4 - Düsseldorf" }]}
              defaultValue={employee.location ?? ""}
              onSelect={(value) =>
                setEmployee({ ...employee, location: value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="department">Abteilung</FormLabel>
            <DefaultMenu
              options={[
                { value: "warehouse", label: "Lager" },
                { value: "logistics", label: "Logistik" },
                { value: "administration", label: "Verwaltung" },
              ]}
              defaultValue={employee.department ?? ""}
              onSelect={(value) =>
                setEmployee({ ...employee, department: value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="role">Status</FormLabel>
            <DefaultMenu
              options={[
                { value: "active", label: "Aktiv" },
                { value: "inactive", label: "Ausgetreten" },
                { value: "pipeline", label: "Pipeline" },
              ]}
              defaultValue={employee.state ?? ""}
              onSelect={(value) => setEmployee({ ...employee, state: value })}
            />
          </FormControl>
          <FormControl isDisabled={role !== "superadmin"}>
            <FormLabel htmlFor="role">Rolle</FormLabel>
            <DefaultMenu
              options={[
                { value: "superadmin", label: "Superadmin" },
                { value: "admin", label: "Admin" },
                { value: "employee", label: "Mitarbeiter" },
              ]}
              defaultValue={profile.role ?? ""}
              onSelect={(value) => setProfile({ ...profile, role: value })}
            />
          </FormControl>
        </Stack>
      </GridItem>
    </Grid>
  );
};
