import {
  Box,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Tables } from "../../utils/database/types";
import { DriverSelectDialog } from "../dialogs/driver-select-dialog";
import { InputField } from "../input-field";
import dayjs from "dayjs";

type KmHistoryDetailsProps = {
  kmHistory: Tables<"km_history">;
  employees?: Tables<"employees">[];
};

export const KmHistoryDetails = ({
  kmHistory,
  employees,
}: KmHistoryDetailsProps) => {
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
            Erstellt am
          </Text>
          <InputField
            id="date"
            value={dayjs(kmHistory.created_at).format("HH.MM.YYYY") ?? ""}
            isDisabled
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontWeight="bold" mb={2}>
            Fahrer
          </Text>
          <DriverSelectDialog
            drivers={driverOptions}
            selectedDriver={kmHistory.driver_id ?? ""}
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Text fontWeight="bold" mb={2}>
            Kilometerstand
          </Text>
          <InputField
            id="km_age"
            value={kmHistory.km_age?.toString() ?? ""}
            isDisabled
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
