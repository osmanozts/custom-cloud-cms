import {
  Box,
  Grid,
  GridItem,
  Text,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Tables } from "../../utils/database/types";
import { CustomCalendar } from "../calendars/custom-calendar";
import { DefaultMenu } from "../menu/default-menu";
import { InputField } from "../input-field";

type DriverHistoryDetailsProps = {
  driverHistory: Tables<"driver_history">;
  employee?: Tables<"employees">;
  employees?: Tables<"employees">[];
  setDriverHistory: (driverHistory: Tables<"driver_history">) => void;
};

export const DriverHistoryDetails = ({
  driverHistory,
  employee,
  employees,
  setDriverHistory,
}: DriverHistoryDetailsProps) => {
  const paddingValue = useBreakpointValue({
    base: 2,
    md: 4,
  });

  return (
    <Box height="100dvh" bg="tileBgColor" borderWidth="1px" borderRadius="lg">
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={4}
        p={paddingValue}
        overflowX="hidden"
      >
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontWeight="bold" color="textColor" mb={2}>
            ID
          </Text>
          <InputField value={driverHistory.id.toString() ?? ""} isDisabled />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontWeight="bold" color="textColor" mb={2}>
            Fahrt Beginn
          </Text>
          <CustomCalendar
            value={
              !!driverHistory.drive_start
                ? new Date(driverHistory.drive_start)
                : null
            }
            onChange={(date) => {
              setDriverHistory({
                ...driverHistory,
                drive_start: date?.toISOString() ?? new Date().toString(),
              });
            }}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontWeight="bold" color="textColor" mb={2}>
            Fahrt Ende
          </Text>
          <CustomCalendar
            value={
              !!driverHistory.drive_end
                ? new Date(driverHistory.drive_end)
                : null
            }
            onChange={(date) => {
              setDriverHistory({
                ...driverHistory,
                drive_end: date?.toISOString() ?? new Date().toString(),
              });
            }}
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontWeight="bold" color="textColor" mb={2}>
            Fahrer
          </Text>
          <DefaultMenu
            options={
              employees
                ? employees.map((employee) => ({
                    label: `${employee.first_name ?? ""} ${
                      employee.last_name ?? ""
                    }`,
                    value: employee.profile_id ?? "",
                  }))
                : []
            }
            defaultValue={
              employee
                ? `${employee.first_name ?? ""} ${employee.last_name ?? ""}`
                : ""
            }
            onSelect={(value) =>
              setDriverHistory({ ...driverHistory, driver_id: value })
            }
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 4 }} mt={4}>
          <Text fontWeight="bold" color="textColor" mb={2}>
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
            placeholder="Beschreibung"
            resize="vertical"
            width="100%"
            color="textColor"
            bg="backgroundColor"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
