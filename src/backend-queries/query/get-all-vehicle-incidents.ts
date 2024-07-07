import supabase from "../../utils/supabase";
import { QueryData } from "@supabase/supabase-js";

export const incidentsQuery = supabase.from("incidents").select(`
*
`);

export type Incidents = QueryData<typeof incidentsQuery>;

export async function getAllVehicleIncidents(
  vehicle_id: number,
  successCallback: (allIncidents: Incidents) => void
) {
  const { data: incidents, error } = await supabase
    .from("incidents")
    .select(
      `
      *
      `
    )
    .eq("vehicle_id", vehicle_id);
  if (error) throw error;

  successCallback(incidents);
}
