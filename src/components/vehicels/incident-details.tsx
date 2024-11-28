import {
  FormControl,
  FormLabel,
  Text,
  Grid,
  GridItem,
  Textarea,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";

import { Tables } from "../../utils/database/types";
import { CustomCalendar } from "../calendars/custom-calendar";
import { FileUploadDialog } from "../dialogs/file-upload-dialog";
import { UploadedFilesGrid } from "../files/uploaded-filed-grid";
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
  vehicle_id,
}: IncidentDetailsProps) => {
  const [reloadFiles, setReloadFiles] = useState(false);

  const handleDateChange =
    (dateKey: keyof Tables<"incidents">) => (value: Date | null) => {
      setIncident({
        ...incident,
        [dateKey]: value ? value.toISOString() : null,
      });
    };

  const handleFilesUploaded = () => {
    setReloadFiles((prev) => !prev);
  };

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
      gap={4}
      borderWidth="1px"
      borderRadius="lg"
      bg="tileBgColor"
      p={paddingValue}
      overflowX="hidden"
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
          />
        </FormControl>
      </GridItem>

      {/* Neue Felder */}
      <GridItem>
        <FormControl>
          <FormLabel htmlFor="address" fontSize="lg" fontWeight="bold">
            Adresse
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie die Adresse des Vorfalls ein.
          </Text>
          <InputField
            id="address"
            value={incident.address ?? ""}
            onChange={(e) => setIncident({ ...incident, address: e })}
            placeholder="Adresse"
          />
        </FormControl>
      </GridItem>

      <GridItem>
        <FormControl>
          <FormLabel htmlFor="city" fontSize="lg" fontWeight="bold">
            Stadt
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie die Stadt an, in der der Vorfall stattgefunden hat.
          </Text>
          <InputField
            id="city"
            value={incident.city ?? ""}
            onChange={(e) => setIncident({ ...incident, city: e })}
            placeholder="Stadt"
          />
        </FormControl>
      </GridItem>

      <GridItem>
        <FormControl>
          <FormLabel htmlFor="country" fontSize="lg" fontWeight="bold">
            Land
          </FormLabel>
          <Text mb={2} fontSize="md">
            Geben Sie das Land an, in dem der Vorfall stattgefunden hat.
          </Text>
          <InputField
            id="country"
            value={incident.country ?? ""}
            onChange={(e) => setIncident({ ...incident, country: e })}
            placeholder="Land"
          />
        </FormControl>
      </GridItem>

      <Divider my={4} />

      {/* Alkoholkonsum und Bluttest */}
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

      <Divider my={4} />

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

      <Divider my={4} />

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
