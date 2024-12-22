import { QueryData } from "@supabase/supabase-js";
import supabase from "../../../utils/supabase";

export const vehiclesQuery = supabase
  .from("vehicles")
  .select("id, license_plate, profile_id");

export type VehiclesMinData = QueryData<typeof vehiclesQuery>;

export async function getVehiclesByProfile(
  profileId: string,
  successCallback?: (allVehicles: VehiclesMinData) => void
) {
  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("id, license_plate, profile_id")
    .eq("profile_id", profileId);

  if (error) {
    console.error("Error fetching vehicles by profile:", error);
    throw error;
  }

  if (successCallback) successCallback(vehicles);
}
