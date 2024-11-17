import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
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
        templateColumns={{ base: "1fr", md: "repeat(6, 1fr)" }}
        gap={4}
        p={paddingValue}
        overflowX="hidden"
        height="100%"
      >
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <FormControl>
            <FormLabel htmlFor="description">ID</FormLabel>
            <InputField value={driverHistory.id.toString() ?? ""} isDisabled />
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 1 }}>
          <FormControl>
            <FormLabel htmlFor="nextServiceDate">Fahrt Beginn</FormLabel>
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
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 1 }}>
          <FormControl>
            <FormLabel htmlFor="color">Fahrer</FormLabel>
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
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 3 }}>
          <FormControl>
            <FormLabel htmlFor="description">Beschreibung / Notizen</FormLabel>
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
          </FormControl>
        </GridItem>
      </Grid>
    </Box>
  );
};
