import {
  FormControl,
  FormLabel,
  Text,
  Grid,
  GridItem,
  Textarea,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";

import { Tables } from "../../utils/database/types";
import { InputField } from "../input-field";
import { RadioButtons } from "../radio-buttons";

type IncidentDetailsProps = {
  incident: Tables<"incidents">;
  setIncident: (incident: Tables<"incidents">) => void;
  vehicle_id: string;
};

export const IncidentDetails = ({
  incident,
  setIncident,
}: // vehicle_id,
IncidentDetailsProps) => {
  // const [reloadFiles, setReloadFiles] = useState(false);

  // const handleDateChange =
  //   (dateKey: keyof Tables<"incidents">) => (value: Date | null) => {
  //     setIncident({
  //       ...incident,
  //       [dateKey]: value ? value.toISOString() : null,
  //     });
  //   };

  // const handleFilesUploaded = () => {
  //   setReloadFiles((prev) => !prev);
  // };

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "1fr 1fr",
  });

  const paddingValue = useBreakpointValue({
    base: 2,
    md: 4,
  });

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
      {/* Beschreibung */}
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
            onChange={(e) =>
              setIncident({ ...incident, description: e.target.value })
            }
            placeholder="Beschreibung"
            resize="vertical"
            width="100%"
            color="textColor"
            bg="#fff"
          />
        </FormControl>
      </GridItem>

      <GridItem colSpan={{ base: 1 }}>
        <FormControl>
          <FormLabel htmlFor="address" fontSize="lg" fontWeight="bold">
            Adresse
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie die Adresse des Vorfalls ein.
          </Text>

          <Box my={2}>
            <InputField
              id="address"
              value={incident.address ?? ""}
              onChange={(e) => setIncident({ ...incident, address: e })}
              placeholder="Straße, Hausnummer"
            />
          </Box>
          <Box my={2}>
            <InputField
              id="city"
              value={incident.city ?? ""}
              onChange={(e) => setIncident({ ...incident, city: e })}
              placeholder="Stadt, Plz"
            />
          </Box>
          <Box my={2}>
            <InputField
              id="country"
              value={incident.country ?? ""}
              onChange={(e) => setIncident({ ...incident, country: e })}
              placeholder="Land"
            />
          </Box>
        </FormControl>
      </GridItem>

      <GridItem>
        <FormControl>
          <FormLabel htmlFor="alcohol_last_12h" fontSize="lg" fontWeight="bold">
            Alkoholkonsum in den letzten 12 Stunden
          </FormLabel>
          <Text mb={2} fontSize="md">
            Hat die betroffene Person Alkohol in den letzten 12 Stunden
            konsumiert?
          </Text>
          <RadioButtons
            id="alcohol_last_12h"
            options={[
              { value: "true", label: "Ja" },
              { value: "false", label: "Nein" },
            ]}
            value={incident.alcohol_last_12h?.toString() ?? "true"}
            onChange={(value) =>
              setIncident({
                ...incident,
                alcohol_last_12h: value === "true" ? true : false,
              })
            }
          />
        </FormControl>
      </GridItem>

      <GridItem>
        <FormControl>
          <FormLabel htmlFor="blood_test" fontSize="lg" fontWeight="bold">
            Bluttest durchgeführt
          </FormLabel>
          <Text mb={2} fontSize="md">
            Wurde ein Bluttest durchgeführt?
          </Text>
          <RadioButtons
            id="blood_test"
            options={[
              { value: "true", label: "Ja" },
              { value: "false", label: "Nein" },
            ]}
            value={incident.blood_test?.toString() ?? "true"}
            onChange={(value) =>
              setIncident({
                ...incident,
                blood_test: value === "true" ? true : false,
              })
            }
          />
        </FormControl>
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            Fahrerinformationen
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie die Details des Fahrers ein.
          </Text>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <InputField
              id="driver_name"
              placeholder="Name des Fahrers"
              value={incident.driver_name ?? ""}
              onChange={(e) => setIncident({ ...incident, driver_name: e })}
            />
            <InputField
              id="driver_birth_date"
              placeholder="Geburtsdatum"
              value={incident.driver_birth_date ?? ""}
              onChange={(e) =>
                setIncident({ ...incident, driver_birth_date: e })
              }
            />
            <InputField
              id="driver_license_class"
              placeholder="Führerscheinklasse"
              value={incident.driver_license_class ?? ""}
              onChange={(e) =>
                setIncident({ ...incident, driver_license_class: e })
              }
            />
            <InputField
              id="mobile"
              placeholder="Telefonnummer"
              value={incident.mobile ?? ""}
              onChange={(e) => setIncident({ ...incident, mobile: e })}
            />
          </Grid>
        </FormControl>
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            Gegenerische Partei Fahrer
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie die Details des Fahrers der gegnerischen Partei ein.
          </Text>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <InputField
              id="opponent_driver_name"
              placeholder="Name des Gegners"
              value={incident.opponent_driver_name ?? ""}
              onChange={(e) =>
                setIncident({ ...incident, opponent_driver_name: e })
              }
            />
            <InputField
              id="opponent_driver_birth_date"
              placeholder="Geburtsdatum"
              value={incident.opponent_driver_birth_date ?? ""}
              onChange={(e) =>
                setIncident({ ...incident, opponent_driver_birth_date: e })
              }
            />
            <InputField
              id="opponent_license_plate"
              placeholder="Kennzeichen"
              value={incident.opponent_license_plate ?? ""}
              onChange={(e) =>
                setIncident({ ...incident, opponent_license_plate: e })
              }
            />
            <InputField
              id="opponent_mobile"
              placeholder="Telefonnummer"
              value={incident.opponent_mobile ?? ""}
              onChange={(e) => setIncident({ ...incident, opponent_mobile: e })}
            />
          </Grid>
        </FormControl>
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            Schadensbeschreibung
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie eine Beschreibung des Schadens an und wählen Sie die
            Schadensstelle aus.
          </Text>
          <InputField
            id="damage_description"
            placeholder="Schadenbeschreibung"
            value={incident.damage_description ?? ""}
            onChange={(e) =>
              setIncident({ ...incident, damage_description: e })
            }
          />
          <FormLabel fontSize="md" fontWeight="normal" mt={4}>
            Schadenort
          </FormLabel>
          <Text mb={2} fontSize="md">
            Wählen Sie die Schadensstelle aus (z. B. Front, Heck).
          </Text>
          <Box mt={2}>
            <InputField
              id="damage_location"
              placeholder="Schadenstelle (z. B. Front, Heck)"
              value={incident.damage_location ?? ""}
              onChange={(e) => setIncident({ ...incident, damage_location: e })}
            />
          </Box>
        </FormControl>
      </GridItem>

      {/* Zeugeninformationen */}
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            Zeugen
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie die Details der Zeugen an.
          </Text>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <InputField
              id="witness_first_name"
              placeholder="Vorname des Zeugen"
              value={incident.witness_first_name ?? ""}
              onChange={(e) =>
                setIncident({ ...incident, witness_first_name: e })
              }
            />
            <InputField
              id="witness_last_name"
              placeholder="Nachname des Zeugen"
              value={incident.witness_last_name ?? ""}
              onChange={(e) =>
                setIncident({ ...incident, witness_last_name: e })
              }
            />
            <InputField
              id="witness_address"
              placeholder="Adresse des Zeugen"
              value={incident.witness_address ?? ""}
              onChange={(e) => setIncident({ ...incident, witness_address: e })}
            />
          </Grid>
        </FormControl>
      </GridItem>

      {/* Versicherungsinformationen der gegnerischen Partei */}
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            Versicherung der gegnerischen Partei
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie die Versicherungsdetails der gegnerischen Partei an.
          </Text>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <InputField
              id="opponent_insurance_name"
              placeholder="Versicherungsname"
              value={incident.opponent_insurance_name ?? ""}
              onChange={(e) =>
                setIncident({ ...incident, opponent_insurance_name: e })
              }
            />
            <InputField
              id="opponent_insurance_number"
              placeholder="Versicherungsnummer"
              value={incident.opponent_insurance_number ?? ""}
              onChange={(e) =>
                setIncident({ ...incident, opponent_insurance_number: e })
              }
            />
          </Grid>
        </FormControl>
      </GridItem>
    </Grid>
  );
};
