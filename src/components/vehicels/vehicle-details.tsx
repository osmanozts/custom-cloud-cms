import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Tables } from "../../utils/database/types";
import { InputField } from "../input-field";
import { colors } from "../menu/color";
import { DefaultMenu, MenuOption } from "../menu/default-menu";
import { RadioButtons } from "../radio-buttons";
import { EmployeesMinimumDetail } from "../../backend-queries/query/get-min-detail-employees";
import { CustomCalendar } from "../calendars/custom-calendar";
import { VehicleProfilePic } from "./vehicle-profile-pic";

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
  const [defaultDriverOption, setDefaultDriverOption] = useState<MenuOption>();

  useEffect(() => {
    const optionalDrivers: MenuOption[] = drivers.map((driver) => {
      return {
        label: `${driver.first_name} ${driver.last_name}`,
        value: driver.profile_id ?? "",
      };
    });
    setDriverOptions(optionalDrivers);
  }, [drivers]);

  useEffect(() => {
    const temp = driverOptions.find(
      (option) => option.value === vehicle.profile_id
    );
    if (temp) {
      setDefaultDriverOption(temp);
    }
  }, [driverOptions]);

  const handleDateChange =
    (dateKey: keyof Tables<"vehicles">) => (value: Date | null) => {
      setVehicle({
        ...vehicle,
        [dateKey]: value ? value : "",
      });
    };

  return (
    <Stack borderWidth="1px" borderRadius="lg" bg="tileBgColor" p={6}>
      <VehicleProfilePic vehicle_id={vehicle.id.toString()} />
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
        {/* VIN */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="vin">VIN</FormLabel>
            <InputField
              id="vin"
              value={vehicle.vin ?? ""}
              onChange={(value) => setVehicle({ ...vehicle, vin: value })}
              placeholder="VIN"
            />
          </FormControl>
        </GridItem>

        {/* Kennzeichen */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="licensePlate">Kennzeichen</FormLabel>
            <InputField
              id="licensePlate"
              value={vehicle.license_plate ?? ""}
              onChange={(value) =>
                setVehicle({ ...vehicle, license_plate: value })
              }
              placeholder="Kennzeichen"
            />
          </FormControl>
        </GridItem>

        {/* Farbe */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="color">Farbe</FormLabel>
            <DefaultMenu
              options={colors}
              defaultValue={vehicle.color ?? ""}
              onSelect={(value) => setVehicle({ ...vehicle, color: value })}
            />
          </FormControl>
        </GridItem>

        {/* Kilometerstand */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="kmAge">Kilometerstand</FormLabel>
            <InputField
              id="kmAge"
              value={vehicle.km_age ?? ""}
              onChange={(value) => setVehicle({ ...vehicle, km_age: value })}
              placeholder="Kilometerstand"
            />
          </FormControl>
        </GridItem>

        {/* Marke */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="make">Marke</FormLabel>
            <InputField
              id="make"
              value={vehicle.make ?? ""}
              onChange={(value) => setVehicle({ ...vehicle, make: value })}
              placeholder="Marke"
            />
          </FormControl>
        </GridItem>

        {/* Modell */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="model">Modell</FormLabel>
            <InputField
              id="model"
              value={vehicle.model ?? ""}
              onChange={(value) => setVehicle({ ...vehicle, model: value })}
              placeholder="Modell"
            />
          </FormControl>
        </GridItem>

        {/* Baujahr */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="year">Baujahr</FormLabel>
            <InputField
              id="year"
              value={vehicle.year ?? ""}
              onChange={(value) => setVehicle({ ...vehicle, year: value })}
              placeholder="Baujahr"
            />
          </FormControl>
        </GridItem>

        {/* Profil ID */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="profileId">Haupt-Fahrer</FormLabel>
            <DefaultMenu
              options={driverOptions}
              defaultValue={defaultDriverOption?.label ?? "Wähle einen Fahrer"}
              onSelect={(value) =>
                setVehicle({ ...vehicle, profile_id: value })
              }
            />
          </FormControl>
        </GridItem>

        {/* Status */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="state">Status</FormLabel>
            <RadioButtons
              id="state"
              options={[
                { value: "active", label: "Aktiv" },
                { value: "in_service", label: "Wartung" },
                { value: "decommissioned", label: "Stillgelegt" },
              ]}
              value={vehicle.state ?? ""}
              onChange={(value) => setVehicle({ ...vehicle, state: value })}
            />
          </FormControl>
        </GridItem>

        {/* Letzte Wartung */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="lastServiceDate">Letzte Wartung</FormLabel>
            <CustomCalendar
              value={
                vehicle.last_service_date
                  ? new Date(vehicle.last_service_date)
                  : null
              }
              onChange={(date) => {
                handleDateChange("last_service_date")(date);
              }}
            />
          </FormControl>
        </GridItem>

        {/* Nächste Wartung */}
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="nextServiceDate">Nächste Wartung</FormLabel>
            <CustomCalendar
              value={
                vehicle.next_service_date
                  ? new Date(vehicle.next_service_date)
                  : null
              }
              onChange={(date) => {
                handleDateChange("next_service_date")(date);
              }}
            />
          </FormControl>
        </GridItem>
      </Grid>
    </Stack>
  );
};
