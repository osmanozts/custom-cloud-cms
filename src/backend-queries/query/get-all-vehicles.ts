import supabase from "../../utils/supabase";
import { QueryData } from "@supabase/supabase-js";

export const vehiclesQuery = supabase.from("vehicles").select(`
*
`);

export type Vehicles = QueryData<typeof vehiclesQuery>;

export async function getAllVehicles(
  successCallback: (allVehicles: Vehicles) => void
) {
  const { data: vehicels, error } = await supabase.from("vehicles").select(`
      *
      `);
  if (error) throw error;

  successCallback(vehicels);
}
