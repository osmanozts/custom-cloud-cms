import { FormControl, FormLabel, Grid, Stack, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { EmployeesMinimumDetail } from "../../backend-queries/query/employees/get-min-detail-employees";
import { Enums, Tables } from "../../utils/database/types";
import { DriverSelectDialog } from "../dialogs/driver-select-dialog";
import { InputField } from "../input-field";
import { colors } from "../menu/color";
import { DefaultMenu, MenuOption } from "../menu/default-menu";

type VehicleDetailsProps = {
  vehicle: Tables<"vehicles">;
  drivers: EmployeesMinimumDetail;
  setVehicle: (vehicle: Tables<"vehicles">) => void;
};

export const VehicleDetails = ({
  vehicle,
  drivers,
  setVehicle,
}: VehicleDetailsProps) => {
  const [driverOptions, setDriverOptions] = useState<MenuOption[]>([]);

  useEffect(() => {
    const optionalDrivers: MenuOption[] = drivers.map((driver) => ({
      label: `${driver.first_name} ${driver.last_name}`,
      value: driver.profile_id ?? "",
    }));
    setDriverOptions(optionalDrivers);
  }, [drivers]);

  return (
    <Stack
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      bg="tileBgColor"
      p={6}
      spacing={6}
    >
      {/* Fahrzeugdaten */}
      <Heading size="md">Fahrzeugdaten</Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormControl>
          <FormLabel htmlFor="licensePlate">Kennzeichen</FormLabel>
          <InputField
            id="licensePlate"
            isDisabled
            value={vehicle.license_plate ?? ""}
            onChange={(value) =>
              setVehicle({ ...vehicle, license_plate: value })
            }
            placeholder="Kennzeichen"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="vin">FIN</FormLabel>
          <InputField
            id="vin"
            value={vehicle.vin ?? ""}
            onChange={(value) => setVehicle({ ...vehicle, vin: value })}
            placeholder="VIN"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="make">Marke</FormLabel>
          <InputField
            id="make"
            value={vehicle.make ?? ""}
            onChange={(value) => setVehicle({ ...vehicle, make: value })}
            placeholder="Marke"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="model">Modell</FormLabel>
          <InputField
            id="model"
            value={vehicle.model ?? ""}
            onChange={(value) => setVehicle({ ...vehicle, model: value })}
            placeholder="Modell"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="year">Erstzulassung</FormLabel>
          <InputField
            id="year"
            value={vehicle.year ?? ""}
            onChange={(value) => setVehicle({ ...vehicle, year: value })}
            placeholder="Erstzulassung..."
            regex={/^\d*$/}
            regexErrorText="Bitte nur Zahlen eingeben"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="color">Farbe</FormLabel>
          <DefaultMenu
            options={colors}
            defaultValue={vehicle.color ?? ""}
            onSelect={(value) => setVehicle({ ...vehicle, color: value })}
          />
        </FormControl>
      </Grid>

      {/* Fahrer- und Statusdaten */}
      <Heading size="md" mt={4}>
        Fahrer- und Statusdaten
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormControl>
          <FormLabel htmlFor="profileId">Haupt-Fahrer</FormLabel>
          <DriverSelectDialog
            drivers={driverOptions}
            onSelect={(value) => setVehicle({ ...vehicle, profile_id: value })}
            selectedDriver={vehicle.profile_id ?? ""}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="state">Status</FormLabel>
          <DefaultMenu
            options={[
              { value: "active", label: "Aktiv" },
              { value: "in_service", label: "Wartung" },
              { value: "decommissioned", label: "Stillgelegt" },
            ]}
            defaultValue={vehicle.state ?? ""}
            onSelect={(value) =>
              setVehicle({
                ...vehicle,
                state: value as Enums<"vehicle_state">,
              })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="location">Standort</FormLabel>
          <DefaultMenu
            options={[{ value: "DNX4", label: "DNX4" }, { value: "DNW1", label: "DNW1" }, { value: "Lplg-Moers", label: "Lplg-Moers" }, { value: "Heiz-Moers", label: "Heiz-Moers" },]}
            defaultValue={vehicle.location ?? ""}
            onSelect={(value) =>
              setVehicle({ ...vehicle, location: value as Enums<"locations"> })
            }
          />
        </FormControl>
      </Grid>

      {/* Wartungsdaten */}
      <Heading size="md" mt={4}>
        Wartungsdaten
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormControl>
          <FormLabel htmlFor="kmAge">Kilometerstand</FormLabel>
          <InputField
            id="kmAge"
            value={vehicle.km_age?.toString() ?? ""}
            onChange={(value) => {
              const numericValue = Number(value);
              if (!isNaN(numericValue)) {
                setVehicle({ ...vehicle, km_age: numericValue });
              }
            }}
            placeholder="Kilometerstand"
            regex={/^\d*$/}
            regexErrorText="Bitte nur Zahlen eingeben"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="nextServiceDate">Nächste Wartung am</FormLabel>
          <InputField
            id="nextServiceDate"
            regex={
              /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{2}|\d{4})(\s([01]\d|2[0-3]):([0-5]\d))?$/
            }
            regexErrorText="Bitte geben Sie ein Datum im Format '01.01.2024' ein."
            value={vehicle.next_service_date ?? ""}
            isDate
            onChange={(e) => {
              setVehicle({ ...vehicle, next_service_date: e });
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="service_year">
            Nächste Wartung ab ... km
          </FormLabel>
          <InputField
            id="service_year"
            value={vehicle.next_service_km?.toString() ?? ""}
            placeholder="km..."
            regex={/^\d*$/}
            regexErrorText="Bitte nur Zahlen eingeben"
            onChange={(value) => {
              const numericValue = Number(value);
              if (!isNaN(numericValue)) {
                setVehicle({ ...vehicle, next_service_km: numericValue });
              }
            }}
          />
        </FormControl>
      </Grid>
    </Stack>
  );
};
