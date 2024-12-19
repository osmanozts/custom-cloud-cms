import supabase from "../../utils/supabase";
import { QueryData } from "@supabase/supabase-js";

export const incidentsQuery = supabase
  .from("incidents")
  .select("id, created_at");

export type Incidents = QueryData<typeof incidentsQuery>;

export async function getAllVehicleIncidents(
  vehicle_id: string,
  successCallback: (allIncidents: Incidents) => void
) {
  const { data: incidents, error } = await supabase
    .from("incidents")
    .select("id, created_at")
    .eq("vehicle_id", vehicle_id)
    .order("created_at", { ascending: false });
  if (error) throw error;

  successCallback(incidents);
}
