import {
  Box,
  Grid,
  GridItem,
  Text,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Tables } from "../../utils/database/types";
import { DriverSelectDialog } from "../dialogs/driver-select-dialog";
import { InputField } from "../input-field";

type DriverHistoryDetailsProps = {
  driverHistory: Tables<"driver_history">;
  employees?: Tables<"employees">[];
  setDriverHistory: (driverHistory: Tables<"driver_history">) => void;
};

export const DriverHistoryDetails = ({
  driverHistory,
  employees,
  setDriverHistory,
}: DriverHistoryDetailsProps) => {
  const paddingValue = useBreakpointValue({
    base: 2,
    md: 4,
  });

  const driverOptions =
    employees?.map((employee) => ({
      label: `${employee.first_name ?? ""} ${employee.last_name ?? ""}`,
      value: employee.profile_id ?? "",
    })) || [];

  return (
    <Box height="100d%" bg="tileBgColor" borderWidth="1px" borderRadius="lg">
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={4}
        p={paddingValue}
        overflowX="hidden"
      >
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontWeight="bold" mb={2}>
            ID
          </Text>
          <InputField value={driverHistory.id.toString() ?? ""} isDisabled />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontWeight="bold" mb={2}>
            Fahrt Beginn
          </Text>
          <InputField
            id="start-driving-date"
            regex={
              /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})(\s([01]\d|2[0-3]):([0-5]\d))?$/
            }
            regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
            value={driverHistory.drive_start ?? ""}
            isDate
            onChange={(e) => {
              setDriverHistory({ ...driverHistory, drive_start: e });
            }}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontWeight="bold" mb={2}>
            Fahrt Ende
          </Text>
          <InputField
            id="end-driving-date"
            regex={
              /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})(\s([01]\d|2[0-3]):([0-5]\d))?$/
            }
            regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
            value={driverHistory.drive_end ?? ""}
            isDate
            onChange={(e) => {
              setDriverHistory({ ...driverHistory, drive_end: e });
            }}
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontWeight="bold" mb={2}>
            Fahrer
          </Text>
          <DriverSelectDialog
            drivers={driverOptions}
            selectedDriver={driverHistory.driver_id ?? ""}
            onSelect={(value) =>
              setDriverHistory({ ...driverHistory, driver_id: value })
            }
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 4 }} mt={4}>
          <Text fontWeight="bold" mb={2}>
            Beschreibung / Notizen
          </Text>
          <Textarea
            id="description"
            value={driverHistory.description ?? ""}
            onChange={(e) =>
              setDriverHistory({
                ...driverHistory,
                description: e.target.value,
              })
            }
            placeholder="Beschreibung..."
            resize="vertical"
            width="100%"
            bg="backgroundColor"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
