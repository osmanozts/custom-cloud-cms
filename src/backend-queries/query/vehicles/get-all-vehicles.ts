import supabase from "../../../utils/supabase";
import { QueryData } from "@supabase/supabase-js";

export const vehiclesQuery = supabase
  .from("vehicles")
  .select(`*`)
  .order("license_plate", { ascending: true }); // Serverseitige Sortierung nach 'license_plate'

export type Vehicles = QueryData<typeof vehiclesQuery>;

export async function getAllVehicles(
  successCallback: (allVehicles: Vehicles) => void
) {
  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select(`*`)
    .order("license_plate", { ascending: true }); // Sortierung anwenden

  if (error) throw error;

  successCallback(vehicles);
}
