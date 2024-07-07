import { Tables } from "../../utils/database/types";
import supabase from "../../utils/supabase";

export async function updateIncident(newIncident: Tables<"incidents">) {
  try {
    const { data, error } = await supabase
      .from("incidents")
      .update(newIncident)
      .eq("id", newIncident.id)
      .select();

    if (error) {
      console.error("Update error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in updateIncident:", error);
    throw error;
  }
}
