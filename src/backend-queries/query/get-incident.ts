import supabase from "../../utils/supabase";
import { QueryData } from "@supabase/supabase-js";

export const incidentQuery = supabase
  .from("incidents")
  .select(
    `
*
`
  )
  .single();

export type Incident = QueryData<typeof incidentQuery>;

export async function getIncident(
  id: number,
  successCallback: (incident: Incident) => void
) {
  const { data: incident, error } = await supabase
    .from("incidents")
    .select(
      `
      *
      `
    )
    .eq("id", id)
    .single();
  if (error) throw error;

  successCallback(incident);
}
