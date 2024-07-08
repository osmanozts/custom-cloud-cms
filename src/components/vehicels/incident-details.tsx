import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Stack,
  Textarea,
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

  return (
    <Stack
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      bg="tileBgColor"
      p={4}
      maxW="100%"
      overflowX="hidden"
    >
      <Grid templateColumns={gridTemplateColumns} gap={4} maxW="100%">
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
              width="100%"
            />
          </FormControl>
        </GridItem>

        {/* Damage Severity */}
        <GridItem>
          <FormControl width="100%">
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
          <FormControl width="100%">
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
          <FormControl width="100%">
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
          <FormControl width="100%">
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
          <FormControl width="100%">
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
          <FormControl width="100%">
            <FormLabel htmlFor="photosUrl">
              Dateien / Bilder zum Vorfall
            </FormLabel>
            <UploadedFilesGrid
              path={`${vehicle_id}/Schaden-Management/${incident.id}`}
              bucket="dateien_fahrzeuge"
              reload={reloadFiles}
            />
            <FileUploadDialog
              path={`${vehicle_id}/Schaden-Management/${incident.id}/`}
              bucket="dateien_fahrzeuge"
              title="Füge Dateien zum Vorfall hinzu"
              successCallback={handleFilesUploaded}
            />
          </FormControl>
        </GridItem>
      </Grid>
    </Stack>
  );
};
