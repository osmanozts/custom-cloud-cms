import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Tables } from "../../utils/database/types";
import { InputField } from "../input-field";
import { RadioButtons } from "../radio-buttons";
import { CustomCalendar } from "../calendars/custom-calendar";

type IncidentDetailsProps = {
  incident: Tables<"incidents">;
  setIncident: (incident: Tables<"incidents">) => void;
};

export const IncidentDetails = ({
  incident,
  setIncident,
}: IncidentDetailsProps) => {
  const handleDateChange =
    (dateKey: keyof Tables<"incidents">) => (value: Date | null) => {
      setIncident({
        ...incident,
        [dateKey]: value ? value.toISOString() : null,
      });
    };

  return (
    <Stack
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      bg="tileBgColor"
      p={6}
      maxW="100%"
      overflowX="hidden"
    >
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        maxW="100%"
      >
        {/* Description */}
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl>
            <FormLabel htmlFor="description">Beschreibung</FormLabel>
            <Textarea
              id="description"
              value={incident.description ?? ""}
              onChange={(e) =>
                setIncident({ ...incident, description: e.target.value })
              }
              placeholder="Beschreibung"
              resize="vertical"
              maxW="100%"
            />
          </FormControl>
        </GridItem>

        {/* Damage Severity */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="damageSeverity">Schadensschwere</FormLabel>
            <RadioButtons
              id="damageSeverity"
              options={[
                { value: "minor", label: "Geringfügig" },
                { value: "moderate", label: "Mäßig" },
                { value: "severe", label: "Schwerwiegend" },
              ]}
              value={incident.damage_severity ?? ""}
              onChange={(value) =>
                setIncident({ ...incident, damage_severity: value })
              }
            />
          </FormControl>
        </GridItem>

        {/* Repair Cost Estimate */}
        <GridItem>
          <FormControl maxW="100%">
            <FormLabel htmlFor="repairCostEstimate">
              Reparaturkosten (in €)
            </FormLabel>
            <InputField
              id="repairCostEstimate"
              value={incident.repair_cost_estimate ?? ""}
              onChange={(value) =>
                setIncident({ ...incident, repair_cost_estimate: value })
              }
              placeholder="Reparaturkosten"
            />
          </FormControl>
        </GridItem>

        {/* Incident Date */}
        <GridItem>
          <FormControl maxW="100%">
            <FormLabel htmlFor="incidentDate">Unfalldatum</FormLabel>
            <CustomCalendar
              value={
                incident.incident_date ? new Date(incident.incident_date) : null
              }
              onChange={(date) => {
                handleDateChange("incident_date")(date);
              }}
            />
          </FormControl>
        </GridItem>

        {/* Repair Date */}
        <GridItem>
          <FormControl maxW="100%">
            <FormLabel htmlFor="repairDate">Reparaturdatum</FormLabel>
            <CustomCalendar
              value={
                incident.repair_date ? new Date(incident.repair_date) : null
              }
              onChange={(date) => {
                handleDateChange("repair_date")(date);
              }}
            />
          </FormControl>
        </GridItem>

        {/* Repair Completed */}
        <GridItem>
          <FormControl maxW="100%">
            <FormLabel htmlFor="repairCompleted">
              Reparatur abgeschlossen
            </FormLabel>
            <RadioButtons
              id="repairCompleted"
              options={[
                { value: "true", label: "Ja" },
                { value: "false", label: "Nein" },
              ]}
              value={incident.repair_completed ? "true" : "false"}
              onChange={(value) =>
                setIncident({
                  ...incident,
                  repair_completed: value === "true",
                })
              }
            />
          </FormControl>
        </GridItem>

        {/* Photos URL */}
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl maxW="100%">
            <FormLabel htmlFor="photosUrl">Fotos URL</FormLabel>
            <InputField
              id="photosUrl"
              value={incident.photos_url ?? ""}
              onChange={(value) =>
                setIncident({ ...incident, photos_url: value })
              }
              placeholder="Fotos URL"
            />
          </FormControl>
        </GridItem>
      </Grid>
    </Stack>
  );
};
