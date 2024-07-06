import { FormControl, FormLabel, Grid, GridItem } from "@chakra-ui/react";

import { Tables } from "../../utils/database/types";
import { InputField } from "../input-field";
import { colors } from "../menu/color";
import { DefaultMenu, MenuOption } from "../menu/default-menu";
import { RadioButtons } from "../radio-buttons";
import { EmployeesMinimumDetail } from "../../backend-queries/query/get-min-detail-employees";
import { useEffect, useState } from "react";

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
    // find the default driver option where vehicle.profile_id === driverOptions.profile_id and set it to defaultDriverOption
    const temp = driverOptions.find(
      (option) => option.value === vehicle.profile_id
    );
    if (temp) {
      setDefaultDriverOption(temp);
    }
  }, [driverOptions]);

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
      gap={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="tileBgColor"
      p={6}
    >
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

      {/* Letzte Wartung */}
      <GridItem>
        <FormControl>
          <FormLabel htmlFor="lastServiceDate">Letzte Wartung</FormLabel>
          <InputField
            id="lastServiceDate"
            value={vehicle.last_service_date ?? ""}
            onChange={(value) =>
              setVehicle({ ...vehicle, last_service_date: value })
            }
            placeholder="Letzte Wartung"
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
            onSelect={(value) => setVehicle({ ...vehicle, profile_id: value })}
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
    </Grid>
  );
};
