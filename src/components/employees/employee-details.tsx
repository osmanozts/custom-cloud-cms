import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/auth-provider";
import { Enums, Tables } from "../../utils/database/types";
import { InputField } from "../input-field";
import { DefaultMenu } from "../menu/default-menu";
import { EmployeeProfilePic } from "./employee-profile-pic";
import { LuAtSign } from "react-icons/lu";

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

  const driverLicenseLevels = [
    { value: "AM", label: "AM" },
    { value: "A1", label: "A1" },
    { value: "A2", label: "A2" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "BE", label: "BE" },
    { value: "C", label: "C" },
    { value: "CE", label: "CE" },
    { value: "D", label: "D" },
    { value: "DE", label: "DE" },
    { value: "F", label: "F" },
    { value: "L", label: "L" },
    { value: "T", label: "T" },
  ];

  return (
    <Box bg="tileBgColor" borderWidth="1px" borderRadius="lg" p={6} mb={6}>
      <EmployeeProfilePic employee_id={employee.personnel_number ?? ""} />

      <Box mt={8}>
        <Flex gap={2} mb={2} fontWeight="bold">
          <Icon as={LuAtSign} />
          <Text>Personalnummer</Text>
        </Flex>
        <InputField
          id="personnel_number"
          value={employee.personnel_number ?? ""}
          isDisabled
        />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
        {/* Persönliche Daten */}
        <Box>
          <Heading size="sm" mb={4}>
            Persönliche Daten
          </Heading>
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
          <FormControl my={4}>
            <FormLabel htmlFor="dateOfBirth">Geburtsdatum</FormLabel>
            <InputField
              id="birth-date"
              regex={/^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})?$/}
              regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
              value={employee.date_of_birth ?? ""}
              isDate
              onChange={(e) => setEmployee({ ...employee, date_of_birth: e })}
            />
          </FormControl>
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
            <FormLabel htmlFor="driverLicenseLevel">
              Führerscheinklasse
            </FormLabel>
            <DefaultMenu
              options={driverLicenseLevels}
              defaultValue={
                employee.driver_license_level ?? "Wähle eine Klasse aus"
              }
              onSelect={(value) =>
                setEmployee({
                  ...employee,
                  driver_license_level: value as string,
                })
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
        </Box>

        {/* Kontaktinformationen */}
        <Box>
          <Heading size="sm" mb={4}>
            Kontaktinformationen
          </Heading>
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
            <FormLabel htmlFor="mobile">Mobil</FormLabel>
            <InputField
              id="mobile"
              value={employee.mobile ?? ""}
              onChange={(value) => setEmployee({ ...employee, mobile: value })}
              placeholder="Mobil"
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="city">Straße</FormLabel>
            <InputField
              id="street"
              value={employee.street ?? ""}
              onChange={(value) => setEmployee({ ...employee, street: value })}
              placeholder="Straße"
            />
          </FormControl>
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
        </Box>

        {/* Arbeit */}
        <Box>
          <Heading size="sm" mb={4}>
            Arbeit
          </Heading>
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
                setEmployee({
                  ...employee,
                  department: value as Enums<"departments">,
                })
              }
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="location">Standort</FormLabel>
            <DefaultMenu
              options={[{ value: "DNX4", label: "DNX4" }]}
              defaultValue={employee.location ?? "Wähle ein Standort aus"}
              onSelect={(value) =>
                setEmployee({
                  ...employee,
                  location: value as Enums<"locations">,
                })
              }
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="state">Status</FormLabel>
            <DefaultMenu
              options={[
                { value: "active", label: "Aktiv" },
                { value: "inactive", label: "Ausgetreten" },
                { value: "pipeline", label: "Pipeline" },
              ]}
              defaultValue={employee.location ?? "Wähle einen Status aus"}
              onSelect={(value) =>
                setEmployee({
                  ...employee,
                  state: value as Enums<"employee_state">,
                })
              }
            />
          </FormControl>
          <FormControl my={4} isDisabled={authRole !== "superadmin"}>
            <FormLabel htmlFor="role">Rolle</FormLabel>
            <DefaultMenu
              options={[
                {
                  value: "superadmin",
                  label: "Administrator",
                  info: "Hat uneingeschränkten Zugriff auf alle Systeme und Verwaltungsfunktionen. Kann Benutzer verwalten, Berechtigungen zuweisen und sämtliche Einstellungen anpassen."
                },
                {
                  value: "employee_manager",
                  label: "Stationsleiter",
                  info: "Hat Leseberechtigung für das Mitarbeiter-Management und uneingeschränkten Zugriff auf das Fahrzeug-Management. Kann keine Änderungen an Mitarbeiterdaten vornehmen."
                },
                {
                  value: "vehicle_manager",
                  label: "Flotten-Manager",
                  info: "Hat ausschließlich Zugriff auf das Fahrzeug-Management und kann dort sämtliche Verwaltungsaufgaben durchführen."
                },
                {
                  value: "employee",
                  label: "Mitarbeiter (z. B. Fahrer)",
                  info: "Interner Systemzugriff ist nicht gestattet. Der Mitarbeiter kann lediglich seine eigenen Stammdaten und öffentlich zugängliche Dokumente einsehen."
                },
              ]}
              defaultValue={profile.auth_role ?? ""}
              onSelect={(value) =>
                setProfile({
                  ...profile,
                  auth_role: value as Enums<"auth-role">,
                })
              }
              isDisabled={authRole !== "superadmin"}
            />

          </FormControl>
        </Box>

        {/* Dokumente */}
        <Box>
          <Heading size="sm" mb={4}>
            Dokumente
          </Heading>
          <FormControl my={4}>
            <FormLabel htmlFor="driverLicenseEndDate">
              Führerschein Ablaufdatum
            </FormLabel>
            <InputField
              id="driver-license-expire-date"
              regex={/^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})?$/}
              regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
              value={employee.driver_license_end_date ?? ""}
              isDate
              onChange={(e) =>
                setEmployee({ ...employee, driver_license_end_date: e })
              }
            />
          </FormControl>
          <FormControl my={4}>
            <FormLabel htmlFor="idCardEndDate">
              Personalausweis Ablaufdatum
            </FormLabel>
            <InputField
              id="id-expire-date"
              regex={/^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})?$/}
              regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
              value={employee.id_card_end_date ?? ""}
              isDate
              onChange={(e) =>
                setEmployee({ ...employee, id_card_end_date: e })
              }
            />
          </FormControl>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
