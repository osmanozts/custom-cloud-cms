import {
  FormControl,
  FormLabel,
  Text,
  Grid,
  GridItem,
  Textarea,
  useBreakpointValue,
  Flex,
  Button,
} from "@chakra-ui/react";

import { Tables } from "../../utils/database/types";
import { InputField } from "../input-field";
import { RadioButtons } from "../radio-buttons";
import { useEffect, useState } from "react";
import { DriverSelectDialog } from "../dialogs/driver-select-dialog";
import { getAllEmployees, getEmployee } from "../../backend-queries";
import dayjs from "dayjs";

type IncidentDetailsProps = {
  incident: Tables<"incidents">;
  setIncident: (incident: Tables<"incidents">) => void;
  vehicle: Tables<"vehicles">;
};

export const IncidentDetails = ({
  incident,
  setIncident,
  vehicle,
}: IncidentDetailsProps) => {
  const [drivers, setDrivers] = useState<Tables<"employees">[]>();
  const [driver, setDriver] = useState<Tables<"employees"> | null>();

  useEffect(() => {
    getAllEmployees(setDrivers);
  }, []);
  useEffect(() => {
    if (incident.driver_id) {
      getEmployee(incident.driver_id, setDriver);
    }
  }, [drivers]);

  useEffect(() => {
    if (driver && incident) {
      const mappedDriver: Tables<"employees"> = {
        ...driver,
        date_of_birth: dayjs(driver?.date_of_birth).format("DD.MM.YYYY"),
      };
      setDriver(mappedDriver);

      const mappedIncident: Tables<"incidents"> = {
        ...incident,
        incident_date: dayjs(incident?.incident_date).format("DD.MM.YYYY"),
        opponent_driver_birth_date: dayjs(
          incident?.opponent_driver_birth_date
        ).format("DD.MM.YYYY"),
      };
      setIncident(mappedIncident);
    }
  }, [driver]);

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "1fr 1fr",
  });
  const paddingValue = useBreakpointValue({ base: 2, md: 4 });

  const handleInputChange =
    (key: keyof Tables<"incidents">) => (value: string | boolean) => {
      setIncident({ ...incident, [key]: value });
    };

  return (
    <Grid
      templateColumns={gridTemplateColumns}
      gap={12}
      borderWidth="1px"
      borderRadius="lg"
      bg="tileBgColor"
      p={paddingValue}
      overflowX="hidden"
      px={8}
      py={8}
    >
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel htmlFor="description" fontSize="lg" fontWeight="bold">
            Beschreibung
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie eine kurze Beschreibung des Vorfalls an.
          </Text>
          <Textarea
            id="description"
            value={incident.description ?? ""}
            onChange={(e) => handleInputChange("description")(e.target.value)}
            placeholder="Beschreibung"
            resize="vertical"
            width="100%"
            color="textColor"
            bg="#fff"
          />
        </FormControl>
      </GridItem>

      <GridItem>
        <FormControl>
          <FormLabel fontSize="md" fontWeight="normal" mt={4}>
            Vorfall Zeitpunkt
          </FormLabel>
          <InputField
            id="Zeitpunkt"
            placeholder="Zeitpunkt..."
            value={incident.incident_date ?? ""}
            regex={
              /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})(\s([01]\d|2[0-3]):([0-5]\d))?$/
            }
            regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
            onChange={(e) => handleInputChange("incident_date")(e)}
          />
        </FormControl>
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel htmlFor="address" fontSize="lg" fontWeight="bold">
            Adresse
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie die Adresse des Vorfalls ein.
          </Text>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <InputField
              id="address"
              placeholder="Adresse"
              value={incident.address ?? ""}
              onChange={(e) => handleInputChange("address")(e)}
            />
            <InputField
              id="city"
              placeholder="Stadt"
              value={incident.city ?? ""}
              onChange={(e) => handleInputChange("city")(e)}
            />
            <InputField
              id="country"
              placeholder="Land"
              value={incident.country ?? ""}
              onChange={(e) => handleInputChange("country")(e)}
            />
          </Grid>
        </FormControl>
      </GridItem>

      <FormControl>
        <FormLabel htmlFor="alcohol_last_12h" fontSize="lg" fontWeight="bold">
          Alkoholkonsum in den letzten 12 Stunden
        </FormLabel>
        <RadioButtons
          id="alcohol_last_12h"
          options={[
            { value: "true", label: "Ja" },
            { value: "false", label: "Nein" },
          ]}
          value={incident.alcohol_last_12h?.toString() ?? "false"}
          onChange={(value) =>
            handleInputChange("alcohol_last_12h")(value === "true")
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="blood_test" fontSize="lg" fontWeight="bold">
          Bluttest durchgeführt
        </FormLabel>
        <RadioButtons
          id="blood_test"
          options={[
            { value: "true", label: "Ja" },
            { value: "false", label: "Nein" },
          ]}
          value={incident.blood_test?.toString() ?? "false"}
          onChange={(value) =>
            handleInputChange("blood_test")(value === "true")
          }
        />
      </FormControl>

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <Flex mb={4} alignItems="center">
            <FormLabel fontSize="lg" fontWeight="bold">
              Fahrzeuginformationen
            </FormLabel>
          </Flex>
          <Grid templateColumns="1fr 1fr" gap={2}>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                Kennzeichen
              </FormLabel>
              <InputField
                isDisabled
                id="Kennzeichen"
                placeholder="Kennzeichen..."
                value={vehicle?.license_plate ?? ""}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                Kilometerstand
              </FormLabel>
              <InputField
                isDisabled
                id="Nachname des Kilometerstand..."
                placeholder="Nachname des Kilometerstand..."
                value={vehicle?.km_age ?? ""}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                Erstzulassung
              </FormLabel>
              <InputField
                isDisabled
                id="Erstzulassung"
                placeholder="Erstzulassung..."
                regex={
                  /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})(\s([01]\d|2[0-3]):([0-5]\d))?$/
                }
                regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
                value={vehicle.year ?? ""}
              />
            </FormControl>
          </Grid>
        </FormControl>
      </GridItem>

      {!driver && !incident.driver_id ? (
        <DriverSelectDialog
          drivers={
            drivers?.map((driver) => ({
              value: driver.profile_id,
              label: `${driver.first_name} ${driver.last_name}`,
            })) ?? [{ value: "-", label: "Fehler" }]
          }
          onSelect={async (tem) => {
            await getEmployee(tem, (newEmployee) => {
              setDriver(newEmployee);
              setIncident({ ...incident, driver_id: tem });
            });
          }}
        />
      ) : (
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl>
            <Flex mb={4} alignItems="center">
              <FormLabel fontSize="lg" fontWeight="bold">
                Fahrerinformationen
              </FormLabel>
              <Button
                mx={2}
                bg="darkColor"
                color="#fff"
                onClick={() => {
                  setDriver(null);
                  setIncident({ ...incident, driver_id: null });
                }}
              >
                Fahrer wechseln
              </Button>
            </Flex>
            <Grid templateColumns="1fr 1fr" gap={2}>
              <FormControl>
                <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                  Vorname des Fahrers
                </FormLabel>
                <InputField
                  isDisabled
                  id="driver_name"
                  placeholder="Vorname des Fahrers..."
                  value={driver?.first_name ?? ""}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                  Nachname des Fahrers
                </FormLabel>
                <InputField
                  isDisabled
                  id="driver_name"
                  placeholder="Nachname des Fahrers..."
                  value={driver?.last_name ?? ""}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                  Geburtdatum des Fahrers
                </FormLabel>
                <InputField
                  isDisabled
                  id="driver_birth_date"
                  placeholder="Geburtsdatum..."
                  regex={
                    /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})(\s([01]\d|2[0-3]):([0-5]\d))?$/
                  }
                  regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
                  value={driver?.date_of_birth ?? ""}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                  Kennzeichen
                </FormLabel>
                <InputField
                  isDisabled
                  id="driver_license_class"
                  placeholder="Kennzeichen..."
                  value={incident.driver_licence_plate ?? ""}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                  Führerscheinklasse des Fahrers
                </FormLabel>
                <InputField
                  isDisabled
                  id="driver_license_class"
                  placeholder="Führerscheinklasse..."
                  value={driver?.driver_license_level ?? ""}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                  Telefonnummer des Fahrers
                </FormLabel>
                <InputField
                  isDisabled
                  id="mobile"
                  placeholder="Telefonnummer..."
                  value={driver?.mobile ?? ""}
                />
              </FormControl>
            </Grid>
          </FormControl>
        </GridItem>
      )}

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            Gegnerische Partei Fahrer
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie die Details des Fahrers der gegnerischen Partei ein.
          </Text>
          <Grid templateColumns="1fr 1fr" gap={2}>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                Vorname der gegnerischen Partei
              </FormLabel>
              <InputField
                id="opponent_driver_name"
                placeholder="Vorname des Gegners..."
                value={incident.opponent_driver_firstname ?? ""}
                onChange={(e) =>
                  handleInputChange("opponent_driver_firstname")(e)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                Nachname der gegnerischen Partei
              </FormLabel>
              <InputField
                id="opponent_driver_name"
                placeholder="Nachname des Gegners..."
                value={incident.opponent_driver_lastname ?? ""}
                onChange={(e) =>
                  handleInputChange("opponent_driver_lastname")(e)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                Geburtsdatum der gegnerischen Partei
              </FormLabel>
              <InputField
                id="opponent_driver_birth_date"
                placeholder="Geburtsdatum..."
                value={incident.opponent_driver_birth_date ?? ""}
                regex={
                  /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})(\s([01]\d|2[0-3]):([0-5]\d))?$/
                }
                regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
                onChange={(e) =>
                  handleInputChange("opponent_driver_birth_date")(e)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                Kennzeichen der gegnerischen Partei
              </FormLabel>
              <InputField
                id="opponent_license_plate"
                placeholder="Kennzeichen..."
                value={incident.opponent_license_plate ?? ""}
                onChange={(e) => handleInputChange("opponent_license_plate")(e)}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                Telefonnummer der gegnerischen Partei
              </FormLabel>
              <InputField
                id="opponent_mobile"
                placeholder="Telefonnummer..."
                value={incident.opponent_mobile ?? ""}
                onChange={(e) => handleInputChange("opponent_mobile")(e)}
              />
            </FormControl>
          </Grid>
        </FormControl>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            Zeugen
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie die Zeugen zum Vorfall an.
          </Text>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                Vorname
              </FormLabel>
              <InputField
                placeholder="Vorname..."
                value={incident.witness_first_name ?? ""}
                onChange={(e) => handleInputChange("witness_first_name")(e)}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="normal" mt={4}>
                Nachname
              </FormLabel>
              <InputField
                placeholder="Nachname..."
                value={incident.witness_last_name ?? ""}
                onChange={(e) => handleInputChange("witness_last_name")(e)}
              />
            </FormControl>
          </Grid>
        </FormControl>
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            Schadensbeschreibung
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie eine Beschreibung des Schadens an.
          </Text>
          <Textarea
            id="damage_description"
            placeholder="Schadenbeschreibung"
            value={incident.damage_description ?? ""}
            onChange={(e) =>
              handleInputChange("damage_description")(e.target.value)
            }
            resize="vertical"
            bg="#fff"
          />
          <FormLabel fontSize="md" fontWeight="normal" mt={4}>
            Schadenort
          </FormLabel>
          <InputField
            id="damage_location"
            placeholder="Schadenstelle (z. B. Front, Heck)"
            value={incident.damage_location ?? ""}
            onChange={(e) => handleInputChange("damage_location")(e)}
          />
        </FormControl>
      </GridItem>
    </Grid>
  );
};
